
# Descrição da Arquitetura do Projeto
## Diagrama C4
![image](https://github.com/Projetos-UNICAMP/voluntariapp/assets/85421560/fe905e51-a656-42e0-8496-de11e321c7c9)
## Estilos Arquiteturais
Utilizamos o padrão de arquitetura em camadas, criando diversos serviços a serem utilizados pelos componentes e esses serviços consomem os serviços já providos pelo banco de dados e também pela biblioteca de componentes utilizada. Dentro dos próprios componentes também somos capazes de ver a arquitetura em camadas, como no exemplo do Router, que fornece informações para a MainPage e recebe das páginas do projeto (LandingPage, EventInfo, etc)
## Descrição dos componentes
- MainPage: página que é sempre renderizada pelo single page application, pode mudar conforme o router é manipulado pelo usuário durante a navegação do aplicativo
- Router: cuida das rotas da aplicação, fornecendo meios de navegar no aplicativo para os usuários 
- Login: tela de entrada do usuário no sistema, em que ele fornece seus dados para utilizar a aplicação em seu perfil
- CreateEvent: página de criação do evento da aplicação, usada pelos organizadores de eventos para criarem e configurarem os mesmos
- EventInfo: página em que se pode ver as informações de um evento, pode ser acessada por organizadores e também voluntários
- LandingPage: página inicial que o usuário (seja ele voluntário ou organizador) inicia seu fluxo no aplicativo
- SignUp: página que permite o cadastro do usuário, nela ele coloca suas informações e também o tipo de usuário
- UserService: serviço de cadastro e login do usuário
- EventoService: serviço de cadastro e acesso a eventos
- Component Library: biblioteca de componentes padronizados para o projeto, montada com base nos elementos do Chakra UI

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
