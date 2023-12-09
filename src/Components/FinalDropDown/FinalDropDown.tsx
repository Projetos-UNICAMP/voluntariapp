// SimpleDropdown.tsx
import React from 'react';
import { Select } from '@chakra-ui/react';

export interface FinalDropdownProps {
    label: string;
    options: {
        label: string;
        value: string;
    }[];
}

const FinalDropdown: React.FC<FinalDropdownProps> = ({ label, options }) => {
    return (
        <div>
            <label>{label}</label>
            <Select placeholder="Select option">
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Select>
        </div>
    );
};

export default FinalDropdown;
