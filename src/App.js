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
// import Sidebar from "./Components/Sidebar";
import ProductEntry from "./Pages/ProductEntry";
import NewFooter from "./Components/NewFooter";
import Updates from "./Pages/Updates";
import Config from "./Pages/Config";
import Forget from "./LFC/Forget";


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

  const [UpdatesData, setUpdatesData] = useState([]);
  const Update = () => {
    onValue(ref(db, "Updates"), (snapshot) => {
      snapshot.forEach((child) => {
        if (child.val() === null) {
        setUpdatesData([]);
      } else {
        setUpdatesData([child.val()]);
      }
      });
    });
  };
  localStorage.setItem("UpdatesData", JSON.stringify(UpdatesData));

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

  const [Settings_Config, setSettings_Config] = useState([])
  const SettingsConfig = () => {
    const setting = []
    onValue(ref(db, "Settings"), (snapshot) => {
      setting.push(snapshot.val())
    });
    setSettings_Config(setting);
  };
  localStorage.setItem("SettingsConfig", JSON.stringify(Settings_Config));

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        Products(),
        Customers(),
        Update(),
        SettingsConfig(),
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
        <Route exact path="/forget" element={ <><Forget/></> } />
        <Route exact path="/*" element={ <><Navbar /><Layout hasSider><Error link="/"/></Layout><NewFooter/></> } />
        <Route exact path="/dashboard" element={ <><Navbar number="1"/><Layout hasSider><Dashboard/></Layout></> } />
        <Route exact path="/billing" element={ <><Navbar number="2"/><Layout hasSider><Billing/></Layout><NewFooter/></> } />
        <Route exact path="/productentry" element={ <><Navbar number="4"/><Layout hasSider><ProductEntry/></Layout></> } />
        <Route exact path="/updates" element={ <><Navbar number="5"/><Layout hasSider><Updates/></Layout></> } />
        <Route exact path="/settings" element={ <><Navbar number="5"/><Layout hasSider><Config/></Layout></> } />
      </Routes>
    </>
  );
}

export default App;
