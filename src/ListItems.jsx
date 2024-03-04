import React, { useContext, useEffect, useState } from "react";
import { GlobalProvide } from "./App";
import axios from "axios";
import Form from "./components/Form";

function ListItems() {
  const { albums, setAlbums } = useContext(GlobalProvide);
  const [update, setUpdate] = useState(true);
  const [editedText, setEditedText] = useState(""); // New state to track edited text
  const [editItemId, setEditItemId] = useState(null); // New state to track the item being edited

  async function fetchData() {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/albums"
      );
      setAlbums(response.data);
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Deleting an album
  const deleteAlbum = async (albumId) => {
    try {
      const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/albums/${albumId}`
      );

      const updatedAlbums = albums.filter((album) => album.id !== albumId);
      setAlbums(updatedAlbums);
    } catch (error) {
      console.error("Error deleting album:", error);
    }
  };

  // Handling update
  const handleUpdate = (itemId, currentText) => {
    setEditItemId(itemId);
    setEditedText(currentText);
  };

  // Updating an album
  const updateAlbum = async () => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/albums/${editItemId}`,
        { title: editedText }
      );

      // Assuming the API returns the updated album data in the response
      const updatedAlbums = albums.map((album) => {
        if (album.id === editItemId) {
          const updatedData = { ...album, title: response.data.title }; // Update only the title
          console.log(updatedData); 
          return updatedData;
        }
        return album;
      });

      setAlbums(updatedAlbums);
      setEditItemId(null);
      setEditedText("");
    } catch (error) {
      console.error("Error updating album:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto mt-8 p-8 bg-slate-600 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Albums</h2>
        <ul>
          {albums.map((album) => (
            <li
              key={album.id}
              className="mb-2 container mx-auto mt-4 p-8 bg-slate-200 rounded-lg shadow-lg flex justify-between"
            >
              {editItemId === album.id ? (
                // Render input field if this item is being edited
                <>
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="p-1 w-24 outline-none sm:w-64 rounded-lg shadow-lg"
                  />
                  <button
                    className="bg-slate-600 p-2 rounded-lg shadow-lg text-white"
                    onClick={updateAlbum}
                  >
                    Update
                  </button>
                </>
              ) : (
                // Render text and buttons otherwise
                <>
                  <span className="uppercase">{album.title}</span>
                  <div className="container flex justify-between items-center w-20">
                    <div>
                      <i
                        style={{ color: "#1d2f4e" }}
                        className="cursor-pointer fa-solid fa-pen fa-xl"
                        onClick={() => handleUpdate(album.id, album.title)}
                      ></i>
                    </div>
                    <div>
                      <i
                        style={{ color: "#f50a22" }}
                        className="cursor-pointer fa-solid fa-trash fa-xl"
                        onClick={() => deleteAlbum(album.id)}
                      ></i>
                    </div>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ListItems;
