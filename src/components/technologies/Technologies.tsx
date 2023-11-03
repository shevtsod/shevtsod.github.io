import { Container, Heading, Stack } from '@chakra-ui/react';
import technologies from '../../data/technologies';
import BrandText from '../brandText/BrandText';
import Technology from '../technology/technology';

export interface TechnologiesProps {
  className?: string;
}

export default function Technologies({ className }: TechnologiesProps) {
  return (
    <Container
      as="section"
      my={5}
      maxW="container.xl"
      id="technologies"
      className={className}
    >
      <Heading as="h2" my={50}>
        <BrandText>Technologies</BrandText>
      </Heading>
      <Stack direction={[null, 'column', 'row']}>
        {technologies.map(({ name, icon }, index) => (
          <Technology key={index} name={name} icon={icon} />
        ))}
      </Stack>
    </Container>
  );
}
