// import BottomNav from '../bottom-nav/bottom-nav';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import Footer from '../footer/footer';
import { Suspense } from 'react';
import SearchPopup from '../search/search-popup';
import NavTop from './nav';
// import Birthday from '../birthday-form';

const DefaultLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <NavTop />
      <SearchPopup />
      {children}
      <ScrollToTop />
      <Suspense>
        {/* <BottomNav /> */}
      </Suspense>
      <Footer />
    </>
  );
};

export default DefaultLayout;
