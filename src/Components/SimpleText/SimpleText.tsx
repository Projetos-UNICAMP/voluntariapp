// SimpleText.tsx
import React from 'react';
import { Text as ChakraText } from '@chakra-ui/react';

export interface SimpleTextProps {
    value: string;
}

const SimpleText: React.FC<SimpleTextProps> = ({ value }) => {
    return <ChakraText>{value}</ChakraText>;
};

export default SimpleText;
