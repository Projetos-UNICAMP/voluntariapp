import { Flex, Image, Text, Spacer, Spinner, Center } from '@chakra-ui/react';
import TopMenu from '../Components/TopMenu/TopMenu';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EventoAPIMock } from '../api/eventos.api';
import { DadosEvento } from '../api/eventos.api';

const EventInfo = () => {
  useEffect(() => {}, []);
  const navigate = useNavigate();
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
        <Flex
          flexDir="row"
          mt="3"
          ml="0.6vw"
          onClick={() => navigate('/')}
          align="center"
          style={{ cursor: 'pointer' }}
          w={'fit-content'}
          h={'fit-content'}>
          <svg
            width="8"
            height="16"
            viewBox="0 0 6 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M1 6L5 2V10L1 6Z" fill="#58AFB0" stroke="#58AFB0" />
          </svg>
          <Text ml="5" color="#58AFB0" fontSize={24} mb={1}>
            Voltar
          </Text>
        </Flex>
        <Flex flexDir="column" align={'start'} ml={'6vw'} mt="1vh">
          <Text fontSize="40" fontWeight={'bold'}>
            {eventData?.nomeDoEvento}
          </Text>
          <Text fontSize="24">
            Organização: {eventData?.nomeResponsavel}{' '}
            {eventData?.telefoneResponsavel}
          </Text>
          <Text fontSize="24">{eventData?.description}</Text>
          <Text fontSize="24">{eventData?.local}</Text>
        </Flex>
        <Spacer></Spacer>
        <Flex w={'90vw'}>
          <Image src="src/assets/blob.png"></Image>
        </Flex>
      </Flex>
    );
  if (state == 'loading')
    return (
      <Flex flexDir="column" w="100vw" h="100vh">
        <TopMenu mt="2vh"></TopMenu>
        <Spinner height={200} width={200} alignSelf={"center"} mt="25vh" borderWidth={5}></Spinner>
        <Spacer></Spacer>
        <Flex w={'90vw'}>
          <Image src="src/assets/blob.png"></Image>
        </Flex>
      </Flex>
    );
  return (
    <Flex flexDir="column" w="100vw" h="100vh">
      <TopMenu mt="2vh"></TopMenu>
      <Flex flexDir="column" ml="30" mt="100">
        <Text fontSize="40" fontWeight="bold" lineHeight={1.1}>
          Tivemos um problema
        </Text>
        <Text fontSize="40" fontWeight="bold" lineHeight={1.1}>
          ao buscar os dados do evento:
        </Text>
        <Text mt="10" fontSize={24}>
          {error.toString()}
        </Text>
      </Flex>
      <Spacer></Spacer>
      <Flex w={'90vw'}>
        <Image src="src/assets/blob.png"></Image>
      </Flex>
    </Flex>
  );
};
export default EventInfo;
