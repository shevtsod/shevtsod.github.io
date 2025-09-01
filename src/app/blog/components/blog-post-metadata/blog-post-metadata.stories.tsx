import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/nextjs';
import Component from '.';

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {
  args: {
    frontmatter: {
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraphs(20),
      author: faker.internet.username(),
      created: faker.date.recent(),
      updated: faker.date.recent(),
      tags: Array.from({ length: 3 }).map(() => faker.lorem.word()),
    },
  },
};
