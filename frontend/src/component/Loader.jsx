import { Spinner } from "react-bootstrap";
import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-white backdrop-blur-sm">
      <Spinner
        animation="border"
        role="status"
        style={{ width: "80px", height: "80px" }}
      />
    </div>
  );
};

export default Loader;
