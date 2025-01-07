'use client';
import { useEffect, useState } from 'react';
import { Carousel, type CarouselApi, CarouselContent } from '../ui/carousel';
import { useSearchParams } from 'next/navigation';

const CarouselCategoryCard = ({
  children,
  orders,
}: React.PropsWithChildren<{ orders: string[] }>) => {
  const order = useSearchParams().get('order');
  const [emblaMainApi, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (order) {
      if (!emblaMainApi) return;
      emblaMainApi.scrollTo(orders.indexOf(order));
    }
  }, [order, emblaMainApi]);
  return (
    <Carousel
      className="mx-auto"
      opts={{
        dragFree: true,
      }}
      setApi={(ap) => setApi(ap)}
    >
      <CarouselContent className="-ml-6 md:-ml-10">{children}</CarouselContent>
    </Carousel>
  );
};

export default CarouselCategoryCard;
