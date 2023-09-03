import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./Board.css";
import { MoreHorizontal } from "react-feather";
import Editable from "../Editable/Editable";
import Dropdown from "../Dropdown/Dropdown";
import { Droppable } from "react-beautiful-dnd";
export default function Board(props) {
  const [show, setShow] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.code === "Enter") setShow(false);
    });
    return () => {
      document.removeEventListener("keypress", (e) => {
        if (e.code === "Enter") setShow(false);
      });
    };
  });
const boardType = determineBoardType();
function determineBoardType() {
  const boardName = props.name.toLowerCase();

  if (boardName.includes("to-do")) {
    return "todo";
  } else if (boardName.includes("pending")) {
    return "pending";
  } else if (boardName.includes("completed")) {
    return "completed";
  } else {
    return ""; // Default type
  }
}
  return (
    <div className={`board ${boardType}`}>
      <div className="board__top">
        {show ? (
          <div>
            <input
              className="title__input"
              type={"text"}
              defaultValue={props.name}
              onChange={(e) => {
                props.setName(e.target.value, props.id);
              }}
            />
          </div>
        ) : (
          <div>
            <p
              onClick={() => {
                setShow(true);
              }}
              className="board__title"
            >
              {props?.name || "Name of Board"}
              <span className="total__cards">{props.card?.length}</span>
            </p>
          </div>
        )}
        <div
          onClick={() => {
            setDropdown(true);
          }}
        ></div>
      </div>
      <Droppable droppableId={props.id.toString()}>
        {(provided) => (
          <div>
            {props.card?.map((items, index) => (
              <Card
                bid={props.id}
                id={items.id}
                index={index}
                key={items.id}
                title={items.title}
                tags={items.tags}
                updateCard={props.updateCard}
                removeCard={props.removeCard}
                card={items}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="board__footer">
        <Editable
          titlePlaceholder={"Enter Title"}
          descPlaceholder={"Enter Description"}
          btnName={"Add Task"}
          onSubmit={(title, description) =>
            props.addCard(title, description, props.id)
          }
        />
      </div>
    </div>
  );
}
