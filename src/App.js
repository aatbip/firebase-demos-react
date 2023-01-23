import React from "react";
import "./App.css";
import FirebaseAuth from "./components/Auth";
import Database from "./components/Database";

function App() {
  return (
    <>
      <FirebaseAuth /> 
      <Database /> 
    </>
  );
}

export default App;
