import React from "react";
import "./App.css";

import Navigation from "./components/Navigation/Navigation";
import MainContent from "./components/MainContent/MainContent";

function App() {
  return (
    <div className="app__container">
      <Navigation />

      <MainContent />
    </div>
  );
}

export default App;
