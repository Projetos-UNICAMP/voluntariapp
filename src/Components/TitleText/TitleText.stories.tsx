// TitleText.stories.tsx
import TitleText, { TitleTextProps } from './TitleText';
import { Story, Meta } from '@storybook/react';

export default {
  title: 'Components/TitleText',
  component: TitleText,
} as Meta;

const Template: Story<TitleTextProps> = (args) => <TitleText {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 'Sample Title Text',
};
