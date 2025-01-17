"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ICategory } from "@/types/products.types";
import Link from "next/link";
import { useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

export function CategoryNav({
  categories,
  primaryCategories,
}: {
  categories: ICategory[];
  primaryCategories: ICategory[];
}) {
  const [activeCat, setActiveCat] = useState<string | undefined>();
  const getChildren = (parentId: string) =>
    categories.filter((c) => c.parentId === parentId);
  const onLinkClick = () => setActiveCat(undefined);
  const navigationMenuTriggerStyle = cva(
    "group relative inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-semibold text-black"
  );

  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");

  return (
    <NavigationMenu
      className="mr-12 flex-auto max-w-full 2xl:max-w-screen-2xl [&>div]:max-w-full"
      value={activeCat}
      onValueChange={setActiveCat}
    >
      <NavigationMenuList className="max-w-full overflow-x-auto justify-start no-scrollbar mr-12">
        <Link
          className={cn(navigationMenuTriggerStyle(), "group font-semibold hover:text-[rgb(41,91,47)]")}
          href="/"
        >
          Нүүр
        </Link>
        <div className="h-4 border-l border-black mt-3" ></div>
        <Link
          className={cn(navigationMenuTriggerStyle(), "group font-semibold ml-5 hover:text-[rgb(41,91,47)]")}
          href="/about"
        >
          Бидний тухай
        </Link>
        <div className="h-4 border-l border-black mt-3" ></div>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-semibold px-0 py-0">
            <Link
              className={cn(navigationMenuTriggerStyle(), "group font-semibold hover:text-[rgb(41,91,47)]")}
              href="/category"
            >
              Дэлгүүр
            </Link>
          </NavigationMenuTrigger>

          <NavigationMenuContent className="w-1/4 transform translate-x-[120%] bg-white shadow-md rounded-md">
            <div className="p-2">
              <ul className="flex justify-around">
                {(primaryCategories || []).map(({ _id, name, order }) => {
                  const childrenCats = getChildren(_id);
                  return (
                    <li key={_id}>
                      {childrenCats.length > 0 && (
                        <ul className="text-[#4a4a4a] text-sm mt-3">
                          {childrenCats.map((cat) => (
                            <li key={cat._id} className="py-2 hover:bg-gray-100 rounded-md transition duration-50">
                              <Link
                                className="px-2 py-1 block hover:text-[rgb(41,91,47)]"
                                href={{
                                  pathname: "/category",
                                  query: { categoryId: cat._id, sort },
                                }}
                                onClick={onLinkClick}
                              >
                                {cat.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </NavigationMenuContent>

        </NavigationMenuItem>

        <div className="h-4 border-l border-black mt-3" ></div>

        <Link
          className={cn(navigationMenuTriggerStyle(), "group font-semibold ml-5 hover:text-[rgb(41,91,47)]")}
          href="/a"
        >
          Мэдээлэл
        </Link>

        <div className="h-4 border-l border-black mt-3" ></div>

        <Link
          className={cn(navigationMenuTriggerStyle(), "group font-semibold ml-5 hover:text-[rgb(41,91,47)]")}
          href="/production"
        >
          Үйлдвэрлэл
        </Link>

        <div className="h-4 border-l border-black mt-3" ></div>

        <Link
          className={cn(navigationMenuTriggerStyle(), "group font-semibold ml-5 hover:text-[rgb(41,91,47)]")}
          href="/project"
        >
          Төслүүд
        </Link>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
