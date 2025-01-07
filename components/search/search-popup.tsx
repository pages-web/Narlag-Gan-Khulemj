"use client";
import { MoveRight, ScanSearchIcon, SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useAtom } from "jotai";
import { searchPopupAtom } from "@/store";
import useIsScrolled from "@/hooks/useIsScrolled";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { LoadingIcon, LoadingWrapper } from "../ui/loading";
import { useEffect, useState } from "react";
import { useProducts } from "@/sdk/queries/products.client";
import { IProduct } from "@/types/product.types";
import ProductCard from "../product-card/product-card";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SearchPopupTrigger = () => {
  const [open, setOpen] = useAtom(searchPopupAtom);
  return (
    <Button
    variant="none_color"
    className="text-inherit w-[20vw] hover:text-inherit"
    size="icon"
    onClick={() => setOpen(!open)}
  >
    <form className={cn("relative w-[20vw]")}>
      <Input
        type="text"
        name="search"
        placeholder="Хайх..."
        autoComplete="off"
        className="w-full text-sm font-medium text-black placeholder:text-neutral-500 py-6 bg-background px-4 focus-visible:ring-0"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <SearchIcon className="h-4 w-4 text-black" />
      </div>
    </form>
  </Button>
  );
};

const SearchPopup = () => {
  const [open, setOpen] = useAtom(searchPopupAtom);
  const isScrolled = useIsScrolled();
  const [search, setSearch] = useState("");
  const { getProducts, products, loading } = useProducts();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      setOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    const timeOutId = setTimeout(
      () =>
        !!search &&
        getProducts({
          variables: { searchValue: search, perPage: 5, isKiosk: true },
        }),
      500
    );
    return () => clearTimeout(timeOutId);
  }, [search, getProducts]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild className="bg-black">
        <div
          className={cn("fixed", isScrolled ? "top-[68px]" : "top-[120px]")}
        />
      </PopoverTrigger>
        <PopoverContent
          className="w-screen border-b-0 border-x-0 px-0 bg-white rounded-b-lg"
          sideOffset={0}
        >
        <div className="container">
          <div className="flex items-center relative">
            <SearchIcon
              className="h-6 w-6 absolute left-0 top-1/2 -translate-y-1/2"
              strokeWidth={1.5}
            />
            <Input
              className="border-none shadow-none pl-12 focus-visible:ring-0 text-black py-8 h-auto"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Хайх..."
            />
          </div>
          {loading && (
            <LoadingWrapper className="py-20">
              <LoadingIcon />
            </LoadingWrapper>
          )}
          {!!search && !products?.length && !loading && (
            <div className="py-20 text-sm text-neutral-600 flex flex-col items-center gap-2">
              <ScanSearchIcon
                className="h-12 w-12 text-neutral-500"
                strokeWidth={1.2}
              />
              <span className="pb-6">Хайлтын утгаа оруулана уу...</span>
            </div>
          )}
          {!!search && products?.length > 0 && (
            <>
              <div className="flex items-center justify-between border-b pb-3 mb-4 font-medium text-sm">
                Хайлтын илэрц
                <Button variant="ghost" asChild>
                  <Link
                    href={{ pathname: "/category", query: { q: search } }}
                    onClick={() => {
                      setSearch("");
                      setOpen(false);                    
                    }}
                  > 
                    <MoveRight strokeWidth={1.5} className="stroke-[rgb(41,91,47)]" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-5 gap-4 p-4">
                {products.map((product: IProduct) => (
                  <ProductCard {...product} key={product._id} />
                ))}
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SearchPopup;
