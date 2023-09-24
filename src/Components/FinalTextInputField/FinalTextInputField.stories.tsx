// FinalTextInputField.stories.tsx
import React, { useState } from 'react';
import FinalTextInputField, { FinalTextInputFieldProps } from './FinalTextInputField';
import { Story, Meta } from '@storybook/react';

export default {
    title: 'Components/FinalTextInputField',
    component: FinalTextInputField,
} as Meta;

const Template: Story<FinalTextInputFieldProps> = (args) => {
    const [text, setText] = useState("");
    return <FinalTextInputField {...args} value={text} onChange={setText} />;
};

export const Default = Template.bind({});
Default.args = {
    placeholder: 'Enter text here...',
};
