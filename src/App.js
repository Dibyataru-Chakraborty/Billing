import { Routes, Route } from "react-router-dom";
import Login from "./LFC/Login";
import { Layout } from "antd";
import { useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "./Utils/Firebase/Firebase_config";
import { useState } from "react";

import Error from "./Utils/Authentication/Error";
import Dashboard from "./Pages/Dashboard";
import Billing from "./Pages/Billing";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import ProductEntry from "./Pages/ProductEntry";
import NewFooter from "./Components/NewFooter";


function App() {

  const [ProductsData, setProductsData] = useState([]);
  const Products = () => {
    onValue(ref(db, "Products"), (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        setProductsData([]);
      } else {
        setProductsData(data);
      }
    });
  };

  localStorage.setItem("ProductsData", JSON.stringify(ProductsData));

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        Products(),
      ]);
    };
    fetchData();
  },[1]);

  useEffect(() => {
    setInterval(() => {
      document.title= "FORBIDDEN 403"
    }, 4000);
    setInterval(() => {
      document.title= "JALANGI POLYMER ENTERPRISE"
    }, 8000);
  })
  
  return (
    <>
      <Routes>
        <Route exact path="/" element={ <><Navbar number="4"/><Layout hasSider><Sidebar number='2'/><Dashboard/></Layout></> } />
        <Route exact path="/*" element={ <><Navbar /><Layout><Sidebar/><Error link="/"/></Layout><NewFooter/></> } />
        <Route exact path="/billing" element={ <><Navbar number="2"/><Layout><Sidebar number='2'/><Billing/></Layout><NewFooter/></> } />
        <Route exact path="/productentry" element={ <><Navbar number="4"/><Layout hasSider><Sidebar number='2'/><ProductEntry/></Layout></> } />
        {/* <Route exact path="/signin" element={ <><Login/></> } /> */}
      </Routes>
    </>
  );
}

export default App;
