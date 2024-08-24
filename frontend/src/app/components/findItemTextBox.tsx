import { Box, TextField } from "@mui/material";
import CreateItem from "./createItem";

interface TextBox{
    nameTextSearch: string;
    textButton: string;
    pageText:string;
}

export function FindItemTextBox({ nameTextSearch, textButton, pageText }: TextBox) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingRight: '8%',
          paddingBottom: '3%',
        }}
      >
        <CreateItem textButton={textButton} pageText={pageText} />
        <TextField
          id="outlined-basic"
          label={`Pesquisar ${nameTextSearch}`}
          variant="outlined"
          sx={{
            width: '300px',
            marginLeft: '16px',
          }}
        />
      </Box>
    );
  }