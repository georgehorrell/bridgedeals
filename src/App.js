import React from "react";
import logo from "./logo.svg";
import { Game } from "./features/game/Game";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>bridge.deals</h1>
      <Game className="Game" />
    </div>
  );
}

export default App;
