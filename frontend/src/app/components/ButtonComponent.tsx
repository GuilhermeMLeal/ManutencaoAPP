import * as React from 'react';
import Button from '@mui/material/Button';

interface ButtonUsageProps {
  name: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const ButtonComponent: React.FC<ButtonUsageProps> = ({name, onClick, className, disabled, icon}) => {
  return <Button variant="contained" onClick={onClick} className={className} disabled={disabled} startIcon={icon}>{name}</Button>;

}

export default ButtonComponent;