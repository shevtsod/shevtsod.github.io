import type { Meta, StoryObj } from '@storybook/react';
import Hero from './Hero';

const meta: Meta<typeof Hero> = {
  component: Hero,
  args: {
    className: 'h-full',
  },
};

export default meta;

type Story = StoryObj<typeof Hero>;

export const Primary: Story = {};
