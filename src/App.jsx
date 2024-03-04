import ListItems from "./ListItems";
import Header from "./components/Header";
import { createContext, useState } from "react";

export const GlobalProvide = createContext();
export default function App() {
  const [albums, setAlbums] = useState([]);

  return (
    <>
      <GlobalProvide.Provider value={{albums, setAlbums}}>
        <Header />
        <ListItems/>
      </GlobalProvide.Provider>
    </>
  );
}
