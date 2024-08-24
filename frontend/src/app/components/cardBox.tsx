import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';

interface CardBoxProps {
  item: {
    title: string;
    description: string;
    image: string;
  };
  onSeeMore: () => void;
}

export default function CardBox({ item, onSeeMore }: CardBoxProps) {
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
        <Button size="small">Editar</Button>
        <Button size="small" onClick={onSeeMore}>
          Ver Mais Sobre
        </Button>
      </CardActions>
    </Card>
  );
}
