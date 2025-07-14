import type { Meta, StoryObj } from '@storybook/react-vite';
import { withRouter } from 'storybook-addon-remix-react-router';
import Skills from './Skills';

const meta: Meta<typeof Skills> = {
  component: Skills,
  decorators: [withRouter],
};

export default meta;

type Story = StoryObj<typeof Skills>;

export const Default: Story = {};
