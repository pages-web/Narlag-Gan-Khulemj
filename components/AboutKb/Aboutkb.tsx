import Production from "@/app/production/page";
import { getKbArticlesByCode } from "@/sdk/queries/kb";
import React from "react";

export const revalidate = 1;

export default async function KbPage() {
  const { articles } = await getKbArticlesByCode("production-kb");

  return (
    <div className="flex flex-wrap gap-10">
          <Production />
          <Production />
          <Production />
          <Production />
    </div>
  );
}
