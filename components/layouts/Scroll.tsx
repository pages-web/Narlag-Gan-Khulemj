'use client';

import { useMediaQuery } from '@/hooks/use-media-query';
import useIsScrolled from '@/hooks/useIsScrolled';
import { motion } from 'framer-motion';

const Scroll = ({ children }: React.PropsWithChildren) => {
  const isScrolled = useIsScrolled();
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <>
      <motion.div
        className="md:fixed top-0 left-0 w-full flex right-0 z-50 items-center h-[68px] md:h-[100px] text-black bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-white"
        animate={{
          height: isScrolled ? 68 : isMobile ? 68 : 100
        }}
      >
        {children}
      </motion.div>
      <div className="md:mb-24" />
    </>
  );
};

export default Scroll;
