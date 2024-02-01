import { Routes, Route, useNavigate } from "react-router-dom";
import { Layout, Spin } from "antd";
import { Suspense, lazy, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "./Utils/Firebase/Firebase_config";
import { useState } from "react";

import Error from "./Pages/Error";
import Offline from "./Pages/Offline";

const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Billing = lazy(() => import("./Pages/Billing"));
const Navbar = lazy(() => import("./Components/Navbar"));
const ProductEntry = lazy(() => import("./Pages/ProductEntry"));
const NewFooter = lazy(() => import("./Components/NewFooter"));
const Updates = lazy(() => import("./Pages/Updates"));
const Config = lazy(() => import("./Pages/Config"));
const Forget = lazy(() => import("./LFC/Forget"));
const Login = lazy(() => import("./LFC/Login"));
const BillManage = lazy(() => import("./Pages/BillManage"));
const PrintBill = lazy(() => import("./Pages/Pdf/PrintBill"));
const Agents = lazy(() => import("./Pages/Agents"));
const Log = lazy(() => import("./Pages/Log"));

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
      if (
        e.keyCode === 83 &&
        (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
      ) {
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

    document.addEventListener("contextmenu", handleContextMenu, false);
    document.addEventListener("keydown", handleKeyDown, false);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu, false);
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, []);

  const [ProductsData, setProductsData] = useState([]);
  const Products = () => {
    onValue(ref(db, "Product"), (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        setProductsData([]);
      } else {
        // Convert the object into an array of customer objects
        const customerArray = Object.keys(data).map((Id) => ({
          id: Id,
          ...data[Id],
        }));

        // Update the state with the array of customer objects
        setProductsData(customerArray);
      }
    });
  };
  sessionStorage.setItem("ProductsData", JSON.stringify(ProductsData));

  const [UpdatesData, setUpdatesData] = useState([]);
  const Update = () => {
    onValue(ref(db, "Updates"), (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        setUpdatesData([]);
      } else {
        // Convert the object into an array of customer objects
        const productArray = Object.keys(data).map((productId) => ({
          id: productId,
          ...data[productId],
        }));

        // Update the state with the array of customer objects
        setUpdatesData(productArray);
      }
    });
  };
  sessionStorage.setItem("UpdatesData", JSON.stringify(UpdatesData));

  const [CustomersData, setCustomersData] = useState([]);
  const Customers = () => {
    onValue(ref(db, "Customer"), (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        setCustomersData([]);
      } else {
        // Convert the object into an array of customer objects
        const customerArray = Object.keys(data).map((customerId) => ({
          id: customerId,
          ...data[customerId],
        }));

        // Update the state with the array of customer objects
        setCustomersData(customerArray);
      }
    });
  };

  // Month count with net amount for the current year
  const currentYear = new Date().getFullYear();
  const monthCounts = Object.values(CustomersData).reduce((acc, entry) => {
    const { BillDate, NetAmount } = entry;
    // eslint-disable-next-line no-unused-vars
    const [day, month, year] = BillDate.split("/").map(Number);

    if (year === currentYear) {
      const monthYear = `${month}/${year}`; // Extract month and year (excluding day)
      acc[monthYear] = acc[monthYear] || { count: 0, totalNetAmount: 0 };
      acc[monthYear].count += 1;
      acc[monthYear].totalNetAmount += NetAmount;
    }

    return acc;
  }, {});
  const resultArrayMonth = Object.values(monthCounts);
  sessionStorage.setItem("billDateCountMonth", JSON.stringify(resultArrayMonth));

  //day count
  const billDateCount = [];
  const currentMonth = new Date().getMonth() + 1;
  CustomersData.forEach((bill) => {
    const { BillDate, NetAmount } = bill;
    const billMonth = parseInt(BillDate.split("/")[1], 10); // Extracting month from BillDate

    if (billMonth === currentMonth) {
      const existingEntry = billDateCount.find(
        (entry) => entry.date === BillDate
      );

      if (existingEntry) {
        existingEntry.count += 1;
        existingEntry.totalNetAmount += NetAmount;
      } else {
        billDateCount.push({
          date: BillDate,
          count: 1,
          totalNetAmount: NetAmount,
        });
      }
    }
  });
  sessionStorage.setItem("billDateCount", JSON.stringify(billDateCount));

  const [Bank_Config, setBank_Config] = useState([]);
  const BankConfig = () => {
    onValue(ref(db, "Bank"), (snapshot) => {
      if (snapshot.exists()) {
        setBank_Config(snapshot.val());
      } else {
        setBank_Config(null);
      }
    });
  };
  sessionStorage.setItem("BankConfig", JSON.stringify(Bank_Config));

  const [Details_Config, setDetails_Config] = useState([]);
  const DetailsConfig = () => {
    onValue(ref(db, "Details"), (snapshot) => {
      if (snapshot.exists()) {
        setDetails_Config(snapshot.val());
      } else {
        setDetails_Config(null);
      }
    });
  };
  sessionStorage.setItem("DetailsConfig", JSON.stringify(Details_Config));

  const [UserData, setUserData] = useState([]);
  const Users = () => {
    onValue(ref(db, "Users"), (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        setUserData([]);
      } else {
        // Convert the object into an array of customer objects
        const customerArray = Object.keys(data).map((Id) => ({
          id: Id,
          ...data[Id],
        }));

        // Update the state with the array of customer objects
        setUserData(customerArray);
      }
    });
  };
  sessionStorage.setItem("UserData", JSON.stringify(UserData));

  const [LogData, setLogData] = useState([]);
  const Logs = () => {
    onValue(ref(db, "Log"), (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        setLogData([]);
      } else {
        // Convert the object into an array of customer objects
        const customerArray = Object.keys(data).map((Id) => ({
          id: Id,
          ...data[Id],
        }));

        // Update the state with the array of customer objects
        setLogData(customerArray);
      }
    });
  };
  sessionStorage.setItem("LogData", JSON.stringify(LogData));

  useEffect(() => {
    document.getElementById("description").content = Details_Config.ShopName || "FORBIDDEN 403";
    document.getElementById("Facebookdescription").content = Details_Config.ShopName || "FORBIDDEN 403";
    document.getElementById("twitterdescription").content = Details_Config.ShopName || "FORBIDDEN 403";
    setInterval(() => {
      document.title = "FORBIDDEN 403";
    }, 4000);
    setInterval(() => {
      document.title = Details_Config.ShopName || "FORBIDDEN 403";
    }, 8000);
  });

  const navigate = useNavigate();
  const [check, setcheck] = useState(false);
  function RequireAuth({ children }) {
    useEffect(() => {
      if (sessionStorage.getItem("user") === null) {
        navigate("/");
      } else {
        setcheck(true);
      }
    });

    return children;
  }

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        Products(),
        Customers(),
        Update(),
        BankConfig(),
        Users(),
        Logs(),
        DetailsConfig()
      ]);
    };
    if (check) {
      fetchData();
    }
  }, [check]);

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Suspense
              fallback={
                <div className="container py-5 h-100">
                  <Spin tip="Loading" size="large">
                    <div className="content" />
                  </Spin>
                </div>
              }
            >
              <Login />
            </Suspense>
          }
        />
        <Route
          exact
          path="/forget"
          element={
            <Suspense
              fallback={
                <div className="container py-5 h-100">
                  <Spin tip="Loading" size="large">
                    <div className="content" />
                  </Spin>
                </div>
              }
            >
              {" "}
              <Forget />{" "}
            </Suspense>
          }
        />
        <Route
          exact
          path="/*"
          element={
            <Suspense
              fallback={
                <div className="container py-5 h-100">
                  <Spin tip="Loading" size="large">
                    <div className="content" />
                  </Spin>
                </div>
              }
            >
              <RequireAuth>
                <Navbar />{" "}
                {!isOnline ? <Offline /> : <Error link="/dashboard" />}
                <NewFooter />
              </RequireAuth>
            </Suspense>
          }
        />
        <Route
          exact
          path="/dashboard"
          element={
            <Suspense
              fallback={
                <div className="container py-5 h-100">
                  <Spin tip="Loading" size="large">
                    <div className="content" />
                  </Spin>
                </div>
              }
            >
              <RequireAuth>
                <Navbar number="1" />
                {!isOnline ? (
                  <Offline />
                ) : (
                  <Layout hasSider>
                    <Dashboard />
                  </Layout>
                )}
                <NewFooter />
              </RequireAuth>
            </Suspense>
          }
        />
        <Route
          exact
          path="/billing"
          element={
            <Suspense
              fallback={
                <div className="container py-5 h-100">
                  <Spin tip="Loading" size="large">
                    <div className="content" />
                  </Spin>
                </div>
              }
            >
              <RequireAuth>
                <Navbar number="2" />
                {!isOnline ? <Offline /> : 
                <Billing />
                // <TryBilling/>
                }
                <NewFooter />
              </RequireAuth>
            </Suspense>
          }
        />
        <Route
          exact
          path="/billing-manage"
          element={
            <Suspense
              fallback={
                <div className="container py-5 h-100">
                  <Spin tip="Loading" size="large">
                    <div className="content" />
                  </Spin>
                </div>
              }
            >
              <RequireAuth>
                <Navbar number="3" /> {!isOnline ? <Offline /> : <BillManage />}
                <NewFooter />
              </RequireAuth>
            </Suspense>
          }
        />
        <Route
          exact
          path="/billing-manage/:billid"
          element={
            <Suspense
              fallback={
                <div className="container py-5 h-100">
                  <Spin tip="Loading" size="large">
                    <div className="content" />
                  </Spin>
                </div>
              }
            >
              <RequireAuth>
                <Navbar number="3" />
                {!isOnline ? <Offline /> : <PrintBill />}
                <NewFooter />
              </RequireAuth>
            </Suspense>
          }
        />
        <Route
          exact
          path="/productentry"
          element={
            <Suspense
              fallback={
                <div className="container py-5 h-100">
                  <Spin tip="Loading" size="large">
                    <div className="content" />
                  </Spin>
                </div>
              }
            >
              <RequireAuth>
                <Navbar number="4" />{" "}
                {!isOnline ? <Offline /> : <ProductEntry />}
                <NewFooter />
              </RequireAuth>
            </Suspense>
          }
        />
        <Route
          exact
          path="/updates"
          element={
            <Suspense
              fallback={
                <div className="container py-5 h-100">
                  <Spin tip="Loading" size="large">
                    <div className="content" />
                  </Spin>
                </div>
              }
            >
              <RequireAuth>
                <Navbar number="5" />
                {!isOnline ? <Offline /> : <Updates />} <NewFooter />{" "}
              </RequireAuth>
            </Suspense>
          }
        />
        <Route
          exact
          path="/settings"
          element={
            <Suspense
              fallback={
                <div className="container py-5 h-100">
                  <Spin tip="Loading" size="large">
                    <div className="content" />
                  </Spin>
                </div>
              }
            >
              <RequireAuth>
                <Navbar number="8" /> {!isOnline ? <Offline /> : <Config />}
                <NewFooter />
              </RequireAuth>
            </Suspense>
          }
        />
        <Route
          exact
          path="/manage-user"
          element={
            <Suspense
              fallback={
                <div className="container py-5 h-100">
                  <Spin tip="Loading" size="large">
                    <div className="content" />
                  </Spin>
                </div>
              }
            >
              <RequireAuth>
                <Navbar number="6" />
                {!isOnline ? <Offline /> : <Agents />} <NewFooter />
              </RequireAuth>
            </Suspense>
          }
        />
        <Route
          exact
          path="/log"
          element={
            <Suspense
              fallback={
                <div className="container py-5 h-100">
                  <Spin tip="Loading" size="large">
                    <div className="content" />
                  </Spin>
                </div>
              }
            >
              <RequireAuth>
                <Navbar number="7" /> {!isOnline ? <Offline /> : <Log />}{" "}
                <NewFooter />
              </RequireAuth>
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;
