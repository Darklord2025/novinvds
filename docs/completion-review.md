# NovinVDS completion review

Reviewed 2026-10-22 (Asia/Tehran). This report supersedes the earlier October 18 handoff.

## Delivery state

- Project: https://lovable.dev/projects/33683517-18a6-49b2-ab82-dee41de7dbd7
- Upstream base: `5a0298b904adc9840c5b3d5d10a2583ee7bb95c6`.
- Follow-up implementation is local, on release branch `codex/client-panel-refresh`. Local verification does not establish production readiness. No live payment, domain registration, provisioning, MFA change or production database deployment was performed.
- Frontend must follow backend deployment and real staging-account checks; see `client-panel-deployment.md`.

## Implemented UI and code

| Requested area | Local implementation | Actual integration/data still required |
| --- | --- | --- |
| Colorful dashboard, sidebar, account, services, invoices, wallet, support and affiliate | Responsive layouts, independent sidebar/main scrolling, shared account snapshot, dashboard wallet and spending donut | Real account-owned service, invoice, ticket and confirmed-ledger imports |
| Invoices and branding | Restored supplied original logo and original favicon, shared preview/print/PDF, 10% VAT on discounted net subtotal, company/personal titles, close button, official request and billing ticket | Verified company identity, finance approval, merchant legal data and gateway settlement |
| All service renewals | Renewal routes for all offered kinds; monthly/daily/domain terms, hourly funding, one-time eligibility checks | Provider quote, pricing, eligibility, actual extension and reconciliation |
| Dedicated server hardware | Gen8–Gen12 physical reference profiles, generation/board-dependent CPU/RAM/storage choices and quote requests | Verified inventory, board/device evidence, physical compatibility and operator-approved prices. Reference profiles are never represented as stock |
| Multi-location and service modules | Selected central service identity, all supplied IPv4/IPv6 values, categorized compatible add-ons | Assigned IPs/locations, credentials and device/provider controls |
| Domain order and management | Register/transfer/existing menu, canonical IDN validation, separate owned domain states and nameserver request | Registrar availability, EPP secure checkout, fees and real nameserver application |
| Wallet and reports | Deposit/withdraw forms, saved bank ownership review, Toman conversion quotes, confirmed spending summary, CSV and printable usage/commission/support reports | Trusted exchange quotes, verified payment callbacks, atomic wallet adapter, verified bank ownership and payout processing |
| Tickets | Numeric IDs, correct return control, close from list/detail and survey per ticket | Real support queue and identity-review workflow |
| Account and notifications | Prior profile form with added notifications, one-way verified personal-to-company request and representative review | Verified registration/identity evidence, approval operator and notification delivery workers |
| Security settings restoration | Visible colorful security cards in preview and live account; password reset link, native authenticator and email MFA, login-alert preference, activity/session tabs, current session details, other-session sign-out confirmation and recovery link. Security navigation opens the correct tab | Real verified account and mail delivery; audit/session listing integration, alert event worker and API-key service. No invented score, device list or login history |
| Login/recovery and session timer | Password/username/MFA recovery routes, no artificial auth transition, session expiry prompt/extend/sign-out, native/email challenge | Supabase redirect allowlist, mail credentials, deployed security edge function and two real staging accounts |
| Bilingual content and numbers | Declarative static translations, locale digits and service period labels, RTL/LTR notifications/downloads/knowledge/settings, authored blog/knowledge articles | Review operator-authored/customer content and actual provider strings; customer content is preserved |
| Marketing and referral rewards | 16 banner sizes × 3 campaigns × 3 themes × 2 languages × static/animated; original logo; SVG/ZIP/static PNG, share/UTM tools. Reward server rule: 1,000,000 Toman confirmed purchases, one 3/5/7/10% coupon capped at 100,000 Toman, no reroll, one use | Assigned real affiliate codes, confirmed referrals/purchases, campaign approval, commission accounting; no browser-generated production coupon |
| Performance | Lazy public/private routes and PDF libraries, static sidebar icon imports, panel snapshot reuse, immediate local navigation with retained content | Production network/Lighthouse measurement and gateway/device latency. Local bundle sizes do not prove a live speed improvement |

## Local verification

- Frontend and edge TypeScript checks.
- 50 review tests covering totals/currencies, invoice pagination, physical reference/evidence gating, catalog identity, renewal kinds, domain validation, wallet holds, session boundaries, CSV safety, ZIP correctness and 576 banner variants.
- All five SQL migrations exercised in isolated PGlite: ownership/RLS, withdrawal holds, OTP expiry/attempt/replay checks, official and identity tickets, one-way approval evidence, reward threshold/reservation/settlement idempotency.
- Browser checks: desktop/mobile panel geometry, bilingual notifications/domain/settings, domain menu, ticket report/survey/close, invoice close and downloaded PDF; long 70-line export is six A4 pages without blank trailing page or cut final row. Banner ZIP validated as 16 SVG files.
- Security restoration checked visibly in the full panel, including preview guards and session sign-out confirmation; no real credentials or MFA settings changed.
- Fresh locked npm install completed in the release checkout. Package lock now includes the previously declared but missing dependencies; it must accompany the release.

Actual account/device, payment, registrar, email, production security and physical-print checks remain open. Frontend success alone must not be described as a completed operational integration.


## October 21 catalog and finance follow-up

| Request | Implemented locally | Outstanding actual data |
| --- | --- | --- |
| Outside-Iran fixed dedicated plans | Separate Europe/US/Asia, GPU/storage demonstration cards; no editable hardware; USD quote with online reference-FX estimate | Actual supplier SKUs, inventory, countries, USD prices and final settlement FX |
| Specific VPS/dedicated types | Menu category is passed through and remounts its own flow; Windows/storage/managed/daily/hourly/multi-location differences; daily term retained | Provider-approved resource and price catalogs |
| Domains | One register/transfer/connect menu; searchable extension table, separate registration/renewal/transfer amounts; one year and IR one/five years | Registrar access; documented competitor feed for cost-bounded 1.5% registration reduction |
| aaPanel | Community installation fee plus separate Pro commercial option, with price/period in OS selection and add-ons | License entitlement and approved tariffs |
| Support/cart/finance | Specialist-support request form separate from add-ons; removed View services from empty cart; restored colorful finance overview; separate transaction filters/export and wallet/usage | Actual ledger, gateway and support-processing data |
| Dates and labels | Persian Jalali dates and Persian date-filter parsing; English Gregorian; deposit translated to wallet credit | Imported events need accurate timestamps/time zone |
| Affiliate income | Approved verified commission inserts a confirmed wallet credit once; funding does not earn commission | Assigned contracts/rates, actual settlement callbacks and refund reconciliation |
| Help/downloads | Site guide, expandable FAQ and original blog in knowledge center; official publisher download links; guides return to knowledge center | Additional editorial content and actual service-specific documentation |
| Logo | Supplied original logo restored after design feedback; N-in-circle and favicon preserved; site, invoices, reports and banners use the shared original asset | No dependency for local branding |
| Earlier hosting/hardware/OS requests | Removed SSL offering/dashboard new-order CTA; original hosting names, common catalog, Iran/Europe, custom/usage/trial; per-unit physical dedicated CPU/DIMM/drive/NIC/GPU/PSU requests; OS hierarchy including Windows Server 2025 | Trial provisioner/expiry worker, actual device compatibility, stock, images and licenses |

The online rate display was observed in the local browser with actual public responses. No assertion of a verified Iran free-market cash USD rate or live competitor-price integration is made. The read-only endpoint must be deployed for the production frontend.

Public `/vps`, plan/service/custom/hourly aliases and dedicated plan/service pages now use the same order catalog as the panel; dead public buttons and inconsistent hardcoded plan prices were removed. Home VPS cards use the shared base catalog and preserve the selected plan in their URL. Custom VPS resource selection is available for Iran; international dedicated hardware stays fixed. The demo cart and proforma clearly identify estimates, and the backend rejects demo supplier IDs for payable invoices.


## October 22 navigation, ordering and appearance follow-up

- Sidebar parents expand without navigating to a first child. Iran dedicated references are grouped by datacenter; international choices are grouped by region and country. Colored product icons replace generic monochrome submenu icons, and the vertical submenu border is removed. Browser QA caught and corrected the Asiatech/Asia substring collision; country parsing now resolves exact datacenter IDs and complete category segments.
- Iran dedicated ordering uses model cards and four steps: chassis/datacenter, physical hardware, OS and review. Location selection remains in the sidebar. International hardware remains fixed demonstration data, never verified stock.
- Custom VPS and hosting resources are editable during order. Hosting locations expose country-specific datacenter choices; changing country clears the datacenter. Country/datacenter metadata survives auth/cart continuation, and trial requests validate the pair server-side.
- Active hosting services can select a higher plan and request an upgrade proforma. The preview computes only the higher plan price difference for the remaining paid period, plus 10% VAT. Actual invoices require a trusted provider quote, ISO billing period, expiry, ownership and active status. Quote references are unique per account. Fulfillment after verified payment remains a provider integration responsibility.
- Restored the earlier gradient login card with a refreshed welcome area, original supplied branding and immediate login/register switching. Password/username/MFA recovery remains available.
- Panel back controls now register one handler in a consistent top toolbar, including service detail and knowledge articles. Profile/security/notification/bank/appearance tabs use distinct colors.
- English system labels and sample data are localized without changing real customer names or messages. Static localization audit found zero unmapped static phrases (2,612 dictionary entries). Gentle entry, submenu and hover motion honors reduced-motion preferences.

Additional checks: all five migrations ran successfully in isolated PGlite, including immutable first trial location and geographic scope. Frontend and edge type checks and all 50 tests passed. Browser checks covered submenu expansion without navigation, the Iran datacenter route, physical-resource fields, English security/account content, instant auth mode switching and a 390px auth layout without horizontal overflow. This is local verification; the existing Lovable preview is not proof of these edits being deployed.

Final locked release build passed with Vite 5.4.10: initial application chunk 598.19 kB raw / 201.73 kB gzip; lazy user panel 70.18 kB raw / 22.99 kB gzip. The build still warns about the initial chunk exceeding 500 kB and outdated Browserslist data. These are recorded performance limits; no production Lighthouse result is claimed.
