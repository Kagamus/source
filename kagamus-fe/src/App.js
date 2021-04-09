import Routes from './routes';
import React, {createContext} from "react";
import MyLists from "./pages/MyLists";
localStorage.setItem('userName',JSON.stringify(''));

function App() {

  return (
    <div className="App">
      <Routes />
      {/* <MyLists /> */}
    </div>
  );
}


export default App;