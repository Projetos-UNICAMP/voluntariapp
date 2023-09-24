// SimpleDropdown.stories.tsx
import React from 'react';
import FinalDropDown, { FinalDropdownProps } from './FinalDropDown';
import { Story, Meta } from '@storybook/react';

export default {
    title: 'Components/FinalDropDown',
    component: FinalDropDown,
} as Meta;

const Template: Story<FinalDropdownProps>  = (args: FinalDropdownProps) => <FinalDropDown {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'Choose an item',
    options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ],
};
