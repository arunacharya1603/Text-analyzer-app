import React, { useState } from "react";

export default function TextForm(props) {
  const [text, setText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to uppercase!", "success");
  };

  const handleLowClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to lowercase!", "success");
  };

  const handleClearClick = () => {
    let newText = "";
    setText(newText);
    props.showAlert("Cleared Text!", "success");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };
  ("");
  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Removed Extra Spaces!", "success");
  };

  const handleCopyText = () => {
    const textarea = document.getElementById("myBox");
    textarea.select();
    document.execCommand("copy");
    props.showAlert("Copied Text!", "success");
  };

  const countWords = (text) => {
    if (text.trim() === "") {
      return 0;
    }
    return text.trim().split(/\s+/).length;
  };

  const countParagraphs = (text) => {
    if (text.trim() === "") {
      return 0;
    }
    return text.trim().split(/\n+/).length;
  };

  const countSentences = (text) => {
    if (text.trim() === "") {
      return 0;
    }
    // Splitting the text by common sentence-ending punctuation marks: ".", "!", "?"
    return text.trim().split(/[.!?]+/).length;
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const words = text.split(/\s+/);
    const results = words.filter((word) =>
      word.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <>
      <div className="container">
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <label htmlFor="myBox" className="form-label">
            Example textarea
          </label>
          <textarea
            className="form-control"
            onChange={handleOnChange}
            value={text}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        <button className="btn btn-primary mx-2" onClick={handleUpClick}>
          Convert to UpperCase
        </button>
        <button className="btn btn-primary mx-2" onClick={handleLowClick}>
          Convert to LowerCase
        </button>
        <button className="btn btn-primary mx-2" onClick={handleClearClick}>
          Clear text
        </button>
        <button className="btn btn-primary mx-2" onClick={handleExtraSpaces}>
          Clear Extra Spaces
        </button>
        <button className="btn btn-primary mx-2" onClick={handleCopyText}>
          Copy Text
        </button>
      </div>
      <div className="container my-3">
        <h2>Your Text Summary</h2>
        <p>
          {countWords(text)} words, {text.length} characters
        </p>
        <p>{0.008 * countWords(text)} Minutes read</p>
        <p>{countParagraphs(text)} Paragraphs</p>
        <p>{countSentences(text)} Sentences</p>
        <h2>Preview</h2>
        <p>{text}</p>
      </div>
      <div className="container">
        <h2>Search Words</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
        <div>
          <h3>Search Results</h3>
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    </>
  );
}
