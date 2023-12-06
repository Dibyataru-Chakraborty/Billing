import React from "react";
import Navbar from "./Navbar";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import Dashboard from "../Pages/Dashboard";
import NewFooter from "./NewFooter";

export default function Main() {
  return (
    <React.Fragment>
      <Navbar />
      <Layout>
        <Sidebar number="2" />
        <Dashboard />
      </Layout>
      <NewFooter />
    </React.Fragment>
  );
}
