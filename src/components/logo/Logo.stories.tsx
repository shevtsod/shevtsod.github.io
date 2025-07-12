import type { Meta, StoryObj } from '@storybook/react-vite';
import Logo from './Logo';

const meta: Meta<typeof Logo> = {
  component: Logo,
  args: {
    className: 'h-[128px] w-[128px]',
  },
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {};

export const Animated: Story = {
  args: {
    animated: true,
  },
};
