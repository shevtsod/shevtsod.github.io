import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { withRouter } from 'storybook-addon-remix-react-router';
import BlogPost from './BlogPost';

const meta: Meta<typeof BlogPost> = {
  component: BlogPost,
  decorators: [withRouter],
};

export default meta;

type Story = StoryObj<typeof BlogPost>;

export const Default: Story = {
  args: {
    blogPost: {
      path: 'test',
      frontmatter: {
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        author: faker.internet.username(),
        date: faker.date.recent().toISOString(),
      },
      Component: () => (
        <div>
          {Array.from({ length: 5 }).map((_, i) => (
            <p key={i}>{faker.lorem.paragraph()}</p>
          ))}
        </div>
      ),
    },
  },
};
