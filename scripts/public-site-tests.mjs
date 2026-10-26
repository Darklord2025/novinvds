import test from "node:test";
import assert from "node:assert/strict";
import {
  publicVariants,
  publicFamilies,
  variantsFor,
  panelOrderHref,
} from "../src/data/publicCatalog.ts";
import { sidebarItems } from "../src/data/sidebarItems.ts";
import { serviceAddons } from "../src/data/serviceAddons.ts";
import {
  countries,
  datacenters,
  countryFromCategory,
} from "../src/data/datacenters.ts";

function leaves(item) {
  return item.submenu ? item.submenu.flatMap(leaves) : [item];
}
test("every panel order leaf and service add-on is discoverable on the public site", () => {
  const panel = leaves(sidebarItems.find((v) => v.id === "order-services"));
  const ids = new Set(publicVariants.map((v) => v.id));
  assert.equal(ids.size, publicVariants.length, "duplicate public option IDs");
  for (const item of panel)
    assert.ok(ids.has(item.id), "missing panel service: " + item.id);
  for (const addon of serviceAddons)
    assert.ok(ids.has("addon-" + addon.id), "missing add-on: " + addon.id);
  for (const family of publicFamilies)
    assert.ok(
      variantsFor(family.id).length,
      "empty public family: " + family.id,
    );
});
test("public configuration links preserve the exact service, datacenter and country", () => {
  for (const family of ["vps", "dedicated", "hosting"]) {
    for (const option of variantsFor(family)) {
      const url = new URL(option.href, "https://novinvds.example");
      assert.equal(url.origin, "https://novinvds.example");
      assert.equal(url.pathname, "/" + family + "-plans");
      assert.equal(url.searchParams.get("profile"), option.id);
      assert.ok(option.title[0] && option.title[1]);
      if (option.id.startsWith("order-dedicated-dc-")) {
        const dc = datacenters.find(
          (v) => v.id === option.id.slice("order-dedicated-dc-".length),
        );
        assert.ok(dc);
        assert.equal(dc.country, "ir");
      }
      if (option.id.includes("country-"))
        assert.ok(
          countries.some((c) => c.id === countryFromCategory(option.id)),
        );
    }
  }
});
test("account handoff encodes values without allowing query replacement or navigation off site", () => {
  const href = panelOrderHref("order-domain", {
    domain: "example.com&tab=wallet",
    mode: "transfer",
    tab: "evil",
  });
  const url = new URL(href, "https://novinvds.example");
  assert.equal(url.pathname, "/user-panel");
  assert.equal(url.searchParams.get("tab"), "order-domain");
  assert.equal(url.searchParams.get("domain"), "example.com&tab=wallet");
  assert.equal(url.searchParams.get("mode"), "transfer");
});
