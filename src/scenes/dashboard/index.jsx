import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { useEffect,useState } from "react";
import axios from "axios";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import GavelIcon from '@mui/icons-material/Gavel';
import PieChart from "../../components/PieChart";
import LiveTvIcon from '@mui/icons-material/LiveTv';
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyer] = useState([]);
  const [orders, setOrders] = useState([]);
  const [invoice, setInvoice] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const [products, setProducts] = useState([]);
  const [productsLive, setProductsLive] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/products/get-live")
      .then((res) => {
        console.log("Products", res.data);
        setProductsLive(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
  }, [products]);
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
        setTotalCost(
          normalizedOrders.reduce((total, order) => total + (order.totalEarnings/100*1 || 0), 0)
        );
        setInvoice(normalizedOrders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(()=>{
      axios.get("http://localhost:4000/admin/orders/get")
      .then((res)=>{
          console.log("Orders",res.data)
          setOrders(res.data)
      }).catch((err)=>{
          console.log(err)
      })
  })
  const [bids, setBids] = useState([]);

  useEffect(()=>{
      axios.get("http://localhost:4000/admin/products/get/bids")
      .then((res)=>{
          setBids(res.data)
      }).catch((err)=>{
          console.log(err)
      })
  })
  useEffect(() => {
    axios.get("http://localhost:4000/admin/users/get/sellers")
    .then((res) => {    
      setSellers(res.data);
    });
  }
  , []);
  useEffect(() => {
    axios.get("http://localhost:4000/admin/users/get/buyer")
    .then((res) => {    
      setBuyer(res.data);
    });
  }
  , []);

  

  return (
    <Box m="20px">
     
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >

<Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={productsLive.length}
            subtitle="Live Auctions"
            icon={
              <LiveTvIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={orders.length}
            subtitle="Orders Recieved"
            icon={
              <DeliveryDiningIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={sellers.length}
            subtitle="Sellers"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={buyers.length}
            subtitle="Clients"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>


        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                ${totalCost}
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          {/* <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box> */}
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Seller Invoices
            </Typography>
          </Box>
          {invoice.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography color={colors.grey[100]}>
                  {transaction.sellerDetails.firstName} {" "} {transaction.sellerDetails.lastName}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.totalEarnings}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
