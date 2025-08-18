import type { Meta, StoryObj } from '@storybook/nextjs';
import Component from './page';

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {};
