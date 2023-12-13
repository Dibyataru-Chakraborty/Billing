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

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      // "I" key
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        disabledEvent(e);
      }
      // "J" key
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        disabledEvent(e);
      }
      // "S" key + macOS
      if (e.keyCode === 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
        disabledEvent(e);
      }
      // "U" key
      if (e.ctrlKey && e.keyCode === 85) {
        disabledEvent(e);
      }
      // "F12" key
      if (e.keyCode === 123) {
        disabledEvent(e);
      }
    };

    const disabledEvent = (e) => {
      if (e.stopPropagation) {
        e.stopPropagation();
      } else if (window.event) {
        window.event.cancelBubble = true;
      }
      e.preventDefault();
      return false;
    };

    document.addEventListener('contextmenu', handleContextMenu, false);
    document.addEventListener('keydown', handleKeyDown, false);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu, false);
      document.removeEventListener('keydown', handleKeyDown, false);
    };
  }, []);

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

  const [CustomersData, setCustomersData] = useState([]);
  const Customers = () => {
    onValue(ref(db, "Customer"), (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        setCustomersData([]);
      } else {
        setCustomersData(data);
      }
    });
  };
  localStorage.setItem("CustomersData", JSON.stringify(CustomersData));

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        Products(),
        Customers(),
      ]);
    };
    fetchData();
  },[]);

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
        <Route exact path="/" element={ <><Login/></> } />
        <Route exact path="/*" element={ <><Navbar /><Layout><Sidebar/><Error link="/"/></Layout><NewFooter/></> } />
        <Route exact path="/dashboard" element={ <><Navbar number="1"/><Layout hasSider><Sidebar number='2'/><Dashboard/></Layout></> } />
        <Route exact path="/billing" element={ <><Navbar number="2"/><Layout><Sidebar number='2'/><Billing/></Layout><NewFooter/></> } />
        <Route exact path="/productentry" element={ <><Navbar number="4"/><Layout hasSider><Sidebar number='9'/><ProductEntry/></Layout></> } />
      </Routes>
    </>
  );
}

export default App;
