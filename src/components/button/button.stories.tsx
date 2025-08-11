import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/nextjs';
import Component from '.';

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {
  args: {
    children: faker.lorem.sentence(),
    onClick: () => window.alert('Clicked!'),
  },
};

export const Variant: Story = {
  args: {
    children: faker.lorem.sentence(),
  },
  render: (args) => (
    <div className="inline-flex flex-col">
      <Component {...args} variant="success" />
      <Component {...args} variant="info" />
      <Component {...args} disabled />
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
