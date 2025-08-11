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
        description: faker.lorem.paragraph(),
        author: faker.internet.username(),
        date: faker.date.recent(),
      },
    },
    children: (
      <div>
        {Array.from({ length: 5 }).map((_, i) => (
          <p key={i}>{faker.lorem.paragraph()}</p>
        ))}
      </div>
    ),
  },
};
