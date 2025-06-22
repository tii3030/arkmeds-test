import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { applyMask, MaskType } from '@/utils/masks';

interface MaskedFieldProps extends Omit<TextFieldProps, 'onChange'> {
  maskType: MaskType;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  size?: 'small' | 'medium';
  margin?: 'dense' | 'normal' | 'none';
  error?: boolean;
  helperText?: React.ReactNode;
}

export const MaskedField: React.FC<MaskedFieldProps> = ({ 
  maskType, 
  value, 
  onChange, 
  error,
  helperText,
  ...props 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const maskedValue = applyMask(rawValue, maskType);
    onChange(maskedValue);
  };

  return (
    <TextField
      {...props}
      value={value}
      onChange={handleChange}
      error={error}
      helperText={helperText}
    />
  );
};