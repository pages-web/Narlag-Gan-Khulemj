'use client';

import { Button } from '@/components/ui/button';
import { IArticle } from '@/types/kb.types';

interface SidebarProps {
  articles: IArticle[];
}

const ProductionSidebar = ({ articles }: SidebarProps) => {
  const handleScroll = (index: number) => {
    const element = document.getElementById(`article-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside 
      className="sticky md:top-28 min-h-[100]"
    >
      <h2 className="text-2xl font-semibold mb-4">Төслүүд</h2>
      <div className="space-y-4">
        {articles.map((article, index) => (
          <Button
            key={article._id}
            onClick={() => handleScroll(index)}
            variant='custom'
            className="w-full"
          >
            {article.title}
          </Button>
        ))}
      </div>
    </aside>
  );
};

export default ProductionSidebar;
