// BackButton.tsx
import React from 'react';
import { Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import SimpleText from '../SimpleText/SimpleText';

export interface BackButtonProps {
  route: string;
}

const BackButton: React.FC<BackButtonProps> = ({ route }) => {
  const navigate = useNavigate();
  return (
    <Flex
      flexDir="row"
      mt="3"
      ml="0.6vw"
      onClick={() => navigate(route)}
      align="center"
      style={{ cursor: 'pointer' }}
      w={'fit-content'}
      h={'fit-content'}>
      <svg
        width="8"
        height="16"
        viewBox="0 0 6 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M1 6L5 2V10L1 6Z" fill="#58AFB0" stroke="#58AFB0" />
      </svg>
      <SimpleText
        value={'Voltar'}
        color={'#58AFB0'}
        mb={'1'}
        ml={'3'}></SimpleText>
    </Flex>
  );
};

export default BackButton;
