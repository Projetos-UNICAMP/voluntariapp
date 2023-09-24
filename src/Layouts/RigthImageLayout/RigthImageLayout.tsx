// RightImageLayoutComponent.tsx
import React from 'react';
import { Box, Image, Flex } from '@chakra-ui/react';

export interface RightImageLayoutComponentProps {
    children: React.ReactNode;
    imageUrl: string;
}

const RightImageLayoutComponent: React.FC<RightImageLayoutComponentProps> = ({ children, imageUrl }) => {
    return (
        <Flex direction="row" h="100vh">
            <Box flex="63%">
                {children}
            </Box>
            <Box flex="47%">
                <Image src={imageUrl} alt="Right side image" objectFit="cover" h="100%" w="100%" />
            </Box>
        </Flex>
    );
};

export default RightImageLayoutComponent;
