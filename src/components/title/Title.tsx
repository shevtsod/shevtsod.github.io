import { chakra, shouldForwardProp } from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';
import { useRef } from 'react';

const ChakraHeading = chakra(motion.span, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

export interface TitleProps {
  className?: string;
}

export default function Title({ className }: TitleProps) {
  const headingRef = useRef<HTMLSpanElement>(null);

  return (
    <ChakraHeading
      ref={headingRef}
      className={className}
      fontSize={['5xl', '7xl', '9xl']}
      fontWeight={900}
      bgGradient="repeating-linear-gradient(120deg, primary, secondary, primary)"
      bgClip="text"
      backgroundSize="200% 100%"
      animate={{
        backgroundPosition: ['0% 50%', '200% 50%'],
      }}
      // @ts-ignore
      transition={{
        backgroundPosition: {
          duration: 5,
          ease: 'linear',
          repeat: Infinity,
        },
      }}
    >
      Daniel Shevtsov
    </ChakraHeading>
  );
}
