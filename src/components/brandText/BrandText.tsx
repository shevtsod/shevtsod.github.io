'use client';

import { ChakraProps, chakra, shouldForwardProp } from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';

const ChakraSpan = chakra(motion.span, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

export interface BrandTextProps extends ChakraProps {
  className?: string;
  children: React.ReactNode;
  animated?: boolean;
}

export default function BrandText({
  className,
  children,
  animated,
  ...props
}: BrandTextProps) {
  return (
    <ChakraSpan
      className={className}
      bgGradient="repeating-linear-gradient(120deg, primary, secondary, primary)"
      bgClip="text"
      backgroundSize="200% 100%"
      animate={
        animated && {
          backgroundPosition: ['0% 50%', '200% 50%'],
        }
      }
      // @ts-ignore
      transition={{
        backgroundPosition: {
          duration: 5,
          ease: 'linear',
          repeat: Infinity,
        },
      }}
      {...props}
    >
      {children}
    </ChakraSpan>
  );
}
