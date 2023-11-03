'use client';

import BrandText from '@/components/brandText/BrandText';
import SocialButton from '@/components/socialButton/SocialButton';
import {
  Box,
  Flex,
  Heading,
  Icon,
  Stack,
  chakra,
  shouldForwardProp,
} from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';
import { useCallback } from 'react';
import { BsChevronDoubleDown } from 'react-icons/bs';
import socials from '../../data/socials';

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const ChakraAnchor = chakra(motion.a, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

export interface HeroProps {
  className?: string;
}

const ANCHOR_TECHNOLOGIES = '#technologies';

export default function Hero({ className }: HeroProps) {
  const onClickTechnologies = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      document?.querySelector(ANCHOR_TECHNOLOGIES)?.scrollIntoView({
        behavior: 'smooth',
      });
    },
    []
  );

  return (
    <Box as="section" id="hero" className={className} overflow="hidden">
      <ChakraBox
        h="100vh"
        bgGradient="linear(to-tr, black, gray.800)"
        initial={{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(10px)',
        }}
        whileInView={{ scale: 1, opacity: 1, filter: 'blur(0)' }}
        viewport={{ once: true }}
        // @ts-ignore
        transition={{
          duration: 1,
        }}
      >
        <ChakraBox
          height="100%"
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          _after={{
            content: '""',
            position: 'absolute',
            zIndex: -1,
            inset: 0,
            backgroundImage:
              'radial-gradient(circle at center, gray.900 0.25rem, transparent 0)',
            bgSize: '2rem 2rem',
            bgPosition: '0 0, 1rem 1rem',
            maskImage: 'linear-gradient(to top right, black, transparent)',
          }}
        >
          <Box>
            <Heading as="h1">
              <BrandText
                className={className}
                fontSize={['5xl', '7xl', '9xl']}
                fontWeight={900}
                animated={true}
              >
                Daniel Shevtsov
              </BrandText>
            </Heading>
            <Stack
              direction={[null, 'column', 'row']}
              align="center"
              justify="center"
              spacing={3}
            >
              {socials.map(({ title, icon, href }, index) => (
                <SocialButton key={index} Icon={icon} href={href}>
                  {title}
                </SocialButton>
              ))}
            </Stack>
          </Box>
        </ChakraBox>

        <Flex align="center" position="relative" w="100%" bottom={40}>
          <ChakraAnchor
            display="flex"
            alignItems="center"
            justifyContent="center"
            mx="auto"
            p={2}
            border="1px"
            borderRadius="50%"
            href={ANCHOR_TECHNOLOGIES}
            onClick={onClickTechnologies}
            initial={{
              color: '#ffffff',
              backgroundColor: 'rgba(0, 0, 0, 0)',
            }}
            animate={{
              y: [0, 10, 0],
            }}
            whileHover={{
              color: '#000000',
              backgroundColor: '#ffffff',
            }}
            // @ts-ignore
            transition={{
              y: {
                repeat: Infinity,
              },
            }}
          >
            <Icon as={BsChevronDoubleDown} boxSize={14} />
          </ChakraAnchor>
        </Flex>
      </ChakraBox>
    </Box>
  );
}
