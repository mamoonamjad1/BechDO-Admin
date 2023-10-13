import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Auction from "./scenes/auction";
import Order from "./scenes/order";
import Form from "./scenes/form";
import Calendar from "./scenes/calendar";
import FAQ from "./scenes/faq";
import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/Pie";
import LiveAuction from "./scenes/live";
import Invoice from "./scenes/invoices";
import LoginPage from "./scenes/auth";
import { useEffect, useState } from "react";

function App() {
  const [theme, colorMode] = useMode();
  const [token, setToken] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Admin");
    if (token) {
      setToken(true);
    } else {
      setToken(false);
      navigate("/auth");
    }
  }, [navigate]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {token ? (
          <div className="app">
            <Sidebar />
            <main className="content">
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/order" element={<Order />} />
                <Route path="/upcoming-auctions" element={<Auction />} />
                <Route path="/live-auctions" element={<LiveAuction />} />
                <Route path="/invoice" element={<Invoice />} />
                <Route path="/form" element={<Form />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
              </Routes>
            </main>
          </div>
        ) : (
          <Routes>
            <Route path="/auth" element={<LoginPage />} />
          </Routes>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
