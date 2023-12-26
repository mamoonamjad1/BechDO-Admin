import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import axios from "axios";

const Order = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/orders/get")
      .then((res) => {
        const normalizedOrders = res.data.map((order) => ({
          ...order,
          id: order._id,
        }));
        setOrders(normalizedOrders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.7,
    },
    {
      field: "seller",
      headerName: "SELLER",
      flex: 1,
      valueGetter: (params) => {
        const seller = params.row.seller;
        return seller ? `${seller.firstName} ${seller.lastName}` : "No Seller";
      },
    },
    {
      field: "product",
      headerName: "Product Name",
      headerAlign: "left",
      align: "left",
      valueGetter: (params) => {
        const products = params.row.products;
        return products ? `${products.name}` : "No Product";
      },
    },
    {
      field: "deliveryStatus",
      headerName: "STATUS",
      headerAlign: "left",
      align: "left",
      renderCell: ({ row: { deliveryStatus } }) => {
        return (
          <Box width="60%" display="flex" justifyContent="center" borderRadius="4px">
            {deliveryStatus === "InTransit" && (
              <Button color="error" sx={{ ml: "5px" }}>
                {deliveryStatus}
              </Button>
            )}
            {deliveryStatus === "Received" && (
              <Button color="warning" sx={{ ml: "5px" }}>
                {deliveryStatus}
              </Button>
            )}
            {deliveryStatus === "Delivered" && (
              <Button color="success" sx={{ ml: "5px" }}>
                {deliveryStatus}
              </Button>
            )}
          </Box>
        );
      },
    },
    {
      field: "price",
      headerName: "PRICE",
      headerAlign: "left",
      align: "left",
      valueGetter: (params) => {
        const products = params.row.products;
        return products ? `${products.currentPrice?.$numberDecimal.toString()}` : "No Price";
      },
    },
    {
      field: "buyer",
      headerName: "Buyer Name",
      flex: 1.2,
      cellClassName: "name-column--cell",
      valueGetter: (params) => {
        const buyer = params.row.buyer;
        return buyer ? `${buyer.firstName} ${buyer.lastName}` : "No Buyer";
      },
    },
    {
      field: "phone",
      headerName: "PHONE NUMBER",
      flex: 1.2,
    },
    {
      field: "email",
      headerName: "EMAIL",
      flex: 1.5,
    },
    {
      field: "address",
      headerName: "ADDRESS",
      flex: 2,
    },
    {
      field: "city",
      headerName: "CITY",
      flex: 1,
    },
    {
      field: "postalCode",
      headerName: "POSTAL CODE",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Orders" subtitle="List of Order Details" />
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
        <DataGrid rows={orders} columns={columns} components={{ Toolbar: GridToolbar }} />
      </Box>
    </Box>
  );
};

export default Order;
