import { Box, TextField } from "@mui/material";
import CreateItem from "./createItem";
import CreateReport from "./createReport";

interface TextBox {
  nameTextSearch: string;
  textReport: string;
  textButton: string;
  pageText: string;
  typeTextField: string;
  onSearch: (query: string) => void;
}

export function FindItemTextBox({
  nameTextSearch,
  textReport,
  textButton,
  pageText,
  typeTextField,
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
      <CreateReport textButton={textReport} typeTextField={typeTextField} />
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
