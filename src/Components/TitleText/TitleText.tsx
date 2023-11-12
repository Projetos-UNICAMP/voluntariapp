// TitleText.tsx
import React from 'react';
import { Text as ChakraText } from '@chakra-ui/react';

export interface TitleTextProps {
  value: string;
}

const TitleText: React.FC<TitleTextProps> = ({ value }) => {
  return (
    <ChakraText
      className="main-title"
      fontSize="6xl"
      fontWeight="black"
      marginBottom="1rem">
      {value}
    </ChakraText>
  );
};

export default TitleText;
