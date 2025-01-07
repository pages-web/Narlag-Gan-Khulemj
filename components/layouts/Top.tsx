import { getBranchDetail } from "@/sdk/queries/auth";
import Link from "next/link";
import { FaFacebook, FaInstagram } from 'react-icons/fa';


const Top = async () => {
  const { branchDetail} = await getBranchDetail();
  const { phoneNumber} = branchDetail || {};
  return (
    <div className=" text-black lg:flex hidden text-[rgb(41,91,47)]">
      <div className="flex justify-between items-center w-full lg:h-[40px] lg:sticky container px-8 py-5">
        <Link href="/" className="text-xs font-bold">
          Нарлаг ган Хүлэмж-д тавтай морилно уу
        </Link>
        <div className="flex justify-end items-center gap-2">
          <Link href="https://www.facebook.com/narlagkhulemj" target="_blank" className="text-xs px-0 flex">
              <FaFacebook size={20} style={{ color: "black" }} />
          </Link>

            <Link className="px-2" href={`tel:${phoneNumber}`}>
              <span className="text-xs">{phoneNumber}</span>
            </Link>
            <div className="border-l-2 border-black h-3 mx-0 "></div>
            <p  className="text-xs px-0">
              99449474
            </p>
            <div className="border-l-2 border-black h-3 mx-0"></div>
            <Link href="/sector" className="text-xs px-1">
              Салбарууд
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Top;