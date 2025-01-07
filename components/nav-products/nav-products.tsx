import { getProducts } from '@/sdk/queries/products';
import NavProductCard from '../product-card/nav-product-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '../ui/carousel';
import { IProduct } from '@/types/product.types';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const NavProducts = async ({
  categoryId,
  productId,
  description,
  ...product
}: {
  categoryId?: string;
  productId?: string;
  description?: string;
}) => {
  const { products } = await getProducts({
    variables: {
      categoryId,
      perPage: 3,
    },
  });
  const exceptCurrent = products.filter((product) => product._id !== productId);

  if (!exceptCurrent.length) return null;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      <Carousel opts={{ dragFree: true }} className="w-full md:w-2/3">
        <CarouselContent className="">
          {exceptCurrent.map((product: IProduct) => (
            <CarouselItem key={product._id}>
              <NavProductCard
                {...product}
                className={cn(
                  '',
                  product.hasSimilarity && 'pb-8'
                )}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default NavProducts;
