import React, { useState } from "react";
import './Styles/Input.css'
function FormExample() {
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleSelectChange = event => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <div className="Parent">
        <label htmlFor="inputField">Enter Text:</label>
        <input
          id="inputField"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type something..."
        />
      </div>

      <div>
        <label htmlFor="selectField">Choose an Option:</label>
        <select
          id="selectField"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>

      <div className="form-item">
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </div>
    </div>
  );
}

export default FormExample;
