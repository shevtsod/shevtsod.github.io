import type { Meta, StoryObj } from '@storybook/react-vite';
import Technologies from './Technologies';

const meta: Meta<typeof Technologies> = {
  component: Technologies,
};

export default meta;

type Story = StoryObj<typeof Technologies>;

export const Default: Story = {};
