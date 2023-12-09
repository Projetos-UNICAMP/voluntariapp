// TitleText.tsx
import React from 'react';
import { Text as ChakraText, StyleProps } from '@chakra-ui/react';

export interface TitleTextProps extends StyleProps {
  value: string;
}

const TitleText: React.FC<TitleTextProps> = ({ value, ...styleProps }) => {
  return (
    <ChakraText
      className="main-title"
      fontSize="6xl"
      fontWeight="black"
      lineHeight={1}
      {...styleProps}>
      {value}
    </ChakraText>
  );
};

export default TitleText;
