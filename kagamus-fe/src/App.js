import Routes from './routes';
import MyLists from './pages/MyLists';
import React, {createContext} from "react";

localStorage.setItem('userName',JSON.stringify(''));

function App() {
  return (
    <div className="App">
      {/* <Routes /> */}
      <MyLists />
    </div>
  );
}

export default App;