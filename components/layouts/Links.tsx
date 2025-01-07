import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import Link from 'next/link';
import { getConfig } from '@/sdk/queries/auth';
import { SheetClose } from '../ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// import { useTranslations } from 'next-intl';

const Links = ({ desktop, domain }: { desktop?: boolean; domain: string }) => {
  const navLinks = [
    {
      text: ('Үндсэн Нүүр'),
      url: '/',
    },
    //domain avna
    { text: ('Дэлгүүр'), url: '/category' },
    { text: ('Блог'), url: `${domain}/narlag/blog` },
    // {
    //   text: ('Блог'),
    //   url: `${domain}/narlag/blog`,
    // },
    {
      text: ('Бидний тухай'),
      url: `${domain}/narlag/about`,
    },
  ];
  
  return (
    <>
    <div className='text-black'>
      {navLinks?.map((link) =>
        !desktop && link.url === '/' ? (
          <SheetClose key={link.url} asChild>
            {/* <LinkItem {...link} /> */}
          </SheetClose>
        ) : (
          <LinkItem {...link} key={link.url} />
        )
      )}
      </div>
    </>
  );
};

const LinkItem = ({ url, text }: { url: string; text: string }) => (
  <Button
    variant="link"
    className={cn('text-inherit px-4', url === '/' && '')}
    size="lg"
    asChild
  >
      <Link href={url || ''}>{text}</Link>
  </Button>
);

export default Links;
