import type { Preview } from '@storybook/react';

import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { StoryContext } from '@storybook/react';

const ChakraDecorator = (Story: any, context: StoryContext) => (
  <ChakraProvider>
    <Story {...context} />
  </ChakraProvider>
);

export const decorators = [ChakraDecorator];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
