import { Routes, Route } from "react-router-dom";
import Billing from "./Pages/Billing";
import Login from "./LFC/Login";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/billing" element={ <><Billing/></> } />
        <Route exact path="/signin" element={ <><Login/></> } />
      </Routes>
    </>
  );
}

export default App;
