"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const CategoryFilter = () => {
  const sort = useSearchParams().get("sort");
  const categoryId = useSearchParams().get("categoryId");
  const router = useRouter();

  return (
    <div>
      <span className="block py-2 px-4 mb-4 bg-[rgb(41,91,47)] typography-headline-6 text-white font-bold text-neutral-900 uppercase tracking-widest ">
        {("Эрэмблэх")}
      </span>

      <Select
        defaultValue={"newToOld"}
        value={sort || "newToOld"}
        onValueChange={(val) =>
          router.push(`/category/?sort=${val}&categoryId=${categoryId}`)
        }
      >
        <SelectTrigger className="w-full h-11">
          <SelectValue placeholder={("Sort")} />
        </SelectTrigger>
        <SelectContent>
        
          <SelectItem value="newToOld">{("Шинэ нь эхэндээ")}</SelectItem>
          <SelectItem value="oldToNew">{("Хуучин нь эхэндээ")}</SelectItem>
          <SelectItem value="priceUp">{("Үнэ өсөхөөр")}</SelectItem>
          <SelectItem value="priceDown">{("Үнэ буурахаа")}</SelectItem>

        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryFilter;