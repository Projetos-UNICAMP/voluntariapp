import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import FinalButton, {
  ButtonStyleOptions,
} from '../Components/FinalButton/FinalButton';
import FinalTextInputField from '../Components/FinalTextInputField/FinalTextInputField';
import SimpleText from '../Components/SimpleText/SimpleText';
import TitleText from '../Components/TitleText/TitleText';
import RightImageLayoutComponent from '../Layouts/RigthImageLayout/RigthImageLayout';
import { useAuth } from '../Providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../Components/PasswordInput/PasswordInput';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    senha: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    await login(user.email, user.senha, () => navigate('/'));
  };

  return (
    <RightImageLayoutComponent imageUrl={'/assets/cuted.png'}>
      <Flex flexDir={'column'} verticalAlign={'middle'} w={'55vw'}>
        <Flex flexDir={'column'} w={'60%'} alignSelf={'center'} mb={'1vh'}>
          <TitleText value={'Faça seu Login!'}></TitleText>
        </Flex>
        <Flex flexDir={'column'} w={'60%'} alignSelf={'center'} mb={'1vh'}>
          <SimpleText value="Comece agora a ajudar"></SimpleText>
        </Flex>
        <Flex flexDir={'column'} width={'100%'}>
          <Flex width={'60%'} alignSelf={'center'} mt={4} mb={2}>
            <FinalTextInputField
              placeholder="Email"
              value={user.email}
              name="email"
              onChange={handleChange}></FinalTextInputField>
          </Flex>
          <Flex width={'60%'} alignSelf={'center'} mt={4} mb={2}>
            <PasswordInput
              placeholder="Senha"
              value={user.senha}
              name="senha"
              onChange={handleChange}></PasswordInput>
          </Flex>
        </Flex>
        <Flex flexDir={'column'} width={'100%'} textAlign={'center'}>
          <FinalButton
            label={'Continuar'}
            style={{
              type: ButtonStyleOptions.Primary,
              width: '20vw',
              mt: 14,
              mb: 4,
            }}
            onClick={() => handleSubmit()}></FinalButton>
          <Flex
            flexDir="row"
            alignSelf={'center'}
            justifyContent={'space-evenly'}
            width={'25vw'}>
            <SimpleText value={'Ainda não tem uma conta?'}></SimpleText>
            <Flex style={{ cursor: 'pointer' }}>
              <SimpleText
                value="Cadastre-se!"
                onClick={() => navigate('/cadastro')}
                color="#0095F6"
                weight="bold"></SimpleText>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </RightImageLayoutComponent>
  );
};

export default LoginPage;
