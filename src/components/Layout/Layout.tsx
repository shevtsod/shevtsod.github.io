import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { GridItem, chakra, shouldForwardProp } from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';

const ChakraGrid = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

export interface LayoutProps {
  children: React.ReactElement;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ChakraGrid
      display="grid"
      gridTemplateColumns="1fr"
      initial={{
        scale: 1.1,
        opacity: 0,
        filter: 'blur(10px)',
      }}
      whileInView={{ scale: 1, opacity: 1, filter: 'blur(0)' }}
      viewport={{ once: true }}
      // @ts-ignore
      transition={{
        duration: 1.2,
      }}
    >
      <GridItem as={Header} />
      <GridItem as="main">{children}</GridItem>
      <GridItem as={Footer} />
    </ChakraGrid>
  );
}
