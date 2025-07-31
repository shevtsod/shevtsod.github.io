import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { withRouter } from 'storybook-addon-remix-react-router';
import BlogRoute from './BlogRoute';

const meta: Meta<typeof BlogRoute> = {
  component: BlogRoute,
  decorators: [withRouter],
};

export default meta;

type Story = StoryObj<typeof BlogRoute>;

export const Default: Story = {
  args: {
    blogPosts: Array.from({ length: 20 }).map(() => ({
      path: 'blog1',
      Component: () => <div>Test</div>,
      frontmatter: {
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        author: faker.internet.username(),
        date: faker.date.recent(),
      },
    })),
  },
};
