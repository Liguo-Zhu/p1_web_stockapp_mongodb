import React from "react";
import AsyncSelect from "react-select/async";
import { options } from "../api/Cities_names";
// --------------------------------------------------
export default function SingleSelectedBar({ onSubmit }) {
  // --------------------------------------------------
  const handleChange = (e) => {
    if (e !== null) {
      onSubmit(e.CityName); //(1) return the city's name which is matched
    }
  };

  const loadOptions = (searValue, Callback) => {
    setTimeout(() => {
      const filteredOptions = options.filter(
        (option) =>
          option.CityName.toLowerCase().includes(searValue.toLowerCase()) // (2) CityName: it is a collection of search elements.
      );

      Callback(filteredOptions);
    }, 300);
  };

  return (
    <div>
      <AsyncSelect
        loadOptions={loadOptions}
        onChange={handleChange}
        isClearable
        placeholder={"Search by City's Name."}
      />
    </div>
  );
}
