import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import Movies from "./Movies";
import Series from "./Series";
import Actors from "./Actors";

const App = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="App">
      <h1>Diagnostic Report Tool</h1>
      <div className="content-box">
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Movies" />
          <Tab label="Series" />
          <Tab label="Actors"/>
        </Tabs>

        {activeTab === 0 && <Movies />}

        {activeTab === 1 && <Series />}
        
        {activeTab === 2 && <Actors/>}
      </div>
    </div>
  );
};


export default App;