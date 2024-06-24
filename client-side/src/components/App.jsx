import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  //fetching data
  useEffect(() => {
    const fecthPost = async () => {
      try {
        const response = await fetch(
          "https://keeper-server-psi.vercel.app/posts"
        );
        const resData = await response.json();
        setNotes(resData);
      } catch (error) {}
    };

    fecthPost();
  }, [notes]);

  const addNote = async (userInput) => {
    try {
      await fetch("http://localhost:4000/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInput),
      });
    } catch (error) {}

    setNotes((prevNote) => {
      return [...prevNote, userInput];
    });
  };

  const handleDelete = async (id) => {
    try {
    } catch (error) {}
    await fetch("http://localhost:4000/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([id]),
    });

    // setNotes((prevNote) => {
    //   return prevNote.filter((note) => {
    //     return note.id !== id;
    //   });
    // });
  };

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note) => {
        return (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            onDelete={handleDelete}
          />
        );
      })}

      <Footer />
    </div>
  );
}

export default App;
