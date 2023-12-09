import { Flex, Image, Text, Spacer, Spinner } from '@chakra-ui/react';
import TopMenu from '../Components/TopMenu/TopMenu';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EventoAPIMock } from '../api/eventos.api';
import { DadosEvento } from '../api/eventos.api';
import TitleText from '../Components/TitleText/TitleText';
import SimpleText from '../Components/SimpleText/SimpleText';
import WideBlob from '../Components/WideBlob/WideBlob';
import BackButton from '../Components/BackButton/BackButton';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';

const EventInfo = () => {
  useEffect(() => {}, []);
  const location = useLocation();
  const eventCode = location.state;
  console.log(eventCode);
  const [state, setState] = useState('');
  const [eventData, setEventData] = useState<DadosEvento | undefined>(
    undefined
  );
  const [error, setError] = useState(false);
  useEffect(() => {
    setState('loading');
    EventoAPIMock.buscarEventoPorCodigo(eventCode)
      .then((res) => {
        setEventData(res);
        setState('success');
      })
      .catch((err) => {
        setState('error');
        setError(err);
      });
  }, [eventCode]);

  if (state == 'success')
    return (
      <Flex flexDir="column" w="100vw" h="100vh">
        <TopMenu mt="2vh"></TopMenu>
        <BackButton route="/"></BackButton>
        <Flex flexDir="column" align={'start'} ml={'6vw'} mt="1vh">
          <TitleText value={eventData?.nomeDoEvento}></TitleText>
          <SimpleText
            value={`Organização: ${eventData?.nomeResponsavel} ${eventData?.telefoneResponsavel}`}></SimpleText>
          <SimpleText value={`${eventData?.description}`}></SimpleText>
          <SimpleText value={`${eventData?.local}`}></SimpleText>
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
        <LoadingSpinner size={200} width={5} mt="25vh" align="center"></LoadingSpinner>
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
