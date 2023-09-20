export enum Cargo {
  VOLUNTARIO = 'voluntario',
  MOTORISTA = 'motorista',
}

export type PayloadNovoUsuario = InformacoesUsuario;

export type InformacoesUsuario = {
  nome: string;
  telefone: string;
  senha: string;
  cargo: Cargo;
};

export interface IUsuarioAPI {
  cadastrarNovoUsuario: (payload: PayloadNovoUsuario) => Promise<boolean>;
  loginComNomeESenha: (
    nome: string,
    senha: string
  ) => Promise<InformacoesUsuario>;
}

export const UsuarioAPI: IUsuarioAPI = {
  cadastrarNovoUsuario: function (
    payload: PayloadNovoUsuario
  ): Promise<boolean> {
    console.log(payload);
    return new Promise<boolean>(() => setTimeout(() => true, 500));
  },
  loginComNomeESenha: function (
    nome: string,
    senha: string
  ): Promise<InformacoesUsuario> {
    console.log(nome, senha);
    return new Promise<InformacoesUsuario>(() => setTimeout(() => true, 500));
  },
};
