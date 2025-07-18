import type { Meta, StoryObj } from '@storybook/react-vite';
import { withRouter } from 'storybook-addon-remix-react-router';
import Projects from './Projects';

const meta: Meta<typeof Projects> = {
  component: Projects,
  decorators: [withRouter],
};

export default meta;

type Story = StoryObj<typeof Projects>;

export const Default: Story = {};
