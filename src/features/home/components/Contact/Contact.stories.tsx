import type { Meta, StoryObj } from '@storybook/react-vite';
import { withRouter } from 'storybook-addon-remix-react-router';
import Contact from './Contact';

const meta: Meta<typeof Contact> = {
  component: Contact,
  decorators: [withRouter],
};

export default meta;

type Story = StoryObj<typeof Contact>;

export const Default: Story = {};
