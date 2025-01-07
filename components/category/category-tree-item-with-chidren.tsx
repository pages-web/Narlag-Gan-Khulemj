"use client";

import { ICategory } from "@/types/products.types";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";  // Importing arrow icons

const CategoryTreeItemWithChildren = ({
  categoryWithChildren = [],
  index,
}: {
  categoryWithChildren: { _id: string; name: string; parent?: boolean }[];
  index: number;
}) => {
  const searchParams = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(true);

  const parentCategory = categoryWithChildren?.find(
    (category) => category?.parent
  );
  const childrenCategories = categoryWithChildren?.filter(
    (category) => !category?.parent
  ) || [];
  const sort = searchParams.get("sort");
  const currentCategoryId = searchParams.get("categoryId");

  if (!categoryWithChildren || categoryWithChildren.length === 0) {
    return <div></div>;
  }

  const toggleAccordion = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="relative">
      {categoryWithChildren.length <= 1 ? (
        <Button
          variant={"ghost"}
          className={`w-full justify-start ${
            parentCategory?._id === currentCategoryId && "font-bold"
          }`}
          asChild
        >
          <Link
            href={{
              pathname: "/category",
              query: { categoryId: parentCategory?._id, sort },
            }}
          >
            <span className={cn("flex gap-2 items-center w-full ")}>
              <span className="text-base md:text-sm flex items-center">
                {parentCategory?.name}
              </span>
            </span>
          </Link>
        </Button>
      ) : (
        <div>
          <Button
            variant={"ghost"}
            className="w-full justify-start flex items-center"
            onClick={toggleAccordion}
          >
            <span className={cn("flex gap-2 items-center w-full")}>
              <span className="text-base md:text-sm flex items-center">
                {parentCategory?.name}
              </span>
            </span>
            <span className="ml-2">
              {isExpanded ? (
                <FiChevronUp className="transition-transform duration-300" />
              ) : (
                <FiChevronDown className="transition-transform duration-300" />
              )}
            </span>
          </Button>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-start pl-4 overflow-hidden"
              >
                {childrenCategories.map((category) => (
                  <Button
                    key={category._id}
                    variant={"ghost"}
                    className={`w-full justify-start ${
                      category._id === currentCategoryId &&
                      "font-bold text-primary"
                    }`}
                    asChild
                  >
                    <Link
                      href={{
                        pathname: "/category",
                        query: { categoryId: category._id, sort },
                      }}
                    >
                      <span className={cn("flex gap-2 items-center w-full")}>
                        <div className="h-2 w-2 bg-[rgb(41,91,47)] rounded-full"></div>
                        <span className="text-base md:text-sm flex items-center">
                          {category.name}
                        </span>
                      </span>
                    </Link>
                  </Button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default CategoryTreeItemWithChildren;
