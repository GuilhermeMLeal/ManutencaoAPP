import { Button } from "@mui/material";
import Link from "next/link";

interface CreateItem {
    textButton: string;
    pageText:string;
  }

export default function CreateItem({ textButton, pageText }: CreateItem) {
    return (
    <>
      <Link href={pageText} passHref>
          <Button variant="contained" color="primary" size="large">
            {textButton}
          </Button>
        </Link>
    </>
  )
}
