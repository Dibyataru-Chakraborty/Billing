import { Routes, Route } from "react-router-dom";
import Billing from "./Pages/Billing";
import Login from "./LFC/Login";
import Navbar from "./Components/Navbar";
import { Layout } from "antd";
import Sidebar from "./Components/Sidebar";
import ProductEntry from "./Pages/ProductEntry";
import NewFooter from "./Components/NewFooter";
import Main from "./Components/Main";
import Error from "./Utils/Authentication/Error";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={ <><Main/></> } />
        <Route exact path="/*" element={ <><Navbar /><Layout><Sidebar/><Error link="/"/></Layout><NewFooter/></> } />
        <Route exact path="/billing" element={ <><Navbar number="2"/><Layout><Sidebar number='2'/><Billing/></Layout><NewFooter/></> } />
        <Route exact path="/productentry" element={ <><Navbar number="4"/><Layout hasSider><Sidebar number='2'/><ProductEntry/></Layout></> } />
        {/* <Route exact path="/signin" element={ <><Login/></> } /> */}
      </Routes>
    </>
  );
}

export default App;
