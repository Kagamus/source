import React from "react";
import Сard_Component from "../components/card_component.jsx"
import img from "../test.jpg"
function Login() {
    
 
  return (
      
    <Сard_Component 
        cardColClass={"col-sm-3 "}
        cardBorder={"bg-secondary text-dark"}
        cardImage = {<img src={img} width="100" height="150" />}
        cardTitle={"One Piece"}
    />

  );
}

const styles = {
    AppCard: {
        display: 'inline',
        float: 'right'
    }
}



export default Login;
