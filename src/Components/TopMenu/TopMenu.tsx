// TopMenu.tsx
import React from 'react';
import {Flex, StyleProps} from '@chakra-ui/react';
import AppLogo, { LogoSize } from '../AppLogo/AppLogo';
import SimpleText from '../SimpleText/SimpleText';

export interface TopMenuProps extends StyleProps{
}

const TopMenu: React.FC<TopMenuProps> = ({...styleProps}) => {
    return <Flex flexDir='line' textAlign='center' {...styleProps}>
        <Flex ml="0.6vw" mr="1vw">
            <AppLogo size={LogoSize.Small}></AppLogo>
        </Flex>
        <Flex mr="1vw"><SimpleText value={"Página Inicial"} fontWeight='bold' fontSize='1vw'></SimpleText></Flex>
        <Flex mr="1vw"><SimpleText value={"Login"} fontWeight='bold' fontSize='1vw'></SimpleText></Flex>
    </Flex>
};

export default TopMenu;
