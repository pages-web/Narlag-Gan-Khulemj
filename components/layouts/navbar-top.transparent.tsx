import Scroll from './Scroll';

const TransparentNavbar = ({ children }: React.PropsWithChildren) => {
  return (
    <Scroll>
      <div className="flex justify-between items-center w-full container relative bg-black">
        {children}
      </div>
    </Scroll>
  );
};

export default TransparentNavbar;
