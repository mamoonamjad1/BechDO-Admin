import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Typography,
  useTheme,
  TextField,
  Slide,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Form = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [uploadedImageTitles, setUploadedImageTitles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (event) => {
    const fileList = event.target.files;
    const fileTitles = Array.from(fileList).map((file) => file.name);
    setImages([...images, ...fileList]);
    setUploadedImageTitles([...uploadedImageTitles, ...fileTitles]);
  };

  // Handle form submission
  const handleSubmit = () => {
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("description", formData.description);
    images.forEach((image) => {
      formDataToSubmit.append("image", image);
    });
    axios
      .post("http://localhost:4000/categories/add", formDataToSubmit)
      .then((res) => {
        console.log("Category added successfully");
        setOpen(false);
        // Optionally, update the categories list after adding a new category
      })
      .catch((err) => {
        console.error("Error adding category: ", err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/categories/get")
      .then((res) => {
        console.log("Cat: ", res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categories]);

  const handleUserClick = (categoryId) => {
    console.log("Clicked category ID:", categoryId);
    axios
      .delete(`http://localhost:4000/categories/delete/${categoryId}`)
      .then((res) => {
        console.log("Category deleted successfully:", res);
        // Optionally, update the categories list after deleting a category
      })
      .catch((err) => {
        console.error("Error deleting category:", err);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "image",
      headerName: "IMAGE",
      flex: 1.5,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Category"
          style={{ width: "100px", height: "auto", padding: "2px" }}
        />
      ),
    },
    {
      field: "name",
      headerName: "NAME",
      flex: 2,
    },
    {
      field: "description",
      headerName: "DESCRIPTION",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row: { _id } }) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleUserClick(_id)}
          startIcon={<DeleteIcon />}
        >
          Delete Category
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Categories" subtitle="List of Categories" />
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
        <Button onClick={() => setOpen(true)}>
          <Typography color={colors.grey[100]}         
           sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              
            }}>
            Add New Category
          </Typography>
        </Button>
        <DataGrid
          rows={categories}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row._id}
        />
      </Box>

      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
        <DialogTitle>Add A New Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill the form below to add a new category.
          </DialogContentText>

          <TextField
            label="Category Name"
            fullWidth
            variant="filled"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <br />
          <TextField
            label="Category Description"
            fullWidth
            variant="filled"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <br />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="upload-image-input"
          />
          <label htmlFor="upload-image-input">
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "orange",
                "&:hover": { backgroundColor: "#F4D160" },
              }}
              component="span"
            >
              Upload Image
            </Button>
          </label>
          {uploadedImageTitles.length > 0 && (
            <div>
              {uploadedImageTitles.map((title, index) => (
                <Typography
                  key={index}
                  variant="caption"
                  sx={{ mt: 1 }}
                  startIcon={<FileDownloadDoneIcon />}
                >
                  {title}
                </Typography>
              ))}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Form;
