import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';
import Heading from './Heading';

const meta: Meta<typeof Heading> = {
  component: Heading,
  args: {
    children: faker.lorem.text(),
  },
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {};

export const UsingAsProp: Story = {
  args: {
    as: 'h2',
  },
};
