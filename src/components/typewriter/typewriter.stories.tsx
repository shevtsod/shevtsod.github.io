import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/nextjs';
import Component from '.';

const meta: Meta<typeof Component> = {
  component: Component,
  args: {
    children: faker.lorem.text(),
    duration: 2000,
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {};

export const Styled: Story = {
  args: {
    children: faker.lorem.paragraphs(2),
    duration: 5000,
    paused: true,
  },
  decorators: [
    (Story) => (
      <h1 className="text-5xl text-center text-theme-red-400 font-retro">
        <Story />
      </h1>
    ),
  ],
};
