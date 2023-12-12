import { Flex, Spacer } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BackButton from '../Components/BackButton/BackButton';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';
import SimpleText from '../Components/SimpleText/SimpleText';
import TitleText from '../Components/TitleText/TitleText';
import TopMenu from '../Components/TopMenu/TopMenu';
import WideBlob from '../Components/WideBlob/WideBlob';
import { DadosEvento, EventoApiMock } from '../api/eventos.api';
import ShiftCard from '../Components/ShiftCard/ShiftCard';
import FinalButton, {
  ButtonStyleOptions,
} from '../Components/FinalButton/FinalButton';

const EventInfo = () => {
  useEffect(() => {}, []);
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
          </Flex>

          <FinalButton
            label={'Participar do evento'}
            style={{ type: ButtonStyleOptions.Primary, mt: 4 }}
            onClick={function (): void {
              throw new Error('Function not implemented.');
            }}></FinalButton>
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
                  <ShiftCard turno={turno}></ShiftCard>
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
