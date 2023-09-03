import React, { useState, useEffect } from "react";
import { CreditCard, Tag, Trash } from "react-feather";
import Modal from "../../Modal/Modal";
import "./CardDetails.css";
import { v4 as uuidv4 } from "uuid";
import Label from "../../Label/Label";

export default function CardDetails(props) {
  const colors = ["#61bd4f", "#f2d600", "#ff9f1a", "#eb5a46", "#c377e0"];

  const [values, setValues] = useState({ ...props.card });
  const [input, setInput] = useState(false);
  const [text, setText] = useState(values.title);
  const [description, setDescription] = useState(values.description);
  const [labelShow, setLabelShow] = useState(false);

  const Input = (props) => {
    return (
      <div className="input-container">
        <input
          autoFocus
          defaultValue={text}
          type={"text"}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
    );
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const updateTitle = (value) => {
    setValues({ ...values, title: value });
  };

  const addTag = (value, color) => {
    values.tags.push({
      id: uuidv4(),
      tagName: value,
      color: color,
    });

    setValues({ ...values });
  };

  const handleClickListener = (e) => {
    if (e.code === "Enter") {
      setInput(false);
      updateTitle(text === "" ? values.title : text);
    } else return;
  };

  useEffect(() => {
    document.addEventListener("keypress", handleClickListener);
    return () => {
      document.removeEventListener("keypress", handleClickListener);
    };
  }, []); // Add an empty dependency array to ensure this effect runs only once

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
                {input ? (
                  <Input title={values.title} />
                ) : (
                  <h5 className="card-title" onClick={() => setInput(true)}>
                    {values.title}
                  </h5>
                )}
              </div>
              <div className="mb-2">
                {/* Description Input */}
                <textarea
                  className="description-textarea"
                  placeholder="Add a description..."
                  value={description}
                  onChange={handleDescriptionChange}
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
