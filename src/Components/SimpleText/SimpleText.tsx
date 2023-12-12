// SimpleText.tsx
import React from 'react';
import { Text as ChakraText } from '@chakra-ui/react';

export interface SimpleTextProps {
  value: string;
  size?: string;
  weight?: string;
  color?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  onClick?: () => void;
}

const SimpleText: React.FC<SimpleTextProps> = ({
  value,
  color,
  mt,
  mr,
  mb,
  ml,
  onClick,
  weight,
  size,
}) => {
  return (
    <ChakraText
      fontSize={size}
      fontWeight={weight}
      color={color}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      onClick={onClick}>
      {value}
    </ChakraText>
  );
};
SimpleText.defaultProps = {
  size: '24',
  value: 'Default String',
  color: 'black',
  weight: 'normal',
  mt: '0',
  ml: '0',
  mb: '0',
  mr: '0',
  onClick: () => {},
};

export default SimpleText;
