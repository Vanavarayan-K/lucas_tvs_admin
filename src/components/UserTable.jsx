import { DataGrid } from "@mui/x-data-grid";
import {  Box, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';

export default function UserTable({ onEdit }) {
    const users = useSelector((state) => state.users.list || [
        {
          "id": 1,
          "name": "John Doe",
          "email": "john.doe@example.com",
          "contact": "123-456-7890",
          "address": "123 Main St, Springfield",
          "role": "Admin"
        },
        {
          "id": 2,
          "name": "Jane Smith",
          "email": "jane.smith@example.com",
          "contact": "987-654-3210",
          "address": "456 Elm St, Shelbyville",
          "role": "Sales"
        },
        {
          "id": 3,
          "name": "Alice Johnson",
          "email": "alice.johnson@example.com",
          "contact": "555-123-4567",
          "address": "789 Oak St, Capital City",
          "role": "Clients"
        },
        {
          "id": 4,
          "name": "Bob Brown",
          "email": "bob.brown@example.com",
          "contact": "111-222-3333",
          "address": "321 Pine St, Ogdenville",
          "role": "Admin"
        },
        {
          "id": 5,
          "name": "Charlie Davis",
          "email": "charlie.davis@example.com",
          "contact": "444-555-6666",
          "address": "654 Maple St, North Haverbrook",
          "role": "Sales"
        },
        {
          "id": 6,
          "name": "Eve White",
          "email": "eve.white@example.com",
          "contact": "777-888-9999",
          "address": "987 Birch St, Springfield",
          "role": "Clients"
        },
        {
          "id": 7,
          "name": "Frank Green",
          "email": "frank.green@example.com",
          "contact": "222-333-4444",
          "address": "123 Cedar St, Shelbyville",
          "role": "Admin"
        },
        {
          "id": 8,
          "name": "Grace Hall",
          "email": "grace.hall@example.com",
          "contact": "333-444-5555",
          "address": "456 Walnut St, Capital City",
          "role": "Sales"
        },
        {
          "id": 9,
          "name": "Hank King",
          "email": "hank.king@example.com",
          "contact": "666-777-8888",
          "address": "789 Chestnut St, Ogdenville",
          "role": "Clients"
        },
        {
          "id": 10,
          "name": "Ivy Lee",
          "email": "ivy.lee@example.com",
          "contact": "999-000-1111",
          "address": "321 Aspen St, North Haverbrook",
          "role": "Admin"
        },
        {
          "id": 11,
          "name": "Jack Moore",
          "email": "jack.moore@example.com",
          "contact": "123-321-4567",
          "address": "654 Redwood St, Springfield",
          "role": "Sales"
        },
        {
          "id": 12,
          "name": "Karen Scott",
          "email": "karen.scott@example.com",
          "contact": "789-987-6543",
          "address": "987 Cypress St, Shelbyville",
          "role": "Clients"
        },
        {
          "id": 13,
          "name": "Leo Adams",
          "email": "leo.adams@example.com",
          "contact": "456-654-7890",
          "address": "123 Spruce St, Capital City",
          "role": "Admin"
        },
        {
          "id": 14,
          "name": "Mia Clark",
          "email": "mia.clark@example.com",
          "contact": "321-123-9876",
          "address": "456 Fir St, Ogdenville",
          "role": "Sales"
        },
        {
          "id": 15,
          "name": "Noah Lewis",
          "email": "noah.lewis@example.com",
          "contact": "654-456-3210",
          "address": "789 Willow St, North Haverbrook",
          "role": "Clients"
        },
        {
          "id": 16,
          "name": "Olivia Walker",
          "email": "olivia.walker@example.com",
          "contact": "987-789-1234",
          "address": "321 Poplar St, Springfield",
          "role": "Admin"
        },
        {
          "id": 17,
          "name": "Paul Young",
          "email": "paul.young@example.com",
          "contact": "111-222-3333",
          "address": "654 Alder St, Shelbyville",
          "role": "Sales"
        },
        {
          "id": 18,
          "name": "Quinn Allen",
          "email": "quinn.allen@example.com",
          "contact": "444-555-6666",
          "address": "987 Beech St, Capital City",
          "role": "Clients"
        },
        {
          "id": 19,
          "name": "Ruby Wright",
          "email": "ruby.wright@example.com",
          "contact": "777-888-9999",
          "address": "123 Dogwood St, Ogdenville",
          "role": "Admin"
        },
        {
          "id": 20,
          "name": "Sam Hill",
          "email": "sam.hill@example.com",
          "contact": "222-333-4444",
          "address": "456 Hickory St, North Haverbrook",
          "role": "Sales"
        }
      ]);


    const columns = [
        { field: "name", headerName: "Name", width: 300 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "contact", headerName: "Contact", width: 200 },
        { field: "address", headerName: "Address", width: 300 },
        { field: "role", headerName: "Role", width: 200 },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
                <IconButton variant="contained" onClick={() => onEdit(params.row)}>
                    <EditIcon/>
                </IconButton>
            ),
        },
    ];


    return (
        <Box sx={{  mt: 2 }}>
            <DataGrid 
             rows={users}
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
             />
        </Box>
    );
}