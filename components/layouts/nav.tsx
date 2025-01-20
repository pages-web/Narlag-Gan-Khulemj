import TransparentNavbar from './navbar-top.transparent';
import Logo from './logo';

import { SearchPopupTrigger } from '../search/search-popup';
import CartTrigger from '../cart/cart-trigger';
import CurrentUser from '@/containers/auth/current-user';
import Links from './Links';
import MenuTrigger from './MenuTrigger';
import { getConfig } from '@/sdk/queries/auth';

const NavTop = async () => {
  const { config } = await getConfig();
  return (
    <div>
    <TransparentNavbar>
      <Logo />
       <div className="inline-flex items-center text-primary-foreground">
          <Links desktop domain={config?.pdomain} />
        </div>
      <nav className="hidden md:flex md:flex-row md:flex-nowrap gap-4 relative items-center">
        <SearchPopupTrigger />
        <CartTrigger />
        <CurrentUser />
      
      </nav>
      <MenuTrigger domain={config?.domain} />
    </TransparentNavbar>
    </div>
  );
};

export default NavTop;
