import TransparentNavbar from "./navbar-top.transparent";
import Logo from "./logo";
import { SearchPopupTrigger } from "../search/search-popup";
import CartTrigger from "../cart/cart-trigger";
import CurrentUser from "@/containers/auth/current-user";
import Links from "./Links";
import MenuTrigger from "./MenuTrigger";
// import LocaleChanger from "./localeChanger";
import { getConfig } from "@/sdk/queries/auth";

const NavTop = async () => {
  const { config } = await getConfig();
  return (
    <TransparentNavbar>
      <Logo />
      <nav className="hidden md:flex md:flex-row md:flex-nowrap gap-4 relative items-center">
        <div className="hidden lg:flex lg:flex-row lg:flex-nowrap inline-flex items-center text-primary-foreground">
          <Links  desktop domain={config?.pdomain} />
        </div>
        <SearchPopupTrigger />
        <CartTrigger />
        <CurrentUser />
      </nav>
      <MenuTrigger domain={config?.domain} />
    </TransparentNavbar>
  );
};

export default NavTop;
