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
import { useEffect, useState } from 'react';
import { EventoAPIMock } from '../api/eventos.api';
import { DadosEvento, PayloadNovoEvento } from '../api/eventos.api';

const CreateEventPage = () => {
  const navigate = useNavigate();
  let eventData: DadosEvento = {
    nomeDoEvento: '',
    description: '',
    local: '',
    nomeResponsavel: '',
    telefoneResponsavel: '',
  };
  const [dadosEvento, setDadosEvento] = useState<PayloadNovoEvento>({
    nomeDoEvento: '',
    description: '',
    local: '',
    nomeResponsavel: '',
    telefoneResponsavel: '',
  });
  return (
    <RightImageLayoutComponent imageUrl={'src/assets/discs.png'}>
      <Flex flexDir={'column'} verticalAlign={'middle'} w={'55vw'}>
        <Flex flexDir={'column'} w={'60%'} alignSelf={'center'}>
          <TitleText value={'Bora lá!'}></TitleText>
          <SimpleText
            value={'Primeiro algumas infos sobre o evento:'}></SimpleText>
          <FinalTextInputField
            placeholder="Nome do evento"
            onChange={function (e) {
              console.log(e);
              eventData = { ...dadosEvento };
              eventData.nomeDoEvento = e;
              setDadosEvento({ ...eventData });
              console.log(dadosEvento);
            }}></FinalTextInputField>
          <FinalTextInputField
            placeholder="Descrição"
            onChange={function (e) {
              console.log(e);
              eventData = { ...dadosEvento };
              eventData.description = e;
              setDadosEvento({ ...eventData });
              console.log(dadosEvento);
            }}></FinalTextInputField>
          <FinalTextInputField
            placeholder="Local"
            onChange={function (e) {
              console.log(e);
              eventData = { ...dadosEvento };
              eventData.local = e;
              setDadosEvento({ ...eventData });
              console.log(dadosEvento);
            }}></FinalTextInputField>
          <SimpleText
            value={'E agora sobre o responsável pelo evento:'}></SimpleText>
          <FinalTextInputField
            placeholder="Nome do responsável"
            onChange={function (e) {
              console.log(e);
              eventData = { ...dadosEvento };
              eventData.nomeResponsavel = e;
              setDadosEvento({ ...eventData });
              console.log(dadosEvento);
            }}></FinalTextInputField>
          <FinalTextInputField
            placeholder="Telefone"
            onChange={function (e) {
              console.log(e);
              eventData = { ...dadosEvento };
              eventData.telefoneResponsavel = e;
              setDadosEvento({ ...eventData });
              console.log(dadosEvento);
            }}></FinalTextInputField>
          <FinalButton
            label={'criar evento'}
            style={{
              type: ButtonStyleOptions.Primary,
              width: '33vw',
              mt: 14,
              mb: 4,
            }}
            onClick={() => {
              EventoAPIMock.criarNovoEvento(dadosEvento)
                .then((res) => {
                  console.log(res.codigoEvento);
                  console.log(res.sucesso);
                })
                .catch((err) => {
                  console.log(err);
                });
              navigate('/criar-evento', { state: { dadosEvento } });
            }}></FinalButton>
        </Flex>
      </Flex>
    </RightImageLayoutComponent>
  );
};

export default CreateEventPage;
