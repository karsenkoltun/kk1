"use client";

import { z } from "zod";
import MultiStepForm from "@/components/forms/MultiStepForm";
import type { FormStep } from "@/components/forms/MultiStepForm";

/* ════════════════════════════════════════════
   Step 1 — Personal Information
   ════════════════════════════════════════════ */

const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
});

/* ════════════════════════════════════════════
   Step 2 — Property Information
   ════════════════════════════════════════════ */

const propertyInfoSchema = z.object({
  address: z.string().min(5, "Please enter a street address"),
  unit: z.string().optional(),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(6, "Please enter a valid postal code"),
  propertyType: z.string().min(1, "Please select a property type"),
  bedrooms: z.string().min(1, "Please select bedrooms"),
  timeline: z.string().min(1, "Please select your timeline"),
});

/* ════════════════════════════════════════════
   Step definitions
   ════════════════════════════════════════════ */

const steps: FormStep[] = [
  {
    id: "personal",
    title: "Personal Information",
    description: "Tell us how to reach you",
    schema: personalInfoSchema,
    fields: [
      {
        name: "firstName",
        label: "First Name",
        type: "text",
        placeholder: "First Name",
        half: true,
      },
      {
        name: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: "Last Name",
        half: true,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Email Address",
      },
      {
        name: "phone",
        label: "Phone",
        type: "tel",
        placeholder: "(250) 000-0000",
      },
    ],
  },
  {
    id: "property",
    title: "Property Details",
    description: "Tell us about your property",
    schema: propertyInfoSchema,
    fields: [
      {
        name: "address",
        label: "Street Address",
        type: "text",
        placeholder: "123 Lakeshore Drive",
      },
      {
        name: "unit",
        label: "Unit / Suite",
        type: "text",
        placeholder: "Unit / Suite # (optional)",
        half: true,
      },
      {
        name: "city",
        label: "City",
        type: "text",
        placeholder: "Kelowna",
        half: true,
      },
      {
        name: "postalCode",
        label: "Postal Code",
        type: "text",
        placeholder: "V1Y 1A1",
        half: true,
      },
      {
        name: "propertyType",
        label: "Property Type",
        type: "select",
        placeholder: "Select Property Type",
        half: true,
        options: [
          { label: "Detached Home", value: "detached" },
          { label: "Townhouse", value: "townhouse" },
          { label: "Condo / Apartment", value: "condo" },
          { label: "Duplex / Half Duplex", value: "duplex" },
          { label: "Acreage / Rural", value: "acreage" },
          { label: "Other", value: "other" },
        ],
      },
      {
        name: "bedrooms",
        label: "Bedrooms",
        type: "select",
        placeholder: "Bedrooms",
        half: true,
        options: [
          { label: "1", value: "1" },
          { label: "2", value: "2" },
          { label: "3", value: "3" },
          { label: "4", value: "4" },
          { label: "5+", value: "5+" },
        ],
      },
      {
        name: "timeline",
        label: "Selling Timeline",
        type: "select",
        placeholder: "When are you looking to sell?",
        half: true,
        options: [
          { label: "As Soon As Possible", value: "asap" },
          { label: "1–3 Months", value: "1-3-months" },
          { label: "3–6 Months", value: "3-6-months" },
          { label: "6–12 Months", value: "6-12-months" },
          { label: "Just Curious", value: "just-curious" },
        ],
      },
    ],
  },
];

/* ════════════════════════════════════════════
   Component
   ════════════════════════════════════════════ */

export default function HomeValuationForm() {
  const handleFormSubmit = async (data: Record<string, unknown>) => {
    const payload = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email as string,
      phone: data.phone as string,
      source: "Home Valuation Form",
      tags: ["home-valuation-lead", "kelowna"],
      customFields: {
        address: data.address as string,
        unit: (data.unit as string) || "",
        city: data.city as string,
        postalCode: data.postalCode as string,
        propertyType: data.propertyType as string,
        bedrooms: data.bedrooms as string,
        timeline: data.timeline as string,
      },
    };

    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, _honey: "" }),
    });

    if (!res.ok) {
      throw new Error("Failed to submit — please try again.");
    }
  };

  return (
    <MultiStepForm
      steps={steps}
      onSubmit={handleFormSubmit}
      submitLabel="Get My Free Valuation"
      successTitle="Thank You!"
      successMessage="I'll review your property details and reach out within 24 hours to schedule your free evaluation."
    />
  );
}
