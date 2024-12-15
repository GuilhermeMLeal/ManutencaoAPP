import React from "react"
import Snackbar from "@mui/material/Snackbar"

type CustomSnackbarProps = {
  open: boolean
  message: string
  onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void
  anchorOrigin?: {
    vertical: "top" | "bottom"
    horizontal: "left" | "center" | "right"
  }
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  message,
  onClose,
  anchorOrigin = { vertical: "bottom", horizontal: "right" },
}) => {
  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      open={open}
      onClose={onClose}
      message={message}
      key={`${anchorOrigin.vertical}${anchorOrigin.horizontal}`}
    />
  )
}

export default CustomSnackbar