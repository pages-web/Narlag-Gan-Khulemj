import { getProducts } from '@/sdk/queries/products';
import ProductCard from '../product-card/product-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '../ui/carousel';
import { IProduct } from '@/types/product.types';
import { cn } from '@/lib/utils';
import { Heading } from '../heading/heading';


const RecommendedProducts = async ({
  categoryId,
  productId,
}: {
  categoryId?: string;
  productId?: string;
}) => {
  const { products } = await getProducts({
    variables: {
      categoryId,
      perPage: 12,
      isKiosk: true,
      groupedSimilarity: 'config',
    },
  });
  const exceptCurrent = products.filter((product) => product._id !== productId);
  const displayedProducts = exceptCurrent.slice(0);

  if (!exceptCurrent.length) return null;

  return (
    // <div className="mx-6 md:mx-12">
      <Carousel opts={{ dragFree: true }} className="group relative">
        <CarouselContent>
          {displayedProducts.map((product: IProduct) => (
            <CarouselItem
              className="basis-1/2 md:basis-1/4 xl:basis-1/4 2xl:basis-1/5"
              key={product._id}
            >
              <ProductCard
                {...product}
                className={cn(
                  product.hasSimilarity && 'pb-8'
                )}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="xl:-right-122 left-1 hidden md:inline-flex group-hover:flex transition-opacity duration-300 opacity-0 group-hover:opacity-100 w-11 h-11 border-[rgb(41,91,47)]" />
        <CarouselNext className="xl:-left-244 right-1 hidden md:inline-flex group-hover:flex transition-opacity duration-300 opacity-0 group-hover:opacity-100 w-11 h-11 border-[rgb(41,91,47)]" />
      </Carousel>
    // </div>
  );
};

export default RecommendedProducts;
