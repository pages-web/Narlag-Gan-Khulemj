import { PropsWithChildren, ReactNode } from 'react';
import { IProduct } from '@/types/product.types';
import CategorySidebar from './category-sidebar';
import CategorySidebarTrigger from './category-sidebar-trigger';
import ProductCard from '../product-card/product-card';
import ProductPagination from '../product-pagination/product-pagination';
import { IPageProps } from '@/types';
import ProductsContainer from '../product-card/products-container';
import SearchBadge from './search-badge';

export interface CategoryPageContentProps extends PropsWithChildren {
  title: string;
  products: IProduct[];
  totalProducts: number;
  sidebar?: ReactNode;
  searchParams: IPageProps['searchParams'];
}

const CategoryPageContent = ({
  title,
  sidebar,
  products,
}: CategoryPageContentProps) => {
  return (
    <div className="mx-6 md:mx-12">
    <div className="mb-20">
      <h1 className="md:my-6 font-semibold md:text-2xl">{title}</h1>
      <div className="md:flex gap-6">
        <CategorySidebar>{sidebar}</CategorySidebar>
        <div className="flex-1">
          <div className="flex justify-between items-center py-3 mb-2 sticky md:py-0 md:static top-0 z-50 bg-background">
            <CategorySidebarTrigger />
          </div>
          <ProductsContainer>
            {products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}         
          </ProductsContainer>

        </div>
      </div>
    </div>
    </div>
  );
};

export default CategoryPageContent;


export interface CategoryPageContentProps extends PropsWithChildren {
  products: IProduct[];
  totalProducts: number;
  sidebar?: ReactNode;
  itemsPerPage?: number;
}

export interface CategorySidebarProps extends PropsWithChildren {
  isOpen: boolean;
  closeSidebar: () => void;
}
