import { ColorModeContext , useMode } from "./theme";
import {CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Auction from "./scenes/auction";
import Order from "./scenes/order";
import Form from "./scenes/form";
import Calendar from "./scenes/calendar";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/Pie";
import LiveAuction from "./scenes/live";
import Invoice from "./scenes/invoices";

function App() {
  const [theme,colorMode] = useMode();

  return (<ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />

    <div className="app"> 
    < Sidebar />
      <main className="content">
      < Topbar />
      < Routes> 
      <Route path = "/" element= {<Dashboard/>}/>
      <Route path = "/team" element= {<Team/>}/> 
      <Route path = "/order" element= {<Order/>}/>
      <Route path = "/upcoming-auctions" element= {<Auction/>}/> 
      <Route path = "/live-auctions" element= {<LiveAuction/>}/> 
      <Route path = "/invoice" element= {<Invoice/>}/> 
      <Route path = "/form" element= {<Form/>}/> 
      <Route path = "/calendar" element= {<Calendar/>}/>
      <Route path = "/faq" element= {<FAQ/>}/> 
      <Route path = "/bar" element= {<Bar/>}/> 
      <Route path = "/pie" element= {<Pie/>}/> 
      <Route path = "/line" element= {<Line/>}/>
      <Route path = "/geography" element= {<Geography/>}/>

      </Routes>
      </main>
    </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
    
  );
}

export default App;
