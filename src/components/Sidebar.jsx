import React, { useContext, useState, useSyncExternalStore } from "react";
import { ChevronRight, ChevronLeft, Plus, X, Trash } from "react-feather";
import { Popover } from "react-tiny-popover";
import { BoardContext } from "../context/BoardContext";

export default function Sidebar() {
  const blankBoard = {
    name: "",
    bgColor: "#f60000",
    list: [],
  };
  const [boardData, setBoardData] = useState(blankBoard);
  const [collapsed, setCollapsed] = useState(false);
  const [showPop, setShowPop] = useState(false);
  const { allBoards, setAllBoards } = useContext(BoardContext);
  const setActiveBoard = (i) => {
    let newBoard = { ...allBoards };
    newBoard.active = i;
    setAllBoards(newBoard);
  };

  const addBoard = () => {
    let newB = { ...allBoards };
    newB.boards.push(boardData);
    setAllBoards(newB);
    setBoardData(blankBoard);
    setShowPop(!showPop);
  };

  const deleteBoard = (index) => {
  let newBoards = [...allBoards.boards];
  newBoards.splice(index, 1);

  // Fix active index if needed
  let newActive = allBoards.active;
  if (newActive >= newBoards.length) {
    newActive = newBoards.length - 1;
  }
  if (newActive < 0) newActive = 0;

  setAllBoards({
    ...allBoards,
    boards: newBoards,
    active: newActive,
  });
};


  return (
    <div
      className={`bg-black h-[calc(100vh-3rem)] flex-shrink-0 ${
        collapsed ? "w-[50px]" : "w-[340px]"
      } transition-all linear duration-500 text-cyan-50`}
    >
      {collapsed && (
        <div className="p-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hover:bg-gray-800 rounded-sm cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
      {!collapsed && (
        <div className="p-2">
          <div className="workspace p-3 flex justify-between border-b border-b-amber-50">
            <h4>Workspace</h4>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hover:bg-gray-800 p-1 rounded-sm cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
          <div className="boardlist">
            <div className="flex justify-between px-3 py-2">
              {" "}
              <h6>Your Boards</h6>
              <Popover
                isOpen={showPop}
                align="start"
                positions={["right", "top", "bottom", "left"]}
                content={
                  <div className="ml-2 p-2 w-60 flex flex-col justify-center items-center bg-slate-600 text-white rounded">
                    <button
                      onClick={() => setShowPop(!showPop)}
                      className="absolute right-2 top-2 hover:bg-gray-500 p-1 rounded"
                    >
                      <X size={16} />
                    </button>
                    <h4 className="py-3">Create Board</h4>
                
                    <div className="flex flex-col items-start w-full ">
                      <label htmlFor="title" aria-required>
                        Board Title
                      </label>
                      <input
                        value={boardData.name}
                        onChange={(e) =>
                          setBoardData({ ...boardData, name: e.target.value })
                        }
                        type="text"
                        className="mb-2 h-8 px-2 w-full bg-gray-700"
                      />
                      <label htmlFor="color">Board Color</label>
                      <input
                        value={boardData.bgColor}
                        onChange={(e) =>
                          setBoardData({
                            ...boardData,
                            bgColor: e.target.value,
                          })
                        }
                        type="color"
                        className="mb-2 h-8 px-2 w-full bg-gray-700"
                      />
                      <button
                        onClick={() => addBoard()}
                        className="w-full rounded h-8 bg-slate-700 mt-2 hover:bg-gray-400 "
                      >
                        Create
                      </button>
                    </div>
                  </div>
                }
              >
                <button
                  onClick={() => setShowPop(!showPop)}
                  className="hover:bg-gray-800 p-1 rounded-sm cursor-pointer" 
                >
                  <Plus size={16} />
                </button>
              </Popover>
            </div>
          </div>
          <ul>
            {allBoards.boards &&
              allBoards.boards.map((x, i) => {
                return (
                  <li key={i}>
                    <div className="flex">
                      <button
                        onClick={() => setActiveBoard(i)}
                        className="px-2 py-2 w-full text-sm flex justify-start align-baseline hover:bg-gray-800"
                      >
                        <span
                          className="w-6 h-max rounded-sm mr-2"
                          style={{ backgroundColor: `${x.bgColor}` }}
                        >
                          &nbsp;
                        </span>
                        <span>{x.name}</span>
                      </button>
                      <button onClick={() => deleteBoard(i)}
                        className="text-red-500 hover:bg-amber-950 p-1 rounded-sm ml-2 cursor-pointer"
                        aria-label={`Delete board ${x.name}`}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
}
