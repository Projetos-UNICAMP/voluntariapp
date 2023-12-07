// SimpleText.stories.tsx
import SimpleText, { SimpleTextProps } from './SimpleText';
import { Story, Meta } from '@storybook/react';

export default {
  title: 'Components/SimpleText',
  component: SimpleText,
} as Meta;

const Template: Story<SimpleTextProps> = (args) => <SimpleText {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 'Sample text',
};
