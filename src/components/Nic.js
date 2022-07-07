import React, { useState } from "react";
import "../style.css";

function Nic() {
  const oldPattern = /^\d{9}[V,X,v,x]$/;
  const newPattern = /^\d{12}$/;
  const [nicInputData, setNicInputData] = useState("");
  const [nicOutputData, setNicOutputData] = useState("");
  const [isMale, setIsMale] = useState(null);

  function handleInputChange(event) {
    setNicInputData(event.target.value);
    console.log(event.target.value);
    nicOutputData === "Invalid NIC"
      ? setNicOutputData("")
      : setNicOutputData(nicOutputData);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (oldPattern.test(nicInputData)) {
      setNicOutputData(nicInputData);

      let oldDataValues = dataFinderFromOLd();
      oldToNewConverter(oldDataValues);
    } else if (newPattern.test(nicInputData)) {
      setNicOutputData(nicInputData);

      let newDataValues = dataFinderFromNew();
      newToOldConverter(newDataValues);
    } else if (nicInputData.length === 0) {
      setNicOutputData("Please enter your NIC");
    } else {
      setNicOutputData("Invalid NIC");
    }
  }

  function dataFinderFromOLd() {
    var year = nicInputData.slice(0, 2);
    var date = nicInputData.slice(2, 5);
    setIsMale(nicInputData.slice(2, 5) < 500 ? true : false);
    var endNumbers = nicInputData.slice(5, 9);
    return { year, date, endNumbers };
  }

  function dataFinderFromNew() {
    var year = nicInputData.slice(2, 4);
    var date = nicInputData.slice(4, 7);
    setIsMale(nicInputData.slice(4, 7) < 500 ? true : false);
    var endNumbers = nicInputData.slice(8, 12);
    return { year, date, endNumbers };
  }

  function oldToNewConverter(oldDataValues) {
    let newNic =
      "19" +
      oldDataValues.year +
      oldDataValues.date +
      "0" +
      oldDataValues.endNumbers;
    setNicOutputData(newNic);
  }

  function newToOldConverter(oldDataValues) {
    let newNic =
      oldDataValues.year + oldDataValues.date + oldDataValues.endNumbers + "V";
    setNicOutputData(newNic);
  }

  // useEffect(() => {
  //   console.log("Ok");
  // }, []);

  return (
    <div>
      <form className="Nic-container">
        <input
          className="nic-input"
          type="Text"
          placeholder="Enter your Old / New NIC number here"
          name="nicInput"
          maxLength="12"
          value={nicInputData}
          onChange={handleInputChange}
        />

        <input
          className="nic-output"
          type="Text"
          name="nicOutput"
          value={nicOutputData}
          onChange={handleInputChange}
        />

         

        <button className="Nic-button" onClick={handleSubmit}>
          Convert
        </button>
      </form>
    </div>
  );
}

export default Nic;
