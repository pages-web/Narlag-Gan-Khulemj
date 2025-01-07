import { getKbArticlesByCode } from '@/sdk/queries/kb';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import Link from 'next/link';
import WrapperImage, { TextUp } from './animate.client';

const ScreenBanner = async () => {
  const { articles } = await getKbArticlesByCode('screen-banner');
  if (!articles.length) return null;

  return (
    <Carousel className="-mt-32">
      <CarouselContent>
        {articles.map((article) => (
          <CarouselItem className="h-svh" key={article._id}>
            <Link
              href=""
              className="relative h-svh w-full flex flex-col bg-neutral-100"
            >
              <WrapperImage src={article.image?.url || ''} />
              <div className="container flex-auto grid md:grid-cols-2 relative">
                <div className="flex flex-col">
                  <div className="flex-auto"></div>
                  <TextUp className="h-1/2 md:h-1/3 md:px-4">
                    <div
                      className="uppercase text-lg font-semibold mb-2"
                      dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                    <h1 className="text-6xl font-semibold">{article.title}</h1>
                  </TextUp>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ScreenBanner;
