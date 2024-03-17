import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';
import TypewriterText from './TypewriterText';

const meta: Meta<typeof TypewriterText> = {
  component: TypewriterText,
  args: {
    text: 'Hello World',
    duration: 2,
    delay: 2,
  },
};

export default meta;

type Story = StoryObj<typeof TypewriterText>;

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
