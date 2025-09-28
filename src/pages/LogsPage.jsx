import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Modal, Button, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function LogsPage() {
    const logs = useSelector((state) => state?.users?.logs || [
        {
          "action": "Login",
          "user": { "name": "John Doe" },
          "time": "2025-09-28 10:00:00"
        },
        {
          "action": "Logout",
          "user": { "name": "Jane Smith" },
          "time": "2025-09-28 10:15:00",
          "changes": [
            { field: "email", oldValue: "old@mail.com", newValue: "john@example.com" },
            { field: "role", oldValue: "user", newValue: "admin" },
            { field: "name", oldValue: "Jane", newValue: "Jane Smith" }
          ]
        },
        {
          "action": "Create",
          "user": { "name": "Alice Johnson" },
          "time": "2025-09-28 10:30:00"
        },
        {
          "action": "Update",
          "user": { "name": "Bob Brown" },
          "time": "2025-09-28 10:45:00"
        },
        {
          "action": "Delete",
          "user": { "name": "Charlie Davis" },
          "time": "2025-09-28 11:00:00",
          "changes": [
            { field: "name", oldValue: "Charlie", newValue: "Charlie Davis" }
          ]
        },
        {
          "action": "Login",
          "user": { "name": "Eve White" },
          "time": "2025-09-28 11:15:00"
        },
        {
          "action": "Logout",
          "user": { "name": "Frank Green" },
          "time": "2025-09-28 11:30:00"
        },
        {
          "action": "Create",
          "user": { "name": "Grace Hall" },
          "time": "2025-09-28 11:45:00"
        },
        {
          "action": "Update",
          "user": { "name": "Hank King" },
          "time": "2025-09-28 12:00:00"
        },
        {
          "action": "Delete",
          "user": { "name": "Ivy Lee" },
          "time": "2025-09-28 12:15:00"
        },
        {
          "action": "Login",
          "user": { "name": "Jack Moore" },
          "time": "2025-09-28 12:30:00"
        },
        {
          "action": "Logout",
          "user": { "name": "Karen Scott" },
          "time": "2025-09-28 12:45:00"
        },
        {
          "action": "Create",
          "user": { "name": "Leo Adams" },
          "time": "2025-09-28 13:00:00"
        },
        {
          "action": "Update",
          "user": { "name": "Mia Clark" },
          "time": "2025-09-28 13:15:00"
        },
        {
          "action": "Delete",
          "user": { "name": "Noah Lewis" },
          "time": "2025-09-28 13:30:00"
        },
        {
          "action": "Login",
          "user": { "name": "Olivia Walker" },
          "time": "2025-09-28 13:45:00"
        },
        {
          "action": "Logout",
          "user": { "name": "Paul Young" },
          "time": "2025-09-28 14:00:00"
        },
        {
          "action": "Create",
          "user": { "name": "Quinn Allen" },
          "time": "2025-09-28 14:15:00"
        },
        {
          "action": "Update",
          "user": { "name": "Ruby Wright" },
          "time": "2025-09-28 14:30:00"
        },
        {
          "action": "Delete",
          "user": { "name": "Sam Hill" },
          "time": "2025-09-28 14:45:00"
        }
      ]);

    const [open, setOpen] = useState(false);
    const [selectedChanges, setSelectedChanges] = useState([]);

    const handleOpen = (changes) => {
        setSelectedChanges(changes);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedChanges([]);
    };

    const columns = [
        { field: "action", headerName: "Action", width: 120 },
        { 
          field: "user", 
          headerName: "User", 
          width: 200, 
          valueGetter: (params) => {
            const u = params.name;
            return u ? u : "Test";
          }
        },
        { field: "time", headerName: "Time", width: 200 },
        { 
          field: "changes", 
          headerName: "Changes", 
          width: 300, 
          renderCell: (params) => {
            const changes = params.row.changes;
            if (!changes || changes.length === 0) return null;
            if (changes.length > 0) {
              return (
                <IconButton onClick={() => handleOpen(changes)}>
                  <VisibilityIcon />
                </IconButton>
              );
            }

            return (
              <Box>
                {changes.map((change, index) => (
                  <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Typography variant="body2" sx={{ mr: 1, fontWeight: "bold" }}>
                      {change.field}:
                    </Typography>
                    <Typography variant="body2" sx={{ color: "gray", textDecoration: "line-through", mr: 1 }}>
                      {change.oldValue}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "green" }}>
                      {change.newValue}
                    </Typography>
                  </Box>
                ))}
              </Box>
            );
          }
        },
    ];

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>User Activity Logs</Typography>
            <Box sx={{ height: 400 }}>
                <DataGrid 
                  rows={logs.map((log, idx) => ({ id: idx, ...log }))} 
                  columns={columns} 
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10,
                      },
                    },
                  }}
                  autoHeight
                  pageSizeOptions={[5,10,50]}
                  disableRowSelectionOnClick
                  pagination 
                />
            </Box>

            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2
                }}>
                    <Typography variant="h6" gutterBottom sx={{fontWeight:'bold',fontSize:'16px',mb:2}}>Changes</Typography>
                    {selectedChanges.map((change, index) => (
                        <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <Typography variant="body2" sx={{ mr: 1, fontWeight: "bold" }}>
                                {change.field}:
                            </Typography>
                            <Typography variant="body2" sx={{ color: "gray", textDecoration: "line-through", mr: 1 }}>
                                {change.oldValue}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "green" }}>
                                {change.newValue}
                            </Typography>
                        </Box>
                    ))}
                    <Button onClick={handleClose} variant="contained" sx={{ mt: 2 ,}}>Close</Button>
                </Box>
            </Modal>
        </Box>
    );
}