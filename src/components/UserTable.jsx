import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from "react";
import SnackBar from "./SnackBar/SnackBar";
import { Delete, Visibility, VisibilityOff } from "@mui/icons-material";

function PasswordCell({ value }) {
  const [show, setShow] = useState(false);
  if (!value) return <span style={{ color: '#aaa' }}>—</span>;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <span style={{ fontFamily: 'monospace', fontSize: 13 }}>
        {show ? value : '•'.repeat(Math.min(value.length, 10))}
      </span>
      <IconButton size="small" onClick={() => setShow((s) => !s)}>
        {show ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
      </IconButton>
    </Box>
  );
}

export default function UserTable({ onEdit, users, onDelete, pageDetails, setPageDetails }) {
  const [open, setOpen] = useState(false);
  const [snackbarTitle, setSnackbarTitle] = useState("");
  const [severity, setSeverity] = useState("success");
  const onClose = () => setOpen(false);

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "contact", headerName: "Contact", width: 150 },
    { field: "portal", headerName: "Portal", width: 200 },
    { field: "role", headerName: "Role", width: 180 },
    {
      field: "password",
      headerName: "Password",
      width: 200,
      sortable: false,
      renderCell: (params) => <PasswordCell value={params.value} />,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton size="small" onClick={() => onEdit(params.row)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(params.row)}>
            <Delete fontSize="small" />
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
        rowCount={100}
        paginationMode="server"
        onPaginationModelChange={(newModel) => {
          setPageDetails({
            ...pageDetails,
            pageSize: newModel.pageSize,
            page: newModel.page + 1,
          });
        }}
        onPageChange={(newPage) => {
          setPageDetails({ ...pageDetails, page: newPage + 1 });
        }}
        autoHeight
        pageSizeOptions={[5, 10, 50]}
        disableRowSelectionOnClick
      />
      <SnackBar open={open} severity={severity} snackbarTitle={snackbarTitle} onClose={onClose} />
    </Box>
  );
}
