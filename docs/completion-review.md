# NovinVDS completion review

Reviewed 2026-10-23 (Asia/Tehran). This report supersedes the earlier October 18 handoff.

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
- 57 review tests covering totals/currencies, invoice pagination, physical reference/evidence gating, catalog identity, renewal kinds, domain validation, wallet holds, session boundaries, CSV safety, ZIP correctness and 576 banner variants.
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


## October 23 custom resources, currency and login follow-up

This section supersedes earlier appearance and plan-label descriptions.

- Removed hosting location switch buttons. Hosting menu leaves lock the selected country; usage/trial are country trees. Custom hosting is available under BOTH Iran and International. It opens resources directly, with editable CPU, half-GB RAM/storage, transfer and site counts, paired sliders/inputs and itemized rates.
- Hosting calculator and order form share `hostingCostLines` / `hostingEstimate`; extra websites now have an explicit proposed unit rate after the included first site. VPS calculator reuses every VPS datacenter and the shared custom resource rates. Both legacy calculator entry points now use the same implementation. Removed the consultation placeholder and plan-page redirects.
- Dedicated Iran menu leaves retain their datacenter and omit the redundant selector. The calculator stays Iran-only with its own datacenter selector. Shortened Asiatech/Afranet labels and renamed the model section to Model. Added separate DL360 Gen8–Gen12 references alongside DL380, with 8-SFF/4-LFF chassis options, per-model GPU count and validation rejecting DL380's 12-LFF cage. Actual SKU/controller/cooling checks remain required. Manufacturer references are stored with profiles.
- Invoice rows use fixed amount columns; currency labels wrap independently from atomic, tabular monetary digits. Removed the four requested finance-overview shortcut buttons. General affiliate terms now cover enrollment, attribution, commission calculation, wallet credit, payout, marketing, abuse, privacy, rewards, disputes and contract changes, including an account-specific contract section. Actual approved rates and eligibility still come from the operator.
- Sidebar expansion now keeps one ancestry open at a time. Hosting labels are Starter / Standard / Business / Enterprise (Persian: پایه / استاندارد / تجاری / سازمانی); internal IDs remain unchanged. VPS names describe resource tiers without a repeated Novin prefix.
- Added a persisted browser display preference for Toman / USD in the header and Appearance settings. The shared formatter updates service cards, resource estimates, wallet summaries and cart displays. USD is marked approximate; source/receipt timestamps must be fresh, nonpositive or stale FX is rejected, and missing rates show no invented conversion. Sub-cent hourly charges retain significant digits instead of appearing free. Source exchange-rate boards, invoice documents/PDFs, exports and checkout accounting retain their explicitly stated Toman units. No stored price, wallet entry or payment payload is converted.
- Replaced the rejected login appearance with a light/dark split layout, original supplied logo, clearer form hierarchy, compact mode controls and a lightweight vector server illustration. Mobile prioritizes the form; authentication/MFA/recovery behavior is preserved and no artificial transition delay is added.

Browser checks: custom Germany order with 3 vCPU, 3.5 GB RAM and four sites reconciled to 198,600 Toman plus 10% VAT; custom Iran order with 3 vCPU and 3.5 GB RAM remained exactly 129,360 Toman in cart after USD/Toman switching (142,296 with VAT). Actual public reference FX responses were observed, not a verified checkout exchange quote. Display preference survived reload. Login checked at 1280px and 390px with no horizontal overflow, immediate mode switching and English system copy. Earlier in this follow-up the revised long invoice exported as six A4 pages, with no leftover export hosts. All 57 automated checks cover the new accordion, per-resource totals, DL360 constraints, FX freshness and small USD values in addition to existing billing/security/report checks.

Primary hardware references: [DL360 Gen8](https://www.hpe.com/psnow/doc/c04123167), [Gen9](https://support.hpe.com/hpesc/public/api/document/c04441974), [Gen10](https://support.hpe.com/hpesc/public/docDisplay?docId=a00018801en_us), [Gen11](https://www.hpe.com/us/en/collaterals/collateral.a50004306enw.html), [Gen12](https://www.hpe.com/psnow/doc/a50006984enw). Public Hostiran navigation was consulted for category conventions; no private checkout or exact custom-hosting workflow was accessible.

Latest October 23 locked production build before the auth/header follow-up: Vite 5.4.10 succeeded; initial application chunk 607.15 kB raw / 204.67 kB gzip, lazy panel 70.58 kB / 23.05 kB gzip, auth 13.44 kB / 5.52 kB gzip. The initial-size warning remains. No live deployment, verified inventory, production speed benchmark or real settlement is implied.

## October 23 CAPTCHA, activation and header menus

- Refined the responsive bilingual login/signup form while keeping its outer shell, heading and welcome illustration fixed when switching modes. Original supplied branding remains in place. The later layout correction below removes the initial internal form scrolling.
- Added explicit Turnstile widgets to login/signup, activation resend and password-reset email requests, including the security settings reset action. Tokens are passed to native Supabase Auth, cleared after attempts and never persisted. The labeled local development test widget is unavailable as a production fallback.
- Added `/activate-account` with email/code entry, Persian/Arabic digit normalization, resend countdown across reload and native email OTP verification. Signup stores only pending email/destination/timestamps. A confirmed matching Auth session is required, then the existing account security/MFA challenge runs before panel access. An Auth project with confirmations disabled is reported as misconfigured rather than pretending to send a code.
- Replaced direct header navigation with standard bell/account menus: recent notification list, unread badge, shared individual/read-all status, notification detail and full-center link; avatar/name/email, available wallet balance and working sign-out. The later correction removes redundant account shortcuts. Menus close on navigation, Escape or outside interaction and respect Persian RTL/English LTR.

Browser verification covered fixed login/signup geometry, desktop and 390/320-pixel layouts without horizontal overflow, localized code entry, notification read-state propagation, preserved underlying page, detail/full-center navigation, account shortcuts, mobile menu bounds and Escape dismissal. An isolated localhost Auth fixture additionally verified CAPTCHA forwarding, rejection of an expired code, successful activation redirect and the preserved security gate. It created no real account and sent no email. Actual CAPTCHA enforcement and email delivery still require hosted Turnstile, Supabase Auth/email-template and SMTP configuration described in the deployment guide.

Final release verification: frontend and edge TypeScript checks, all 65 automated tests and Vite 5.4.10 production build passed with the locked release dependencies. Initial application chunk: 607.56 kB raw / 204.82 kB gzip; lazy panel: 104.15 kB / 32.23 kB gzip; auth: 19.51 kB / 7.86 kB gzip. Initial chunk size and outdated Browserslist warnings remain. No production performance benchmark or real email/CAPTCHA enforcement test is claimed.

## October 23 layout and service-filter correction

Removed both internal login/signup scroll regions and the fixed card height. Compact spacing and an intrinsic form layout keep all controls inside the card; the welcome artwork no longer determines its minimum height. Login and registration retain identical shell geometry in both languages at 1280×800, 390×844 and 320×760. At the first two sizes the page also fits without vertical scrolling; narrow/short screens use normal document scrolling without clipping fields or trapping scrolling inside the form. CAPTCHA, activation, recovery and MFA behavior remain intact.

Removed overview, account settings, security and support shortcuts from the header account menu as requested. Identity, available wallet balance/navigation and sign-out remain. Sidebar account settings remain accessible.

Dashboard and management now use one shared service-filter component with identical order, labels and button styling. The Cloud filter is replaced by Daily / روزانه after Hourly and before Multi-location. Daily matches the actual `billingCycle:Daily`, including VPS records; monthly cloud contracts retain their prices/periods and remain accessible under All. Empty filters have a localized empty state. No real account, service contract, price or billing period was changed.

Verification: all 66 automated tests, frontend/edge type checks and the locked Vite 5.4.10 build passed. Browser checks confirmed the twelve language/viewport/mode combinations above, identical filter order in both languages, the two remaining account actions, wallet navigation, mobile bounds and the activation resend layout. Latest chunks: initial 607.55 kB raw / 204.82 kB gzip, lazy panel 103.99 / 32.16 kB gzip, auth 19.61 / 7.82 kB gzip. Existing build-size and Browserslist warnings remain; production integration and deployment limits are unchanged.


## October 26 public website, mobile PWA and guided tickets

Rebuilt public product, plan/configuration, location, domain, knowledge, download, company and contact pages around the shared catalog: all 85 panel ordering/add-on options across seven service families remain discoverable. Custom public hosting uses the shared resource calculator with Iran/international datacenters, localized decimal editing, monthly/yearly estimates and usage hours. Added a graphical navy server hero, illustrated workload cards, mobile quick navigation, department contact cards, installation help and consistent in-site Back controls with safe direct-link fallbacks. Existing logo retained. Catalog prices/hardware/location references remain explicitly unverified proposals.

Added install manifest, brand app icons and a narrowly scoped worker with a static offline connection page. Account/auth/API/payment/rate traffic is not cached or queued offline. Browser checks confirmed a valid manifest, controlled public page, exact two-file cache, public offline help with working icon, blocked private offline navigation, and mobile dock/chat separation. Chromium reported only the expected in-incognito installation restriction; physical phone/OS installation is not claimed. See public-site-review.md for HTTPS/static-hosting requirements.

The explicitly requested panel exception is guided ticket creation: owned service/domain or general request, matching department/team label, applicable problem choices, suggested help and an unlisted-problem path. Users can continue to the form when help is insufficient. Server-side ownership lookup derives identity, ignores forged names/kinds and validates issue routing. Context persists in the additive ticket_context migration and appears in ticket details/list. Old account-only requests remain compatible.

Validation: 73 automated tests passed, frontend and edge TypeScript checks passed, and all six migrations passed the local PostgreSQL-compatible smoke checks including legacy ticket defaults and the context constraint. Browser QA passed 108 public route/language/viewport checks (27 routes, Persian/English, desktop/mobile), and guided-ticket creation, other/general requests and draft retention at 320/390/768/1440px. A strictly mocked localhost Auth/CAPTCHA/account flow verified the custom-hosting handoff: 169,860 Toman monthly, 2,038,320 yearly, and 186,846 including 10% VAT in the cart. No real account, ticket, payment, email or service was created.

Of the 105 protected panel/auth/backend baseline files, 100 remain byte-identical. Five authorized support changes are CreateTicketForm, TicketsPage, TicketDetail, PanelDataContext and panel-action; ticket model/initial navigation, a shared routing module and an additive migration complete that feature. Auth, financial views, catalog contracts and device operations were preserved. Production Vite 5.4.10 build succeeded; initial JS entry is approximately 435 kB raw / 142 kB gzip after lazy-loading the chatbot, compared with about 607 / 206 before that split. No production Lighthouse result is claimed; the existing Browserslist data warning remains.

Apply the new migration and deploy the updated function before the frontend. Real owned inventory/support queue mapping, supplier availability/prices and device/IP evidence, hosted Auth/SMTP/CAPTCHA and real account staging checks remain required. This review delivers source and a draft PR, not a production deployment.


## October 26 catalog refinement and shared equipment account

Replaced bulk service/location lists with a guided type → region → country → plan path. Regions are Iran, Europe, Americas, Asia and Oceania, showing only catalog-supported countries. Native SVG flags render independently of platform emoji support. Hosting and dedicated choices preserve exact country/datacenter profiles; VPS configuration receives an optional country filter whose default leaves panel ordering behavior unchanged. Changing a pending location hides the previous configuration until confirmed. Public labels use the shorter Persian “خارج”. IP remains a service add-on. Network services now describe six remote work scopes, and virtual server products remain in VPS.

Added scoped light/dark public styling using the existing theme preference, richer product headers and a graphical equipment storefront with original device illustrations, filters/search, comparison, product details and a sample cart. Public typography uses a locally served, versioned Vazirmatn font with its SIL OFL license. Store equipment names/prices remain illustrative profiles, with no verified inventory or payable sample prices.

After reviewing the alternatives, the user selected one identity with two separate panels. Implemented `/shop/account` with shared Supabase sign-in and the existing MFA challenge, plus a workspace switcher in both account headers. Store orders/enquiries, delivery addresses and verified-product bookmarks use their own tables; identity, profile, wallet and security remain shared. Equipment enquiries start awaiting a quote with null price; there is no customer endpoint for marking paid, shipment, or debiting wallet funds. `/network-store?view=account-preview` is a labeled, isolated in-memory blueprint, while `/shop/account` always requires the actual session/MFA gate. See shop-account-architecture.md for the selected model and integration boundaries.

Ticket creation now chooses a resource category before an owned service. Technical departments persist service-specific team IDs (VPS, dedicated, hosting, domains, licensing, network and managed support); finance/sales/security remain distinct. The shared server validator rejects a team inconsistent with the owned resource. Operators still need to map these IDs to their real support queues.

Deploy the new shop account migration/function and updated shared support module before the frontend. Actual hardware SKUs, supplier stock/prices, warranty/return policies, delivery/carrier charges, final invoices, gateway callbacks and shared-wallet equipment settlement remain required. Hosted integration, real multi-account MFA/ownership, real purchases and physical device operations have not been performed.


Final validation for the catalog/store follow-up: 81 automated tests and frontend/edge type checks pass. All seven migrations pass local PostgreSQL-compatible smoke checks. A 240-case public browser sweep covers 20 routes, Persian/English, light/dark and 320/390/1440px without runtime errors or page overflow (wide domain-price tables retain their own scroll regions). Eight preview tickets cover category isolation and service-specific teams. Store filters/comparison/quantity/sample VAT, pending-location form hiding and VPS country restriction pass interactive checks. Shop preview address create/edit/delete, quote enquiry/cancellation, account-space switching and 320/390/768/1440px layouts pass in both languages. A strictly mocked localhost Auth flow verifies MFA gating before store data loading, one login across both panels and shared sign-out; no real account, email, payment or purchase was created.

The original 105-file preservation baseline now has 97 unchanged files. The eight expected exceptions are ticket creation/list/detail/context/backend, the service header workspace switcher, optional VPS country filtering and registration of the guarded shop function. Existing Auth, UserPanel guard, theme, finance and invoice sources remain unchanged. Sidebar label shortening preserves all service IDs and prices. The production build remains below the 500 kB initial-entry warning threshold, at approximately 446 kB raw / 146 kB gzip; the existing Browserslist data warning remains. No production Lighthouse or physical mobile installation result is claimed.

## October 26 public landing and location correction

Replaced the main homepage with an original lavender/mint design, layered infrastructure artwork, pointer parallax, floating details, scroll reveals, service mosaics, keyboard plan tabs and an illustrated region/country explorer. The original logo, seven shared catalog families, public department contacts, mobile dock, themes and currency remain. Motion respects reduced-motion preferences; keyboard focus reveals content without requiring scrolling.

Fixed country identity throughout public navigation: each homepage country opens its own query-scoped location page. The hero, document title, flag, datacenter list and hosting/dedicated handoff all follow that country. Changing the grouped country selector updates them together; invalid countries fall back to the overview. Public order headings reflect the selected country without duplicate labels. Hardware, datacenters, prices and capacity remain catalog references requiring confirmation; the visual illustration makes no live availability claim.

All panel, shop-account, auth, finance and backend files remain identical to the preceding delivered tree. Validation for this follow-up: 84 automated tests; frontend/edge type checks; production build; 160 browser combinations across ten public routes, both languages/themes and four widths; all ten country journeys in both languages; pointer parallax/reset, section reveal, keyboard tabs and reduced motion. No runtime errors or page overflow were observed. Real integration and production deployment dependencies remain as documented above.
