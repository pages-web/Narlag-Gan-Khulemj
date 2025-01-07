'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const WrapperImage = ({ src }: { src?: string }) => {
  const [loading, setLoading] = useState(true);
  return (
    <motion.div
      initial={{ scale: 1.15 }}
      animate={{ scale: loading ? 1.15 : 1 }}
      className="absolute inset-0 w-full h-full scale-[115]"
      transition={{ spring: 0, duration: 0.5 }}
    >
      <Image
        src=""
        fill
        className="object-cover object-center w-full h-full"
        alt=""
        quality={100}
        onLoad={() => setLoading(false)}
      />
    </motion.div>
  );
};

export const TextUp = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => (
  <motion.div
    initial={{ translateY: 32, opacity: 0 }}
    animate={{ translateY: 0, opacity: 1 }}
    className={cn('translate-y-8 opacity-0', className)}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);

export default WrapperImage;
