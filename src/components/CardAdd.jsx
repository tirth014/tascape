import React, { useState } from "react";
import { X, Plus } from "react-feather";

export default function CardAdd(props) {
  const [show, setShow] = useState(false);
  const [card, setCard] = useState("");

  function saveCard(){
    if(!card){
        return;
    }
    props.getcard(card);
    setCard('');
    setShow(!show);
  }

  function closeBtn(){
    setCard('');
    setShow(!show);
  }

  return (
    <div>
      <div className="flex flex-col text-white">
        {show && (
          <div>
            <textarea
            value={card} onChange={(e) => setCard(e.target.value)}
              className="p-1 w-full rounded-md border-2 bg-gray-900 border-zinc-900"
              name=""
              id=""
              rows={2}
              col={10}
              placeholder="Enter Card Title..."
            >
              {" "}
            </textarea>

            <div className="flex p-1 text-white">
              <button onClick={() => saveCard()} className="p-1 bg-gray-600 mr-2 rounded">Add a Card</button>
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
            className="flex p-1 w-full justify-start rounded items-center mt-1 hover:bg-gray-500 h-8"
          >
            <Plus size={16}></Plus>Add a card
          </button>
        )}{" "}
      </div>
    </div>
  );
}
