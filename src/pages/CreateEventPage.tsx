import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import FinalButton, {
  ButtonStyleOptions,
} from '../Components/FinalButton/FinalButton';
import FinalTextInputField from '../Components/FinalTextInputField/FinalTextInputField';
import SimpleText from '../Components/SimpleText/SimpleText';
import TitleText from '../Components/TitleText/TitleText';
import RightImageLayoutComponent from '../Layouts/RigthImageLayout/RigthImageLayout';
import { PayloadNovoEvento } from '../api/eventos.api';
import { eventoService } from '../api/firebaseImp/eventos.service';

const CreateEventPage = () => {
  const [dadosEvento, setDadosEvento] = useState<PayloadNovoEvento>({
    nomeDoEvento: '',
    description: '',
    local: '',
    nomeResponsavel: '',
    telefoneResponsavel: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDadosEvento({ ...dadosEvento, [event.target.name]: event.target.value });
  };

  return (
    <RightImageLayoutComponent imageUrl={'src/assets/discs.png'}>
      <Flex flexDir={'column'} verticalAlign={'middle'} w={'55vw'}>
        <Flex flexDir={'column'} w={'60%'} alignSelf={'center'}>
          <TitleText value={'Bora lá!'}></TitleText>
          <SimpleText
            value={'Primeiro algumas infos sobre o evento:'}></SimpleText>

          <FinalTextInputField
            placeholder="Nome do evento"
            onChange={handleChange}
            value={dadosEvento.nomeDoEvento}
            name={'nomeDoEvento'}></FinalTextInputField>

          <FinalTextInputField
            placeholder="Descrição"
            onChange={handleChange}
            value={dadosEvento.description}
            name={'description'}></FinalTextInputField>

          <FinalTextInputField
            placeholder="Local"
            onChange={handleChange}
            value={dadosEvento.local}
            name={'local'}></FinalTextInputField>

          <SimpleText
            value={'E agora sobre o responsável pelo evento:'}></SimpleText>

          <FinalTextInputField
            placeholder="Nome do responsável"
            onChange={handleChange}
            value={dadosEvento.nomeResponsavel}
            name={'nomeResponsavel'}></FinalTextInputField>

          <FinalTextInputField
            placeholder="Telefone"
            onChange={handleChange}
            value={dadosEvento.telefoneResponsavel}
            name={'telefoneResponsavel'}></FinalTextInputField>

          <FinalButton
            label={'criar evento'}
            style={{
              type: ButtonStyleOptions.Primary,
              width: '33vw',
              mt: 14,
              mb: 4,
            }}
            onClick={() => {
              eventoService
                .criarNovoEvento(dadosEvento)
                .then((res) => {
                  alert(
                    `Evento criado com sucesso! Forneça o código: ${res.codigoEvento}`
                  );
                })
                .catch((err) => {
                  console.log(err);
                });
            }}></FinalButton>
        </Flex>
      </Flex>
    </RightImageLayoutComponent>
  );
};

export default CreateEventPage;
