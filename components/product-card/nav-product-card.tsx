import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from '../ui/image';
import { IProduct } from '../../types/product.types';


const NavProductCard = ({
  className,
  ...product
}: IProduct & { className?: string }) => {
  const { name, attachment, unitPrice, _id, hasSimilarity } = product;
  return (
    <div
      className={cn(
        'flex-auto flex-shrink-0', 
        className
      )}
    >
      <div style={{
          transform: 'translate3d(196.358px, 0px, 0px)'
   }} className="relative">
        <Link
          href={`/product/${_id}`}
          className="relative block w-[80%] overflow-hidden pb-[80%]"
        > 
          <Image
            src={attachment?.url || ''}
            alt=""
            className="aspect-square w-full h-full absolute inset-0"
            width={200}
            height={200}
            quality={100}
            key={_id}
          />

        </Link>
      </div>

      <div className="text-sm">
        <Link
          href={`/product/${_id}`}
          className="hover:text-primary line-clamp-1"
        >
        </Link>
      
      </div>
    </div>
  );
};

export default NavProductCard;
