import { locationCountries } from "@/data/publicGeography";
export default function CountryFlag({ code }: { code: string }) {
  const label = locationCountries.find((c) => c.id === code)?.en || code;
  let art;
  const bands = (colors: string[], vertical = false) =>
    colors.map((color, i) => (
      <rect
        key={i}
        x={vertical ? (i * 30) / colors.length : 0}
        y={vertical ? 0 : (i * 20) / colors.length}
        width={vertical ? 30 / colors.length : 30}
        height={vertical ? 20 : 20 / colors.length}
        fill={color}
      />
    ));
  const star = (x: number, y: number, r = 1.8) => (
    <path
      transform={`translate(${x} ${y}) scale(${r / 2})`}
      d="M0-2 .6-.6 2-.6 .9.4 1.2 2 0 1.1-1.2 2-.9.4-2-.6-.6-.6Z"
      fill="white"
    />
  );
  switch (code) {
    case "ir":
      art = (
        <>
          {bands(["#239f40", "#fff", "#da0000"])}
          <path
            d="M13 8q-2 4 2 4q4 0 2-4m-2 0v5m-2-1h4"
            fill="none"
            stroke="#da0000"
            strokeWidth=".8"
          />
        </>
      );
      break;
    case "de":
      art = bands(["#161616", "#d00", "#ffcf00"]);
      break;
    case "fr":
      art = bands(["#183f8e", "#fff", "#ed2939"], true);
      break;
    case "nl":
      art = bands(["#b7202b", "#fff", "#21468b"]);
      break;
    case "pl":
      art = bands(["#fff", "#dc143c"]);
      break;
    case "fi":
      art = (
        <>
          <rect width="30" height="20" fill="white" />
          <path d="M9 0v20M0 10h30" stroke="#003580" strokeWidth="5" />
        </>
      );
      break;
    case "gb":
    case "au":
      art = (
        <>
          <rect width="30" height="20" fill="#153371" />
          <svg
            width={code === "au" ? 15 : 30}
            height={code === "au" ? 10 : 20}
            viewBox="0 0 30 20"
          >
            <path d="m0 0 30 20M30 0 0 20" stroke="white" strokeWidth="5" />
            <path d="m0 0 30 20M30 0 0 20" stroke="#cf142b" strokeWidth="2" />
            <path d="M15 0v20M0 10h30" stroke="white" strokeWidth="7" />
            <path d="M15 0v20M0 10h30" stroke="#cf142b" strokeWidth="4" />
          </svg>
          {code === "au" && (
            <>
              {star(22, 5)}
              {star(19, 12)}
              {star(26, 14)}
              {star(7, 15)}
            </>
          )}
        </>
      );
      break;
    case "us":
      art = (
        <>
          {bands(
            Array.from({ length: 13 }, (_, i) => (i % 2 ? "#fff" : "#b22234")),
          )}
          <rect width="13" height="11" fill="#3c3b6e" />
          {[0, 1, 2].map((y) =>
            [0, 1, 2, 3].map((x) => (
              <g key={x + "-" + y}>{star(2 + x * 3, 2 + y * 3, 0.65)}</g>
            )),
          )}
        </>
      );
      break;
    case "ca":
      art = (
        <>
          {bands(["#d80621", "#fff", "#d80621"], true)}
          <path
            d="m15 4 1.2 3 1.5-1-.2 3 2-1-.8 2 1 .6-3.8 2.6.3 1.4-2-.4v2h-.7v-2l-2 .4.3-1.4L10 10.6l1-.6-.8-2 2 1-.2-3 1.5 1Z"
            fill="#d80621"
          />
        </>
      );
      break;
    case "jp":
      art = (
        <>
          <rect width="30" height="20" fill="white" />
          <circle cx="15" cy="10" r="5.5" fill="#bc002d" />
        </>
      );
      break;
    case "tr":
    case "sg":
      art = (
        <>
          <rect
            width="30"
            height="20"
            fill={code === "tr" ? "#e30a17" : "white"}
          />
          {code === "sg" && <rect width="30" height="10" fill="#ef3340" />}
          <circle
            cx={code === "tr" ? 13 : 7}
            cy={code === "tr" ? 10 : 5}
            r={code === "tr" ? 5 : 3.7}
            fill="white"
          />
          <circle
            cx={code === "tr" ? 15 : 8.6}
            cy={code === "tr" ? 9 : 4.6}
            r={code === "tr" ? 4 : 3.2}
            fill={code === "tr" ? "#e30a17" : "#ef3340"}
          />
          {star(
            code === "tr" ? 20 : 12,
            code === "tr" ? 10 : 5,
            code === "tr" ? 2.2 : 1.4,
          )}
        </>
      );
      break;
    case "ae":
      art = (
        <>
          {bands(["#00732f", "#fff", "#000"])}
          <rect width="8" height="20" fill="#f00000" />
        </>
      );
      break;
    default:
      art = <rect width="30" height="20" fill="#8498b9" />;
  }
  return (
    <svg
      className="nv-country-flag"
      viewBox="0 0 30 20"
      role="img"
      aria-label={label}
      style={{ flexShrink: 0 }}
    >
      {art}
    </svg>
  );
}
