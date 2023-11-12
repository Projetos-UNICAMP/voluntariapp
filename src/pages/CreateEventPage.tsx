import { Flex } from '@chakra-ui/react';
import RightImageLayoutComponent from '../Layouts/RigthImageLayout/RigthImageLayout';
import AppLogo, { LogoSize } from '../Components/AppLogo/AppLogo';
import TitleText from '../Components/TitleText/TitleText';
import SimpleText from '../Components/SimpleText/SimpleText';
import FinalButton, {
  ButtonStyleOptions,
} from '../Components/FinalButton/FinalButton';
import { useNavigate } from 'react-router-dom';
import FinalTextInputField from '../Components/FinalTextInputField/FinalTextInputField';

const CreateEventPage = () => {
  const navigate = useNavigate();
  return (
    <RightImageLayoutComponent imageUrl={'src/assets/discs.png'}>
      <Flex flexDir={'column'} verticalAlign={'middle'} w={'55vw'}>
        <Flex flexDir={'column'} w={'60%'} alignSelf={'center'}>
          <TitleText value={'Bora lá!'}></TitleText>
          <SimpleText
            value={'Primeiro algumas infos sobre o evento:'}></SimpleText>
          <FinalTextInputField
            value={''}
            placeholder="Nome do evento"
            onChange={function (value: string): void {
              throw new Error('Function not implemented.');
            }}></FinalTextInputField>
          <FinalTextInputField
            value={''}
            placeholder="Descrição"
            onChange={function (value: string): void {
              throw new Error('Function not implemented.');
            }}></FinalTextInputField>
          <FinalTextInputField
            value={''}
            placeholder="Local"
            onChange={function (value: string): void {
              throw new Error('Function not implemented.');
            }}></FinalTextInputField>
          <SimpleText
            value={'E agora sobre o responsável pelo evento:'}></SimpleText>
          <FinalTextInputField
            value={''}
            placeholder="Nome do responsável"
            onChange={function (value: string): void {
              throw new Error('Function not implemented.');
            }}></FinalTextInputField>
          <FinalTextInputField
            value={''}
            placeholder="Telefone"
            onChange={function (value: string): void {
              throw new Error('Function not implemented.');
            }}></FinalTextInputField>
          <FinalButton
            label={'criar evento'}
            style={{
              type: ButtonStyleOptions.Primary,
              width: '33vw',
              mt: 14,
              mb: 4,
            }}
            onClick={() => navigate('/criar-evento')}></FinalButton>
        </Flex>
      </Flex>
    </RightImageLayoutComponent>
  );
};

export default CreateEventPage;
