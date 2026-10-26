# Equipment storefront and shared account

The selected model is **one Supabase account and session, with two distinct panels**. Services remain at `/user-panel`; equipment purchases have `/shop/account`. A workspace switcher is present in both headers. Shared sign-out ends the same session. There is no second password database or separate registration.

The store account reuses the existing native authenticator/email MFA challenge before loading private data. Every shop-account Edge action also runs the same verified-user, native MFA and email-grant guards. Owner identity comes from the validated session, never the request body. Private store routes are outside the PWA worker's public navigation allowlist.

## Shared versus separate

| Shared | Store-specific |
| --- | --- |
| Identity, sign-in, registration, profile and account security | Equipment order/request namespace and status |
| Existing wallet and financial history | Delivery addresses |
| Existing support account | Saved verified equipment products |
| Persian/English and theme preference | Store dashboard and navigation |

The UI links to the existing wallet and profile settings rather than creating a second balance or identity. No store UI can debit the wallet or mark an order paid. Public equipment profiles and sample checkout totals are illustrative; they are not supplier stock or billable SKUs.

## Working account functions

- Orders/enquiries are owned records, with quote, payment and delivery states shown only from server records.
- An equipment enquiry stores requirements and quantity, with an optional owned-address snapshot. It starts as `requested`, with a null price. Browser price, payment status, user ID and shipment fields are discarded. This is a request for a quote, not a paid sale or stock reservation.
- Address create/edit/delete validates recipient, city, ten-digit localized postcode and street. Current address storage is scoped to Iran; delivery coverage and charges still require supplier/carrier data. No new phone field was added.
- A customer may cancel only an enquiry still awaiting a quote; the server checks the owner and performs a conditional status update.
- Account bookmarks accept only an active, verified product from `shop_products`; reference/demo profiles are not inserted as real inventory. The public prototype favorites remain local demonstration state.

## Deployment and real data

Apply `20261026130000_shop_account.sql` after the existing migrations, deploy `shop-account` and updated shared modules, then the frontend. Shop tables are RLS-enabled and unavailable to direct anon/authenticated browser access; the guarded Edge Function scopes private reads and writes by user ID. The product table is deliberately empty.

Still required: actual SKUs/specifications, prices, stock verification and reservation, warranties/return terms, delivery coverage/charges, operator workflows, payment gateway credentials/callback verification, server-side final order/invoice settlement and shared-wallet debit integration. No sample price can be paid. Adding a shared account does not make a payment gateway or shipment integration live.

`/network-store?view=account-preview` renders an explicitly labeled in-memory blueprint with example account/order data. It has no authenticated account mutations. `/shop/account` always requires the actual session and MFA gate; a query parameter cannot enable preview there.

Public merchandising/navigation patterns were reviewed on [ParsVDS](https://parsvds.com/), [Hetzner](https://www.hetzner.com/cloud/), [MikroTik](https://mikrotik.com/products), [Digikala](https://www.digikala.com/) and [Hostiran](https://hostiran.net/). No private competitor account was accessed. Snapp's public homepage returned a redirect loop, so no detailed Snapp account behavior is claimed. Copy, sample prices, illustrations and layouts are original. The local public font is Vazirmatn v33.003 from its upstream project, with the included SIL OFL license.
