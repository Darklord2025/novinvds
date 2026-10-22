import test from "node:test";
import assert from "node:assert/strict";
import { crc32 } from "node:zlib";
import { csvText } from "../src/lib/report-export.ts";
import { zipFiles } from "../src/lib/zip-store.ts";
import { bannerSizes, marketingBanner } from "../src/lib/marketing-banners.ts";
import {
  canonicalDomain,
  validDomain,
  emptySnapshot,
  accountWallet,
  withVat,
  renewalAmount,
  convertedToman,
  usageGroups,
} from "../src/lib/panel-model.ts";
import {
  normalizeDigits,
  localizedDigits,
} from "../src/lib/localized-number.ts";
import { cartInvoice } from "../src/lib/cart-invoice.ts";
import { invoiceTotals } from "../src/lib/billing.ts";
import { sessionPhase, SESSION_GRACE } from "../src/hooks/usePanelSession.ts";
import { createNavigationHandlers } from "../src/services/panelNavigationService.tsx";
import { addonsFor } from "../src/data/serviceAddons.ts";

test("Persian and Arabic-Indic input roundtrips to canonical numbers", () => {
  assert.equal(normalizeDigits("۱۲۳٬۴۵۶٫۷"), "123,456.7");
  assert.equal(normalizeDigits("١٢٣٤"), "1234");
  assert.equal(localizedDigits("INV-123", true), "INV-۱۲۳");
  assert.equal(localizedDigits("INV-۱۲۳", false), "INV-123");
});
test("domain input rejects URLs, ports, credentials, IP addresses and invalid labels", () => {
  for (const value of [
    "https://example.com",
    "example.com:443",
    "user@example.com",
    "example.com/path",
    "example.com?x=1",
    "127.0.0.1",
    "-bad.com",
    "a..com",
    "a_b.com",
    "a.com\\evil",
    "bad domain.com",
  ])
    assert.equal(validDomain(value), false, value);
  assert.equal(canonicalDomain(" EXAMPLE.COM "), "example.com");
  assert.equal(canonicalDomain("مثال.ایران"), "xn--mgbh0fb.xn--mgba3a4f16a");
});
test("wallet excludes unconfirmed deposits and reserves pending withdrawals", () => {
  const data = emptySnapshot();
  assert.deepEqual(data.services, []);
  data.ledger = [
    {
      id: "a",
      at: "2026-10-19",
      category: "deposit",
      description: "",
      amountToman: 100000,
      status: "confirmed",
    },
    {
      id: "b",
      at: "2026-10-19",
      category: "deposit",
      description: "",
      amountToman: 900000,
      status: "pending",
    },
    {
      id: "c",
      at: "2026-10-19",
      category: "hosting",
      description: "",
      amountToman: -20000,
      status: "confirmed",
    },
  ];
  data.requests = [
    {
      id: "r",
      kind: "withdraw",
      status: "pending",
      createdAt: "",
      amountToman: 30000,
    },
  ];
  assert.equal(accountWallet(data).balance, 50000);
  assert.equal(accountWallet(data).pending, 2);
  assert.deepEqual(usageGroups(data.ledger), [
    { name: "hosting", value: 20000 },
  ]);
});
test("VAT, renewal and conversion do not silently invent unsupported terms or quotes", () => {
  assert.deepEqual(withVat(250000), {
    subtotal: 250000,
    tax: 25000,
    total: 275000,
  });
  assert.equal(renewalAmount(900000, "Quarterly", 1).total, 330000);
  assert.equal(renewalAmount(1200000, "Annually", 3).total, 330000);
  assert.throws(() => renewalAmount(1, "Hourly", 1));
  assert.throws(() => convertedToman(1, NaN));
  assert.equal(convertedToman(1.5, 60000), 90000);
});
test("cart discount follows quantity changes, respects cap and taxes discounted subtotal", () => {
  const items = [
    {
      id: "plan",
      type: "vps",
      name: "Plan",
      price: 2000000,
      quantity: 1,
      period: "Monthly",
    },
  ];
  const invoice = cartInvoice(items, "2026-10-19", {
    percent: 7,
    capToman: 100000,
  });
  assert.equal(invoice.discount, 100000);
  assert.equal(invoice.tax, 190000);
  assert.equal(invoiceTotals(invoice).total, 2090000);
  const small = cartInvoice(
    [{ ...items[0], price: 100000, quantity: 2 }],
    "2026-10-19",
    { percent: 3, capToman: 100000 },
  );
  assert.equal(invoiceTotals(small).total, 213400);
});
test("all offered service types renew and resolve their real account IDs", () => {
  for (const kind of [
    "vps",
    "dedicated",
    "hosting",
    "hourly",
    "cloud",
    "multilocation",
    "license",
    "ssl",
    "network",
    "addon",
    "support",
    "domain",
  ]) {
    let tab, id;
    const nav = createNavigationHandlers(
      (v) => (tab = v),
      (v) => (id = v),
      () => {},
      () => {},
      () => {},
      () => {},
      () => kind,
    );
    nav.handleRenewService(kind, "real-id");
    assert.equal(tab, "service-renewal");
    assert.equal(id, "real-id");
    nav.handleManageService("real-id");
    assert.equal(tab, kind + "-management");
  }
});
test("session countdown reaches prompt then expiry even after an inactive-tab time jump", () => {
  const deadline = 100000;
  assert.equal(sessionPhase(deadline, deadline - 1), "active");
  assert.equal(sessionPhase(deadline, deadline), "prompt");
  assert.equal(sessionPhase(deadline, deadline + SESSION_GRACE - 1), "prompt");
  assert.equal(sessionPhase(deadline, deadline + SESSION_GRACE), "expired");
  assert.equal(sessionPhase(deadline, deadline + 999999), "expired");
});
test("CSV reports preserve Unicode, quotes and protect spreadsheet formulas", () => {
  const csv = csvText(
    ["شرح", "Amount"],
    [
      ['a,"b"', 100],
      ['=HYPERLINK("evil")', 1],
      ["+SUM(1)", 2],
      ["@x", 3],
    ],
  );
  assert.ok(csv.startsWith("\uFEFF"));
  assert.ok(csv.includes('"a,""b"""'));
  assert.ok(csv.includes("\"'=HYPERLINK"));
  assert.ok(csv.includes("\"'+SUM"));
  assert.ok(csv.includes("\r\n"));
});
test("ZIP output is readable stored data with correct CRC, UTF-8 names and central directory", () => {
  const files = [
      { name: "بنر.svg", text: "<svg>نمونه</svg>" },
      { name: "a.txt", text: "hello" },
    ],
    bytes = zipFiles(files),
    b = Buffer.from(bytes);
  let offset = 0;
  for (const file of files) {
    assert.equal(b.readUInt32LE(offset), 0x04034b50);
    const n = b.readUInt16LE(offset + 26),
      len = b.readUInt32LE(offset + 18),
      data = b.subarray(offset + 30 + n, offset + 30 + n + len);
    assert.equal(
      b.subarray(offset + 30, offset + 30 + n).toString(),
      file.name,
    );
    assert.equal(data.toString(), file.text);
    assert.equal(b.readUInt32LE(offset + 14), crc32(data));
    offset += 30 + n + len;
  }
  assert.equal(b.readUInt32LE(offset), 0x02014b50);
  assert.equal(b.readUInt32LE(b.length - 22), 0x06054b50);
  assert.equal(b.readUInt16LE(b.length - 12), files.length);
});
test("576 banner variants cover all sizes, locales, campaigns, themes and motion preferences", () => {
  let count = 0;
  for (const size of bannerSizes)
    for (const campaign of ["cloud", "dedicated", "domain"])
      for (const fa of [true, false])
        for (const variant of ["blue", "dark", "light"])
          for (const animated of [true, false]) {
            const svg = marketingBanner({
              size,
              campaign,
              fa,
              variant,
              animated,
              logoData: "data:image/png;base64,AA==",
            });
            const [w, h] = size.split("x");
            assert.ok(svg.includes('width="' + w + '" height="' + h + '"'));
            assert.ok(svg.includes("data:image/png;base64,AA=="));
            assert.ok(!svg.includes("NaN"));
            assert.ok(!svg.includes("<script"));
            if (animated) assert.ok(svg.includes("prefers-reduced-motion"));
            count++;
          }
  assert.equal(count, 576);
});
test("service-specific add-ons exclude incompatible modules", () => {
  assert.ok(addonsFor("dedicated").some((v) => v.id === "cp"));
  assert.ok(!addonsFor("hourly").some((v) => v.id === "extra-ip"));
  assert.ok(addonsFor("hosting").some((v) => v.id === "malware"));
  assert.deepEqual(addonsFor("ssl"), []);
});

import {
  hostingPlans,
  hostingRates,
  hostingTrial,
  hostingEstimate,
  validHostingResources,
} from "../src/data/hostingCatalog.ts";
import {
  dedicatedModels,
  newDedicatedConfig,
  dedicatedErrors,
  dedicatedEstimate,
  driveCapacities,
  driveUnitPrice,
} from "../src/data/dedicatedCatalog.ts";
import { osCatalog, validOs, panelsFor } from "../src/data/operatingSystems.ts";
import { toggleAddon } from "../src/data/serviceAddons.ts";
test("hosting has original names, both location rates and bounded custom resources", () => {
  assert.equal(
    new Set(hostingPlans.map((p) => p.id)).size,
    hostingPlans.length,
  );
  for (const p of hostingPlans) {
    assert.ok(!/\b(ECO|PRO|VIP)\b/i.test(p.fa + p.en));
    assert.notEqual(p.ir, p.eu);
    assert.ok(validHostingResources(p));
  }
  assert.ok(validHostingResources(hostingTrial));
  assert.equal(validHostingResources({ ...hostingTrial, cpu: NaN }), false);
  assert.equal(validHostingResources({ ...hostingTrial, ramGB: 3 }), false);
  assert.equal(validHostingResources({ ...hostingTrial, diskGB: 201 }), false);
});
test("usage estimate separates allocation time, retained storage and transfer", () => {
  const r = { cpu: 2, ramGB: 2, diskGB: 5, trafficGB: 10, sites: 1 },
    rate = hostingRates.ir;
  assert.equal(
    hostingEstimate(r, "ir", 10),
    (2 * rate.cpuHour + 2 * rate.ramGBHour) * 10 +
      5 * rate.diskGBMonth +
      10 * rate.trafficGB,
  );
  assert.ok(hostingEstimate(r, "eu", 10) > hostingEstimate(r, "ir", 10));
  assert.ok(hostingEstimate(r, "ir", 0) > 0);
  assert.throws(() => hostingEstimate(r, "ir", -1));
});
test("all dedicated model defaults validate and CPU choices remain generation scoped", () => {
  for (const m of dedicatedModels) {
    const c = newDedicatedConfig(m.id);
    assert.deepEqual(dedicatedErrors(c), []);
    assert.ok(dedicatedEstimate(c) > 0);
    assert.ok(dedicatedErrors({ ...c, cpuCount: 3 }).includes("cpu"));
    assert.ok(
      dedicatedErrors({ ...c, cpu: "Intel Xeon incompatible" }).includes("cpu"),
    );
  }
  const g8 = dedicatedModels.find((m) => m.generation === 8),
    g12 = dedicatedModels.find((m) => m.generation === 12);
  assert.ok(!g8.profile.cpuModels.some((v) => v.includes("6505P")));
  assert.ok(g12.profile.cpuModels.some((v) => v.includes("6747P")));
});
test("DIMM slots follow CPU quantity; chassis and drive types cap physical quantities", () => {
  const c = newDedicatedConfig();
  assert.ok(dedicatedErrors({ ...c, ramCount: 13 }).includes("ram"));
  assert.deepEqual(dedicatedErrors({ ...c, cpuCount: 2, ramCount: 13 }), []);
  assert.ok(
    dedicatedErrors({
      ...c,
      drives: [{ type: "SATA SSD", capacityGB: 480, count: 9 }],
    }).includes("drives"),
  );
  assert.deepEqual(driveCapacities("SATA HDD", "SFF8"), []);
  assert.ok(
    dedicatedErrors({
      ...c,
      drives: [{ type: "NVMe SSD", capacityGB: 960, count: 1 }],
    }).includes("drives"),
  );
});
test("hardware totals multiply per-unit prices and RAID enforces matching drives", () => {
  const c = newDedicatedConfig();
  const p = dedicatedEstimate(c);
  const two = { ...c, drives: [{ ...c.drives[0], count: 2 }] };
  assert.equal(dedicatedEstimate(two) - p, driveUnitPrice(c.drives[0]));
  assert.ok(dedicatedErrors({ ...c, raid: "RAID1" }).includes("raid"));
  assert.deepEqual(dedicatedErrors({ ...two, raid: "RAID1" }), []);
  assert.ok(dedicatedErrors({ ...two, raid: "RAID10" }).includes("raid"));
});
test("OS family, release and edition are validated together; Windows Server is one product", () => {
  assert.equal(osCatalog.filter((p) => p.id === "windows-server").length, 1);
  assert.ok(
    validOs({
      family: "windows",
      product: "windows-server",
      version: "2025",
      edition: "Datacenter",
    }),
  );
  assert.ok(
    !validOs({
      family: "linux",
      product: "windows-server",
      version: "2025",
      edition: "Datacenter",
    }),
  );
  assert.ok(
    !validOs({
      family: "windows",
      product: "windows-server",
      version: "2025",
      edition: "",
    }),
  );
  assert.ok(
    !validOs({
      family: "windows",
      product: "windows-client",
      version: "10 LTSC 2021",
      edition: "Pro",
    }),
  );
  assert.ok(
    osCatalog.find((p) => p.id === "ubuntu").versions.includes("26.04 LTS"),
  );
});
test("control panel compatibility filters Windows and newer Linux; only one panel can be selected", () => {
  const windows = panelsFor({
    family: "windows",
    product: "windows-server",
    version: "2025",
    edition: "Standard",
  });
  assert.deepEqual(
    windows.map((p) => p.id),
    ["plesk"],
  );
  const ubuntu = panelsFor({
    family: "linux",
    product: "ubuntu",
    version: "26.04 LTS",
    edition: "",
  });
  assert.ok(ubuntu.some((p) => p.id === "hestia"));
  assert.ok(ubuntu.some((p) => p.id === "cloudpanel"));
  assert.ok(!ubuntu.some((p) => p.id === "cyberpanel"));
  assert.deepEqual(toggleAddon(["cp", "backup-50"], "aapanel"), [
    "backup-50",
    "aapanel",
  ]);
});
import { panelDate, panelDateInput } from "../src/lib/panel-date.ts";
import { controlPanels } from "../src/data/operatingSystems.ts";
test("Jalali report dates roundtrip, reject invalid leap days and retain Gregorian English", () => {
  assert.equal(panelDateInput("۱۴۰۵/۰۱/۰۱", true), "2026-03-21");
  assert.equal(panelDateInput("۱۴۰۳/۱۲/۳۰", true), "2025-03-20");
  assert.equal(panelDateInput("۱۴۰۴/۱۲/۳۰", true), null);
  assert.equal(panelDateInput("1405/07/31", true), null);
  assert.equal(panelDateInput("2026-02-30", false), null);
  assert.equal(panelDateInput("2026-10-21", false), "2026-10-21");
  assert.match(panelDate("2026-10-21", true), /۱۴۰۵/);
  assert.match(panelDate("2026-10-21", false), /2026/);
});
test("aaPanel Community setup and Pro are separate paid proposals", () => {
  const community = controlPanels.find((p) => p.id === "aapanel"),
    pro = controlPanels.find((p) => p.id === "aapanel-pro");
  assert.equal(community.period, "once");
  assert.ok(community.price > 0);
  assert.equal(community.license, "free");
  assert.ok(pro.price > 0);
  assert.equal(pro.license, "commercial");
  assert.ok(!community.name.includes("Free"));
});

test("finance overview, transactions and wallet keep distinct navigation destinations", () => {
  let tab;
  const noop = () => {};
  const nav = createNavigationHandlers(
    (v) => (tab = v),
    noop,
    noop,
    noop,
    noop,
    noop,
  );
  nav.navigateToServiceOrderPage("/billing");
  assert.equal(tab, "financial-overview");
  nav.navigateToServiceOrderPage("/transactions");
  assert.equal(tab, "transactions");
  nav.navigateToServiceOrderPage("/wallet");
  assert.equal(tab, "wallet");
  nav.navigateToServiceOrderPage("/order/domain");
  assert.equal(tab, "order-domain");
  nav.navigateToServiceOrderPage("/order/support");
  assert.equal(tab, "order-support");
});
import {proratedHostingUpgrade} from '../supabase/functions/_shared/hosting-upgrade.ts';
import {countries,datacenters,validDatacenter,countryFromCategory} from '../src/data/datacenters.ts';
import {sidebarItems} from '../src/data/sidebarItems.ts';
test('hosting upgrade charges only the remaining fraction before VAT and rejects invalid periods',()=>{
 const start='2026-10-01T00:00:00Z',end='2026-11-01T00:00:00Z',half=Date.parse(start)+(Date.parse(end)-Date.parse(start))/2;
 const q=proratedHostingUpgrade(89000,189000,start,end,half);assert.equal(q.subtotal,50000);assert.equal(q.tax,5000);assert.equal(q.total,55000);assert.equal(q.fraction,.5);
 assert.equal(proratedHostingUpgrade(89000,189000,start,end,Date.parse(start)).subtotal,100000);
 assert.throws(()=>proratedHostingUpgrade(189000,89000,start,end,half));assert.throws(()=>proratedHostingUpgrade(89000,189000,start,end,Date.parse(end)));assert.throws(()=>proratedHostingUpgrade(89000,189000,start,end,Date.parse(start)-1));assert.throws(()=>proratedHostingUpgrade(89000,189000,'1405/07/01',end,half));
});
test('country-specific datacenters cannot be mixed and every country has a reference location',()=>{
 assert.equal(countryFromCategory('order-dedicated-dc-ir-asiatech'),'ir');assert.equal(countryFromCategory('order-dedicated-dc-ir-afranet'),'ir');assert.equal(countryFromCategory('order-dedicated-asia'),'sg');
 assert.ok(validDatacenter('fr','fr-gra'));assert.ok(!validDatacenter('de','fr-gra'));assert.equal(countryFromCategory('order-dedicated-country-ca'),'ca');assert.equal(countryFromCategory('order-hosting-country-sg'),'sg');
 for(const c of countries)assert.ok(datacenters.some(dc=>dc.country===c.id));assert.ok(datacenters.every(dc=>dc.inventoryVerified===false));
});
test('sidebar country branches have unique IDs and fully English labels',()=>{
 const all=[];function visit(items){for(const item of items){all.push(item);if(item.submenu)visit(item.submenu);}}visit(sidebarItems);assert.equal(new Set(all.map(i=>i.id)).size,all.length);assert.ok(all.every(i=>i.en&&!/[\u0600-\u06ff]/.test(i.en)));assert.ok(all.find(i=>i.id==='dedicated-international-group').submenu.find(i=>i.id==='dedicated-region-eu').submenu.some(i=>i.id==='order-dedicated-country-fr'));
});
