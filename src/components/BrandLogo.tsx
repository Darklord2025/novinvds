import React from "react";
export default function BrandLogo({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <img
      src={compact ? "/brand/favicon.png" : "/brand/novinvds-logo.png"}
      alt="NovinVDS"
      width={compact ? 80 : 200}
      height={compact ? 80 : 48}
      className={
        (compact ? "h-10 w-10" : "h-10 w-auto max-w-[200px] object-contain") +
        " " +
        className
      }
    />
  );
}
