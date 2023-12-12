// RightImageLayoutComponent.stories.tsx
import RightImageLayoutComponent, {
  RightImageLayoutComponentProps,
} from './RigthImageLayout';
import { Story, Meta } from '@storybook/react';

export default {
  title: 'Components/RightImageLayoutComponent',
  component: RightImageLayoutComponent,
} as Meta;

const Template: Story<RightImageLayoutComponentProps> = (args) => (
  <RightImageLayoutComponent {...args}>
    <p>PlaceHolder.</p>
  </RightImageLayoutComponent>
);

export const Default = Template.bind({});
Default.args = {
  imageUrl: '/assets/pens.png', // replace with a sample image path for the story
};
