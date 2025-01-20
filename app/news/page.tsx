import { getKbArticlesByCode } from '@/sdk/queries/kb';
import { IArticle } from '@/types/kb.types';
import Link from 'next/link';
import Image from '@/components/ui/image';

const Production = async () => {
  let articles: IArticle[] = [];
  try {
    const response = await getKbArticlesByCode('news-kb');
    articles = response?.articles || [];
  } catch (error) {
    console.error('Failed to fetch articles:', error);
  }

  if (!articles.length) return <div className="mt-6 md:mt-12"/>;

  return (
    <div className="container flex ">
      <main className="flex-1 my-5">
        <h1 className='font-semibold text-2xl' >Мэдээлэл</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {articles.map((article) => (
            <ProductionItem key={article._id} {...article} />
          ))}
        </div>

      </main>
    </div>
  );
};

const ProductionItem = ({ _id, image, summary, title, content}: IArticle) => {
  return (
    <div className="border p-4">
      <h3 className="text-lg font-semibold mt-2">
          {title || 'Untitled'}
      </h3>
        <Image
          src={image?.url || ''}
          alt={summary || 'Image'}
          width={1920}
          height={1080}
          className="object-cover"
        />
      <div
          className="leading-relaxed hover:text-[rgb(41,91,47)]"
          dangerouslySetInnerHTML={{ __html: content || '' }}
      ></div>
    </div>
  );
};

export default Production;
