import {React} from "react";
import Header from "./components/header";
import Router from "./router";
import useWindowDimensions from './hooks/useWindowDimensions';

function App() {
  const { height, width } = useWindowDimensions();
  return (
    <div className="App">
      <Header />
      <div style={{ marginTop: 0.1*height }}>
        <Router />
      </div>
    </div>
  );
}

export default App;
