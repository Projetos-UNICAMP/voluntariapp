// AppLogo.stories.tsx
import React from 'react';
import AppLogo, { AppLogoProps, LogoSize } from './AppLogo';
import { Story, Meta } from '@storybook/react';

export default {
    title: 'Components/AppLogo',
    component: AppLogo,
} as Meta;

const Template: Story<AppLogoProps> = (args) => <AppLogo {...args} />;

export const SmallLogo = Template.bind({});
SmallLogo.args = {
    size: LogoSize.Small,
};

export const LargeLogo = Template.bind({});
LargeLogo.args = {
    size: LogoSize.Large,
};
