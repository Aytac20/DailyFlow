import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./component/Header";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container fluid className=" my-4 !w-[95%] !mx-auto">
          <Outlet />
        </Container>
      </main>
      <ToastContainer />
    </>
  );
};

export default App;
