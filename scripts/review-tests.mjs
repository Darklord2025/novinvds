import { PanelDataProvider } from "../src/contexts/PanelDataContext.tsx";
import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  invoiceTotals,
  inToman,
  canPayInvoice,
  localize,
  formatMoney,
  statusLabels,
} from "../src/lib/billing.ts";
import {
  hardwareProfiles,
  emptyHardwareSelection,
  changeHardwareProfile,
  validHardwareSelection,
  hasDeviceEvidence,
  inventoryFields,
} from "../src/data/hardwareProfiles.ts";
import { invoicePageRanges } from "../src/lib/invoice-pagination.ts";
import { cartInvoice } from "../src/lib/cart-invoice.ts";
import { getServiceById } from "../src/data/userServices.ts";
import { managementTab, serviceIPs } from "../src/lib/serviceIdentity.ts";
import { createNavigationHandlers } from "../src/services/panelNavigationService.tsx";
import { InvoiceDocument } from "../src/components/user-panel/InvoiceDocument.tsx";
import ServiceDeliveryInfo from "../src/components/user-panel/ServiceDeliveryInfo.tsx";
import ServerManagementDetail from "../src/components/user-panel/ServerManagementDetail.tsx";
import DedicatedHardwareReview from "../src/components/user-panel/DedicatedHardwareReview.tsx";
import PaymentOptions from "../src/components/user-panel/PaymentOptions.tsx";
import ProformaInvoicePage from "../src/components/user-panel/ProformaInvoicePage.tsx";
import DomainManagement from "../src/components/user-panel/DomainManagement.tsx";
import { LanguageProvider } from "../src/contexts/LanguageContext.tsx";
import { CartProvider } from "../src/contexts/CartContext.tsx";
const wrap = (component) =>
  renderToStaticMarkup(
    React.createElement(
      LanguageProvider,
      null,
      React.createElement(PanelDataProvider, { preview: true }, component),
    ),
  );
const invoice = {
  id: "CHECK-17",
  issueDate: "2026-10-18",
  dueDate: "2026-10-20",
  currency: "IRR",
  status: "Unpaid",
  demo: true,
  items: [{ name: "Service", quantity: 3, price: 12000 }],
  tax: 1000,
  discount: 2000,
};
test("totals include quantity and explicit adjustments", () =>
  assert.deepEqual(invoiceTotals(invoice), { subtotal: 36000, total: 35000 }));
test("reject negative, nonfinite and fractional quantity data", () => {
  for (const item of [
    { price: -1, quantity: 1 },
    { price: NaN, quantity: 1 },
    { price: 1, quantity: 1.5 },
  ])
    assert.throws(() =>
      invoiceTotals({ ...invoice, items: [{ name: "bad", ...item }] }),
    );
  assert.throws(() => invoiceTotals({ ...invoice, discount: 999999 }));
});
test("IRR conversion is display-only; Toman unchanged", () => {
  assert.equal(inToman(2500000, "IRR"), 250000);
  assert.equal(inToman(2500000, "TOMAN"), 2500000);
  assert.equal(invoice.items[0].price, 12000);
});
test("Persian digits and money contain no literal escapes", () => {
  assert.equal(localize(123, true), "۱۲۳");
  assert.equal(localize("۱۲۳", false), "123");
  assert.equal(formatMoney(2500000, "IRR", true), "۲۵۰,۰۰۰\u00a0تومان");
});
test("all invoice statuses distinct and only unpaid/overdue payable", () => {
  assert.equal(new Set(Object.values(statusLabels).map((l) => l[1])).size, 4);
  for (const s of ["Paid", "Unpaid", "Overdue", "Cancelled"])
    assert.equal(canPayInvoice(s), s === "Unpaid" || s === "Overdue");
});
test("cart invoice uses actual lines, quantity, currency and requested 10 percent VAT", () => {
  const d = cartInvoice(
    [
      {
        id: "a",
        type: "vps",
        name: "Cart actual",
        quantity: 2,
        price: 320,
        period: "Monthly",
        specs: ["2GB"],
      },
    ],
    "2026-10-18",
  );
  assert.equal(invoiceTotals(d).total, 704);
  assert.equal(d.currency, "TOMAN");
  assert.equal(d.tax, 64);
  assert.equal(d.items[0].description, "2GB");
  assert.deepEqual(cartInvoice([], "x").items, []);
});
for (const generation of [8, 9, 10, 11, 12])
  test(
    "Gen" + generation + " has usable reference profiles, not inventory",
    () => {
      const profiles = hardwareProfiles.filter(
        (p) => p.generation === generation,
      );
      assert.ok(profiles.length);
      for (const p of profiles) {
        assert.ok(p.cpuModels.length);
        assert.equal(p.inventoryVerified, false);
        assert.ok(p.ramGB.every((n) => n >= 16));
        assert.ok(p.diskGB.every((n) => n >= 250));
        assert.ok(
          validHardwareSelection({
            generation,
            profileId: p.id,
            cpu: p.cpuModels[0],
            ramGB: p.ramGB[0],
            diskGB: p.diskGB[0],
          }),
        );
      }
    },
  );
test("profile/generation change clears dependent selections", () => {
  const p = hardwareProfiles[0];
  const s = {
    generation: 8,
    profileId: p.id,
    cpu: p.cpuModels[0],
    ramGB: 32,
    diskGB: 500,
  };
  assert.deepEqual(changeHardwareProfile(s, p.id), {
    ...emptyHardwareSelection(8),
    profileId: p.id,
  });
  assert.equal(changeHardwareProfile(s, "dl380-g12").profileId, "");
  assert.equal(validHardwareSelection({ ...s, generation: 12 }), false);
  assert.equal(validHardwareSelection({ ...s, ramGB: 8 }), false);
  assert.equal(validHardwareSelection({ ...s, diskGB: 240 }), false);
});
test("generation or operator flag alone never verifies inventory", () => {
  assert.equal(hasDeviceEvidence({ operatorVerified: true }), false);
  const fields = Object.fromEntries(
    inventoryFields.map((k) => [k, "operator evidence"]),
  );
  assert.equal(hasDeviceEvidence(fields), false);
  assert.equal(hasDeviceEvidence({ ...fields, operatorVerified: true }), true);
});
test("multi-IP includes all IPv4/IPv6 addresses without invented locations", () => {
  const s = getServiceById("MUL-7745");
  const ips = serviceIPs(s);
  assert.equal(ips.length, 3);
  assert.deepEqual(
    ips.map((i) => i.family),
    ["IPv4", "IPv4", "IPv6"],
  );
  assert.ok(ips.every((i) => i.location === undefined));
});
test("catalog drives all management routes, unknown ID unavailable", () => {
  for (const id of [
    "VPS-1234",
    "DED-9012",
    "HRL-3456",
    "CLD-2211",
    "MUL-7745",
    "HOST-7890",
  ])
    assert.equal(managementTab(id), getServiceById(id).kind + "-management");
  assert.equal(managementTab("example.ir"), "domain-management");
  assert.equal(managementTab("not-here"), "service-unavailable");
});
test("dashboard multi-IP route and legacy management arguments select correct identity", () => {
  let tab, id;
  const n = createNavigationHandlers(
    (v) => (tab = v),
    (v) => (id = v),
    () => {},
    () => {},
    () => {},
    () => {},
  );
  n.navigateToServiceOrderPage("/multilocation-management/MUL-7745");
  assert.equal(tab, "multilocation-management");
  assert.equal(id, "MUL-7745");
  n.handleManageService("hosting", "HOST-7890");
  assert.equal(tab, "hosting-management");
  n.handleManageService("missing");
  assert.equal(tab, "service-unavailable");
});
test("invoice fa/en exports render independent locale and correct identity/status", () => {
  for (const lang of ["fa", "en"])
    for (const status of ["Paid", "Unpaid", "Overdue", "Cancelled"]) {
      const html = wrap(
        React.createElement(InvoiceDocument, {
          invoice: { ...invoice, status },
          language: lang,
        }),
      );
      assert.ok(html.includes(lang === "fa" ? 'dir="rtl"' : 'dir="ltr"'));
      assert.ok(html.includes(statusLabels[status][lang === "fa" ? 0 : 1]));
      assert.ok(html.includes(localize("CHECK-17", lang === "fa")));
      assert.ok(!html.includes("شناسه ملی"));
    }
});
test("multi-IP delivery does not substitute unrelated credentials or IP", () => {
  const html = wrap(
    React.createElement(ServiceDeliveryInfo, { serviceId: "MUL-7745" }),
  );
  for (const ip of getServiceById("MUL-7745").ips)
    assert.ok(html.includes(localize(ip, true)));
  assert.ok(!html.includes("SecurePass"));
  assert.ok(!html.includes("185.123.45.67"));
});
test("unknown server never fabricates a server", () => {
  const html = wrap(
    React.createElement(ServerManagementDetail, { serverId: "missing" }),
  );
  assert.ok(html.includes("در دسترس نیست"));
  assert.ok(!html.includes("192.0.2"));
});
test("hardware UI makes reference and operator requirements visible", () => {
  const html = wrap(
    React.createElement(DedicatedHardwareReview, { serviceId: "DED-9012" }),
  );
  assert.ok(html.includes("موجودی تأیید نشده"));
  assert.ok(html.includes("SKU"));
  assert.ok(html.includes("disabled"));
});
test("wallet review available for invoice but absent from topup methods", () => {
  const plain = wrap(
    React.createElement(PaymentOptions, { value: "card", onChange: () => {} }),
  );
  const billing = wrap(
    React.createElement(PaymentOptions, {
      value: "wallet",
      onChange: () => {},
      includeWallet: true,
    }),
  );
  assert.equal((plain.match(/role="radio"/g) || []).length, 5);
  assert.equal((billing.match(/role="radio"/g) || []).length, 6);
  assert.ok(billing.includes("موجودی واقعی کیف پول"));
});
test("empty cart has no fabricated proforma or payment action", () => {
  const html = wrap(
    React.createElement(
      CartProvider,
      null,
      React.createElement(ProformaInvoicePage),
    ),
  );
  assert.ok(html.includes("سبد خرید خالی است"));
  assert.ok(!html.includes("invoice-document"));
});
test("domain panel uses central identity and valid sample dates", () => {
  const html = wrap(
    React.createElement(DomainManagement, {
      domainId: "example.ir",
      onBack: () => {},
    }),
  );
  assert.ok(html.includes("example.ir"));
  assert.ok(!html.includes("exampleexample.ir.com"));
  assert.ok(!html.includes("ABC123XYZ789"));
  assert.ok(html.includes("۱۴۰۲/۰۳/۲۰"));
});
test("multi-page ranges cover every pixel once and keep ordinary rows intact", () => {
  const r = invoicePageRanges(3000, 1000, [
    { start: 900, end: 1100 },
    { start: 1800, end: 2000 },
  ]);
  assert.deepEqual(r, [
    { start: 0, end: 900 },
    { start: 900, end: 1800 },
    { start: 1800, end: 2800 },
    { start: 2800, end: 3000 },
  ]);
  assert.equal(
    r.reduce((s, p) => s + p.end - p.start, 0),
    3000,
  );
});
test("oversized row progresses; bad dimensions rejected", () => {
  assert.deepEqual(invoicePageRanges(2500, 1000, [{ start: 0, end: 2500 }]), [
    { start: 0, end: 1000 },
    { start: 1000, end: 2000 },
    { start: 2000, end: 2500 },
  ]);
  assert.throws(() => invoicePageRanges(100, 0));
});
