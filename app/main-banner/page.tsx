import { getKbArticlesByCode } from '@/sdk/queries/kb';
import { Suspense } from 'react';
// import CarouselClient from './carousel';
import CarouselClient from '@/components/grid-banner/carousel';

const MainBanner = async () => {
  const { articles } = await getKbArticlesByCode('Main-banner');
  if (!articles.length) return null;
  return (
    <div>
      <Suspense>
        <LongBanners />
      </Suspense>
    </div>
  );
};

const LongBanners = async () => {
  const { articles } = await getKbArticlesByCode('Main-banner');
  if (!articles.length) return null;
  return <CarouselClient size="long" items={articles} />;
};



export default MainBanner;