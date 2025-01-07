import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from '../ui/image';
import { IProduct } from '../../types/product.types';
import ProductCardAdd from './product-card-add.client';
import Price from '../price/price';

const ProductCard = ({
  className,
  ...product
}: IProduct & { className?: string }) => {
  const { name, attachment, unitPrice, _id, hasSimilarity } = product;  
  return (
    <div
      className={cn(
        'border flex-auto flex-shrink-0',
        className
      )}
    >
      <div className="relative group">
        <Link
          href={`/product/${_id}`}
          className="relative block w-full overflow-hidden pb-[100%]"
        >
          <Image
            src={attachment?.url || ''}
            alt=""
            className="aspect-square w-full h-full absolute inset-0"
            width={500}
            height={500}
            quality={100}
            key={_id}
          />

        </Link>
      </div>
      
      <div className="border-t p-2 border-neutral-200 text-sm">
        <Link
          href={`/product/${_id}`}
          className="hover:text-primary line-clamp-1"
        >
          {name}
          
        </Link>

        <div className="flex pt-3 items-center justify-between mt-2">
          <span className="font-bold text-lg">
            <Price amount={unitPrice} />
          </span>
          {!hasSimilarity && <ProductCardAdd {...product} />}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
