import { Cargo, InformacoesUsuario } from "./usuarios.api";

export type PayloadNovoEvento = {
  nomeDoEvento: string;
  description: string;
  local: string;
  nomeResponsavel: string;
  telefoneResponsavel: string;
  dataInicio: Date;
  dataFim: Date;
  numTurnosPorDia: number;
};

export type DiaDeEvento = {
  turnos: Turno[];
  data: Date
}

export type Turno = {
  voluntarios: InformacoesUsuario[];
  title: string;
}

export type DadosEvento = {
  codigoEvento: string;
  nomeDoEvento: string;
  description: string;
  local: string;
  nomeResponsavel: string;
  telefoneResponsavel: string;
  voluntarios: InformacoesUsuario[];
  dias: DiaDeEvento[];
};

export type RespostaNovoEvento = {
  sucesso: boolean;
  codigoEvento: string;
};

export interface IEventoApi {
  criarNovoEvento: (payload: PayloadNovoEvento) => Promise<RespostaNovoEvento>;
  buscarEventoPorCodigo: (codigo: string) => Promise<DadosEvento>;
  adicionarVoluntarioEvento: (voluntario: InformacoesUsuario, evento: DadosEvento) => Promise<DadosEvento>;
  adicionarVoluntarioTurno: (voluntario: InformacoesUsuario, evento: DadosEvento, diaEvento: DiaDeEvento, turno: Turno) => Promise<DadosEvento>;
}

export const EventoApiMock: IEventoApi = {
  criarNovoEvento: async (payload: PayloadNovoEvento): Promise<RespostaNovoEvento> => {
    console.log('Mock - Criando novo evento:', payload);
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      sucesso: true,
      codigoEvento: 'mockCode123'
    };
  },

  adicionarVoluntarioEvento: async (voluntario: InformacoesUsuario, evento: DadosEvento): Promise<DadosEvento> => {
    console.log('Mock - Adicionando voluntario ao evento:', voluntario, 'no evento', evento);
  
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 500));
  
    // Mock logic to add voluntario if not already in the event's voluntarios array
    if (!evento.voluntarios.some(v => v.email === voluntario.email)) {
      evento.voluntarios.push(voluntario);
    }
  
    return {
      ...evento,
      voluntarios: evento.voluntarios
    };
  },

  adicionarVoluntarioTurno: async (voluntario: InformacoesUsuario, evento: DadosEvento, diaEvento: DiaDeEvento, turno: Turno): Promise<DadosEvento> => {
    console.log('Mock - Adicionando voluntario ao turno:', voluntario, 'no evento', evento, 'no dia', diaEvento, 'no turno', turno);
  
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 500));
  
    // Find the diaDeEvento and turno
    const diaIndex = evento.dias.findIndex(dia => dia.data === diaEvento.data);
    const turnoIndex = evento.dias[diaIndex]?.turnos.findIndex(t => t.title === turno.title);
  
    if (diaIndex !== -1 && turnoIndex !== -1) {
      // Check if the voluntario is already in the array
      if (!evento.dias[diaIndex].turnos[turnoIndex].voluntarios.some(v => v.email === voluntario.email)) {
        evento.dias[diaIndex].turnos[turnoIndex].voluntarios.push(voluntario);
      }
    } else {
      throw new Error('Invalid diaDeEvento or turno');
    }
  
    // Return the updated (or unchanged) event data
    return evento;
  },
  

  buscarEventoPorCodigo: async (codigo: string): Promise<DadosEvento> => {
    console.log('Mock - Buscando evento por código:', codigo);
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // Mock data
    const mockVoluntario: InformacoesUsuario = {
      email: 'voluntario@example.com',
      nome: 'Voluntário',
      telefone: '12345678',
      cargo: Cargo.VOLUNTARIO
    };

    const mockTurno: Turno = {
      voluntarios: [mockVoluntario],
      title: 'Turno da Manhã'
    };

    const mockDiaDeEvento: DiaDeEvento = {
      turnos: [mockTurno],
      data: new Date()
    };

    const mockDiaDeEvento2: DiaDeEvento = {
      turnos: [mockTurno],
      // data will be tomorow
      data: new Date(new Date().setDate(new Date().getDate() + 1))
    };

    return {
      codigoEvento: 'teste123',
      nomeDoEvento: 'Evento Mock',
      description: 'Descrição do Evento Mock',
      local: 'Local Mock',
      nomeResponsavel: 'Responsável Mock',
      telefoneResponsavel: '1234567890',
      dias: [mockDiaDeEvento, mockDiaDeEvento2],
      voluntarios: [],
    };
  }
};
