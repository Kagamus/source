
import React from "react";
import './card_component.css';
import img_OP from '../test_list.jpg';
import img_logo from '../test_logo.png';

const Card_Component = ({animeListRequest}) => {

  return (
    <div className = "example">
    <div className = "container">
    {animeListRequest.map((anime, index) => {
    
    if(index > 0)
        return <div className = "card">
        <img src = {img_OP} className = "cardImage"></img>
        <p className ="cardTitle">{anime}</p>
      </div> 
    else{
      return <div className = "card">
      <img src = {img_logo} className = "animeImage"></img>
        <div className ="animeTitle">
          <p>Top 10 Anime</p>
          <p>{anime}</p>
        </div>
      </div> 
    }   
    })}   
    </div>
    </div>
    

  );



}




export default Card_Component;