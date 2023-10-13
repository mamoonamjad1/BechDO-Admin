import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Container,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 1)", // Opaque white background
  borderRadius: "8px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  padding: theme.spacing(4),
  width: "100%",
  maxWidth: "400px",
  position: "relative",
  zIndex: 1,
}));

const AvatarImage = styled(Avatar)({
  backgroundColor: "black",
  color: "#fff",
  width: (theme) => theme.spacing(7),
  height: (theme) => theme.spacing(7),
  position: "relative",
  zIndex: 2,
});

const SubmitButton = styled(Button)({
  margin: (theme) => theme.spacing(3, 0, 2),
  backgroundColor: "orange",
  color: "#fff",
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios.post("http://localhost:4000/admin/auth/login", { email, password })
    .then((res) => {
        console.log(res.data);
        localStorage.setItem("Admin", res.data.token);
        navigate('/')
        })
        .catch((err) => {
          console.log(err);
        });
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(../../assets/auth-2.gif)`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <CssBaseline />
      <LoginPaper elevation={3}>
        <AvatarImage>
          <img src={`../../assets/auth.png`} alt="pic" width="70%" />
        </AvatarImage>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form noValidate sx={{ p: 3 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              "& input": {
                color: "black",
              },
              label: {
                color: "black",
              },
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              "& input": {
                color: "black",
              },
              label: {
                color: "black",
              },
            }}
          />
          <SubmitButton type="button" fullWidth variant="contained" onClick={handleLogin}>
            Login
          </SubmitButton>
        </form>
      </LoginPaper>
    </Box>
  );
}

export default LoginPage;
