import React from 'react';
import TextField from '@mui/material/TextField';

interface TextFieldComponentProps {
  placeholder?: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void; 
}

const TextFieldComponent: React.FC<TextFieldComponentProps> = ({  value, placeholder, type = 'text', onChange,onKeyPress, }) => {
  return (
    <div>
      <TextField
        id="textField"
        label={placeholder || "Enter value"}
        variant="outlined"
        value={value}
        onChange={onChange}
        type={type}
        onKeyPress={onKeyPress}
      />
    </div>
  );
};

export default TextFieldComponent;