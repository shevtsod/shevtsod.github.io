import type { Meta, StoryObj } from '@storybook/react-vite';
import { withRouter } from 'storybook-addon-remix-react-router';
import Summary from './Summary';

const meta: Meta<typeof Summary> = {
  component: Summary,
  decorators: [withRouter],
};

export default meta;

type Story = StoryObj<typeof Summary>;

export const Default: Story = {};
