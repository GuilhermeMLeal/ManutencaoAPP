import { Button } from "@mui/material";

interface CreateItem {
    textButton: string;
  }

export default function CreateReport({ textButton }: CreateItem) {
    return (
    <>
        <Button variant="contained" color="primary" sx={{marginRight: 2}}>
            {textButton}
        </Button>
    </>
  )
}
