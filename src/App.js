import { Routes, Route } from "react-router-dom";
import Billing from "./Pages/Billing";
import Login from "./LFC/Login";
import Navbar from "./Components/Navbar";
import { Layout } from "antd";
import Sidebar from "./Components/Sidebar";
import ProductEntry from "./Pages/ProductEntry";
import NewFooter from "./Components/NewFooter";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/billing" element={ <><Navbar/><Layout><Sidebar number='2'/><Billing/></Layout><NewFooter/></> } />
        <Route exact path="/productentry" element={ <><Navbar/><Layout hasSider><Sidebar number='2'/><ProductEntry/></Layout></> } />
        <Route exact path="/signin" element={ <><Login/></> } />
      </Routes>
    </>
  );
}

export default App;
