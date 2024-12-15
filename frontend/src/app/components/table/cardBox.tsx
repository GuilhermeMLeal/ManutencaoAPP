import React from "react";
import { Card, CardContent, CardMedia, Typography, CardActions, IconButton } from "@mui/material";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Importa os ícones
import Link from "next/link";

interface CardBoxProps {
  item: {
    title: string;
    description: string;
    image: string;
  };
  updatePath: string;
  onDelete: () => void; // Função de deleção
}

export default function CardBox({ item, updatePath, onDelete }: CardBoxProps) {
  return (
    <Card sx={{ width: 300 }}>
      <CardMedia sx={{ height: 140 }} image={item.image} title={item.title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        {/* Botão de Editar */}
        <Link href={updatePath} passHref>
          <IconButton color="primary">
            <FaEdit />
          </IconButton>
        </Link>

        {/* Botão de Deletar */}
        <IconButton color="error" onClick={onDelete} sx={{ ml: 1 }}>
          <FaTrashAlt />
        </IconButton>
      </CardActions>
    </Card>
  );
}
