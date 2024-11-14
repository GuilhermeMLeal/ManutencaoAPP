import { Box, Typography } from "@mui/material";

interface TitleType {
  title: string;
  subtitle: string;
}

export default function TitleMain({ title, subtitle }: TitleType) {
  return (
    <>
      <h1 className="text-4xl top-0 font-bold uppercase w-full p-6 text-start text-black bg-white shadow-md z-10">
        {title}
      </h1>
      <Box sx={{ textAlign: "center", mb: 4, paddingTop: 4 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          className="text-black"
        >
        </Typography>
      </Box>
    </>
  )
}
