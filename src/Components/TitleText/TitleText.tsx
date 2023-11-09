// TitleText.tsx
import React from 'react';
import { Text as ChakraText } from '@chakra-ui/react';

export interface TitleTextProps {
    value: string;
}

const TitleText: React.FC<TitleTextProps> = ({ value }) => {
    return (
        <ChakraText fontSize="2xl" fontWeight="bold" marginBottom="1rem">
            {value}
        </ChakraText>
    );
};

export default TitleText;
