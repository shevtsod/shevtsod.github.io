import BrandText from '@/components/brandText/BrandText';
import {
  Box,
  Flex,
  Icon,
  Link,
  Text,
  chakra,
  shouldForwardProp,
} from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

export interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <Box as="footer" className={className} overflow="hidden">
      <Box h={1} bgGradient="linear(to-r, primary, secondary)"></Box>
      <ChakraBox
        pt={12}
        pb={6}
        mx="auto"
        maxW="container.xl"
        initial={{
          y: 40,
          opacity: 0,
        }}
        whileInView={{ y: 0, opacity: 1, filter: 'blur(0)' }}
        viewport={{ once: true }}
      >
        <Box display="flex" alignItems="center" mx={6}>
          <Box m={2}>
            <BrandText fontSize="xl" fontWeight="bold" my={1}>
              Social
            </BrandText>
            <Link href="https://github.com/shevtsod" isExternal>
              <Text display="flex" alignItems="center">
                <Icon as={FaGithub} mr={1} /> shevtsod
              </Text>
            </Link>
          </Box>
        </Box>

        <Flex mt={12} mb={6} align="center" justify="center">
          <Text fontSize="sm">© 2023 Daniel Shevtsov</Text>
        </Flex>
      </ChakraBox>
    </Box>
  );
}
