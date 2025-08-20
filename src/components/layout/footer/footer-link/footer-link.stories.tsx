import type { Meta, StoryObj } from '@storybook/nextjs';
import Component from '.';

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {
  args: {
    footerLinkSection: {
      key: 'social',
      footerLinks: [],
    },
    footerLink: {
      key: 'github',
      icon: 'Github',
      href: 'https://github.com/shevtsod',
      target: '_blank',
    },
  },
};
