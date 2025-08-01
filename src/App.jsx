import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import { BoardContext } from "./context/BoardContext.jsx";

function App() {
  const boardData = {
    active: 0,
    boards: [
      {
        name: 'My Project',
        bgColor: 'oklch(37.3% 0.034 259.733)',
        list: [
          { id: '1', title: 'To Do', items: [{ id: 'cdrFt', title: 'Set up user authentication' }] },
          { id: '2', title: 'In Progress', items: [{ id: 'cdrFt2', title: 'Add file to cards' }] },
          { id: '3', title: 'Done', items: [{ id: 'cdrFt3', title: 'Style header and board title ' }] }
        ]
      }
    ]
  };

  const [allBoardsState, setAllBoardsState] = useState(() => {
    const saved = localStorage.getItem("board-data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.boards && parsed.boards.length > 0) {
          return parsed;
        }
      } catch (e) {}
    }
    return boardData;
  });

  const setAllBoards = (newBoards) => {
    setAllBoardsState(newBoards);
    localStorage.setItem("board-data", JSON.stringify(newBoards));
  };

  return (
    <>
      <Header />
      <BoardContext.Provider value={{ allBoards: allBoardsState, setAllBoards }}>
        <div className="content flex">
          <Sidebar />
          <Main />
        </div>
      </BoardContext.Provider>
    </>
  );
}

export default App;
