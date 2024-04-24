import React from "react";
import { Spinner } from "react-bootstrap";

function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <Spinner animation="border" role="status" variant="light" />
    </div>
  );
}

export default Loading;
