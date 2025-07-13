import type { Meta, StoryObj } from '@storybook/react-vite';
import { withRouter } from 'storybook-addon-remix-react-router';
import Layout from './Layout';

const meta: Meta<typeof Layout> = {
  component: Layout,
  decorators: [withRouter],
};

export default meta;

type Story = StoryObj<typeof Layout>;

export const Default: Story = {};
