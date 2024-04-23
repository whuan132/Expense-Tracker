import React, { useEffect, useState } from "react";
import AppContext from "./hooks/AppContext";
import AppRouter from "./routes/AppRoutes";
import { jwtDecode } from "jwt-decode";

function App() {
  const [token, setToken] = useState({ token: null, data: null });
  useEffect(() => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        const data = jwtDecode(token);
        setToken({ ...token, token: token, data: data });
      }
    } catch (error) {}
  }, []);

  return (
    <AppContext.Provider value={{ token, setToken }}>
      <div style={{ overflowX: "hidden" }}>
        <AppRouter />
      </div>
    </AppContext.Provider>
  );
}

export default App;
