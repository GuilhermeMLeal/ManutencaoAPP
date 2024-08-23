import { Button, Container, Box, Typography } from "@mui/material";
import Link from "next/link";

interface TitleType {
  title: string;
  subtitle: string;
  textButton: string;
  pageText:string;
}

export default function Title({ title, subtitle, textButton, pageText }: TitleType) {
  return (
    <>
      <h1 className="text-4xl fixed top-0 font-bold uppercase w-full p-6 text-start text-black bg-white shadow-md z-10">
        {title}
      </h1>
      <Box sx={{ textAlign: "center", mb: 4, paddingTop: 4 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          className="text-black"
        >
          {subtitle}
        </Typography>
        <Link href={pageText} passHref>
          <Button variant="contained" color="primary" size="large">
            {textButton}
          </Button>
        </Link>
      </Box>
    </>
  )
}
