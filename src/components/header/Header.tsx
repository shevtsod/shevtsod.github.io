import { Box } from '@chakra-ui/react';

export interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return <Box as="header" className={className}></Box>;
}
