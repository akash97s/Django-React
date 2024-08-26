import React, { useState, useEffect } from 'react';
import { fetchUserData, fetchPostData } from './api';
import DataDisplay from './components/DataDisplay';
import ToggleButton from './components/ToggleButton';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [isUserData, setIsUserData] = useState(true);

  useEffect(() => {
    fetchUserData().then(setData);
    console.log("useffect ", data)
  }, []);

  // Function to toggle between user data and post data
  const toggleData = () => {
    if (isUserData) {
      fetchPostData().then(setData);
    } else {
      fetchUserData().then(setData);
    }
    setIsUserData(!isUserData);
  };

  return (
    <div className="App">
      <ToggleButton toggle={toggleData} isUserData={isUserData} />
      <DataDisplay data={data} type={isUserData ? 'users' : 'posts'} />
    </div>
  );
}

export default App;
