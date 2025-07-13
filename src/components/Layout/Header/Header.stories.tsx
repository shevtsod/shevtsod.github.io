import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { withRouter } from 'storybook-addon-remix-react-router';
import Header from './Header';

const meta: Meta<typeof Header> = {
  component: Header,
  decorators: [
    (Story) => (
      <div className="h-[150svh]">
        <Story />
        {[...Array(20)].map((_e, i) => (
          <p key={i}>{faker.lorem.paragraph()}</p>
        ))}
      </div>
    ),
    withRouter,
  ],
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};

export const ShowOnScroll: Story = {
  args: {
    showOnScroll: true,
  },
};
