import type { Meta, StoryObj } from '@storybook/react-vite';
import { withRouter } from 'storybook-addon-remix-react-router';
import BlogRoute from './BlogRoute';

const meta: Meta<typeof BlogRoute> = {
  component: BlogRoute,
  decorators: [withRouter],
};

export default meta;

type Story = StoryObj<typeof BlogRoute>;

export const Default: Story = {};
