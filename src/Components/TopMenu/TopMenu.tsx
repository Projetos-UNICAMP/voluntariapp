// TopMenu.tsx
import React from 'react';
import { Flex, StyleProps, Text } from '@chakra-ui/react';
import AppLogo, { LogoSize } from '../AppLogo/AppLogo';
import { useNavigate } from 'react-router-dom';

export interface TopMenuProps extends StyleProps {}

const TopMenu: React.FC<TopMenuProps> = ({ ...styleProps }) => {
  const navigate = useNavigate();
  return (
    <Flex flexDir={'row'} textAlign="center" {...styleProps}>
      <Flex
        ml="0.6vw"
        mr="1vw"
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer' }}>
        <AppLogo size={LogoSize.Small}></AppLogo>
      </Flex>
      <Flex mr="1vw" style={{ cursor: 'pointer' }}>
        <Text
          fontWeight="bold"
          fontSize="1vw"
          onClick={() => navigate('/paginal-inicial')}>Página Inicial</Text>
      </Flex>
      <Flex mr="1vw" style={{ cursor: 'pointer' }}>
        <Text
          fontWeight="bold"
          fontSize="1vw"
          onClick={() => navigate('/cadastro')}>Login</Text>
      </Flex>
    </Flex>
  );
};

export default TopMenu;
