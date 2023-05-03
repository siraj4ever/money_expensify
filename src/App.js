import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "./pages/layout/Layout";
// import LogIn from "./pages/account/LogIn";
// import SignUp from "./pages/account/SignUp";

import { LogIn, SignUp } from './pages/account';

import Home from "./pages/layout/Home";
import Transactions from "./pages/layout/Transactions";
import Setting from "./pages/layout/Setting";
import FomeikWithoutField from "./pages/layout/FomeikWithoutField"
import FomeikWithField from "./pages/layout/FomeikWithField";
import Extra from "./pages/Extra";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index="/home" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/fomeik-without-field" element={<FomeikWithoutField />} />
            <Route path="/fomeik-with-field" element={<FomeikWithField />} />
            <Route path="/extra" element={<Extra />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
