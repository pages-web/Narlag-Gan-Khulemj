import { Separator } from "../ui/separator";
import CategoryNavContainer from "@/containers/products/category-nav";
import { Suspense } from "react";
import Logo from "./logo";

export async function NavbarTop({
  children,
  ...rest
}: {
  children: React.ReactNode;
}) {
  return (
    <header
      className={
        "h-14 md:h-[111px] z-50 md:sticky md:-top-3 md:pt-2.5 md:shadow-md bg-primary text-white"
      }
      {...rest}
    >
      <div className="flex gap-[clamp(1rem,3vw,3rem)] items-center w-full md:h-[60px] md:sticky top-0 container pt-1 md:pt-0">
        <Logo />
        {children}
      </div>

      <div className="hidden md:block bg-primary sticky top-[60px]">
        <Separator className="bg-background/10" />
        <div className="container py-0.5 flex">
          <Suspense>
            <CategoryNavContainer />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
