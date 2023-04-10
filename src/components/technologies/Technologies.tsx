import { Box } from '@chakra-ui/react';

export interface TechnologiesProps {
  className?: string;
}

export default function Technologies({ className }: TechnologiesProps) {
  return <Box as="section" id="technologies"></Box>;
}
