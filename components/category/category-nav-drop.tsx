/* eslint-disable react/jsx-key */
"use client";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const CategoryTreeItemWithoutDropdown = ({
  categoryWithChildren = [],
}: {
  categoryWithChildren: { _id: string; name: string; parent?: boolean }[];
}) => {
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort");
  const currentCategoryId = searchParams.get("categoryId");

  if (!categoryWithChildren || categoryWithChildren.length === 0) {
    return <div></div>;
  }

  return (
    <div className="relative">
      {categoryWithChildren.map((category) => (
        <div key={category._id}>
          {category.parent ? (
            <span
              className={cn(
                "text-base md:text-sm flex font-bold",
                category._id === currentCategoryId && "text-primary"
              )}
            >
              {category.name}
            </span>
          ) : (
            <Button
              variant={"footer"}
              className={`w-full ${
                category._id === currentCategoryId && "font-bold text-primary"
              }`}
              asChild
            >
              <Link
                href={{
                  pathname: "/category",
                  query: { categoryId: category._id, sort },
                }}
              >
                <span className={cn("w-full")}>
                  <span className="text-base md:text-sm mr-10">
                    {category.name}
                  </span>
                </span>
              </Link>
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryTreeItemWithoutDropdown;
