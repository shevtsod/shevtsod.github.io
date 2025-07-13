import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-remix-react-router';
import BlogPostRoute from './BlogPostRoute';

const meta: Meta<typeof BlogPostRoute> = {
  component: BlogPostRoute,
  decorators: [withRouter],
};

export default meta;

type Story = StoryObj<typeof BlogPostRoute>;

export const Default: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { path: 'under-construction' },
      },
      routing: {
        path: '/blog/:path',
      },
    }),
  },
};
