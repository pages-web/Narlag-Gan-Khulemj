import { IProductDetail } from '@/types/products.types';
import { Card, CardContent, CardHeader } from '../ui/card';
import Price from '../price/price';
import { Separator } from '../ui/separator';
import AddToCart from './AddToCart.client';
import { cn } from '@/lib/utils';
import Remainder from './remainder.client';
import ProductReview from './productReview';
import { Suspense } from 'react';

const PurchaseCard = ({
  name,
  unitPrice,
  _id,
  remainder,
  attachment,
}: IProductDetail) => {
  const product = { name, unitPrice, _id, remainder, attachment };
  return (
    <Card className="md:sticky md:top-28">
      <CardHeader>
        {/* <div>
          <Badge className="bg-indigo-600 h-auto py-1 md:py-1.5 px-2 md:px-3 text-sm">
            <Tag className="h-4 w-4 md:h-5 md:w-5" />
            <span className="ml-1 md:ml-2 inline-block">Sale</span>
          </Badge>
        </div> */}
        <h1
          className={cn(
            'font-bold capitalize line-clamp-2',
            name.length > 20 ? 'text-xl' : 'text-2xl'
          )}
        >
          {name}
        </h1>
        <div>
          <Price amount={unitPrice} className="mr-2 font-bold text-2xl" />

          {/* <Price
            amount={unitPrice}
            className="text-base text-neutral-500 line-through"
          /> */}
        </div>
        <Suspense>
          <ProductReview productId={product._id} />
        </Suspense>
        <Remainder remainder={remainder} />
      </CardHeader>
      <CardContent className="md:py-0">
        <Separator />
        <AddToCart {...product} />
        <Separator />
      </CardContent>
      {/* <CardFooter className="flex-col justify-start items-start">
        <div className="flex items-center gap-2">
          <PackageIcon className="flex-shrink-0 mr-1 text-neutral-500 h-5 w-5" />
          <div className="text-sm">
            <div>
              Free shipping, arrives by Thu, Apr 7. Want it faster?&nbsp;
              <Button
                asChild
                variant={'link'}
                className="font-normal py-0 px-0 h-auto text-primary"
              >
                <Link href="#">Add an address</Link>
              </Button>
              &nbsp;to see options
            </div>
          </div>
        </div>
        <div className="flex mt-4 items-center gap-2">
          <WarehouseIcon className="flex-shrink-0 mr-1 text-neutral-500 h-5 w-5" />
          <div className="text-sm">
            <div>
              Pickup not available at Super center.&nbsp;
              <Button
                asChild
                variant={'link'}
                className="font-normal py-0 px-0 h-auto text-primary"
              >
                <Link href="#">Check availability nearby</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex mt-4 items-center gap-2">
          <ShieldCheckIcon className="flex-shrink-0 mr-1 text-neutral-500 h-5 w-5" />
          <div className="text-sm">
            <div>
              Free 30-Day returns.&nbsp;
              <Button
                asChild
                variant={'link'}
                className="font-normal py-0 px-0 h-auto text-primary"
              >
                <Link href="#">Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  );
};

export default PurchaseCard;
