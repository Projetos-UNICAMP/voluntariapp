import { Flex, Spacer } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BackButton from '../Components/BackButton/BackButton';
import FinalButton, {
  ButtonStyleOptions,
} from '../Components/FinalButton/FinalButton';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';
import ShiftCard from '../Components/ShiftCard/ShiftCard';
import SimpleText from '../Components/SimpleText/SimpleText';
import TitleText from '../Components/TitleText/TitleText';
import TopMenu from '../Components/TopMenu/TopMenu';
import WideBlob from '../Components/WideBlob/WideBlob';
import { useAuth } from '../Providers/AuthProvider';
import {
  DadosEvento,
  DiaDeEvento,
  EventoApiMock,
  Turno,
} from '../api/eventos.api';
import { eventoService } from '../api/firebaseImp/eventos.service';

const EventInfo = () => {
  const { currentUser } = useAuth();

  const location = useLocation();
  const eventCode = location.state?.eventCode;
  const [state, setState] = useState('');
  const [eventData, setEventData] = useState<DadosEvento | undefined>(
    undefined
  );
  const [error, setError] = useState(false);
  useEffect(() => {
    setState('loading');
    EventoApiMock.buscarEventoPorCodigo(eventCode)
      .then((res) => {
        setEventData(res);
        setState('success');
      })
      .catch((err) => {
        setState('error');
        setError(err);
      });
  }, [eventCode]);

  async function handleInscreverEvento() {
    if (!eventData || !currentUser) return;

    const updatedEvento = await eventoService.adicionarVoluntarioEvento(
      currentUser,
      eventData
    );
    setEventData(updatedEvento);
  }

  async function handleInscreverTurno(dia: DiaDeEvento, turno: Turno) {
    if (!eventData || !currentUser) return;

    const updatedEvento = await eventoService.adicionarVoluntarioTurno(
      currentUser,
      eventData,
      dia,
      turno
    );
    setEventData(updatedEvento);
  }

  // format date to dd/mm/yyyy
  function formatDate(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function getDayOfWeekInPortuguese(date: Date) {
    const dayWithFeira = date.toLocaleDateString('pt-BR', { weekday: 'long' });
    const dayWithoutFeira = dayWithFeira.replace('-feira', '');
    return dayWithoutFeira.charAt(0).toUpperCase() + dayWithoutFeira.slice(1);
  }

  // function isUserInscrito(
  //   eventData?: DadosEvento,
  //   user: InformacoesUsuario | null
  // ) {
  //   if (!eventData || !user) return false;

  //   return eventData.voluntarios.includes(user);
  // }

  if (state == 'success')
    return (
      <Flex flexDir="column" w="100vw" h="100vh">
        <TopMenu mt="2vh"></TopMenu>
        <BackButton route="/"></BackButton>
        <Flex flexDir={'row'} justifyContent={'space-between'} w={'90%'}>
          <Flex flexDir="column" align={'start'} ml={'6vw'} mt="1vh">
            <TitleText value={eventData?.nomeDoEvento}></TitleText>
            <SimpleText
              value={`Organização: ${eventData?.nomeResponsavel} ${eventData?.telefoneResponsavel}`}></SimpleText>
            <SimpleText value={`${eventData?.description}`}></SimpleText>
            <SimpleText value={`${eventData?.local}`}></SimpleText>
            <SimpleText
              value={`${eventData?.voluntarios.join(', ')}`}></SimpleText>
          </Flex>

          {/* {isUserInscrito(eventData, currentUser) ? (
            <SimpleText value="Inscrito no evento"></SimpleText>
          ) : ( */}
          <FinalButton
            label={'Participar do evento'}
            style={{ type: ButtonStyleOptions.Primary, mt: 4 }}
            onClick={handleInscreverEvento}></FinalButton>
          {/* )} */}
        </Flex>
        <Flex
          flexDir="row"
          align="center"
          justifyContent="space-around"
          paddingTop={'2vh'}>
          {eventData?.dias.map((dia, index) => (
            <Flex flexDir="column" align="center" key={index}>
              <TitleText size="xl" value={formatDate(dia.data)} />
              <TitleText size="lg" value={getDayOfWeekInPortuguese(dia.data)} />
              {dia.turnos.map((turno, index) => (
                <Flex flexDir="column" align="center" key={index}>
                  <ShiftCard
                    turno={turno}
                    dia={dia}
                    handleInscrever={handleInscreverTurno}></ShiftCard>
                </Flex>
              ))}
            </Flex>
          ))}
        </Flex>
        <Spacer></Spacer>
        <WideBlob></WideBlob>
      </Flex>
    );
  if (state == 'loading')
    return (
      <Flex flexDir="column" w="100vw" h="100vh">
        <TopMenu mt="2vh"></TopMenu>
        <BackButton route="/"></BackButton>
        <LoadingSpinner
          size={200}
          width={5}
          mt="25vh"
          align="center"></LoadingSpinner>
        <Spacer></Spacer>
        <WideBlob></WideBlob>
      </Flex>
    );
  return (
    <Flex flexDir="column" w="100vw" h="100vh">
      <TopMenu mt="2vh"></TopMenu>
      <BackButton route="/"></BackButton>
      <Flex flexDir="column" align={'start'} ml={'6vw'} mt="1vh">
        <TitleText value="Tivemos um problema"></TitleText>
        <TitleText value="ao buscar dados do evento:"></TitleText>
        <SimpleText value={`${error.toString()}`} mt="10"></SimpleText>
      </Flex>
      <Spacer></Spacer>
      <WideBlob></WideBlob>
    </Flex>
  );
};
export default EventInfo;
