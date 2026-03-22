import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  className?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export default function BrandLogo({
  href = "/",
  className,
  imageClassName,
  width = 64,
  height = 64,
  priority = false,
}: BrandLogoProps) {
  return (
    <Link
      href={href}
      aria-label="BQ Media"
      className={className}
    >
      <Image
        src="/images/logo/bq-media-logo.svg"
        alt="BQ Media"
        width={width}
        height={height}
        className={imageClassName}
        priority={priority}
      />
    </Link>
  );
}
