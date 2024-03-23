import type { Meta, StoryObj } from '@storybook/react';
import AppError from './AppError';

const meta: Meta<typeof AppError> = {
  component: AppError,
};

export default meta;

type Story = StoryObj<typeof AppError>;

export const Default: Story = {};
