import React, { useState } from 'react';

export interface User {
  name: string;
  email: string;
  password: string;
  cpf: string;
  city: string;
  state: string;
}

const SignUpForm: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    password: '',
    cpf: '',
    city: '',
    state: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados para um servidor, por exemplo
    console.log(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Nome"
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Senha"
      />
      <input
        type="text"
        name="cpf"
        value={user.cpf}
        onChange={handleChange}
        placeholder="CPF"
      />
      <input
        type="text"
        name="city"
        value={user.city}
        onChange={handleChange}
        placeholder="Cidade"
      />
      <input
        type="text"
        name="state"
        value={user.state}
        onChange={handleChange}
        placeholder="Estado"
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default SignUpForm;
