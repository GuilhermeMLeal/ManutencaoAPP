import React from "react";
import { TablePagination } from "@mui/material";

interface PaginationProps {
  count: number;
  rowsPerPage: number;
  page: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaginationComponent = ({
  count,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
}: PaginationProps) => {
  return (
    <TablePagination
      rowsPerPageOptions={[3, 5, 10]}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  );
};

export default PaginationComponent;

