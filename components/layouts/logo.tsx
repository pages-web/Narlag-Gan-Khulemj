import Link from 'next/link';
import Image from '@/components/ui/image';
import { getConfig } from '@/sdk/queries/auth';

const Logo = async () => {
  const { config } = await getConfig();
  const { logo } = config?.uiOptions || {};
  return (
    <Link href="/" aria-label="SF Homepage">
      <Image
        src={logo}
        height={26}
        width={100}
        quality={100}
        skipAnimation
        priority
        alt=""
        className="object-contain object-center"
      />
    </Link>
  );
};

export default Logo;

