import React, { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import Tag from "../Tags/Tag";
import "./Card.css";
import CardDetails from "./CardDetails/CardDetails";

const Card = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);

  const updateCardTitle = (newTitle) => {
    setEditedTitle(newTitle);
  };

  useEffect(() => {
    setEditedTitle(props.title);
  }, [props.title]);

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

              updateCardTitle={updateCardTitle} 
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
            <>
              <div className="card__text">
                <p className="card__title">{editedTitle}</p>
              </div>

              <div className="card__tags">
                {props.tags?.map((item, index) => (
                  <Tag key={index} tagName={item.tagName} color={item.color} />
                ))}
              </div>

            </>
            {provided.placeholder}
          </div>
        </>
      )}
    </Draggable>
  );
};

export default Card;
