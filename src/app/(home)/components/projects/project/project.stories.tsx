import type { Meta, StoryObj } from '@storybook/nextjs';
import Component from '.';

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {
  args: {
    project: {
      title: 'Personal Website',
      description:
        'This website, inspired by retro video games, was built to showcase projects and skills and includes a personal blog.',
      skills: ['react', 'github', 'github-actions'],
      promo: {
        path: '/videos/projects/480p/personal-website.mp4',
        type: 'video',
      },
      links: [
        {
          key: 'website',
          url: 'https://shevtsod.com',
        },
        {
          key: 'repository',
          url: 'https://github.com/shevtsod/shevtsod.github.io',
        },
      ],
    },
  },
};
