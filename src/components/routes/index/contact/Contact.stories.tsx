import type { Meta, StoryObj } from '@storybook/react-vite';
import Contact from './Contact';

const meta: Meta<typeof Contact> = {
  component: Contact,
};

export default meta;

type Story = StoryObj<typeof Contact>;

export const Default: Story = {};
