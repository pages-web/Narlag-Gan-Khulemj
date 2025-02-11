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

const AboutUs = async () => {
  let articles: IArticle[] = [];
  try {
    const response = await getKbArticlesByCode('about_us');
    articles = response?.articles || [];
  } catch (error) {
    console.error("Failed to fetch articles:", error);
  }

  if (!articles.length) return <div className="mt-6 md:mt-12" />;

  return (
    <div className="md:container mt-7">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="flex-1 relative aspect-[4/3] md:aspect-[3/2] lg:aspect-[3/1.5] overflow-hidden shadow-md">
          <Image
            src={articles[0]?.image?.url || ''}
            alt="About Us"
            width={800}
            height={600}
            className="absolute object-cover inset-0"
            skipAnimation
          />
        </div>
        <div className="flex-1 text-gray-800">
          <h2 className="text-3xl font-semibold text-green-800 mb-4">
            {articles[0]?.title || 'About Us'}
          </h2>
          <div
            className="text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: articles[0]?.content || '' }}
          />
        </div>
      </div>
    </div>
  );
};

const AboutUsItem = ({ _id, image, summary, attachments }: IArticle) => {
  return (
    <CarouselItem className="flex-basis-[1] pl-0" key={_id}>
      <Link
        className="relative aspect-[4/5] md:aspect-[13/5] overflow-hidden block"
        href="about"
      >
        <Image
          src={image?.url}
          alt=""
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
      </Link>
    </CarouselItem>
  );
};

export default AboutUs;
