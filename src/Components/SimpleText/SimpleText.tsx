// SimpleText.tsx
import React from 'react';
import { Text as ChakraText } from '@chakra-ui/react';

export interface SimpleTextProps {
  value: string;
  color?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  onClick?: () => void;
}

const SimpleText: React.FC<SimpleTextProps> = ({ value, color, mt, mr, mb, ml }) => {
  return (
    <ChakraText fontSize="24" fontWeight="normal" color={color} mt={mt} mr={mr} mb={mb} ml={ml}>
      {value}
    </ChakraText>
  );
};
SimpleText.defaultProps = {
  value: "Default String",
  color: "black",
  mt: "0",
  ml: "0",
  mb: "0",
  mr: "0",
  onClick: () => {}
};

export default SimpleText;
