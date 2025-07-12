import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Typewriter from './Typewriter';

const meta: Meta<typeof Typewriter> = {
  component: Typewriter,
  args: {
    children: faker.lorem.text(),
    duration: 2000,
  },
};

export default meta;

type Story = StoryObj<typeof Typewriter>;

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
