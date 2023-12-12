import React from 'react';
import { Input } from '@chakra-ui/react';

export interface PasswordInputProps {
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
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
      type='password'
    />
  );
};

export default PasswordInput;
