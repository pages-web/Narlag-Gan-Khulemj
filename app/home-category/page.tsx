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
import { BreadcrumbsLayout } from '../breadcrumbs-layout';
import { LinkProps } from 'next/link';
import { Breadcrumb } from '@/components/breadcrumb/breadcrumb';
import HomeCategoryPageContent from "@/components/category/home-category-page-content";
import HomeCategoryTree from "@/components/category/home-category-tree";

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


const HomeCategory = async ({ searchParams }: IPageProps) => {
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
    },
  });
  
  const parentCategory = activeCategory && getParent(activeCategory.parentId);

  const childrenCategories =
    activeCategory &&
    categories.filter((category) => category.parentId === activeCategory._id);

  
  const dynamicBreadcrumbs =
    activeCategory && getBreadcrumbs(activeCategory.order, categories);
  
  return (
      <BreadcrumbsLayout>
      
      <HomeCategoryPageContent
        title={activeCategory?.name || ''}
        products={products}
        totalProducts={count}
        searchParams={searchParams}
        sidebar={
          <>
            <HomeCategoryTree
              categories={
                (childrenCategories || []).length > 0
                  ? [
                      { ...(parentCategory as ICategory), parent: true },
                      
                    ]
                  : primaryCategories
              }
              getSiblings={getSiblings}
            />
          </>
        }
      />
      </BreadcrumbsLayout>
  );
};


export default HomeCategory;
