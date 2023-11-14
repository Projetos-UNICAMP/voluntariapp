// TopMenu.tsx
import React from 'react';
import { Flex, StyleProps } from '@chakra-ui/react';
import AppLogo, { LogoSize } from '../AppLogo/AppLogo';
import SimpleText from '../SimpleText/SimpleText';
import { useNavigate } from 'react-router-dom';

export interface TopMenuProps extends StyleProps {}

const TopMenu: React.FC<TopMenuProps> = ({ ...styleProps }) => {
  const navigate = useNavigate();
  return (
    <Flex flexDir="line" textAlign="center" {...styleProps}>
      <Flex ml="0.6vw" mr="1vw" onClick={() => navigate('/')}>
        <AppLogo size={LogoSize.Small}></AppLogo>
      </Flex>
      <Flex mr="1vw">
        <SimpleText
          value={'Página Inicial'}
          fontWeight="bold"
          fontSize="1vw"
          onClick={() => navigate('/paginal-inicial')}></SimpleText>
      </Flex>
      <Flex mr="1vw">
        <SimpleText
          value={'Login'}
          fontWeight="bold"
          fontSize="1vw"
          onClick={() => navigate('/cadastro')}></SimpleText>
      </Flex>
    </Flex>
  );
};

export default TopMenu;
