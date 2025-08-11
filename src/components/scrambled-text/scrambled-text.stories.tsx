import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/nextjs';
import Component from '.';

const meta: Meta<typeof Component> = {
  component: Component,
  args: {
    children: faker.lorem.text(),
  },
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {};
