import React, { useState } from "react";
import { X, Plus } from "react-feather";

export default function AddList(props) {
  const [show, setShow] = useState(false);
  const [list, setlist] = useState("");

  function savelist(){
    if(!list){
        return;
    }
    props.getList(list);
    setlist('');
    setShow(!show);
  }

  function closeBtn(){
    setlist('');
    setShow(!show);
  }

  return (
    <div>
      <div className="flex flex-col text-white h-fit flex-shrink-0 mr-3 w-60 rounded-md p-2 bg-black">
        {show && (
          <div>
            <textarea
            value={list} onChange={(e) => setlist(e.target.value)}
              className="p-1 w-full rounded-md border-2 bg-gray-900 border-zinc-900"
              name=""
              id=""
              rows={2}
              col={10}
              placeholder="Enter list Title..."
            >
              {" "}
            </textarea>

            <div className="flex p-1 text-white">
              <button onClick={() => savelist()} className="p-1 bg-gray-600 mr-2 rounded">Add list</button>
              <button
                onClick={() => closeBtn()}
                className="hover:bg-gray-600 p-1 rounded-sm"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}
        {!show && (
          <button
            onClick={() => setShow(!show)}
            className="flex p-1 w-full justify-start rounded items-center mt-1 hover:bg-gray-500 h-8 cursor-pointer"
          >
            <Plus size={16}></Plus>Add a list
          </button>
        )}{" "}
      </div>
    </div>
  );
}
