// FinalTextInputField.tsx
import React from 'react';
import { Input } from '@chakra-ui/react';

export interface FinalTextInputFieldProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const FinalTextInputField: React.FC<FinalTextInputFieldProps> = ({ value, onChange, placeholder }) => {
    return (
        <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
        />
    );
};

export default FinalTextInputField;
