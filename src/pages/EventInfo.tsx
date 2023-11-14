import { Flex, Spacer, Text } from '@chakra-ui/react';
import TopMenu from '../Components/TopMenu/TopMenu';
import { useNavigate } from 'react-router-dom';

const EventInfo = () => {
  const navigate = useNavigate();
  return (
    <Flex flexDir="column" w="100vw" h="100vh">
      <TopMenu mt="2vh"></TopMenu>
      <Flex flexDir="row" mt="3" ml="0.6vw" onClick={() => navigate('/')} align='center'>
        <svg
          width="9"
          height="24"
          viewBox="0 0 6 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M1 6L5 2V10L1 6Z" fill="#58AFB0" stroke="#58AFB0" />
        </svg>
        <Text ml="5" color="#58AFB0" fontSize={24} mb={1}>Voltar</Text>
      </Flex>
      <Flex flexDir="column" align={'center'} justify={"end"} h="50vh">
        <Text fontSize="40">Nome do Evento</Text>
        <Text fontSize="24">Organização: Luisa Colafati (00) 0000-0000, Toninho Dev (00) 0000-0000</Text>
        <Text fontSize="24">Descrição geral do evento</Text>
      </Flex>
    </Flex>
  );
};
export default EventInfo;
