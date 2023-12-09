// SimpleText.tsx
import React from 'react';
import { Text as ChakraText, StyleProps } from '@chakra-ui/react';

export interface SimpleTextProps extends StyleProps {
  value: string;
  onClick?: () => void;
}

const SimpleText: React.FC<SimpleTextProps> = ({ value, ...styleProps }) => {
  return <ChakraText {...styleProps}>{value}</ChakraText>;
};

export default SimpleText;
