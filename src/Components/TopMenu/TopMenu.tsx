// TopMenu.tsx
import React from 'react';
import { Flex, StyleProps, Text } from '@chakra-ui/react';
import AppLogo, { LogoSize } from '../AppLogo/AppLogo';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Providers/AuthProvider';

export interface TopMenuProps extends StyleProps {}

const TopMenu: React.FC<TopMenuProps> = ({ ...styleProps }) => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  return (
    <Flex flexDir={'row'} textAlign="center" {...styleProps}>
      <Flex
        ml="0.6vw"
        mr="1vw"
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer' }}>
        <AppLogo size={LogoSize.Small}></AppLogo>
      </Flex>
      {currentUser && (
        <Flex mr="1vw" style={{ cursor: 'pointer' }}>
          <Text fontWeight="bold" fontSize="20" onClick={() => navigate('/')}>
            {`Olá, ${currentUser?.nome}`}
          </Text>
        </Flex>
      )}
      <Flex mr="1vw" style={{ cursor: 'pointer' }}>
        <Text fontWeight="bold" fontSize="20" onClick={() => navigate('/')}>
          Página Inicial
        </Text>
      </Flex>
      {!currentUser ? (
        <Flex mr="1vw" style={{ cursor: 'pointer' }}>
          <Text
            fontWeight="bold"
            fontSize="20"
            onClick={() => navigate('/login')}>
            Login
          </Text>
        </Flex>
      ) : (
        <Flex mr="1vw" style={{ cursor: 'pointer' }}>
          <Text fontWeight="bold" fontSize="1vw" onClick={() => logout()}>
            Logout
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default TopMenu;
