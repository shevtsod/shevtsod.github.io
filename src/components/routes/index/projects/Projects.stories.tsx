import type { Meta, StoryObj } from '@storybook/react';
import Projects from './Projects';

const meta: Meta<typeof Projects> = {
  component: Projects,
};

export default meta;

type Story = StoryObj<typeof Projects>;

export const Default: Story = {};
