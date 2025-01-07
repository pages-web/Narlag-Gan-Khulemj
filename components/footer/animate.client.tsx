'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export const TextUp = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => (
  <motion.div
    initial={{ translateY: 48, opacity: 0 }}
    whileInView={{ translateY: 0, opacity: 1 }}
    className={cn('translate-y-12 opacity-0', className)}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);
