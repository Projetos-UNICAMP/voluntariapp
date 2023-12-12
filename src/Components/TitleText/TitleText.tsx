// TitleText.tsx
import React from 'react';
import { Text } from '@chakra-ui/react';

export interface TitleTextProps {
  value: string | undefined;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  weight?: 'normal' | 'bold' | 'extrabold' | 'black' | 'semibold' | 'light';
  mt?: number;
  mb?: number;
}

const TitleText: React.FC<TitleTextProps> = ({
  value,
  size,
  weight,
  mt,
  mb,
}) => {
  return (
    <Text
      fontSize={size || '3xl'}
      fontWeight={weight || 'bold'}
      lineHeight={1}
      mt={mt}
      mb={mb}>
      {value}
    </Text>
  );
};

export default TitleText;
