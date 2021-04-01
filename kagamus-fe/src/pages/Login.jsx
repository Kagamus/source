import React, { useState, useEffect } from "react";



function Login() {
  // var newUsr = "";
  // var newPwd = "";
  // var newPwdConf = "";
  // var newEmail = "";
  

  const [apiResponse, setApiResponse] = useState("");
  const [oldUsr, setOldUsr] = useState("");
  const [oldPwd, setOldPwd] = useState("");

  const [newUsr, setNewUsr] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [newPwdConf, setnewPwdConf] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const callAPI = () => {
    fetch("http://localhost:9000/login?usr="+oldUsr+"&pwd="+oldPwd)
        .then(res => res.text())
        .then(res => setApiResponse(res));
      
    console.log(oldUsr+" and "+oldPwd+" equal "+apiResponse);
  }

  const test = () => {
    console.log("")
  }


  /**
   * <input style={styles.container} placeholder="Search for Anime" type="text" size='40' 
   * value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown{handleSearch} />
   */

  return (
    <div className="App">
      <header style={styles.AppHeader}>
        {/* <h2> Login Page </h2> */}
        {/* <p> {apiResponse} </p> */}
        <div style={styles.LoginBackground}>
          <p>Welcome Back!</p>
          
          <input style={styles.InputFields}type="text" placeholder="Username" onChange={e => setOldUsr(e.target.value)}/>
          <input style={styles.InputFields}type="text" placeholder="Password" onChange={e => setOldPwd(e.target.value)}/>
          <a style={styles.ForgotPassword} href="">forgot password?</a>
          <button style={styles.SignIn} onClick={(e) => test()}>Sign In</button>
        </div>
        <div style={styles.SignUpBackground}>
          <p>Create Account</p>
          <input style={styles.InputFields}type="text" placeholder="Username" onChange={e => setNewUsr(e.target.value)}/>
          <input style={styles.InputFields}type="text" placeholder="Email" onChange={e => setNewEmail(e.target.value)}/>
          <input style={styles.InputFields}type="text" placeholder="Password" onChange={e => setNewPwd(e.target.value)}/>
          <input style={styles.InputFields}type="text" placeholder="Confirm Password" onChange={e => setnewPwdConf(e.target.value)}/>
          
          <button style={styles.SignUp} onClick={(e) => test()}>Submit</button>
        </div>
      </header>
    </div>
    
  );
}

const styles = {
    AppHeader: {
        backgroundColor: "#FFFFFF",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "left",
        padding:"0",
        fontSize: "calc(10px + 2vmin)",
        color: "white"
    },
    LoginBackground: {
      //32CBBD
      background: "linear-gradient(135deg, #32CBBD, #5292CE)",
      flexWrap: "wrap",
      alignContent: "center",
      justifyContent: "center",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      //top right bottom left
      // sum must equal 79.30 (subject to change)
      padding: "29.6vh 12vw 30.275vh 12vw",
      color: "white",
      
    },
    SignUpBackground: {
      //32CBBD
      background: "white",
      flexWrap: "wrap",
      alignContent: "center",
      justifyContent: "center",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      //top right bottom left
      // sum must equal 79.30 (subject to change)
      padding: "29.6vh 12vw 30.275vh 24vw",
      color: "#32CBBD",
      
      
    },
    InputFields: {
      border:"none",
      marginBottom: "1.2vh",
      borderRadius: "0.3vw",
      padding: "1.5vh 6vw 1.5vh 1vw",
      fontSize: "0.8vw",
      color:"#FFFFFF",
      opacity:0.75,
      fontFamily:"Proxima Nova",
      background:"#222222"
      // justifyContent: "center"
    },
    ForgotPassword: {
      marginTop:"0em",
      fontSize:"0.325em",
      color:"white",
      textAlign:"left",
      width:"27%"
    },
    SignIn: {
      color:"#32CBBD",
      background:"white",
      fontFamily:"Proxima Nova",
      fontSize: "1.2vw",
      margin: "1vh 25% 1vh 25%",
      border:"none",
      borderRadius:"2.25vmin",
      paddingTop:"1.05vmin",
      paddingBottom:"1.05vmin",
      width:"50%",
      style:"none"
    },
    SignUp: {
      color:"#32CBBD",
      background:"black",
      fontFamily:"Proxima Nova",
      fontSize: "1.2vw",
      margin: "1vh 25% 1vh 25%",
      border:"none",
      borderRadius:"2.25vmin",
      paddingTop:"1.05vmin",
      paddingBottom:"1.05vmin",
      width:"50%",
      style:"none"
    }

}

export default Login;
