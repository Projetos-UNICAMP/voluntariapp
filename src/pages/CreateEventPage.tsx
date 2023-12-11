/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Flex } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
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
import { set } from 'firebase/database';

const CreateEventPage = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const [dadosEvento, setDadosEvento] = useState<PayloadNovoEvento>({
    nomeDoEvento: '',
    description: '',
    local: '',
    nomeResponsavel: '',
    telefoneResponsavel: '',
    dataInicio: new Date(),
    dataFim: new Date(),
    numTurnosPorDia: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDadosEvento({ ...dadosEvento, [event.target.name]: event.target.value });
  };

  return (
    <RightImageLayoutComponent
      imageUrl={
        currentPage == 0 ? 'src/assets/discs.png' : 'src/assets/clock.png'
      }>
      <Flex flexDir={'column'} verticalAlign={'middle'} w={'55vw'}>
        <Flex flexDir={'column'} w={'60%'} alignSelf={'center'}>
          <Button
            onClick={() => {
              setCurrentPage(0);
            }}
            variant="outline"
            size="sm"
            width="100px"
            colorScheme="green"
            mb={4}
            leftIcon={<ChevronLeftIcon />}>
            Voltar
          </Button>
          <TitleText
            value={
              currentPage == 0 ? 'Bora lá!' : 'Quando vai ser?'
            }></TitleText>
          <SimpleText
            value={
              currentPage == 0
                ? 'Primeiro algumas infos sobre o evento:'
                : 'Selecione a data do evento:'
            }></SimpleText>

          {currentPage == 0 && (
            <>
              <FinalTextInputField
                placeholder="Nome do evento"
                onChange={handleChange}
                value={dadosEvento.nomeDoEvento}
                name={'nomeDoEvento'}
                mb={4}></FinalTextInputField>
              <FinalTextInputField
                placeholder="Descrição"
                onChange={handleChange}
                value={dadosEvento.description}
                name={'description'}
                mb={4}></FinalTextInputField>
              <FinalTextInputField
                placeholder="Local"
                onChange={handleChange}
                value={dadosEvento.local}
                name={'local'}
                mb={4}></FinalTextInputField>
            </>
          )}

          {currentPage == 1 && <></>}

          <SimpleText
            value={
              currentPage == 0
                ? 'E agora sobre o responsável pelo evento:'
                : 'Qual é o número mínimo de colaboradores?'
            }></SimpleText>

          {currentPage == 0 && (
            <>
              <FinalTextInputField
                placeholder="Nome do responsável"
                onChange={handleChange}
                value={dadosEvento.nomeResponsavel}
                name={'nomeResponsavel'}
                mb={4}></FinalTextInputField>

              <FinalTextInputField
                placeholder="Telefone"
                onChange={handleChange}
                value={dadosEvento.telefoneResponsavel}
                name={'telefoneResponsavel'}
                mb={4}></FinalTextInputField>
            </>
          )}

          <FinalButton
            label={
              currentPage == 0 ? 'prosseguir para as datas' : 'criar evento'
            }
            style={{
              type: ButtonStyleOptions.Primary,
              width: '33vw',
              mt: 14,
              mb: 4,
            }}
            onClick={() => {
              setCurrentPage(1);
              // eventoService
              //   .criarNovoEvento(dadosEvento)
              //   .then((res) => {
              //     alert(
              //       `Evento criado com sucesso! Forneça o código: ${res.codigoEvento}`
              //     );
              //   })
              //   .catch((err) => {
              //     console.log(err);
              //   });
            }}></FinalButton>
        </Flex>
      </Flex>
    </RightImageLayoutComponent>
  );
};

export default CreateEventPage;
