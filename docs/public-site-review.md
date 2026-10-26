# Public website and guided support review

The public website now derives its offerings from the panel menu and shared catalogs. Seven families expose every panel order leaf and service add-on. VPS, dedicated and hosting pages retain their exact profile/location identity; custom hosting has independent resource inputs, itemized calculator rates, usage hours and a protected cart handoff. Prices remain proposals before tax, not supplier quotes. Reference hardware/location cards do not imply verified inventory.

## October 26 experience changes

- Graphic navy hero with original code-native server illustration, illustrated workload cards, responsive navigation, touch-friendly inputs and a mobile quick-navigation bar. The original supplied logo remains in use. Reduced motion is respected. Chat controls sit above the mobile dock.
- Consistent Back control and breadcrumb on public inner pages. Back uses the in-app history where present; directly opened pages have a safe catalog/home fallback.
- Four department cards lead through authentication to the new-ticket flow with the selected department. No invented phone number, private address, response SLA or staffing claim is displayed.
- New-ticket wizard selects an owned service/domain or a general request, a relevant department, then an issue-specific troubleshooting guide. Users can report an unlisted issue or proceed if help is insufficient. Draft text survives step navigation. Technical labels distinguish servers, hosting, domains, networks and licenses. Structured service/issue context appears on the resulting ticket and list.
- Server-side ticket creation resolves resource identity from the authenticated owner's panel_inventory; browser-supplied names/kinds are ignored. The shared routing validator rejects unrelated issue/department combinations. Existing account-only tickets remain valid.

## PWA

The web manifest supplies standalone launch, original-brand PNG icons including a maskable icon, theme color and shortcuts. The install entry uses the browser's install prompt when available, otherwise gives Safari/Chrome/Edge instructions. It does not claim installation succeeded without browser confirmation.

Production registers /sw.js; development opts in only with ?pwa=1 for review. The worker caches only the static public offline help page and its icon. Public navigation is network-first with that offline fallback. Account/auth/recovery routes, API/third-party requests, payment operations, rates and submitted forms are never intercepted or cached. No account action is queued offline. This is an installable web app with offline connection guidance, not an offline billing or service console. Installed UI updates arrive from the network; future offline-page revisions must bump the worker cache version.

## Delivery dependencies

Apply 20261026120000_ticket_context.sql after the existing migrations, and deploy the updated panel-action function with its shared support-routing module before the frontend. This additive migration keeps existing ticket records and grants unchanged. Real account inventory is required for the service chooser. The provider must populate the authenticated inventory, and operations staff must connect these department/context fields to their actual support queues. No private competitor ticket wizard was accessed or copied.

PWA production needs HTTPS (localhost is suitable for development), serving the manifest/service worker/offline page as static files rather than the SPA fallback. Physical iOS/Android installation and push delivery are not claimed. Push notifications were not requested or added. SMTP/CAPTCHA/MFA, supplier stock/prices, payment and registrar adapters, official invoice details, actual device compatibility/IPs and real two-account staging checks remain deployment dependencies.

## Research

Public category and support patterns informed an original design: [ParsVDS](https://parsvds.com/), [AzarOnline](https://azaronline.com/), [ArvanCloud](https://www.arvancloud.ir/en), [Hetzner](https://www.hetzner.com/) and [DigitalOcean](https://www.digitalocean.com/). No competitor copy, branding or prices were imported. Technical PWA behavior follows [MDN install prompts](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Trigger_install_prompt), [MDN caching](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Caching) and [web.dev caching](https://web.dev/learn/pwa/caching).

Validation results and preservation exceptions are recorded in completion-review.md. Local fixtures create no real account, ticket, payment, email or device operation.

## Public landing redesign and country identity

Replaced the homepage with an asymmetric lavender/mint composition, a code-native layered infrastructure illustration, pointer parallax, floating components, varied service tiles, domain search, keyboard-accessible plan tabs and an illustrated region/country explorer. The original supplied brand remains. Entry reveals use IntersectionObserver and animation uses transforms/opacity; reduced-motion preferences disable decorative movement and keep all content visible. Public departments, mobile navigation, themes, currency and shared catalog offerings remain available.

Country links now use canonical `/datacenter?country=xx` URLs. A selected-country page derives its hero, metadata, flag, datacenters and hosting/dedicated order URLs from that query, including when users change country without leaving the page. Other countries move into an explicit grouped selector and an all-locations return link; they are no longer mixed into the selected country's datacenter list. Invalid country values return to the location overview. Selected-country public order titles also update without repeating the country name.

These location and datacenter records remain reference catalog information. The illustration is conceptual, not a live monitoring or availability display. Panel, shop account, auth, financial and backend files are unchanged by this follow-up.

Validation: 84 automated tests; 160 browser route/language/theme/viewport checks across 320/390/768/1440px; all ten country journeys in both languages; country switching, order handoff, keyboard tabs, parallax/reset, section reveal and reduced-motion behavior. Browser checks found no runtime errors or page overflow. No real account, order, payment, infrastructure verification or production deployment occurred.
