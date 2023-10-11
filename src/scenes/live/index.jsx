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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const LiveAuction = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const productsPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/products/get-live")
      .then((res) => {
        console.log("Products", res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDeleteClick = (productId) => {
    console.log("Delete Product ID:", productId);
    axios
      .delete(`http://localhost:4000/admin/products/delete/${productId}`)
      .then((res) => {
        console.log("Product deleted successfully:", res);
      })
      .catch((err) => {
        console.error("Error deleting product:", err);
      });
  };

  const handleCardClick = (id) => {
    console.log("Clicked product ID:", id);
    axios
      .get(`http://localhost:4000/admin/products/details/${id}`)
      .then((res) => {
        console.log("Product Details", res.data);
        setSelectedProductDetail(res.data);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
      });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);

  return (
    <Box m="20px">
      <Header title="LIVE AUCTION" subtitle="Lists of live Auctions" />
      <Box display="flex" flexWrap="wrap">
        {displayedProducts.map((product) => (
          <Card
            key={product._id}
            sx={{ maxWidth: 300, margin: "10px", width: "200px" }}
            onClick={() => handleCardClick(product._id)}
          >
            <CardMedia
              component="img"
              height="140"
              image={`http://localhost:4000/pictures/${product.images[0]}`}
              alt={product.name}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ textAlign: "center" }}
              >
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date: {product.createdAt}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Base Price: ${product.basePrice.$numberDecimal.toString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bid Till Now: ${product.currentPrice.$numberDecimal.toString()}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "orange", textAlign: "center" }}
              >
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
                Stop Auction
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
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4" sx={{ textAlign: "center", color: "red" }}>
            Auction Details
          </Typography>

          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {selectedProductDetail ? (
            selectedProductDetail.map((detail, index) => (
              <div key={index}>
                <Typography gutterBottom variant="h5" component="div">
                  {detail.detail} At: {detail.createdAt}
                </Typography>
              </div>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No bids yet.
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} color="warning" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LiveAuction;
