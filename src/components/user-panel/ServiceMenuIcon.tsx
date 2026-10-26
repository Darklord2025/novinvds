import type { ComponentType } from "react";
export default function ServiceMenuIcon({
  id,
  icon: Icon,
  size = 18,
}: {
  id: string;
  icon: ComponentType<any>;
  size?: number;
}) {
  const colors = [
    "text-blue-500 bg-blue-500/10",
    "text-emerald-500 bg-emerald-500/10",
    "text-violet-500 bg-violet-500/10",
    "text-amber-500 bg-amber-500/10",
    "text-cyan-500 bg-cyan-500/10",
    "text-rose-500 bg-rose-500/10",
  ];
  const tint =
    colors[
      Array.from(id).reduce((n, c) => n + c.charCodeAt(0), 0) % colors.length
    ];
  return (
    <span
      aria-hidden="true"
      className={
        "menu-service-icon rounded-lg inline-flex shrink-0 items-center justify-center p-1.5 " +
        tint
      }
    >
      {id.includes("windows") ? (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#00A4EF">
          <path d="M2 4 10 3v8H2zm9-1 11-1v9H11zM2 12h8v8l-8-1zm9 0h11v10l-11-1z" />
        </svg>
      ) : id.includes("linux") ? (
        <svg width={size} height={size} viewBox="0 0 24 24">
          <ellipse cx="12" cy="12" rx="7" ry="10" fill="#172554" />
          <ellipse cx="12" cy="15" rx="5" ry="6" fill="#fff" />
          <ellipse cx="9.8" cy="7" rx="1.3" ry="2" fill="#fff" />
          <ellipse cx="14.2" cy="7" rx="1.3" ry="2" fill="#fff" />
          <circle cx="10" cy="7" r=".6" />
          <circle cx="14" cy="7" r=".6" />
          <path
            d="m9 10 3-2 3 2-3 2zM5 20l5-1 1 4-8-1zm14 0-5-1-1 4 8-1z"
            fill="#FBBF24"
          />
        </svg>
      ) : id.includes("wordpress") ? (
        <span
          style={{ fontSize: size - 2 }}
          className="rounded-full bg-sky-600 text-white w-5 h-5 text-center leading-5 font-serif font-bold"
        >
          W
        </span>
      ) : id.includes("ubuntu") ? (
        <svg width={size} height={size} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="12" fill="#E95420" />
          <circle
            cx="12"
            cy="12"
            r="5"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
          <circle cx="5" cy="12" r="2" fill="white" />
          <circle cx="16" cy="5.5" r="2" fill="white" />
          <circle cx="16" cy="18.5" r="2" fill="white" />
        </svg>
      ) : (
        <Icon size={size} />
      )}
    </span>
  );
}
