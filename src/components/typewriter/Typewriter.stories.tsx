import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';
import Typewriter from './Typewriter';

const meta: Meta<typeof Typewriter> = {
  component: Typewriter,
  args: {
    text: 'Hello World',
    duration: 2,
    delay: 2,
  },
};

export default meta;

type Story = StoryObj<typeof Typewriter>;

export const Primary: Story = {};

export const Styled: Story = {
  args: {
    text: faker.lorem.paragraphs(2),
    duration: 5,
  },
  decorators: [
    (Story) => (
      <h1 className="text-5xl text-red-600">
        <Story />
      </h1>
    ),
  ],
};
