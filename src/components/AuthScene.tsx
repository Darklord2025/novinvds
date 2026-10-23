export default function AuthScene() {
  return (
    <svg
      className="auth-cloud-scene w-full max-w-md"
      viewBox="0 0 440 290"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="authServer"
          x1="110"
          y1="100"
          x2="320"
          y2="270"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" stopOpacity=".98" />
          <stop offset="1" stopColor="#b9d7ff" stopOpacity=".9" />
        </linearGradient>
        <linearGradient
          id="authGlass"
          x1="60"
          y1="50"
          x2="380"
          y2="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" stopOpacity=".3" />
          <stop offset="1" stopColor="#fff" stopOpacity=".06" />
        </linearGradient>
      </defs>
      <ellipse
        cx="224"
        cy="243"
        rx="143"
        ry="22"
        fill="#082b89"
        fillOpacity=".24"
      />
      <circle cx="224" cy="143" r="111" stroke="white" strokeOpacity=".12" />
      <circle
        cx="224"
        cy="143"
        r="136"
        stroke="white"
        strokeOpacity=".08"
        strokeDasharray="4 9"
      />
      <path
        d="M89 147H53V69H125M347 138H388V207H325"
        stroke="#A5CCFF"
        strokeOpacity=".5"
        strokeWidth="2"
        strokeDasharray="5 7"
      />
      <rect
        x="29"
        y="39"
        width="76"
        height="62"
        rx="17"
        fill="url(#authGlass)"
        stroke="white"
        strokeOpacity=".28"
      />
      <path
        d="M48 70l12 12 26-26"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="350"
        y="177"
        width="64"
        height="62"
        rx="17"
        fill="url(#authGlass)"
        stroke="white"
        strokeOpacity=".25"
      />
      <circle cx="382" cy="208" r="14" stroke="white" strokeWidth="2" />
      <path
        d="M368 208h28M382 194c8 9 8 19 0 28-8-9-8-19 0-28Z"
        stroke="white"
        strokeWidth="2"
      />
      <g className="auth-server-stack">
        <path
          d="M127 109l92-48 98 48v128l-98 39-92-39V109Z"
          fill="url(#authServer)"
        />
        <path
          d="M219 61v215l98-39V109l-98-48Z"
          fill="#dbeafe"
          fillOpacity=".6"
        />
        <path
          d="M127 109l92 43 98-43M219 152v124"
          stroke="#95baf3"
          strokeOpacity=".6"
        />
        <path
          d="m148 145 49 22v29l-49-20v-31Zm0 46 49 20v29l-49-18v-31Z"
          fill="#2563eb"
          fillOpacity=".88"
        />
        <path
          d="m239 165 58-24v31l-58 23v-30Zm0 45 58-24v31l-58 23v-30Z"
          fill="#2563eb"
          fillOpacity=".14"
        />
        <circle cx="164" cy="162" r="3" fill="#99f6e4" />
        <circle cx="164" cy="207" r="3" fill="#99f6e4" />
        <path
          d="m174 165 12 5m-12 41 12 5"
          stroke="white"
          strokeOpacity=".6"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="m249 171 35-14m-35 58 35-14"
          stroke="#6d9de7"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <path
        d="M250 48a19 19 0 0 1 36-6 15 15 0 1 1 13 23h-43a9 9 0 0 1-6-17Z"
        fill="white"
        fillOpacity=".88"
      />
      <circle cx="102" cy="206" r="8" fill="#a7f3d0" fillOpacity=".85" />
      <circle cx="336" cy="81" r="5" fill="white" fillOpacity=".6" />
    </svg>
  );
}
