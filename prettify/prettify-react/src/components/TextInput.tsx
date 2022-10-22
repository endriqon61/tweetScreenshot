import "./TextInput.css";

import { useState } from "react";

function TextInput() {
  return (
    <>
      <div className="textinput-container">
        <textarea
          placeholder="Paste tweet link here"
          className="textarea"
        ></textarea>
      </div>
    </>
  );
}

export default TextInput;
