import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { browserRouter } from './routes/routes.tsx';

const colors = {
  teal: {
    '50': '#EEF7F7',
    '100': '#CEE8E8',
    '200': '#AFD9DA',
    '300': '#8FCBCC',
    '400': '#70BCBD',
    '500': '#50ADAF',
    '600': '#408A8C',
    '700': '#306869',
    '800': '#204546',
    '900': '#102323',
  },
  pink: {
    '50': '#FEE6EA',
    '100': '#FCBAC3',
    '200': '#FB8E9D',
    '300': '#F96277',
    '400': '#F73651',
    '500': '#F6092A',
    '600': '#C40822',
    '700': '#930619',
    '800': '#620411',
    '900': '#310208',
  },
};

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={browserRouter} />
    </ChakraProvider>
  </React.StrictMode>
);
