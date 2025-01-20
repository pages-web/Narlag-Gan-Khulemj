import Link from "next/link";
import Image from "@/components/ui/image";
import { getConfig } from "@/sdk/queries/auth";

const Logo = async () => {
  const { config } = await getConfig();
  const { logo } = config?.uiOptions || {};
  return (
    <Link href="/" aria-label="SF Homepage">
      <Image
        src={logo}
        height={26}
        width={200}
        quality={100}
        skipAnimation
        priority
        alt=""
        className="object-contain object-left h-10"
      />
    </Link>
  );
};

export default Logo;
