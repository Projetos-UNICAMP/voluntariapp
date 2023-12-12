/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Flex } from '@chakra-ui/react';
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
import DateRangePicker from '../Components/DateRangePicker/DateRangePicker';
import { useNavigate } from 'react-router-dom';

const CreateEventPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  const [dadosEvento, setDadosEvento] = useState<PayloadNovoEvento>({
    nomeDoEvento: '',
    description: '',
    local: '',
    nomeResponsavel: '',
    telefoneResponsavel: '',
    numTurnosPorDia: 0,
    dataInicio: new Date(),
    dataFim: new Date(),
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
              if (currentPage == 0) {
                navigate('/');
              } else {
                setCurrentPage(0);
              }
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
            mt="15px"
            mb="15px"
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

          {currentPage == 1 && (
            <>
              <Box mt={2} mb={3}>
                <DateRangePicker
                  onDateChange={(dates) => {
                    const [start, end] = dates;

                    if (!start || !end) return;

                    setDadosEvento({
                      ...dadosEvento,
                      dataInicio: start,
                      dataFim: end,
                    });
                  }}
                />
              </Box>
            </>
          )}

          <SimpleText
            mb="15px"
            value={
              currentPage == 0
                ? 'E agora sobre o responsável pelo evento:'
                : 'Qual é o número de turnos por dia?'
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

          {currentPage == 1 && (
            <>
              <FinalTextInputField
                placeholder="Número de turnos"
                onChange={handleChange}
                value={dadosEvento.numTurnosPorDia.toString()}
                name={'numTurnosPorDia'}
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
              if (currentPage == 0) {
                setCurrentPage(1);
              } else {
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
              }
            }}></FinalButton>
        </Flex>
      </Flex>
    </RightImageLayoutComponent>
  );
};

export default CreateEventPage;
