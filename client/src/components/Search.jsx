import React, { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../context/UserContext";
import { symbolSet } from "../api/symbol_nasdaq";

export default function Search() {
  const [search, setSearch] = useState("");
  const { addStock } = useContext(UserContext);
  //--------------------------------------------
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState(symbolSet);

  //=================================================================================
  // search stock's symbol or name
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank. Filter the masterDataSource. Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.SymbolName
          ? item.SymbolName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
        //The indexOf() method returns the first index at which a given element can be found in the array,
        //or -1 if it is not present.
      });
      setFilteredDataSource(newData); //assign value to filteredDataSource
      setSearch(text); //assign value to SearchBar
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource([]); //If input is empty, it is set to empty.
      setSearch(text); //assign value to the SearchBar
    }
  };

  const displayDropDown1 = () => {
    const dropdownClass = search ? "show" : null;
    return (
      <ul
        className={`dropdown-menu ${dropdownClass}`}
        style={{
          height: "500px",
          maxWidth: "50vh",
          overflow: "scroll",
          overflowX: "hidden",
          cursor: "pointer",
        }}
      >
        {filteredDataSource?.map((item) => {
          return (
            <li
              className="dropdown-item"
              key={item.symbol}
              onClick={() => {
                addStock(item.symbol);
                setSearch("");
              }}
            >
              {item.symbol}--{item.name}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="container">
      <h2>1. Search</h2>
      <div>
        <input
          style={{ backgroundColor: "rgba(145,158,171,0.04)" }}
          className="form-control"
          type="text"
          placeholder="Search by symbol..."
          autoComplete="off"
          value={search}
          onChange={(e) => {
            searchFilterFunction(e.target.value);
          }}
        />

        {displayDropDown1()}
      </div>
    </div>
  );
}
