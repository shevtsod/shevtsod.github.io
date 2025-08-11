import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/nextjs';
import Component from '.';

const meta: Meta<typeof Component> = {
  component: Component,
  decorators: [
    (Story) => (
      <div className="h-[150svh]">
        <Story />
        {[...Array(20)].map((_e, i) => (
          <p key={i}>{faker.lorem.paragraph()}</p>
        ))}
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {};

export const ShowOnScroll: Story = {
  args: {
    showOnScroll: true,
  },
};
