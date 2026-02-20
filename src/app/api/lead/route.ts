/* ═══════════════════════════════════════════════════════════════
   POST /api/lead
   Creates or updates a contact in GoHighLevel via the REST API
   and adds them to a pipeline for follow-up.
   ═══════════════════════════════════════════════════════════════ */

import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getIP } from "@/lib/rate-limit";

const GHL_TOKEN = process.env.GHL_PRIVATE_INTEGRATION_TOKEN ?? "";
const GHL_LOCATION_ID = process.env.NEXT_PUBLIC_GHL_LOCATION_ID ?? "";
const GHL_BASE_URL = "https://services.leadconnectorhq.com";

/* ── Rate-limit config: 5 submissions per 60 seconds per IP ─── */
const RATE_LIMIT = { limit: 5, windowSeconds: 60 };

/* ── Payload type from the client ─── */
interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  source: string;
  tags?: string[];
  customFields?: Record<string, string>;
  /** Honeypot field — should always be empty */
  _honey?: string;
}

/* ── POST handler ─── */
export async function POST(request: NextRequest) {
  try {
    /* ── Rate limiting ─── */
    const ip = getIP(request);
    const { success: withinLimit, remaining, resetAt } = rateLimit(ip, RATE_LIMIT);

    if (!withinLimit) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((resetAt - Date.now()) / 1000)),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    const body: LeadPayload = await request.json();

    /* ── Honeypot check — bots fill hidden fields ─── */
    if (body._honey) {
      // Silently reject but return 200 so bots think it worked
      return NextResponse.json({ success: true, ghl: false });
    }

    // Validation
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    // Check that GHL credentials are configured
    if (!GHL_TOKEN || !GHL_LOCATION_ID) {
      console.warn(
        "[/api/lead] GHL credentials not fully configured. Token:",
        GHL_TOKEN ? "SET" : "MISSING",
        "| Location ID:",
        GHL_LOCATION_ID ? "SET" : "MISSING"
      );
      // Still return success to the user — log the lead server-side
      console.log("[/api/lead] Lead captured (no GHL):", JSON.stringify(body));
      return NextResponse.json({ success: true, ghl: false });
    }

    /* ─────────────────────────────────────────────
       Step 1: Create or update contact in GHL
       ───────────────────────────────────────────── */
    const contactPayload: Record<string, unknown> = {
      locationId: GHL_LOCATION_ID,
      name: body.name,
      email: body.email,
      source: body.source || "Mortgage Calculator",
      tags: body.tags || ["calculator-lead", "bc-buyer"],
    };

    if (body.phone) {
      contactPayload.phone = body.phone;
    }

    // Map custom fields
    if (body.customFields) {
      contactPayload.customFields = Object.entries(body.customFields).map(
        ([key, value]) => ({
          key,
          field_value: value,
        })
      );
    }

    const contactRes = await fetch(`${GHL_BASE_URL}/contacts/upsert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GHL_TOKEN}`,
        Version: "2021-07-28",
      },
      body: JSON.stringify(contactPayload),
    });

    if (!contactRes.ok) {
      const errText = await contactRes.text();
      console.error("[/api/lead] GHL contact upsert failed:", contactRes.status, errText);
      // Still return success to user — don't block UX for CRM errors
      return NextResponse.json({ success: true, ghl: false, error: errText });
    }

    const contactData = await contactRes.json();
    const contactId = contactData?.contact?.id;

    console.log("[/api/lead] GHL contact upserted:", contactId);

    /* ─────────────────────────────────────────────
       Step 2: Add tags for segmentation
       ───────────────────────────────────────────── */
    if (contactId) {
      try {
        await fetch(`${GHL_BASE_URL}/contacts/${contactId}/tags`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GHL_TOKEN}`,
            Version: "2021-07-28",
          },
          body: JSON.stringify({
            tags: body.tags || ["calculator-lead", "bc-buyer"],
          }),
        });
      } catch (tagErr) {
        console.warn("[/api/lead] Failed to add tags:", tagErr);
      }
    }

    return NextResponse.json({
      success: true,
      ghl: true,
      contactId,
    });
  } catch (err) {
    console.error("[/api/lead] Unhandled error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
