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
        className="md:fixed top-0 left-0 w-full flex right-0 z-50 items-center h-[34px] md:h-[50px] text-primary-foreground"
        animate={{
          height: isScrolled ? 60 : isMobile ? 60 : 70,
        }}
      >
        {children}
      </motion.div>
      <div className="md:mb-16" />
    </>
  );
};

export default Scroll;
