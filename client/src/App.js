import React from "react";
import Header from "./components/header";
import Router from "./router";

function App() {
  return (
    <div className="App">
      <Header />
      <div style={{ marginTop: 60 }}>
        <Router />
      </div>
    </div>
  );
}

export default App;
