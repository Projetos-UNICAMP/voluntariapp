// SimpleText.tsx
import React from 'react';
import { Text as ChakraText } from '@chakra-ui/react';

export interface SimpleTextProps {
  value: string;
}

const SimpleText: React.FC<SimpleTextProps> = ({ value }) => {
  return (
    <ChakraText marginTop={2} marginBottom={2}>
      {value}
    </ChakraText>
  );
};

export default SimpleText;
