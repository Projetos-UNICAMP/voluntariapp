export type PayloadNovoEvento = {
  nomeDoEvento: string;
  description: string;
  local: string;
  nomeResponsavel: string;
  telefoneResponsavel: string;
};

export type DadosEvento = {
  nomeDoEvento: string;
  description: string;
  local: string;
  nomeResponsavel: string;
  telefoneResponsavel: string;
};

export type RespostaNovoEvento = {
  sucesso: boolean;
  codigoEvento: string;
};

export interface IEventoApi {
  criarNovoEvento: (payload: PayloadNovoEvento) => Promise<RespostaNovoEvento>;
  buscarEventoPorCodigo: (codigo: string) => Promise<DadosEvento>;
}

export const EventoAPIMock: IEventoApi = {
  criarNovoEvento: function (
    payload: PayloadNovoEvento
  ): Promise<RespostaNovoEvento> {
    console.log(payload);
    return new Promise<RespostaNovoEvento>((resolve) =>
      setTimeout(() => (resolve({ sucesso: true, codigoEvento: '' })), 500)
    );
  },
  buscarEventoPorCodigo: function (codigo: string): Promise<DadosEvento> {
    console.log(codigo);
    const mockEvento: DadosEvento = {
      nomeDoEvento: 'Evento Exemplo',
      description: 'Descrição de um evento Exemplo',
      local: 'Local do Evento',
      nomeResponsavel: 'Responsável pelo Exemplo',
      telefoneResponsavel: '(35) 99999-9999',
    };
    return new Promise<DadosEvento>((resolve) => setTimeout(() => resolve(mockEvento), 500));
  },
};
