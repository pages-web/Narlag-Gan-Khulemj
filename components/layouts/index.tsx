import { ChevronDownIcon } from '@radix-ui/react-icons';
import { NavbarTop } from './navbar-top';
import { Button } from '../ui/button';
import Search from '../search/search';
import SearchPopup, { SearchPopupTrigger } from "../search/search-popup";
import BottomNav from '../bottom-nav/bottom-nav';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import Footer from '../footer/footer';
import Link from 'next/link';
import CartTrigger from '../cart/cart-trigger';
import CurrentUser from '@/containers/auth/current-user';
import { Suspense } from 'react';
import NavTop from './nav';
import CategoryNavContainer from '@/containers/products/category-nav';
import Top from './Top';
import SearchPopupShow, { SearchPopupTriggerShow } from '../search/search-popup-show';


const DefaultLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
  
      <Top/>
      <NavbarTop>
        <Button
          variant="ghost"
          className="hover:bg-background/0 hidden lg:inline-flex"
          asChild
        >
        <nav className="hidden md:flex md:flex-row md:flex-nowrap gap-4 relative">
          <Suspense>
            <CategoryNavContainer />
          </Suspense>
        </nav>
        
        </Button>
        <Suspense fallback={<div className="hidden lg:block flex-1" />}>
        </Suspense>
       
        <nav className="hidden md:flex md:flex-row md:flex-nowrap gap-4 relative">
          <div className='xl:block hidden'>
            <SearchPopupTrigger />
          </div>
          <div className='xl:hidden'>
            <SearchPopupTriggerShow />
          </div>

          

          <CartTrigger />
          <CurrentUser />
        </nav>

      </NavbarTop>

      <SearchPopup />
      {children}
      <ScrollToTop />
      <Suspense>
        <BottomNav />
      </Suspense>
      <Footer />
    </>
  );
};

export default DefaultLayout;
