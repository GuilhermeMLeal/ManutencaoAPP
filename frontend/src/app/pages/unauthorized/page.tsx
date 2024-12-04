"use client"

import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Unauthorized = () => {
  const router = useRouter();

  const handleRedirectToLogin = () => {
    router.push('/login');
  };

  return (
    <Box
      className="flex flex-col justify-center items-center h-screen text-center bg-gray-100"
    >
      <Typography variant="h4" className="mb-4 text-gray-800">
        Acesso Negado
      </Typography>
      <Typography variant="body1" className="mb-6 text-gray-600">
        Você não tem permissão para acessar esta página.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRedirectToLogin}
        className="bg-blue-600 hover:bg-blue-700"
      >
        Voltar ao Login
      </Button>
    </Box>
  );
};

export default Unauthorized;
