import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Globe,
  Layers3,
  Check,
  MapPin,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { type PublicVariant } from "@/data/publicCatalog";
import {
  publicRegions,
  offerMode,
  offerModeLabels,
  offerCountry,
  countriesForOffers,
  choicesForCountry,
  countryOfferHref,
  locationCountries,
} from "@/data/publicGeography";
import { useSiteCopy } from "./site-copy";
import CountryFlag from "./CountryFlag";
export default function OfferExplorer({
  items,
  initialId,
  initialCountry,
  onChoose,
  onSelectionChange,
}: {
  items: PublicVariant[];
  initialId?: string;
  initialCountry?: string;
  onChoose?: (href: string) => void;
  onSelectionChange?: () => void;
}) {
  const { s, text, n, fa } = useSiteCopy(),
    initial = items.find((v) => v.id === initialId);
  const initialC = initialCountry || (initial && offerCountry(initial)) || "";
  const [mode, setMode] = useState(initial ? offerMode(initial) : ""),
    [country, setCountry] = useState(initialC),
    [region, setRegion] = useState(
      locationCountries.find((c) => c.id === initialC)?.region || "",
    );
  const modes = [...new Set(items.map(offerMode))],
    countries = countriesForOffers(items, mode),
    regions = publicRegions.filter((r) =>
      countries.some((c) => c.region === r.id),
    ),
    selected = countries.find((c) => c.id === country),
    choices = selected ? choicesForCountry(items, mode, country) : [];
  return (
    <div className="nv-offer-explorer">
      <ol
        className="nv-selection-steps"
        aria-label={s("مراحل انتخاب سرویس", "Service selection steps")}
      >
        {[
          s("نوع سرویس", "Service type"),
          s("منطقه و کشور", "Region & country"),
          s("مشاهده پلن", "View plans"),
        ].map((label, i) => (
          <li
            key={label}
            data-done={i === 0 ? !!mode : i === 1 ? !!selected : false}
          >
            <span>
              {i < 2 && (i === 0 ? mode : selected) ? (
                <Check size={14} />
              ) : (
                n(i + 1)
              )}
            </span>
            {label}
          </li>
        ))}
      </ol>
      <div
        className="nv-explorer-types"
        role="group"
        aria-label={s("انتخاب نوع سرویس", "Choose service type")}
      >
        {modes.map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={v === mode}
            onClick={() => {
              onSelectionChange?.();
              setMode(v);
              setRegion("");
              setCountry("");
            }}
          >
            <Layers3 size={20} />
            {offerModeLabels[v] ? text(offerModeLabels[v]) : v}
          </button>
        ))}
      </div>
      {!mode ? (
        <div className="nv-choice-empty">
          <Globe size={42} />
          <strong>
            {s(
              "اول نوع سرویس را انتخاب کنید.",
              "Start with the service you need.",
            )}
          </strong>
          <p>
            {s(
              "در قدم بعد، منطقه و کشورهای همان سرویس نمایش داده می‌شوند.",
              "Then see the regions and countries for that service.",
            )}
          </p>
        </div>
      ) : (
        <>
          <div
            className="nv-region-tabs"
            role="group"
            aria-label={s("منطقه", "Region")}
          >
            {regions.map((r) => (
              <button
                key={r.id}
                type="button"
                aria-pressed={region === r.id}
                onClick={() => {
                  onSelectionChange?.();
                  setRegion(r.id);
                  setCountry("");
                }}
              >
                <Globe size={17} />
                {text(r.title)}
                <small>
                  {n(countries.filter((c) => c.region === r.id).length)}
                </small>
              </button>
            ))}
          </div>
          {!region ? (
            <p className="nv-choice-hint">
              {s(
                "منطقه را انتخاب کنید تا کشورها نمایش داده شوند.",
                "Choose a region to see its countries.",
              )}
            </p>
          ) : (
            <div
              className="nv-country-choices"
              role="group"
              aria-label={s("کشور", "Country")}
            >
              {countries
                .filter((c) => c.region === region)
                .map((c) => (
                  <button
                    type="button"
                    key={c.id}
                    aria-pressed={country === c.id}
                    onClick={() => {
                      onSelectionChange?.();
                      setCountry(c.id);
                    }}
                  >
                    <CountryFlag code={c.id} />
                    <span>{s(c.fa, c.en)}</span>
                    {country === c.id && <Check size={16} />}
                  </button>
                ))}
            </div>
          )}
          {selected && (
            <div className="nv-location-result">
              <div>
                <CountryFlag code={selected.id} />
                <span>
                  <strong>
                    {text(offerModeLabels[mode] || [mode, mode])} ·{" "}
                    {s(selected.fa, selected.en)}
                  </strong>
                  <small>
                    {s(
                      "موقعیت انتخاب‌شده؛ ظرفیت و هزینه نهایی پیش از پرداخت تأیید می‌شود.",
                      "Selected location. Capacity and final price require confirmation.",
                    )}
                  </small>
                </span>
              </div>
              <div className="nv-location-result-actions">
                {choices.map((v) => {
                  const href = countryOfferHref(v, country),
                    label =
                      choices.length > 1
                        ? text(v.title).split(" / ").pop()
                        : s("مشاهده پلن‌ها", "View plans");
                  return onChoose ? (
                    <button
                      type="button"
                      className="nv-button"
                      key={v.id}
                      onClick={() => onChoose(href)}
                    >
                      {label}
                      {fa ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                    </button>
                  ) : (
                    <Link to={href} className="nv-button" key={v.id}>
                      {choices.length > 1 && <MapPin size={16} />} {label}
                      {fa ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
