// WideBlob.tsx
import React from 'react';
import { Flex, Image } from '@chakra-ui/react';

const WideBlob: React.FC = () => {
  return (
    <Flex w={'90vw'}>
      <Image src="/assets/blob.png"></Image>
    </Flex>
  );
};

export default WideBlob;
