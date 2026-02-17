# Integrations

## GoHighLevel (GHL)

Backend engine for lead capture, automation, and follow-up.

| Integration Point | GHL Function | Pipeline |
|-------------------|-------------|----------|
| Sell Your Home form | Form submission triggers workflow | Seller Pipeline |
| Get Home Value form | Form submission triggers CMA delivery workflow | Valuation Pipeline |
| Buyer consultation form | Form submission triggers workflow | Buyer Pipeline |
| IDX registration/signup | Contact created via webhook or Zapier | Buyer Pipeline |
| IDX saved search alerts | Contact tagged, added to nurture | Buyer Pipeline |
| Contact page form | Routed by dropdown selection | Varies |
| Newsletter signup | Contact added to email list | Newsletter/Nurture |
| Landing page forms | Each LP has unique tags | Campaign-specific |
| Booking calendar | GHL calendar embedded on site | Based on calendar type |
| Chat widget | GHL Conversations live chat | General / Real Estate |
| Founders Club signup | Contact tagged for events | Community Pipeline |
| Marketing inquiry form | Application-style form | Agency Pipeline |

### Technical Notes
- GHL forms: embedded via iframe/JS snippet, or custom HTML forms submit via webhook
- Booking calendar: iframe embed
- Chat widget: JS snippet in site footer
- IDX leads: may need Zapier/Make.com bridge to GHL

## IDX / MLS

### Recommended Providers for BC
| Provider | Notes |
|----------|-------|
| myRealPage | Common in BC, good Association of Interior Realtors integration |
| iHomefinder | Strong IDX, good design flexibility, works with custom sites |
| RealtyNinja | Canadian, BC-focused, clean design |
| Jexter (Sierra) | Modern platform with AI features |
| Brivity | What AJ Hazzi uses, full platform with IDX/CRM/marketing |

### Setup Steps
1. Contact Association of Interior Realtors + Royal LePage to confirm approved IDX providers
2. Evaluate providers on design, mobile, lead capture, GHL integration, map search, SEO, cost
3. Choose platform approach (custom Next.js site + IDX provider, possibly on subdomain like search.karsenkoltun.com)
4. Integrate with GHL — every IDX action triggers contact creation/update
