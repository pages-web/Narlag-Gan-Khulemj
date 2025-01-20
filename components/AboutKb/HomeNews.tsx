import { getKbArticlesByCode } from '@/sdk/queries/kb';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

import { IArticle } from '@/types/kb.types';
import Link from 'next/link';
import Image from '@/components/ui/image';

const HomeNews = async () => {
  let articles: IArticle[] = [];
  try {
    const response = await getKbArticlesByCode('news-kb');
    articles = response?.articles || [];
  } catch (error) {
    console.error("Failed to fetch articles:", error);
  }

  if (!articles.length) return <div className="mt-6 md:mt-12" />;

  return (
    <div className="md:container">
      <Link
          className="text-lg leading-relaxed hover:text-[rgb(41,91,47)] md:my-6"
          dangerouslySetInnerHTML={{ __html: articles[0].title }}
          href='news'
        />
      <Carousel className="mb-4 md:mt-4 md:mb-8 no-scroll">
        <CarouselContent className="ml-0">
          {articles.map(article => (
            <HomeNewsItem key={article._id} {...article} />
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

const HomeNewsItem = ({ _id, image, summary, attachments }: IArticle) => {
  return (
    <CarouselItem className="flex-basis-[1] pl-0" key={_id}>
       <Link
        className="relative aspect-[4/5] md:aspect-[13/5] overflow-hidden block"
        href='news'
      >
      <div
        className="relative aspect-[4/5] md:aspect-[13/5] overflow-hidden block"
      >
        <Image
          src={image?.url}
          alt={summary || "image"}
          width={1536}
          height={600}
          className="absolute object-cover inset-0 object-center hidden md:block"
          skipAnimation
        />
        <Image
              src={(attachments || [])[0]?.url || ''}
              alt=""
              width={1536}
              height={600}
              skipAnimation
              className="absolute object-cover inset-0 object-center md:hidden"
            />
      </div>
      </Link>
    </CarouselItem>
  );
};

export default HomeNews;

