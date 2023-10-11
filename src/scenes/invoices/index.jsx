import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Invoice = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [invoice, setInvoice] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/products/total/earnings")
      .then((res) => {
        console.log("Invoice: ", res.data);

        // Flatten the response object into an array
        const normalizedOrders = Object.keys(res.data).map((sellerId) => ({
          id: sellerId,
          ...res.data[sellerId],
        }));

        setInvoice(normalizedOrders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      field: "id", // Use the id field as the unique identifier
      headerName: "SELLER NAME",
      flex: 1,
      valueGetter: (params) => {
        const sellerDetails = params.row.sellerDetails;
        return `${sellerDetails.firstName} ${sellerDetails.lastName}`;
      },
    },
    {
      field: "email", // Use the id field as the unique identifier
      headerName: "EMAIL",
      flex: 1.5,
      valueGetter: (params) => {
        const sellerDetails = params.row.sellerDetails;
        return `${sellerDetails.email}`;
      },
    },
    {
      field: "address", // Use the id field as the unique identifier
      headerName: "ADDRESS",
      flex: 2,
      valueGetter: (params) => {
        const sellerDetails = params.row.sellerDetails;
        return `${sellerDetails.address}`;
      },
    },
    {
      field: "totalEarnings", // Use the totalEarnings field for the "TO PAY" column
      headerName: "TO PAY",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Invoice" subtitle="List of Payable Amount To Seller" />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={invoice}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Invoice;
