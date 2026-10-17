# Architecture rules
- Render invoice previews, PDF exports, and printed documents from the shared InvoiceDocument and invoice-export module so Persian typography and totals remain consistent.
- Use the central service catalog for dashboard and service management identity; delivery summaries are scoped to a selected service and never synthesize credentials.
- Dedicated hardware choices are reference profiles and review requests, not VPS scaling or verified inventory; gate compatibility on device generation and motherboard profile.
- Keep canonical catalog money in IRR and cart money in Toman; convert IRR/10 only at display boundaries so stored values remain unchanged.
- Use shared payment options for invoice review and topup; disconnected actions never mutate account, payment or device state.
- Gate the user panel on the existing auth session and lazy-load routes/panel views so public users do not load private/heavy views.
- Keep device evidence separate from reference hardware choices; reset dependent selections and require operator evidence for inventory verification.
