import type { Meta, StoryObj } from '@storybook/react-vite';
import { withRouter } from 'storybook-addon-remix-react-router';
import AppErrorRoute from './AppErrorRoute';

const meta: Meta<typeof AppErrorRoute> = {
  component: AppErrorRoute,
  decorators: [withRouter],
};

export default meta;

type Story = StoryObj<typeof AppErrorRoute>;

export const Default: Story = {};
