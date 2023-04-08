import SocialLink from '@/components/socialButton/SocialButton';
import Title from '@/components/title/Title';
import { Flex, Heading, Wrap, WrapItem } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

export interface HeroProps {
  className?: string;
}

export default function Hero({ className }: HeroProps) {
  return (
    <Flex
      as="section"
      className={className}
      h="100vh"
      bgGradient="linear(to-tr, black, gray.800)"
      direction="column"
      align="center"
      justify="center"
      textAlign="center"
    >
      <Heading as="h1">
        <Title />
      </Heading>
      <Wrap direction="row" align="center" justify="center" spacing={6}>
        <WrapItem>
          <SocialLink Icon={FaGithub}>@shevtsod</SocialLink>
        </WrapItem>
      </Wrap>
    </Flex>
  );
}
