import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { withRouter } from 'storybook-addon-remix-react-router';
import BlogPostCard from './BlogPostCard';

const meta: Meta<typeof BlogPostCard> = {
  component: BlogPostCard,
  decorators: [withRouter],
};

export default meta;

type Story = StoryObj<typeof BlogPostCard>;

export const Default: Story = {
  args: {
    blogPost: {
      path: 'test',
      frontmatter: {
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraphs(20),
        author: faker.internet.username(),
        date: faker.date.recent(),
      },
      Component: () => <div>Test</div>,
    },
  },
};
