import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from '../ui/image';
import { IProduct } from '../../types/product.types';

const FooterProductsCard = ({
  className,
  ...product
}: IProduct & { className?: string }) => {
  const { name, attachment, _id } = product;
  return (
    <div className={cn(className, "group")}> {/* Applying scroll animation */}
      <div className="relative">
        <Link
          href={`/product/${_id}`}
          className="block overflow-hidden -space-x-6 animate-loop-scroll"
        >
          <Image
            src={attachment?.url || ''}
            alt={name || 'Product image'}
            className="w-full h-auto object-cover transition duration-300 ease-in-out transform hover:scale-105"
            width={1200}
            height={300}
            quality={100}
            key={_id}
          />
        </Link>
      </div>
    </div>
  );
};

export default FooterProductsCard;
