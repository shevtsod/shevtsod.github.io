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
    blogPost: {
      slug: 'test',
      filename: 'test.mdx',
      frontmatter: {
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraphs(20),
        author: faker.internet.username(),
        created: faker.date.recent(),
      },
    },
  },
};
