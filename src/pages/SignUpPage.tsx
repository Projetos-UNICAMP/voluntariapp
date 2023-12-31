import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import FinalButton, {
  ButtonStyleOptions,
} from '../Components/FinalButton/FinalButton';
import FinalDropdown from '../Components/FinalDropDown/FinalDropDown';
import FinalTextInputField from '../Components/FinalTextInputField/FinalTextInputField';
import SimpleText from '../Components/SimpleText/SimpleText';
import TitleText from '../Components/TitleText/TitleText';
import RightImageLayoutComponent from '../Layouts/RigthImageLayout/RigthImageLayout';
import { Cargo, PayloadNovoUsuario } from '../api/usuarios.api';
import { useAuth } from '../Providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../Components/PasswordInput/PasswordInput';

const SignUpPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState<PayloadNovoUsuario>({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    cargo: Cargo.VOLUNTARIO,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    await register(user, () => navigate('/'));
  };

  const options = [
    { value: Cargo.VOLUNTARIO, label: 'Voluntário' },
    { value: Cargo.MOTORISTA, label: 'Motorista' },
  ];

  return (
    <RightImageLayoutComponent imageUrl={'/assets/cuted.png'}>
      <Flex flexDir={'column'} verticalAlign={'middle'} w={'55vw'}>
        <Flex flexDir={'column'} w={'60%'} alignSelf={'center'}>
          <TitleText value={'Bora Voluntariar!'}></TitleText>
          <Flex flexDir={'column'} mt={6}>
            <SimpleText value={'Algumas informações sobre você: '}></SimpleText>
          </Flex>
        </Flex>
        <Flex flexDir={'column'} width={'100%'}>
          <Flex width={'60%'} alignSelf={'center'} mt={4} mb={2}>
            <FinalTextInputField
              placeholder="Nome"
              value={user.nome}
              name="nome"
              onChange={handleChange}></FinalTextInputField>
          </Flex>
          <Flex width={'60%'} alignSelf={'center'} mt={4} mb={2}>
            <FinalTextInputField
              placeholder="Email"
              value={user.email}
              name="email"
              onChange={handleChange}></FinalTextInputField>
          </Flex>
          <Flex width={'60%'} alignSelf={'center'} mt={4} mb={2}>
            <FinalTextInputField
              placeholder="Telefone"
              value={user.telefone}
              name="telefone"
              onChange={handleChange}></FinalTextInputField>
          </Flex>
          <Flex width={'60%'} alignSelf={'center'} mt={4} mb={2}>
            <PasswordInput
              placeholder="Senha"
              value={user.senha}
              name="senha"
              onChange={handleChange}></PasswordInput>
          </Flex>
          <Flex width={'60%'} alignSelf={'center'} mt={4} mb={2}>
            <FinalDropdown
              label="Como você pode ajudar?"
              options={options}></FinalDropdown>
          </Flex>
        </Flex>
        <Flex flexDir={'column'} width={'100%'} textAlign={'center'}>
          <FinalButton
            label={'continuar'}
            style={{
              type: ButtonStyleOptions.Primary,
              width: '20vw',
              mt: 14,
              mb: 4,
            }}
            onClick={() => handleSubmit()}></FinalButton>
        </Flex>
      </Flex>
    </RightImageLayoutComponent>
  );
};

export default SignUpPage;
