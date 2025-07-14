import type { Meta, StoryObj } from '@storybook/react-vite';
import { withRouter } from 'storybook-addon-remix-react-router';
import Experience from './Experience';

const meta: Meta<typeof Experience> = {
  component: Experience,
  decorators: [withRouter],
};

export default meta;

type Story = StoryObj<typeof Experience>;

export const Default: Story = {};
