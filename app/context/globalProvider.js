'use client';

import React from 'react';
import { createContext, useContext, useState } from 'react';
import themes from './themes';
import axios from 'axios';

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const theme = themes[selectedTheme];

  const allTaks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('/api/tasks');
      setTasks(res.data);
      setIsLoading(false);
      console.log(tasks)
    } catch (error) {
        console.log(error)
    }
  };

  React.useEffect(() => {
    allTaks();
  }, []);

  return (
    <GlobalContext.Provider value={{ theme,tasks }}>
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
