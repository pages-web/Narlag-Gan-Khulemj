import Link from "next/link";
import { Separator } from "../ui/separator";
import CategoryNavContainer from "@/containers/products/category-nav";
import { getConfig } from "@/sdk/queries/auth";
import Image from "@/components/ui/image";
import { Suspense } from "react";

export async function NavbarTop({
  children,
  ...rest
}: {
  children: React.ReactNode;
}) {
  const { config } = await getConfig();
  const { logo } = config?.uiOptions || {};
  return (
    <header
      className="h-14 lg:h-[80px] z-30 lg:sticky lg:-top-1 md:fixed top-0 left-0 w-full flex right-0 z-50 items-center h-[34px] md:h-[120px] bg-white text-black"
      {...rest}
    >
      <div className="flex gap-[clamp(1rem,2vw,2rem)] justify-between items-center w-full lg:h-[60px] lg:sticky top-0 container pt-1 lg:pt-0">
        <Link
          href="/"
          aria-label="SF Homepage"
          className="w-[200px] text-2xl overflow-hidden"
        >
          <Image
            src={logo}
            height={650}
            width={690}
            quality={100}
            skipAnimation
            priority
            alt="Logo"
            className="object-contain md:flex h-16 w-auto hidden object-left"
          />
        </Link>

        {children}
      </div>
    </header>
  );
}
