import { ReactNode, createContext, useContext, useState } from 'react';
import { InformacoesUsuario, PayloadNovoUsuario } from '../api/usuarios.api';
import { usuarioService } from '../api/firebaseImp/usuarios.service';

type AuthContextType = {
  currentUser: InformacoesUsuario | null;
  login: (email: string, senha: string, redirectCallback: () => void) => Promise<void>;
  register: (userData: PayloadNovoUsuario, redirectCallback: () => void) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext) as AuthContextType;
};

type AuthProviderProps = {
  children: ReactNode;
};


export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<InformacoesUsuario | null>(
    null
  );

  const login = async (email: string, senha: string, redirectCallback: () => void): Promise<void> => {
    const userInfo = await usuarioService.loginComEmailESenha(email, senha);
    setCurrentUser(userInfo); // userInfo is null if login fails
    if (userInfo == null) {
      alert("Erro no Login!");
    } else {
      redirectCallback();
    }
  };

  const register = async (userData: PayloadNovoUsuario, redirectCallback: () => void): Promise<void> => {
    const success = await usuarioService.cadastrarNovoUsuario(userData);
    if (success) {
      // Log in the user after successful registration
      alert(`Usuário ${userData.nome} criado com Sucesso!`);
      await login(userData.email, userData.senha, redirectCallback);
      redirectCallback();
    }
  };

  const logout = (): void => {
    // Logout implementation
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
