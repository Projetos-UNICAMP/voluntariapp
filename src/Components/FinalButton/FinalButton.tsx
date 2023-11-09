// src/components/FinalButton/FinalButton.tsx
import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

export enum ButtonStyleOptions {
  Primary = 'primary',
  Secondary = 'secondary',
}

export type Props = {
  label: string;
  style: ButtonStyleOptions;
  onClick: () => void;
};

export default function FinalButton({ label, style = ButtonStyleOptions.Primary, onClick }: Props) {
  const primaryProps: ButtonProps = {
    colorScheme: 'linkedin',
  }
  
  const secondaryProps: ButtonProps = {
    colorScheme: 'pink',
  }

  const buttonProps: ButtonProps = style === ButtonStyleOptions.Primary ? primaryProps : secondaryProps;

  return (
    <div>
      <Button {...buttonProps} onClick={onClick}>{label}</Button>
    </div>
  );
}