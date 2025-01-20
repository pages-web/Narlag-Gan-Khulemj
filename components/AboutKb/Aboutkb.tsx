import { getKbArticlesByCode } from "@/sdk/queries/kb";
import React from "react";
import HomeAboutUs from "./HomeAboutUs";
import HomeNews from "./HomeNews";
import HomeProject from "./ProjectKb";

import Link from "next/link";
export const revalidate = 1;

export default async function KbPage() {
  // const { articles } = await getKbArticlesByCode("production-kb");

  return (
    <div className="container grid grid-cols-3 md:grid-cols-3 p-1 md:p-1 gap-1">
      <HomeAboutUs />
      <HomeNews />
      <HomeProject />
    </div>
  );
}
