// TitleText.tsx
import React from 'react';
import { Text } from '@chakra-ui/react';

export interface TitleTextProps  {
  value: string | undefined;
}

const TitleText: React.FC<TitleTextProps> = ({ value}) => {
  return (
    <Text
      fontSize="6xl"
      fontWeight="bold"
      lineHeight={1}
     >
      {value}
    </Text>
  );
};

export default TitleText;
