import React from 'react';
import './App.css';
import PathFinder from './PF/PathFinder';

function App() {
  const NightMode = true;
  return (
    <div className={NightMode ? "App-night" : "App-day"}>
      <PathFinder></PathFinder>
    </div>
  );
}

export default App;
