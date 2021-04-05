import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';


function Home({userData}) {
  
  const printUserData = () => {
    console.log(userData);
  }
  return (
    <div className="Home">
      <header>

        <p> Welcome to the homepage! </p>
        <button onClick={() => printUserData()}></button>
          
      </header>
    </div>
    
  );



}

export default Home;
