import type { Meta, StoryObj } from '@storybook/nextjs';
import Component from '.';

const meta: Meta<typeof Component> = {
  component: Component,
  args: {
    className: 'h-[128px] w-[128px]',
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {};

export const Animated: Story = {
  args: {
    animated: true,
  },
};
