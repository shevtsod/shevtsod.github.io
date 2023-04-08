import { StyleFunctionProps, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import poppins from '../fonts/poppins';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    body: poppins.style.fontFamily,
    heading: poppins.style.fontFamily,
  },
  colors: {
    primary: '#710193',
    secondary: '#ed254e',
    accent: '#bfcde0',
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode('white', 'black')(props),
      },
    }),
  },
});

export default theme;
