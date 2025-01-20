import { getKbArticlesByCode } from '@/sdk/queries/kb';
import { IArticle } from '@/types/kb.types';
import ProductionSidebar from './ProductionSidebar';
import Image from '@/components/ui/image';

const Production = async () => {
  let articles: IArticle[] = [];
  try {
    const response = await getKbArticlesByCode('project-kb');
    articles = response?.articles || [];
  } catch (error) {
    console.error('Failed to fetch articles:', error);
  }

  if (!articles.length) return <div className="mt-6 md:mt-12" />;

  return (
    <div className="container flex flex-col md:flex-row gap-6 min-h-screen mt-4">
      <div>
        <ProductionSidebar articles={articles} />
      </div>
      <main className="flex-1 p-4  overflow-auto">
        {articles.map((article, index) => (
          <ProductionItem key={article._id} index={index} {...article} />
        ))}
      </main>
    </div>
  );
};

const ProductionItem = ({ _id, image, summary, title, content, index }: IArticle & { index: number }) => {
  return (
    <div id={`article-${index}`} className="border p-4 mb-6 shadow-sm">
      <h3 className="text-lg font-semibold mt-2 text-gray-900">{title || 'Untitled'}</h3>
      <Image
        src={image?.url || ''}
        alt={summary || 'Image'}
        width={1200}
        height={800}
        className=" object-cover mt-2"
      />
      <div
        className="leading-relaxed text-gray-700 mt-2"
        dangerouslySetInnerHTML={{ __html: content || '' }}
      ></div>
    </div>
  );
};

export default Production;
