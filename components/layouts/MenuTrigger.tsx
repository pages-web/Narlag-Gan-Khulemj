import { MenuIcon, ArrowLeftIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '../ui/sheet';
import Links from './Links';
import Footer from '../footer/footer';

const MenuTrigger = ({ domain }: { domain: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col p-0 pt-4">
        <SheetHeader className="items-start">
          <SheetClose>
            <Button variant="ghost">
              <ArrowLeftIcon className="mr-2 h-5 w-5" /> Буцах
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className="p-4 flex flex-col items-start gap-2 flex-auto">
          <Links domain={domain} />
        </div>
        <SheetFooter>
          {/* <Footer className="mb-0" /> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MenuTrigger;
