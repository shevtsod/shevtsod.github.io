import BrandText from '@/components/brandText/BrandText';
import SocialLink from '@/components/socialButton/SocialButton';
import { Link } from '@chakra-ui/next-js';
import {
  Box,
  Flex,
  Heading,
  Icon,
  Wrap,
  WrapItem,
  chakra,
  shouldForwardProp,
} from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';
import { useCallback } from 'react';
import { BsChevronDoubleDown } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';

const ChakraBox = chakra(motion.div, {
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
        <Flex
          height="100%"
          width="100%"
          bgImage="radial-gradient(gray.900 16%, transparent 12%);"
          bgSize="30px 30px"
          bgPosition="8px 8px"
          direction="column"
          align="center"
          justify="center"
          textAlign="center"
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
            <Wrap direction="row" align="center" justify="center" spacing={6}>
              <WrapItem>
                <SocialLink Icon={FaGithub}>shevtsod</SocialLink>
              </WrapItem>
            </Wrap>
          </Box>
        </Flex>

        <Flex align="center" position="absolute" w="100%" bottom={20}>
          <ChakraBox
            mx="auto"
            animate={{
              y: [0, 10, 0],
            }}
            // @ts-ignore
            transition={{
              repeat: Infinity,
            }}
          >
            <Link href={ANCHOR_TECHNOLOGIES} onClick={onClickTechnologies}>
              <Icon
                as={BsChevronDoubleDown}
                p={2}
                boxSize={16}
                border="1px"
                borderRadius="50%"
              />
            </Link>
          </ChakraBox>
        </Flex>
      </ChakraBox>
    </Box>
  );
}
