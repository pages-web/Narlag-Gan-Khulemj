import { ICategory, IGetCategories } from "@/types/products.types";
import { CategoryTreeItem } from "./category-tree-item";
import CategoryFilter from "./category-filter";
import { CloudCog } from "lucide-react";
import { getProducts } from "@/sdk/queries/products";
import CategoryTreeItemWithChildren from "./category-tree-item-with-chidren";

const CategoryTree = ({
  categories,
  getSiblings,
}: {
  categories: (ICategory & { parent?: true })[];
  getSiblings: IGetCategories;
}) => {
  const categoriesWithChildren = categories.map((category) =>
    getSiblings(category._id)
  );
  console.log(categoriesWithChildren)

  return (
    <div className="space-y-4">
      <div>
      <span className="block py-2 px-4 mb-4 bg-[rgb(41,91,47)] typography-headline-6 font-bold text-white text-neutral-900 uppercase tracking-widest">
          {("Ангилал")}
        </span>
        {categoriesWithChildren.map((categoryWithChildren, index) => (
          <CategoryTreeItemWithChildren
            categoryWithChildren={categoryWithChildren}
            index={index}
          />
        ))}
      </div>
      <CategoryFilter />
    </div>
  );
};

export default CategoryTree;
