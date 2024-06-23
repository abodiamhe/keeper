import React, { useState, useEffect } from "react";

function CreateArea(props) {
  const [userInput, setUserInput] = useState({
    title: "",
    content: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserInput((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    props.onAdd(userInput);
    setUserInput({
      title: "",
      content: "",
    });
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={userInput.title}
          name="title"
          placeholder="Title"
        />
        <textarea
          onChange={handleChange}
          value={userInput.content}
          name="content"
          placeholder="Take a note..."
          rows="3"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
