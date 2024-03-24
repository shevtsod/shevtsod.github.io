import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';
import Typewriter from './Typewriter';

const meta: Meta<typeof Typewriter> = {
  component: Typewriter,
  args: {
    text: faker.lorem.text(),
    duration: 2,
    delay: 2,
  },
};

export default meta;

type Story = StoryObj<typeof Typewriter>;

export const Default: Story = {};

export const Styled: Story = {
  args: {
    text: faker.lorem.paragraphs(2),
    duration: 5,
  },
  decorators: [
    (Story) => (
      <h1 className="text-5xl text-center text-theme-red-400 font-retro">
        <Story />
      </h1>
    ),
  ],
};
