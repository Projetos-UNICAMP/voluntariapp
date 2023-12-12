// AppLogo.tsx
import React from 'react';
import { Image } from '@chakra-ui/react';

export enum LogoSize {
  Small = 'Small',
  Large = 'Large',
}

export interface AppLogoProps {
  size: LogoSize;
}

const AppLogo: React.FC<AppLogoProps> = ({ size }) => {
  const imageWidth = size === LogoSize.Large ? '680px' : '186px';
  const imageHeight = size === LogoSize.Large ? '93px' : '24px';

  return (
    <Image
      src="/assets/title.png"
      width={imageWidth}
      height={imageHeight}
      alt="Application Logo"
    />
  );
};

export default AppLogo;
