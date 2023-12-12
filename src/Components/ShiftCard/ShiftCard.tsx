import { Box } from '@chakra-ui/react';
import { DiaDeEvento, Turno } from '../../api/eventos.api';
import TitleText from '../TitleText/TitleText';
import FinalButton, { ButtonStyleOptions } from '../FinalButton/FinalButton';
import { InformacoesUsuario } from '../../api/usuarios.api';
import { useAuth } from '../../Providers/AuthProvider';

interface ShiftCardProps {
  turno: Turno;
  dia: DiaDeEvento;
  isUserInscrito?: boolean;
  handleInscrever: (dia: DiaDeEvento, turno: Turno) => void;
}

const ShiftCard = (props: ShiftCardProps) => {
  const { currentUser } = useAuth();
  const { turno, dia, handleInscrever, isUserInscrito } = props;

  const isUserInscritoTurno = (
    turno: Turno,
    user: InformacoesUsuario | undefined | null
  ) => {
    if (!user) return false;
    return turno.voluntarios.some(
      (voluntario) => voluntario.email == user.email
    );
  };

  return (
    <Box
      style={{
        border: '1px solid #E2E8F0',
        borderRadius: '10px',
        padding: '30px',
        margin: '10px',
        width: '15vw',
        marginTop: '10px',
      }}>
      <TitleText size="lg" weight="normal" value={turno.title}></TitleText>
      <TitleText
        mt={4}
        mb={2}
        size="md"
        weight="bold"
        value={'Voluntários'}></TitleText>
      {turno.voluntarios.map((voluntario) => (
        <TitleText
          mt={2}
          mb={2}
          size="xs"
          weight="normal"
          value={voluntario.nome}></TitleText>
      ))}
      {isUserInscrito && !isUserInscritoTurno(turno, currentUser) && (
        <FinalButton
          label={'Me inscrever'}
          style={{ type: ButtonStyleOptions.Primary, mt: 4 }}
          onClick={() => handleInscrever(dia, turno)}></FinalButton>
      )}
    </Box>
  );
};

export default ShiftCard;
