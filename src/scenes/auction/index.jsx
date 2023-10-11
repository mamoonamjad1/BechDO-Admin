import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Pagination,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Auction = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/products/get")
      .then((res) => {
        console.log("Products", res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [products,page]);

  const handleDeleteClick = (productId) => {
    console.log("Delete Product ID:", productId);
    axios.delete(`http://localhost:4000/admin/products/delete/${productId}`)
    .then((res) => {
        console.log("Product deleted successfully:", res);
    }).catch((err) => {
        console.error("Error deleting product:", err);
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);

  return (
    <Box m="20px">
      <Header title="UPCOMING AUCTIONS" subtitle="Lists of Products Added For Auction" />
      <Box display="flex" flexWrap="wrap">
        {displayedProducts.map((product) => (
          <Card key={product._id} sx={{ maxWidth: 300, margin: "10px", width: "200px" }}>
            <CardMedia
              component="img"
              height="140"
              image={`http://localhost:4000/pictures/${product.images[0]}`}
              alt={product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "center" }}>
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date: {product.createdAt}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cost: ${product.basePrice.$numberDecimal.toString()}
              </Typography>
              <Typography variant="h6" sx={{ color: "orange", textAlign: "center" }}>
                Owner Details
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Name: {product.owner.firstName} {product.owner.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {product.owner.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phone Number: {product.owner.phoneNumber}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                size="small"
                color="error"
                variant="contained"
                onClick={() => handleDeleteClick(product._id)}
              >
                Delete Product
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(products.length / productsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  );
};

export default Auction;
