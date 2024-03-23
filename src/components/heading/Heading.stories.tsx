import type { Meta, StoryObj } from '@storybook/react';
import Heading from './Heading';

const meta: Meta<typeof Heading> = {
  component: Heading,
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    children: 'Hello World!',
  },
};

export const UsingAsProp: Story = {
  args: {
    children: 'Rendering as h2!',
    as: 'h2',
  },
};
