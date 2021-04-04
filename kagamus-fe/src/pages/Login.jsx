import React, { useState, useEffect } from "react";


function Login() {
  const [apiResponse, setApiResponse] = useState("");

  const callAPI = () => {
    fetch("http://localhost:9000/testAPI")
        .then(res => res.text())
        .then(res => setApiResponse(res));
  }

  useEffect(() => {
    callAPI();
  });

  return (
		<div className="App">
			<header style={styles.AppHeader}>
				<h2> Login Page </h2>
				<p> {apiResponse} </p>
			</header>
		</div>
	);
}

const styles = {
    AppHeader: {
        backgroundColor: "#282c34",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: "calc(10px + 2vmin)",
        color: "white"
    }
}

export default Login;
