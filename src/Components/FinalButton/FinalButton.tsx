/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/FinalButton/FinalButton.tsx
import { Button, ButtonProps, StyleProps } from '@chakra-ui/react';

export enum ButtonStyleOptions {
  Primary = 'primary',
  Secondary = 'secondary',
}

export interface ButtonStyleProps extends StyleProps {
  type: ButtonStyleOptions;
}

export type Props = {
  label: string;
  style: ButtonStyleProps;
  onClick: () => void;
};

export default function FinalButton({
  label,
  style = { type: ButtonStyleOptions.Primary },
  onClick,
}: Props) {
  const primaryProps: ButtonProps = {
    colorScheme: 'teal',
  };

  const secondaryProps: ButtonProps = {
    color: 'white',
    backgroundColor: 'pink.200',
  };

  const buttonProps: ButtonProps =
    style.type === ButtonStyleOptions.Primary ? primaryProps : secondaryProps;

  const { type, ...buttonStyle } = style;

  return (
    <div>
      <Button {...buttonProps} {...buttonStyle} onClick={onClick}>
        {label}
      </Button>
    </div>
  );
}
