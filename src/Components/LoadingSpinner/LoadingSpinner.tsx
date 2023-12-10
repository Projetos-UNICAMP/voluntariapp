// BackButton.tsx
import React from 'react';
import { Spinner } from '@chakra-ui/react';

export interface LoadingSpinnerProps {
  size: number;
  width: number;
  align?: string;
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size,
  mt,
  ml,
  mb,
  mr,
  align,
  width,
}) => {
  return (
    <Spinner
      height={size}
      width={size}
      alignSelf={align}
      mt={mt}
      ml={ml}
      mb={mb}
      mr={mr}
      borderWidth={width}></Spinner>
  );
};

LoadingSpinner.defaultProps = {
  align: 'center',
  mt: "0",
  mb: "0",
  ml: "0",
  mr: "0",
};

export default LoadingSpinner;
