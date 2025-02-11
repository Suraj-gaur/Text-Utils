import React, { useState } from "react";

export default function TextForm(props) {
  const [text, setText] = useState("");
  function handleOnChange(event) {
    setText(event.target.value);
  }

  function handleUpClick() {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Uppercase", "success");
    console.log("Uppercase was clicked");
  }

  function handleLoClick() {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Lowercase", "success");
    console.log("Lowercase was clicked");
  }

  function handleClearClick() {
    let newText = text.replace(/\s+/g, " ");
    setText(newText);
    props.showAlert("Extra Spaces Removed", "success");
    console.log("Clear was clicked");
  }

  function copyText() {
    let newText = document.getElementById("mybox");
    newText.select();
    navigator.clipboard.writeText(newText.value);
    props.showAlert("Text Copied", "success");
  }

  function formatJson() {
    let newText = text;
    try {
      let obj = JSON.parse(newText);
      newText = JSON.stringify(obj, null, 4);
    } catch (e) {
      console.log(e);
      newText = "Invalid JSON";
    }
    setText(newText);
  }

  return (
    <>
      <div className="container" style={{ color: props.mode === "dark" ? "white" : "black" }}> 
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            style={{
              backgroundColor: props.mode === "dark" ? "#13466e" : "white",
              color: props.mode === "dark" ? "white" : "black",
            }}
            id="mybox"
            rows="8"
            value={text}
            onChange={handleOnChange}
          ></textarea>
        </div>
        <button className="btn btn-primary mx-1" onClick={handleUpClick}>
          Convert to Uppercase
        </button>
        <button className="btn btn-primary mx-1" onClick={handleLoClick}>
          Convert to Lowercase
        </button>
        <button className="btn btn-primary mx-1" onClick={copyText}>
          Copy Text
        </button>
        <button className="btn btn-primary mx-1" onClick={handleClearClick}>
          Remove Extra Spaces
        </button>
        <button className="btn btn-primary mx-1" onClick={formatJson}>
          Format Json
        </button>
      </div>
      <div className="container my-3" style={{ color: props.mode === "dark" ? "white" : "black" }}>
           <h2>Your text summary</h2> 
            <p>{text.split(" ").filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
            <p>{0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length} Minutes read</p>
            <h2>Preview</h2>
            <p>{text.length>0?text:"Enter something in the textbox above to preview it here"}</p>
      </div>
    </>
  );
}
