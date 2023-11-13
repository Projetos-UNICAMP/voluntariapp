import { Flex } from '@chakra-ui/react';
import RightImageLayoutComponent from '../Layouts/RigthImageLayout/RigthImageLayout';
import AppLogo, { LogoSize } from '../Components/AppLogo/AppLogo';
import TitleText from '../Components/TitleText/TitleText';
import SimpleText from '../Components/SimpleText/SimpleText';
import FinalButton, {
  ButtonStyleOptions,
} from '../Components/FinalButton/FinalButton';
import TopMenu from '../Components/TopMenu/TopMenu';

const LandingPage = () => {
  return (
    <RightImageLayoutComponent imageUrl={'src/assets/pens.png'}>
      <TopMenu></TopMenu>
      <Flex flexDir={'column'} verticalAlign={'middle'}>
        <Flex flexDir={'column'} w={'60%'} alignSelf={'center'}>
          <AppLogo size={LogoSize.Large}></AppLogo>
          <TitleText value={'Conectando'} mt={10}></TitleText>
          <TitleText value="voluntários e causas"></TitleText>
          <TitleText value="para transformar vidas."></TitleText>
          <Flex flexDir={'column'} alignSelf={'center'} mt={6}>
            <SimpleText
              value={
                'Seja parte de uma comunidade que faz a diferença! Com o VoluntariApp, você pode criar um evento voluntário ou participar de um evento já existente '
              }></SimpleText>
          </Flex>
        </Flex>
        <Flex flexDir={'column'} width={'100%'} textAlign={'center'}>
          <FinalButton
            label={'criar evento'}
            style={{
              type: ButtonStyleOptions.Primary,
              width: '20vw',
              mt: 14,
              mb: 4,
            }}
            onClick={function (): void {
              throw new Error('Function not implemented.');
            }}></FinalButton>
          <FinalButton
            label={'entrar com código de evento'}
            style={{
              type: ButtonStyleOptions.Secondary,
              width: '20vw',
              mt: 4,
              mb: 4,
            }}
            onClick={function (): void {
              throw new Error('Function not implemented.');
            }}></FinalButton>
        </Flex>
      </Flex>
    </RightImageLayoutComponent>
  );
};

export default LandingPage;
