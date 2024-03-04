import React, { useState, useContext } from "react";
import "animate.css";
import Form from "./Form";
import { GlobalProvide } from "../App";

function Header() {
  const [display, setDisplay] = useState("hidden");

  // function to display input box to add item
  const handleAddClick = () => {
    setDisplay("block");
  };


  return (
    <>
      {/* Header */}
      <header className="bg-slate-200 shadow-md border-solid border-sky-500 sticky top-0">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3 ">
          {/*  Web site name */}
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500 text-xl">Album </span>
            <span className="text-slate-700">Manager</span>
          </h1>
          <img
            src="https://cdn-icons-png.flaticon.com/128/1828/1828926.png"
            alt="Add Album"
            className="h-8 w-8 cursor-pointer"
            title="Add New"
            onClick={handleAddClick}
          />
        </div>
        <Form  display = {display} setDisplay={setDisplay} />
      </header>
    </>
  );
}

export default Header;
