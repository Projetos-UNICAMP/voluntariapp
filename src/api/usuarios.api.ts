export enum Cargo {
  VOLUNTARIO = 'voluntario',
  MOTORISTA = 'motorista',
}

export type PayloadNovoUsuario = InformacoesUsuario & {
  senha: string;
};

export type InformacoesUsuario = {
  email: string;
  nome: string;
  telefone: string;
  cargo: Cargo;
};

export interface IUsuarioAPI {
  cadastrarNovoUsuario: (payload: PayloadNovoUsuario) => Promise<boolean>;
  loginComEmailESenha: (
    email: string,
    senha: string
  ) => Promise<InformacoesUsuario>;
}

export const UsuarioAPIMock: IUsuarioAPI = {
  cadastrarNovoUsuario: function (
    payload: PayloadNovoUsuario
  ): Promise<boolean> {
    console.log(payload);
    return new Promise<boolean>(() => setTimeout(() => true, 500));
  },
  loginComEmailESenha: function (
    email: string,
    senha: string
  ): Promise<InformacoesUsuario> {
    console.log(email, senha);
    return new Promise<InformacoesUsuario>(() => setTimeout(() => true, 500));
  },
};
