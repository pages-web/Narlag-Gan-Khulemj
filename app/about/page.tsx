import { getKbArticlesByCode } from "@/sdk/queries/kb";
import React from "react";
export const revalidate = 1;
export default async function AboutUs() {
  const { articles } = await getKbArticlesByCode("about_us");

  return (
    <div className="h-[70vh] mb-6 md:mb-16">
      <div className="max-w-7xl mx-auto my-8 p-6">
        <div
          className="text-lg leading-relaxed text-gray-800"
          dangerouslySetInnerHTML={{ __html: articles[0].content }}
        ></div>
      </div>
    </div>
  );
}