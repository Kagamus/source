import React, { useState, useMemo, useEffect } from "react";
import Routes from './routes';
import { UserContext } from "./UserContext";

function App() {

  const [user, setUser] = useState(sessionStorage.getItem('user') || "");

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    let loading = sessionStorage.getItem('user') || "";
    if (loading === "") {
      sessionStorage.setItem('user', '');
    } 
  }, []);


  return (
    <div className="App">
      <UserContext.Provider value={value}>
        <Routes />
      </UserContext.Provider>
    </div>
  );
}


export default App;