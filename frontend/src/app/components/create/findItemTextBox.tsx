import { Box, TextField } from "@mui/material";
import CreateItem from "./createItem";

interface TextBox {
  nameTextSearch: string;
  textButton: string;
  pageText: string;
  onSearch: (query: string) => void;
}

export function FindItemTextBox({
  nameTextSearch,
  textButton,
  pageText,
  onSearch,
}: TextBox) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        paddingRight: "8%",
        paddingLeft: "8%",
        paddingBottom: "1%",
        paddingTop: "2%",
      }}
    >
      <CreateItem textButton={textButton} pageText={pageText} />
      <TextField
        id="outlined-basic"
        label={`Pesquisar ${nameTextSearch}`}
        variant="outlined"
        sx={{
          width: "300px",
          marginLeft: "16px",
        }}
        onChange={(e) => onSearch(e.target.value)}
      />
    </Box>
  );
}
