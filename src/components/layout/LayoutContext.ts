import { createContext, type Dispatch, type SetStateAction } from 'react';

export interface LayoutOptions {
  /**
   * Whether to show the boot animation
   */
  showBoot: boolean;

  /**
   * Whether the header should only be shown when user scrolled
   */
  showHeaderOnScroll: boolean;
}

export interface LayoutContextType {
  layoutOptions: LayoutOptions;
  setLayoutOptions: Dispatch<SetStateAction<LayoutOptions>>;
}

export const defaultLayoutOptions: LayoutOptions = {
  showBoot: false,
  showHeaderOnScroll: false,
};

export default createContext<LayoutContextType>({
  layoutOptions: defaultLayoutOptions,
  setLayoutOptions: () => {},
});
