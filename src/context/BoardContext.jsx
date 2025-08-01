import React from 'react'
import { createContext, useState, useEffect } from 'react'

export const BoardContext = createContext({});

export const BoardProvider = ({ children }) => {
  const [allBoards, setAllBoards] = useState(() => {
    const saved = localStorage.getItem("allBoards");
    return saved
      ? JSON.parse(saved)
      : {
          boards: [],
          active: 0,
        };
  });

  // Save changes to localStorage when allBoards changes
  useEffect(() => {
    localStorage.setItem("allBoards", JSON.stringify(allBoards));
  }, [allBoards]);

  return (
    <BoardContext.Provider value={{ allBoards, setAllBoards }}>
      {children}
    </BoardContext.Provider>
  );
};
