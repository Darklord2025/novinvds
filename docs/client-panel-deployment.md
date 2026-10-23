# Client panel deployment and integration contract

Prepared on 2026-10-22. This change is a tested implementation proposal, not evidence of a production deployment or verified device inventory.

## Deploy backend before frontend

1. Back up the database and test all five migrations on a staging Supabase project. Apply `20261018090000_client_panel.sql` followed by `20261018100000_reward_checkout.sql`, `20261021120000_hosting_trial.sql`, `20261021130000_affiliate_wallet.sql` and `20261022120000_order_locations.sql`.
2. Deploy `account-security`, `panel-action` and the read-only public `market-rates`. Their `verify_jwt=false` setting is deliberate: the code validates authenticated operations with `auth.getUser`, confirmed email, native MFA assurance and a session-bound email grant. Only recovery is public. Do not remove these guards.
3. Set server secrets in Supabase: `PANEL_OTP_SECRET` (at least 32 random characters), `RESEND_API_KEY`, `PANEL_MAIL_FROM` (verified sender), `PANEL_PROVIDER_URL`, `PANEL_PROVIDER_KEY`, and `PANEL_CHECKOUT_HOSTS` (comma-separated approved payment hostnames). Standard Supabase URL/anon/service-role variables are supplied by the edge environment. Never put service-role, provider, email or OTP secrets in Vite variables.
4. Enable native TOTP MFA, configure SMTP/auth email delivery and allow the site's `/auth` and `/reset-password` redirect URLs in Supabase Auth. Keep the existing production `VITE_SUPABASE_URL` and publishable key. Local fixture values must never be published.
5. Import actual account-owned inventory, invoices, confirmed ledger entries, verified bank accounts and affiliate assignments through a trusted backend. Inventory and bank records require `verified_at`. Import canonical service prices in IRR, domain recurring prices and new invoice/ledger amounts in Toman.
6. Test using two real staging accounts: ownership separation, native TOTP enrollment/challenge/recovery, email MFA expiry and resend limits, password reset, username recovery and security-review tickets. Test the actual gateway sandbox and registrar/device adapters. Only then deploy the frontend.

The UI fails closed if account-security is unavailable. Publishing the frontend before deploying these functions can prevent panel entry. No production migration, function deployment, payment or MFA reset was performed during local verification.

## Provider adapter

The adapter is an HTTPS API controlled by the operator. Requests use server-side `Authorization: Bearer PANEL_PROVIDER_KEY`; the browser never receives it. These are contracts to implement against the actual WHMCS/gateway/registrar APIs, not functioning third-party integrations:

| POST route | Input | Required verified response |
| --- | --- | --- |
| `cart-quote` | `userId`, cart item IDs/types/quantity and requested metadata | `reference`, future ISO `expiresAt`, `items` with authoritative Toman `price`, integer `quantity`, name/description/period. Ignore browser prices and verify hardware, licenses, location and stock. Reject unverified quote-only dedicated drafts until operator review. |
| `renewal-quote` | `userId`, owned `serviceId`, `unit` (`months`, `days`, `provider`), `count`, optional compatibility `months` | `reference`, future ISO `expiresAt`, positive integer `subtotalToman`; `renewable:true` is mandatory for a one-time purchase. Check suspended/expired eligibility, registrar redemption fees and the actual renewal term. |
| `conversion-quote` | `userId`, currency, amount, payment method | `reference`, future ISO `expiresAt`, positive `rateToman`, integer `amountToman` equal to rounded amount × rate. Disclose fees and quote expiry at checkout. |
| `checkout` | account ID, owned invoice ID or server-validated deposit details and quote reference, method | HTTPS `checkoutUrl` on an explicitly approved hostname. Re-read the authoritative invoice and quote; never trust browser totals. Wallet payment must enforce available balance and withdrawal holds atomically. |
| `domain-check` | account ID, canonical ASCII/punycode domain, registration years and mode | Boolean `available`, authoritative `priceToman` and quote reference/ID. Transfer eligibility differs from new registration availability. |
| `domain-request` | account ID, owned domain ID, operation `nameservers`, validated nameservers | Tracking `reference`. The UI reports a request, not an applied registrar change. |

Gateway verification, conversion settlement, refund/reversal, provider provisioning and notifications are still adapter responsibilities. Implement authenticated server-to-server verification and idempotent callbacks before accepting money. For confirmed invoice payments call service-only `panel_settle_invoice`; it checks owner, exact amount, status and payment reference, redeems the coupon once and records a confirmed purchase. It does not itself charge a card, debit the wallet or extend a service. The affiliate settlement trigger credits an approved sponsor automatically as described below. Complete those steps in the billing adapter's transaction/outbox and reconcile failures. Deposit settlement must append a confirmed ledger entry with a unique verified provider reference; never credit the wallet from a redirect URL or a customer-supplied receipt.

Provider notification workers must honor saved preferences, account language and low-balance thresholds. Saving preferences alone does not start an email scheduler. Provider job delivery, spending/commission analytics and ledger records must be populated from actual events.

## Referral reward

The approved rule is one reward per referred account after 1,000,000 Toman in confirmed paid invoices. The server selects uniformly from 3%, 5%, 7%, 10%; the monetary cap is 100,000 Toman. Issuance persists the draw, so retries never reroll it. Current validity is 30 days. A code reserves one payable invoice and successful settlement consumes it. Repeated creation returns the reserved invoice. Finance must cancel/release an unpaid reserved invoice through a reviewed backend process if a customer changes their cart; no customer override is exposed. Fraud, refunds and commission policy require actual program terms and reconciliation rules before launch.

## Identity and official invoices

Individual-to-company conversion is one-way and requires a private support review. Corporate representative changes require identity and representation evidence. Customers can request, but cannot approve, either change. The service-only approval RPC requires a review evidence reference. A secure evidence-upload channel, reviewer workflow and operational recovery procedure still need configuration; do not collect identity documents through public URLs or code logs. Private ParsVDS account forms were not accessible; the implemented form uses common company fields, not a claim of exact parity.

Official invoice requests create billing tickets. The UI uses the same branded document for individual/company accounts and changes the type/status appropriately. Real seller identity, legal address, economic/tax identifiers, official numbering, signature/seal and any required tax-system integration must be supplied and validated by finance. A designed preview is not a legally issued tax invoice.

## Hardware and operations

Gen8–Gen12 DL380-family profiles are reference targets only. RAM/disk options do not prove a compatible DIMM/drive SKU or available stock. Real confirmation requires model, motherboard/part number, CPU, DIMMs, disks, backplane, controller, firmware, power and cooling evidence. Verify each assigned IPv4/IPv6 address and location; multiple IPs do not establish multiple physical servers. Power, reboot, rebuild, console, SSO, backups and live telemetry remain visibly unavailable until their authenticated device/provider APIs are connected.

## Validation and recovery

Use Node 24 for review scripts (`node:zlib` CRC32 validation). Run `npm ci`, `npm run typecheck`, `npm run typecheck:edge`, `npm run test:review`, then `npm run build`. Edge typechecking uses the Supabase SDK and minimal Deno global declarations; it is not a deployed edge-runtime test. `scripts/test-panel-sql.mjs` accepts `PGLITE_MODULE` pointing to an installed `@electric-sql/pglite` module and exercises migrations/transactions/privileges. No local fixture harness, `.env.local`, dependency cache or real account data belongs in the pull request.

For rollback, revert the frontend commit and keep the new private tables for investigation/reconciliation. Do not drop financial or security records as a shortcut. The Vite MCP plugin may regenerate `supabase/functions/mcp/index.ts` during builds; keep unrelated generated changes out of this patch.


## Restored security settings

The security tab now renders its full previous categories in both preview and authenticated mode. Preview invokes no auth/OTP/session mutations. Password reset uses the existing `/reset-password` flow; allowlist that redirect in Supabase. Other-device sign-out revokes refresh sessions via Supabase; existing JWTs may remain valid until expiry. Full device enumeration, IP audit logs and API-key management require an actual trusted integration and are shown as unavailable rather than fabricated. The `login` notification preference is shared across the security and notification tabs; a sign-in event/email worker must implement delivery.


## Hosting, fixed supplier plans and release catalog

Hosting uses one original catalog for the home page, public pages and panel. Iran/Europe prices, custom-resource rates and usage units are proposals, not competitor quotes. The 24-hour trial entitlement is idempotent per account, fixed to 1 vCPU, 512 MB RAM, 512 MB disk, 1 GB transfer and one site; only Linux/WordPress are accepted. Deploy a trusted provisioning worker that approves a pending request, records a provider reference and an exact 24-hour expiry, then disables the service on expiry. UI success alone does not activate a device. Trial metadata cannot create a zero-price paid invoice.

International dedicated cards are fixed demonstration supplier profiles. Every request includes `demo:true`, `inventoryVerified:false`, `fixedConfiguration:true` and a `demo-` supplier plan ID. Replace these cards with actual supplier SKU, chassis, CPU, RAM, drive, country, stock and USD price before accepting payment. Iranian hardware configurators remain physical reference profiles, with operator validation of firmware/controller/backplane/power/cooling. No reference profile is verified stock.

OS selection separates family, distribution/product, version and Windows edition. New and legacy releases are installation requests, not proof that a provider image exists. Source URLs live beside each catalog entry. aaPanel Community has a proposed one-time installation fee; Pro has proposed recurring commercial pricing. They are separate mutually exclusive choices. Validate the license, setup fee, renewal period and service OS in `cart-quote`.

## Public rates and domain comparison

`market-rates` caches public source results for 60 seconds and accepts no account/payment mutations. USD/EUR are ExchangeRate-API reference rates (IRR divided by ten), **not verified Iran cash-market USD**. BTC/ETH/USDT USD prices come from CoinGecko; Toman market quotes come from Wallex. Network failures leave the affected value unavailable, never a fabricated price. The display is informational and does not replace `conversion-quote` or gateway settlement. Polling is paused in hidden tabs. Provider FX older than 48 hours is excluded from supplier-plan estimates.

Optional `POST /domain-pricing` on the trusted provider takes `{discountPercent:1.5,years:1}`. Return `{prices:[{extension,baselineToman,costFloorToman,renewToman,transferToman,asOf,source}]}` with a documented HTTPS competitor source, a current timestamp (under one hour) and verified acquisition floor. Registration uses `max(costFloor,ceil(baseline*0.985))`. It therefore targets 1.5% below the documented comparator only when the floor permits it. Renewals and transfers keep their independent provider rates. Stale/invalid records are dropped. Without this real feed, the table clearly shows sample one-year rates; no online competitive discount is claimed. Real competitor and registrar access are still required.

Non-IR domain orders and renewals are one year. IR orders allow one/five years; renewal sends 12/60 months. The adapter must verify actual registrar eligibility, remaining term and redemption charges; changing the UI period is not a registration or renewal.

## Affiliate wallet credit

`panel_credit_affiliate` runs only after a trusted `panel_payment_settlements` insert. The sponsor must have operator-managed `panel_affiliates.data.approved=true` and a valid assigned `ratePercent` greater than zero and at most 100. Commission is calculated on the discounted subtotal before VAT, appended once to confirmed `panel_ledger` with unique reference `affiliate:<invoice-id>`, and recorded as paid in the commission report. Wallet balance and withdrawal eligibility use that same ledger. Funding invoices marked `kind:deposit` or `kind:wallet-topup` do not earn commission. Adapters must mark those invoice types, never treat funding as a service purchase, and implement refund/clawback/reconciliation before rollout. No sample UI action assigns a rate or creates a confirmed credit.

## Public reference research

Navigation and separation of hosting/domain/finance/help patterns were reviewed on the public pages of [ParsVDS](https://parsvds.com/), [Hostiran](https://hostiran.net/) and [Azaronline](https://azaronline.com/). Private account flows and competitor live-price feeds were not verified. Product copy and hosting plan names in this implementation are original. Release/support references are linked in `operatingSystems.ts`; hardware references remain distinct from operator inventory.


## Country-specific locations and hosting upgrades

Apply `20261022120000_order_locations.sql` after the previous four migrations. The trial RPC accepts optional country/datacenter arguments after the original three; it validates country scope, stores the first request location and does not overwrite it on retry. Catalog datacenters are reference locations only. A supplier contract and service-specific availability are still required.

Implement provider POST `hosting-upgrade-quote` with `userId`, owned `serviceId` and `targetPlanId`. Respond with matching `serviceId`/`targetPlanId`, `isUpgrade:true`, `currency:TOMAN`, unique `reference`, future ISO `expiresAt`, positive integer `currentPeriodPriceToman`/`targetPeriodPriceToman` and ISO `periodStart`/`periodEnd` for the same active billing cycle. Confirm every target resource is at least the current resource level. The edge function computes prorated net and 10% VAT, records quote/period metadata and reuses the invoice for a repeated quote reference. Browser estimates never authorize a charge.

At checkout, reject expired upgrade quotes and recheck current plan, billing period and resource version. The adapter must coordinate `panel_settle_invoice` with an idempotent upgrade outbox/provisioning operation and reconcile failures. Settlement alone does not resize hosting. Keep the original due date and apply only the quoted target once. No live supplier upgrade was attempted during this review.


## CAPTCHA and first-signup activation (October 23)

Configure these on the hosted Supabase project before releasing this frontend:

1. Create a Cloudflare Turnstile widget for the actual application domains. Set its public site key as `VITE_TURNSTILE_SITE_KEY` at frontend build time. Enable Turnstile in Supabase Auth Bot Protection and store the corresponding secret there, never in Vite variables or committed files.
2. Enable email confirmations, use six-digit email OTPs with a 600-second expiry, and copy `supabase/templates/confirmation.html` into the Confirm signup email template. The local `config.toml` settings do not change hosted Auth settings. This template sends `{{ .Token }}`, not an automatic sign-in link.
3. Configure a real SMTP sender and verified sender domain, the application Site URL and allowed password-reset/OAuth callback URLs. Test delivery to a new mailbox, incorrect/expired/already-used codes, resend throttling and the existing account MFA gate in staging.

The widget uses Cloudflare's public test key only on a local Vite development origin and labels that state. Remote previews and production reject known test keys; missing configuration leaves login/signup/reset requests disabled. Login, signup, activation resends and password-reset email requests pass the token to native Supabase Auth. Native email OTP verification does not use the deprecated CAPTCHA option; Auth validates code expiry, rate limits and the returned session. Widget errors, expiry and retries clear the token.

Pending activation stores only email, destination and timestamps in session storage, never password, OTP or CAPTCHA token. It expires after 24 hours and is not authentication authority. If hosted Auth returns an immediately confirmed signup session because email confirmation is disabled, the frontend signs that local session out and explains the missing activation configuration. Successful code verification preserves the existing account-security challenge before panel access.

The header bell now shows recent notifications, unread count and read actions through the same account-owned `notifications-read` action as the full center. Opening the bell does not navigate or mark items read. The account dropdown exposes profile, security, support, wallet and sign-out; wallet balance uses the ledger after withdrawal holds. Preview data and mutations remain isolated from real accounts.

Primary integration references: [Supabase CAPTCHA](https://supabase.com/docs/guides/auth/auth-captcha), [email templates](https://supabase.com/docs/guides/auth/auth-email-templates), [email OTP verification](https://supabase.com/docs/reference/javascript/auth-verifyotp) and [Turnstile widget lifecycle](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/).

## Display currency and custom price proposals (October 23)

`novin.displayCurrency` is a per-browser display preference. USD estimates divide Toman display amounts by a fresh, positive `usdToman` reference snapshot (receipt within three minutes, source within 48 hours). This is not a payment conversion quote. Native catalog IRR, cart Toman, invoice/ledger Toman and payment payloads remain unchanged; the invoice document and reports retain canonical amounts. The market-rates edge function must be deployed for production USD estimates. Use the trusted conversion-quote/checkout flow for actual currency payments.

Custom hosting unit tariffs include CPU/RAM allocation time, retained disk, selected traffic and additional sites after the first included site. These remain proposals; validate prices, workload, datacenter, quotas and licenses through the supplier adapter. DL360 chassis limits differ from DL380 and both require real SKU, backplane, power/cooling and firmware evidence. Review the authored general affiliate policy and supply the actual contract rate, attribution window, payout rules and eligible services before opening enrollment.
