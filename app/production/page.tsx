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

const MainBanner = async () => {
  const { articles } = await getKbArticlesByCode('production-kb');
  if (!(articles || []).length) return <div className="mt-6 md:mt-12" />;

  return (
    <div className="">
      <Carousel className="mb-4">
        <CarouselContent className="ml-0">
          {articles.map((article) => (
            <BannerItem key={article._id} {...article} />
          ))}
        </CarouselContent>
      </Carousel>
      {/* Render content of the first article */}
      {articles[0]?.content && (
        <div
          className="text-lg leading-relaxed text-gray-800"
          dangerouslySetInnerHTML={{ __html: articles[0].content }}
        />
      )}
    </div>
  );
};

const BannerItem = ({ _id, image, summary, attachments }: IArticle) => {
  return (
    <CarouselItem className="flex-basis-[1] pl-0" key={_id}>
      <Link
        className="relative aspect-[4/5] md:aspect-[13/5] overflow-hidden block"
        href={summary || '/'}
      >
        <Image
          src={image?.url}
          alt=""
          width={2000}
          height={100}
          className="absolute object-cover inset-0 object-center hidden md:block"
          skipAnimation
        />
      </Link>
    </CarouselItem>
  );
};

export default MainBanner;
