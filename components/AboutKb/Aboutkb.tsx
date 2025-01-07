import Production from "@/app/production/page";
import { getKbArticlesByCode } from "@/sdk/queries/kb";
import React from "react";

export const revalidate = 1;

export default async function KbPage() {
  const { articles } = await getKbArticlesByCode("production-kb");

  return (
    <div className="container flex flex-wrap gap-4">
      {articles.map((article, index) => (
        <div
          key={index}
          className="basis-1/2 md:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
        >
          <Production />
          <Production />
          <Production />
          <Production />
        </div>
      ))}
    </div>
  );
}
