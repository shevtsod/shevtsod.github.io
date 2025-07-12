import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react-vite';
import ScrambledText from './ScrambledText';

const meta: Meta<typeof ScrambledText> = {
  component: ScrambledText,
  args: {
    children: faker.lorem.text(),
  },
};

export default meta;

type Story = StoryObj<typeof ScrambledText>;

export const Default: Story = {};
