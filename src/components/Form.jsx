import React from 'react'
import axios from "axios";
import { GlobalProvide } from "../App";
import { useContext, useRef } from "react";


function Form({display, setDisplay}) {
    const { albums, setAlbums } = useContext(GlobalProvide); 
    const itemTextbox = useRef(null);

  // function to add items
  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = itemTextbox.current.value;
    const id = albums.length + 1;
    let userId = 0;
    console.log(albums.length);
    if (albums.length % 10 == 0) {
      userId = albums[albums.length - 1].userId + 1;
    } else {
      userId = albums[albums.length - 1].userId;
    }
    const newAlbum = {
      userId,
      id,
      title,
    };
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/albums",
      newAlbum
    );

    setAlbums([...albums, newAlbum]);
    setDisplay("hidden");
    itemTextbox.current.value = "";
    console.log(newAlbum);
  };
  return (
    <>
      {/* Add Album Form */}
      <div
        className={`max-w-6xl mx-auto p-3 animate__animated ${
          display === "block" ? "animate__slideInDown" : ""
        } ${display} absolute z-20 top-20 right-10 border-solid border-2 border-sky-500 rounded-md `}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 rounded-lg flex items-center space-between p-2 justify-between"
        >
          <input
            type="text"
            placeholder="Title Of Album"
            name=""
            id=""
            className="bg-slate-200 p-1 w-24 outline-none sm:w-64"
            ref={itemTextbox}
          />
          <button className="p-1 outline-none bg-slate-600 text-white">
            Add
          </button>
        </form>
      </div>
    </>
  );
}

export default Form