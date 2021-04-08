import Routes from './routes';
import React, {createContext} from "react";

localStorage.setItem('userName',JSON.stringify(''));

function App() {

  return (
    <div className="App">
      <Routes />
    </div>
  );
}


export default App;