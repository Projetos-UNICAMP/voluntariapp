import { Box } from '@chakra-ui/react';
import { DiaDeEvento, Turno } from '../../api/eventos.api';
import TitleText from '../TitleText/TitleText';
import FinalButton, { ButtonStyleOptions } from '../FinalButton/FinalButton';

interface ShiftCardProps {
  turno: Turno;
  dia: DiaDeEvento;
  handleInscrever: (dia: DiaDeEvento, turno: Turno) => void;
}

const ShiftCard = (props: ShiftCardProps) => {
  const { turno, dia, handleInscrever } = props;
  return (
    <Box
      style={{
        border: '1px solid #E2E8F0',
        borderRadius: '10px',
        padding: '30px',
        margin: '10px',
        width: '30vw',
        marginTop: '30px',
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
      <FinalButton
        label={'Me inscrever'}
        style={{ type: ButtonStyleOptions.Primary, mt: 4 }}
        onClick={() => handleInscrever(dia, turno)}></FinalButton>
    </Box>
  );
};

export default ShiftCard;