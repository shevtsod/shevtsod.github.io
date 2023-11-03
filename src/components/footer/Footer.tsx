'use client';

import BrandText from '@/components/brandText/BrandText';
import { Box, Flex, Icon, Link, Text } from '@chakra-ui/react';
import socials from '../../data/socials';

export interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <Box as="footer" className={className} overflow="hidden">
      <Box h={1} bgGradient="linear(to-r, primary, secondary)"></Box>
      <Box pt={12} pb={6} mx="auto" maxW="container.xl">
        <Flex
          direction={['column', 'row']}
          justify={['center', 'start']}
          align={['center', 'start']}
        >
          <Flex align="center" mx={6}>
            <Box m={4}>
              <BrandText fontSize="xl" fontWeight="bold" my={1}>
                Social
              </BrandText>
              {socials.map(({ title, icon, href }, index) => (
                <Link key={index} href={href} isExternal>
                  <Text display="flex" alignItems="center">
                    <Icon as={icon} mr={1} />
                    {title}
                  </Text>
                </Link>
              ))}
            </Box>
          </Flex>
        </Flex>

        <Flex mt={12} mb={6} align="center" justify="center">
          <Text fontSize="sm">© 2023 Daniel Shevtsov</Text>
        </Flex>
      </Box>
    </Box>
  );
}
