import CategoryPageContent from "@/components/category/category-page-content";
import CategoryTree from "@/components/category/category-tree";
import {
  getProducts,
  getBreadcrumbs,
  getCategories,
} from '@/sdk/queries/products';
import { ICategory } from "@/types/products.types";
import { PER_PAGE } from "@/lib/constants";
import { IPageProps } from "@/types";
import { Metadata } from "next/types";
import { getConfig } from "@/sdk/queries/auth";
import { CloudCog } from "lucide-react";
import { BreadcrumbsLayout } from '../breadcrumbs-layout';
import { LinkProps } from 'next/link';
import { Breadcrumb } from '@/components/breadcrumb/breadcrumb';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { config } = await getConfig();

  return {
    title: config.name + ' - Бүтээгдэхүүнүүд',
    openGraph: {
      title: config.name + ' - Бүтээгдэхүүнүүд',
    },
  };
}

export const revalidate = 300;


const Category = async ({ searchParams }: IPageProps) => {
  const { categoryId, page, q, sort } = searchParams;
  const { categories, getParent, getChildren, getSiblings, primaryCategories } =
    await getCategories();

  const activeCategory = categories.find(
    (category) => category._id === categoryId
  );

  const { products, count } = await getProducts({
    variables: {
      categoryId: activeCategory?._id,
      page: parseInt((page || 1).toString()),
      perPage: PER_PAGE,
      searchValue: q,
      isKiosk: true,
      groupedSimilarity: "config",
      ...getSort(sort),
    },
  });
  
  const parentCategory = activeCategory && getParent(activeCategory.parentId);

  const childrenCategories =
    activeCategory &&
    categories.filter((category) => category.parentId === activeCategory._id);

  const breadcrumbs = [
    { name: 'Эхлэл', link: '/' },
    { name: 'Дэлгүүр', link: '/category' as LinkProps['href'] },
  ];
  
  const dynamicBreadcrumbs =
    activeCategory && getBreadcrumbs(activeCategory.order, categories);
  
  return (
    <BreadcrumbsLayout
      breadcrumbs={breadcrumbs.concat(
        (dynamicBreadcrumbs as Breadcrumb[]) || []
      )}
    >
    <CategoryPageContent
      title={activeCategory?.name || 'Дэлгүүр'}
      products={products}
      totalProducts={count}
      searchParams={searchParams}
      sidebar={
        <>
          <CategoryTree
            categories={
              (childrenCategories || []).length > 0
                ? [
                    { ...(parentCategory as ICategory), parent: true },
                    ...(childrenCategories || []),
                  ]
                : // : activeCategory
                  // ? getSiblings(activeCategory?.parentId)
                  primaryCategories
            }
            getSiblings={getSiblings}
          />
        </>
      }
    />
    </BreadcrumbsLayout>
  );
};

const getSort = (sortValue?: string | string[]) => {
  const sort = (sortValue || "").toString();

  switch (sort) {
    case "A-Z":
      return { sortField: "name", sortDirection: 1 };
    case "Z-A":
      return { sortField: "name", sortDirection: -1 };
    case "newToOld":
      return { sortField: "createdAt", sortDirection: -1 };
    case "oldToNew":
      return { sortField: "createdAt", sortDirection: 1 };
    case "priceUp":
      return { sortField: "unitPrice", sortDirection: 1 };
    case "priceDown":
      return { sortField: "unitPrice", sortDirection: -1 };
    default:
      return { sortField: "name", sortDirection: 1 };
  }
};

export default Category;
