import Link from "next/link";

type WordmarkLogoProps = {
  href?: string;
  className?: string;
  textClassName?: string;
  size?: "sm" | "lg";
};

const sizeClasses = {
  sm: "text-2xl",
  lg: "text-3xl",
};

export default function WordmarkLogo({
  href = "/",
  className,
  textClassName,
  size = "sm",
}: WordmarkLogoProps) {
  return (
    <Link
      href={href}
      aria-label="BQ"
      className={`${sizeClasses[size]} font-bold tracking-tight ${className ?? ""}`.trim()}
    >
      <span className={textClassName ?? "text-bq-accent"}>BQ</span>
    </Link>
  );
}
