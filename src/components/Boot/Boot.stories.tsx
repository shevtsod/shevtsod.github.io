import type { Meta, StoryObj } from '@storybook/react-vite';
import Boot from './Boot';

const meta: Meta<typeof Boot> = {
  component: Boot,
};

export default meta;

type Story = StoryObj<typeof Boot>;

export const Default: Story = {};
