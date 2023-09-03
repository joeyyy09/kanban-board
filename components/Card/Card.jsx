import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  Calendar,
  CheckSquare,
  Clock,
  Edit2,
  MoreHorizontal,
  Trash2,
} from "react-feather";
import Dropdown from "../Dropdown/Dropdown";
import Modal from "../Modal/Modal";
import Tag from "../Tags/Tag";
import "./Card.css";
import CardDetails from "./CardDetails/CardDetails";

const Card = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedDescription, setEditedDescription] = useState(props.description);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    props.updateCard(props.id, editedTitle, editedDescription);
    setEditMode(false);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setEditedTitle(props.title);
    setEditedDescription(props.description);
  };

  const handleDeleteClick = () => {
    // Implement delete functionality here
    props.removeCard(props.id);
  };

  return (
    <Draggable
      key={props.id.toString()}
      draggableId={props.id.toString()}
      index={props.index}
    >
      {(provided) => (
        <>
          {modalShow && (
            <CardDetails
              updateCard={props.updateCard}
              onClose={setModalShow}
              card={props.card}
              bid={props.bid}
              removeCard={props.removeCard}
            />
          )}

          <div
            className="custom__card"
            onClick={() => {
              setModalShow(true);
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {editMode ? (
              <div className="card__edit-mode">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
                <div className="card__edit-buttons">
                  <button onClick={handleSaveClick}>Save</button>
                  <button onClick={handleCancelClick}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="card__text">
                  <p className="card__title">{editedTitle}</p>
                  <p className="card__description">{editedDescription}</p>
                  <MoreHorizontal
                    className="car__more"
                    onClick={() => {
                      setDropdown(true);
                    }}
                  />
                </div>

                <div className="card__tags">
                  {props.tags?.map((item, index) => (
                    <Tag
                      key={index}
                      tagName={item.tagName}
                      color={item.color}
                    />
                  ))}
                </div>

                <div className="card__footer">
                  {props.card.task.length !== 0 && (
                    <div className="task">
                      <CheckSquare />
                      <span>
                        {props.card.task.length !== 0
                          ? `${
                              props.card.task.filter(
                                (item) => item.completed === true
                              ).length
                            } / ${props.card.task.length}`
                          : "0/0"}
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}


            {provided.placeholder}
          </div>
        </>
      )}
    </Draggable>
  );
};

export default Card;
