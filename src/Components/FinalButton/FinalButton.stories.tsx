// src/components/FinalButton/FinalButton.stories.tsx
import FinalButton, { Props as FinalButtonProps, ButtonStyleOptions } from './FinalButton'; // Import ButtonStyleOptions
import { Story, Meta } from '@storybook/react'; // Change StoryFn to Story

export default {
  title: 'Components/FinalButton',
  component: FinalButton,
  argTypes: {
    style: {
      control: {
        type: 'radio',
        options: [ButtonStyleOptions.Primary, ButtonStyleOptions.Secondary],
      },
    },
  },
} as Meta;

const Template: Story<FinalButtonProps> = (args) => <FinalButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary Button', // Change the label to distinguish between Primary and Secondary buttons
  style: ButtonStyleOptions.Primary, // Set the style to Primary
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary Button', // Change the label to distinguish between Primary and Secondary buttons
  style: ButtonStyleOptions.Secondary, // Set the style to Secondary
};
