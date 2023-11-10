import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/users/get")
      .then((res) => {
        const normalizedUsers = res.data.map((user) => ({
          ...user,
          id: user._id, // Assuming _id is unique for each user
        }));
        setUsers(normalizedUsers);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  const handleUserClick = (userId) => {
    console.log("Clicked user ID:", userId);
    axios.delete(`http://localhost:4000/admin/users/delete/${userId}`)
    .then((res) => {
        console.log("User deleted successfully:", res);
    }).catch((err) => {
        console.error("Error deleting user:", err);
    });     

  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
    },
    {
      field: "firstName",
      headerName: "FIRST NAME",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "LAST NAME",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "EMAIL",
      flex: 1,
    },
    {
      field: "role",
      headerName: "ACCESS LEVEL",
      flex: 1,
      renderCell: ({ row: { role, _id } }) => {
        return (
          <Box
            width="60%"
            
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "admin"
                ? colors.greenAccent[600]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {role === "buyer" && <SecurityOutlinedIcon />}
            {role === "seller" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row: { _id } }) => {
        return (
          <Button
            variant="contained"
            color="error"
            onClick={() => handleUserClick(_id)}
            startIcon={<DeleteIcon />}
          >
            Delete User
          </Button>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid rows={users} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
