import { useEffect, useState } from "react";

import axios from "axios";

import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Header from "./components/Header";
import User from "./components/User";

function App() {
  const [isModalOpen, setIsModalOpen] = useState({
    state: false,
    type: "add",
    taget: null,
  });
  const [sort, setSort] = useState("");
  const [isError, setIsError] = useState({
    state: false,
    message: `Something's Wrong!`,
  });

  return isError.state ? (
    isError.message
  ) : (
    <>
    <Header isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </>
  );
}

export default App;
