import React, { useState, useEffect } from "react";
import { CreditCard, Tag, Trash } from "react-feather";
import Modal from "../../Modal/Modal";
import "./CardDetails.css";
import { v4 as uuidv4 } from "uuid";
import Label from "../../Label/Label";

export default function CardDetails(props) {
  const colors = ["#61bd4f", "#f2d600", "#ff9f1a", "#eb5a46", "#c377e0"];

  const [values, setValues] = useState({ ...props.card });
  const [labelShow, setLabelShow] = useState(false);

  const updateTitle = (value) => {
    setValues({ ...values, title: value });
  };

  const updateDescription = (value) => {
    setValues({ ...values, description: value });
  };
  const handleTitleChange = (e) => {
    const editedTitle = e.target.value;
    setText(editedTitle);
    props.updateTitleAndDescription(editedTitle, description);

    props.updateCardTitle(editedTitle);
  };

  const handleDescriptionChange = (e) => {
    const editedDescription = e.target.value;
    setDescription(editedDescription);
    props.updateTitleAndDescription(text, editedDescription);
  };
 const addTag = (value, color) => {
   const newTag = {
     id: uuidv4(),
     tagName: value,
     color: color,
   };

   setValues((prevValues) => ({
     ...prevValues,
     tags: [...prevValues.tags, newTag],
   }));
 };

  useEffect(() => {
    if (props.updateCard) props.updateCard(props.bid, values.id, values);
  }, [values]);

  return (
    <Modal onClose={props.onClose}>
      <div className="card-details-container">
        <div className="container">
          <div className="row pb-4">
            <div className="col-12">
              <div className="d-flex align-items-center pt-3 gap-2">
                <CreditCard className="icon-md" />
                <h5 className="card-title">
                  <input
                    type="text"
                    value={values.title}
                    onChange={(e) => updateTitle(e.target.value)}
                  />
                </h5>
              </div>
              <div className="mb-2">
                {/* Description Input */}
                <textarea
                  className="description-textarea"
                  placeholder="Add a description..."
                  value={values.description}
                  onChange={(e) => updateDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <h6>Add to card</h6>
              <div className="d-flex card-action-btn flex-column gap-2">
                <button onClick={() => setLabelShow(true)}>
                  <span className="icon-sm">
                    <Tag />
                  </span>
                  Add Label
                </button>
                {labelShow && (
                  <Label
                    color={colors}
                    addTag={addTag}
                    tags={values.tags}
                    onClose={setLabelShow}
                  />
                )}
                <button onClick={() => props.removeCard(props.bid, values.id)}>
                  <span className="icon-sm">
                    <Trash />
                  </span>
                  Delete Card
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
