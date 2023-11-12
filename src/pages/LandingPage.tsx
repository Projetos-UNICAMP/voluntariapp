import { Flex } from '@chakra-ui/react';
import RightImageLayoutComponent from '../Layouts/RigthImageLayout/RigthImageLayout';
import AppLogo, { LogoSize } from '../Components/AppLogo/AppLogo';
import TitleText from '../Components/TitleText/TitleText';
import SimpleText from '../Components/SimpleText/SimpleText';
import FinalButton, {
  ButtonStyleOptions,
} from '../Components/FinalButton/FinalButton';

const LandingPage = () => {
  return (
    <RightImageLayoutComponent imageUrl={'src/assets/pens.png'}>
      <Flex flexDir={'column'}>
        <AppLogo size={LogoSize.Large}></AppLogo>
        <TitleText
          value={
            'Conectando voluntários e causas para transformar vidas.'
          }></TitleText>
        <SimpleText
          value={
            'Seja parte de uma comunidade que faz a diferença! Com o VoluntariApp, você pode criar um evento voluntário ou participar de um evento já existente '
          }></SimpleText>
        <FinalButton
          label={'criar evento'}
          style={ButtonStyleOptions.Primary}
          onClick={function (): void {
            throw new Error('Function not implemented.');
          }}></FinalButton>
        <FinalButton
          label={'entrar com código de evento'}
          style={ButtonStyleOptions.Primary}
          onClick={function (): void {
            throw new Error('Function not implemented.');
          }}></FinalButton>
      </Flex>
    </RightImageLayoutComponent>
  );
};

export default LandingPage;
