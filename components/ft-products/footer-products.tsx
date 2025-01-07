import { getProducts } from '@/sdk/queries/products';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '../ui/carousel';
import { IProduct } from '@/types/product.types';
import { cn } from '@/lib/utils';
// import FooterProductsCard from '../product-card/footer-products-card';
import FooterProductsCard from '../product-card/footer-prodcuts-card';

const FooterProducts = async ({
  categoryId,
  productId,
}: {
  categoryId?: string;
  productId?: string;
}) => {
  const { products } = await getProducts({
    variables: {
      categoryId,
      perPage: 24,
    },
  });
  const exceptCurrent = products.filter((product) => product._id !== productId);

  const displayedProducts = exceptCurrent.slice(12);

  if (!exceptCurrent.length) return null;

  return (
    <Carousel opts={{ dragFree: true }}>
      <CarouselContent className='- '>
        {displayedProducts.map((product: IProduct) => (
          <CarouselItem
            className="basis-1/3 md:basis-1/3 xl:basis-1/3 2xl:basis-1/3 pl-0"
            key={product._id}
          >
            <FooterProductsCard
              {...product}
              className={cn('')}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default FooterProducts;
