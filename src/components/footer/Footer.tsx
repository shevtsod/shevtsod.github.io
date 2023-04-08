import { Box, Flex, Icon, Link } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

export interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <Box as="footer" className={className}>
      <Box h={1} bgGradient="linear(to-r, primary, secondary)"></Box>
      <Flex align="center" justify="right" px={8} py={12}>
        <Link
          href="https://github.com/shevtsod"
          isExternal
          display="flex"
          alignItems="center"
        >
          <Icon as={FaGithub} mr={1} /> @shevtsod
        </Link>
      </Flex>
    </Box>
  );
}
