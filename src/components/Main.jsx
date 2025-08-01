import React, { useContext } from "react";
import { Edit2, MoreHorizontal, Trash, Trash2 } from "react-feather";
import CardAdd from "./CardAdd";
import { BoardContext } from "../context/BoardContext";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import AddList from "./AddList";
import { v4 as uuidv4 } from "uuid";

export default function Main() {
  const { allBoards, setAllBoards } = useContext(BoardContext);
  const bdata = allBoards.boards[allBoards.active];

  function onDragEnd(res) {
    if (!res.destination) {
      console.log("No destination found");
      return;
    }
    const newList = [...bdata.list];
    const s_id = parseInt(res.source.droppableId);
    const d_id = parseInt(res.destination.droppableId);
    const [removed] = newList[s_id - 1].items.splice(res.source.index, 1);
    newList[d_id - 1].items.splice(res.destination.index, 0, removed);

    let board = { ...allBoards };
    board.boards[board.active].list = newList;
    setAllBoards(board);
  }
  function cardData(e, index) {
    let newList = [...bdata.list];
    newList[index].items.push({ id: uuidv4(), title: e });

    let board = { ...allBoards };
    board.boards[board.active].list = newList;
    setAllBoards(board);
  }

  function listData(e) {
    let newList = [...bdata.list];
    newList.push({ id: newList.length + 1 + "", title: e, items: [] });

    let board = { ...allBoards };
    board.boards[board.active].list = newList;
    setAllBoards(board);
  }

  function handleDeleteList(index) {
    const updatedBoards = { ...allBoards };
    const activeIndex = updatedBoards.active;
    updatedBoards.boards[activeIndex].list.splice(index, 1); // delete list by index
    setAllBoards(updatedBoards);
  }

  return (
    <div
      className="flex flex-col w-full text-white"
      style={{ backgroundColor: `${bdata.bgColor}` }}
    >
      <div className="rounded-br-lg flex bg-black/50 backdrop-blur-3xl justify-center max-w-sm">
        <h2 className="p-2 text-2xl">{bdata.name}</h2>
      </div>
      <div className="flex flex-col w-full flex-grow relative">
        <div className="absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-scroll overflow-y-hidden">
          <DragDropContext onDragEnd={onDragEnd}>
            {bdata.list &&
              bdata.list.map((x, index) => {
                return (
                  <div
                    key={index}
                    className="mr-3 w-60 h-fit rounded-md p-2 bg-black flex-shrink-0"
                  >
                    <div className="list-body">
                      <div className="flex justify-between p-1">
                        <span className="text-xl font-bold">{x.title}</span>
                        <button
                          onClick={() => handleDeleteList(index)}
                          className="hover:bg-amber-950 p-1 rounded-sm cursor-pointer"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                      <Droppable
                        isCombineEnabled={false}
                        ignoreContainerClipping={false}
                        isDropDisabled={Boolean(x.disabled)}
                        droppableId={x.id}
                      >
                        {(provided, snapshot) => (
                          <div
                            className="py-1"
                            ref={provided.innerRef}
                            style={{
                              backgroundColor: snapshot.isDraggingOver
                                ? "#222"
                                : "transparent",
                            }}
                            {...provided.droppableProps}
                          >
                            {x.items &&
                              x.items.map((itemData, index) => {
                                return (
                                  <Draggable
                                    key={itemData.id}
                                    draggableId={itemData.id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <div
                                          className={`item flex justify-between items-center p-1 cursor-pointer rounded-md border-2 border-zinc-900 hover:border-gray-500`}
                                          style={{
                                            backgroundColor: `${bdata.bgColor}`,
                                          }}
                                        >
                                          <span>{itemData.title}</span>
                                          <span className="flex justify-start items-start">
                                            {console.log(itemData)}
                                          </span>
                                        </div>{" "}
                                      </div>
                                    )}
                                  </Draggable>
                                );
                              })}{" "}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                      <CardAdd getcard={(e) => cardData(e, index)} />
                    </div>
                  </div>
                );
              })}
          </DragDropContext>
          <AddList getList={(e) => listData(e)} />
        </div>
      </div>
    </div>
  );
}
