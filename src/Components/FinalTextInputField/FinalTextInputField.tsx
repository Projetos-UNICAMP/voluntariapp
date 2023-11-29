// FinalTextInputField.tsx
import React from 'react';
import { Input } from '@chakra-ui/react';

export interface FinalTextInputFieldProps {
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name: string;
}

const FinalTextInputField: React.FC<FinalTextInputFieldProps> = ({
  value,
  onChange,
  placeholder,
  name,
}) => {
  return (
    <Input
      name={name}
      value={value}
      onChange={(e) => onChange(e)}
      placeholder={placeholder}
    />
  );
};

export default FinalTextInputField;
