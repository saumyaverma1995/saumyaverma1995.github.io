import React from "react";
import { Header } from "./components/Header/Header.component.js";
import ManageCampaigns from "./components/ManageCampaigns/ManageCampaigns.component.js";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <ManageCampaigns />
    </div>
  );
}

export default App;
