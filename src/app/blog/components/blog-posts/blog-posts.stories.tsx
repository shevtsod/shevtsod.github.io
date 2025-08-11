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
    blogPosts: Array.from({ length: 20 }).map((_, i) => ({
      slug: `test-${i}`,
      filename: `test-${i}.mdx`,
      frontmatter: {
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        author: faker.internet.username(),
        date: faker.date.recent(),
      },
    })),
  },
};
