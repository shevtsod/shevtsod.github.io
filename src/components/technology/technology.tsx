import { Box, Text } from '@chakra-ui/react';

export interface TechnologyProps {
  name: string;
  icon: string;
}

export default function Technology({ name, icon }: TechnologyProps) {
  return (
    <Box>
      <Box as="i" fontSize="20em" className={icon} />
      <Text>{name}</Text>
    </Box>
  );
}
