import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: faker.lorem.sentence(),
    onClick: () => console.log('Clicked!'),
  },
};

export const Variant: Story = {
  args: {
    children: faker.lorem.sentence(),
  },
  render: (args) => (
    <div className="inline-flex flex-col">
      <Button {...args} variant="success" />
      <Button {...args} variant="info" />
      <Button {...args} disabled />
    </div>
  ),
};

export const Active: Story = {
  args: {
    children: faker.lorem.sentence(),
    active: true,
  },
};

export const Link: Story = {
  args: {
    as: 'a',
    href: 'https://youtu.be/83m261lAlrs',
    target: '_blank',
    children: faker.lorem.sentence(),
  },
};
