import type { Meta, StoryObj } from '@storybook/nextjs';
import Component from '.';

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {
  args: {
    i18nKey: 'summary1',
    icon: 'Code',
    values: { experienceYears: 0 },
  },
};
