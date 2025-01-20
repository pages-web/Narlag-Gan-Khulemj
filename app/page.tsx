import { CategoryCard } from "@/components/category-card/category-card";
import Display from "@/components/display/display-new";
import GridBanner from "@/components/grid-banner/grid-banner";
import { Heading } from "@/components/heading/heading";
import RecommendedProducts from "@/components/recommended-products/recommended-products";
import NavProducts from "@/components/nav-products/nav-products";
import { Button } from "@/components/ui/button";
import { getConfig } from "@/sdk/queries/auth";
import { Metadata } from "next/types";
import { Suspense } from "react";
import { IPageProps } from "@/types";
import HomeCategory from "./home-category/page";
import ScreenBanner from "@/components/screenbanner/screen-banner";
import MainBanner from "./main-banner/page";
import KbPage from "@/components/AboutKb/Aboutkb";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getConfig();

  return {
    title: config.name + " - Нүүр хуудас",
    openGraph: {
      title: config.name + " - Нүүр хуудас",
    },
  };
}

export default function Home(props: IPageProps) {
  return (
    <div className="min-h-screen">
      
      <Suspense>
       <MainBanner />
      </Suspense>
      <ScreenBanner />
      <div className="container mb-20 md:mb-14">
         <KbPage/>
      </div>
      
      <CategoryCard />

      <Display />


      <HomeCategory {...props} />
      
      <div className="container mb-20 md:mb-14">
      <div className="mx-6 md:mx-12">
        <Heading title="Онцлох бүтээгдэхүүн" className="text-left mb-3 md:mb-5 "/>
          <Suspense>
            <RecommendedProducts/>
          </Suspense>
        </div>
      </div>
      
      {/* <div className="container mb-6 md:mb-16">
        <hr className="border-t border-gray-300 w-1/1 mx-auto" />
      </div> */}
    </div>
  );
}

