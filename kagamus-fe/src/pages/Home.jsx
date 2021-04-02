import React from "react";
import Card_Component from "../components/card_component.jsx";
import Сard_Component from "../components/card_component.jsx"
import img_list from "../test_list.jpg"
import img_logo from "../test_logo.png"
import './Home.css';

const fakeName = "SirHappi"
const fakeData = [fakeName,'One Piece','One Piece','One Piece','One Piece','One Piece','One Piece','One Piece','One Piece','One Piece','One Piece']
function Login() {
    
 
  return (
    <div>

    <div style = {{flexDirection:"row",display:"flex"}}>
    <div style = {{margin:"10% 5%"}}>
    <Card_Component animeListRequest={fakeData}></Card_Component>
    </div>

    <div style = {{margin:"10% 5%"}}>
    <Card_Component animeListRequest={fakeData}></Card_Component>
    </div>

    <div style = {{margin:"10% 5%"}}>
    <Card_Component animeListRequest={fakeData}></Card_Component>
    </div>

    </div> 

    </div>



  );
}







export default Login;
