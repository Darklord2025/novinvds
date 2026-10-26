import test from "node:test";
import assert from "node:assert/strict";
import { countries, datacenters } from "../src/data/datacenters.ts";
import { publicVariants } from "../src/data/publicCatalog.ts";
import {
  selectedLocation,
  locationHref,
  locationServiceLinks,
  withCountryHeading,
} from "../src/lib/public-location.ts";
test("home country links identify a single canonical country instead of a generic location page", () => {
  for (const country of countries) {
    const url = new URL(locationHref(country.id), "https://novin.example");
    assert.equal(url.pathname, "/datacenter");
    assert.equal(url.searchParams.get("country"), country.id);
    assert.equal(
      selectedLocation(url.searchParams.get("country"))?.id,
      country.id,
    );
  }
  assert.equal(locationHref(" DE "), "/datacenter?country=de");
  assert.equal(selectedLocation("not-a-country"), undefined);
  assert.equal(locationHref("https://evil.test"), "/datacenter");
});
test("country detail page order links preserve selected geography and actual catalog profile", () => {
  for (const country of countries) {
    const links = locationServiceLinks(country.id);
    for (const href of Object.values(links)) {
      const url = new URL(href, "https://novin.example");
      assert.equal(url.searchParams.get("country"), country.id);
      const profile = url.searchParams.get("profile");
      assert.ok(
        publicVariants.some((v) => v.id === profile),
        profile,
      );
      if (profile.startsWith("order-dedicated-dc-"))
        assert.equal(
          datacenters.find((d) => "order-dedicated-dc-" + d.id === profile)
            ?.country,
          country.id,
        );
      else assert.ok(profile.endsWith("-" + country.id));
    }
  }
  assert.deepEqual(locationServiceLinks(" DE "), locationServiceLinks("de"));
  assert.throws(() => locationServiceLinks("unknown"));
});
test("configuration titles reflect country switches without duplicating existing location names", () => {
  assert.equal(
    withCountryHeading("Configure Linux", "Germany"),
    "Configure Linux · Germany",
  );
  assert.equal(
    withCountryHeading("Configure Linux", "France"),
    "Configure Linux · France",
  );
  assert.equal(
    withCountryHeading("Hosting / Germany", "Germany"),
    "Hosting / Germany",
  );
  assert.equal(
    withCountryHeading("منابع دلخواه", "آلمان"),
    "منابع دلخواه · آلمان",
  );
  assert.equal(withCountryHeading("Configure"), "Configure");
});
