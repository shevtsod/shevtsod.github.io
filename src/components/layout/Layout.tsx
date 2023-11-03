'use client';

import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { Grid, GridItem } from '@chakra-ui/react';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Grid templateColumns="1fr">
      <GridItem as={Header} />
      <GridItem as="main">{children}</GridItem>
      <GridItem as={Footer} />
    </Grid>
  );
}
