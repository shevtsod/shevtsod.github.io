import {
  Icon as ChakraIcon,
  Text,
  chakra,
  shouldForwardProp,
} from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';
import { IconType } from 'react-icons/lib';

const ChakraLink = chakra(motion.a, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

export interface SocialButtonProps {
  className?: string;
  Icon: IconType;
  children: React.ReactNode;
}

export default function SocialLink({
  className,
  Icon,
  children,
}: SocialButtonProps) {
  return (
    <ChakraLink
      className={className}
      href="https://github.com/shevtsod"
      target="_blank"
      rel="noopener noreferrer"
      px={4}
      py={2}
      m={3}
      display="flex"
      alignItems="center"
      border="1px"
      borderColor="gray.50"
      borderRadius={50}
      backgroundImage="linear-gradient(to-t, gray.50 50%, transparent 0)"
      backgroundPosition="top"
      backgroundSize="200% 200%"
      transitionProperty={['color', 'background-position']}
      transitionDuration="0.1s"
      _hover={{
        backgroundPosition: 'bottom',
        color: 'gray.900',
      }}
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{ scale: 0.9 }}
    >
      <ChakraIcon as={Icon} boxSize={[4, 5, 6]} mr={1} />
      <Text fontSize={['sm', 'lg', '2xl']}>{children}</Text>
    </ChakraLink>
  );
}
