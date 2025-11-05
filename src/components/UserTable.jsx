import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from "react";
import SnackBar from "./SnackBar/SnackBar";
import { Delete } from "@mui/icons-material";

export default function UserTable({ onEdit, users,onDelete, pageDetails, setPageDetails }) {
  const [open, setOpen] = useState(false);
  const [snackbarTitle, setSnackbarTitle] = useState("");
  const [severity, setSeverity] = useState("success");
  const onClose = () => {
    setOpen(false);
  };


  const columns = [
    { field: "name", headerName: "Name", width: 300 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "contact", headerName: "Contact", width: 200 },
    { field: "portal", headerName: "Portal", width: 300 },
    { field: "role", headerName: "Role", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton variant="contained" onClick={() => onEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton variant="contained" onClick={() => onDelete(params.row)}>
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];





  return (
    <Box sx={{ mt: 2 }}>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: pageDetails.pageSize,
              page: pageDetails.page - 1,
            },
          },
        }}
        // components={{
        //   NoRowsOverlay: loading ? "Loading..." : "No records found",
        // }}
        rowCount={100} // assuming total rows is 100, adjust as needed
        paginationMode="server"
        // search handling can be added here
        // handle page size change
        onPaginationModelChange={(newModel) => {
          setPageDetails({
            ...pageDetails,
            pageSize: newModel.pageSize,
            page: newModel.page + 1
          })
        }}
        // handle page change
        onPageChange={(newPage) => {
          setPageDetails({
            ...pageDetails,
            page: newPage + 1
          })
        }}
        autoHeight
        pageSizeOptions={[5, 10, 50]}
        disableRowSelectionOnClick
      />
      <SnackBar open={open} severity={severity} snackbarTitle={snackbarTitle} onClose={onClose} />
    </Box>
  );
}