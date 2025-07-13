import type { Meta, StoryObj } from '@storybook/react-vite';
import { withRouter } from 'storybook-addon-remix-react-router';
import IndexRoute from './IndexRoute';

const meta: Meta<typeof IndexRoute> = {
  component: IndexRoute,
  decorators: [withRouter],
};

export default meta;

type Story = StoryObj<typeof IndexRoute>;

export const Default: Story = {};
