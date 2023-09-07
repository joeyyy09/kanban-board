import React, { useState } from "react";
import { Plus, X } from "react-feather";
import "./Editable.css";

const Editable = (props) => {
  const [show, setShow] = useState(props?.handler || false);
  const [title, setTitle] = useState(""); 
  const [description, setDescription] = useState(""); 

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (title && props.onSubmit) {
      // Check if title is not empty
      props.onSubmit(title, description); // Pass both title and description to onSubmit
      setTitle(""); // Clear title
      setDescription(""); // Clear description
    }
    setShow(false);
  };

  return (
    <div className={`editable ${props.parentClass}`}>
      {show ? (
        <form onSubmit={handleOnSubmit}>
          <div className={`editable__input ${props.class}`}>
            <input
              type="text"
              placeholder={props.titlePlaceholder}
              autoFocus
              id={"edit-input"}
              value={title} // Bind value to title state
              onChange={(e) => setTitle(e.target.value)} // Update title state
            />
            <textarea
              placeholder={props.descPlaceholder}
              value={description} // Bind value to description state
              onChange={(e) => setDescription(e.target.value)} // Update description state
            />
            <div className="btn__control">
              <button className="add__btn" type="submit">
                {`${props.btnName}` || "Add"}
              </button>
              <X
                className="close"
                onClick={() => {
                  setShow(false);
                  props?.setHandler(false);
                }}
              />
            </div>
          </div>
        </form>
      ) : (
        <p
          onClick={() => {
            setShow(true);
          }}
        >
          {props.defaultValue === undefined ? <Plus /> : <></>}
          {props?.name || "Add"}
        </p>
      )}
    </div>
  );
};

export default Editable;
