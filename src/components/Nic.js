import React, { useState } from "react";
import "../style.css";
import { Copy24Regular } from '@fluentui/react-icons';

function Nic() {
  const oldPattern = /^\d{9}[V,X,v,x]$/;
  const newPattern = /^\d{12}$/;
  const [nicInputData, setNicInputData] = useState("");
  const [nicOutputData, setNicOutputData] = useState("");
  const [isValidNic, setIsValidNic] = useState(false);
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
      setIsValidNic(true);
    } else if (newPattern.test(nicInputData)) {
      setNicOutputData(nicInputData);
      let newDataValues = dataFinderFromNew();
      newToOldConverter(newDataValues);
        setIsValidNic(true);
    } else if (nicInputData.length === 0) {
      setNicOutputData("Please enter your NIC");
      setIsValidNic(false);
    } else {
      setNicOutputData("Invalid NIC");
        setIsValidNic(false);
    }
  }

  function dataFinderFromOLd() {
    const year = nicInputData.slice(0, 2);
    const date = nicInputData.slice(2, 5);
    setIsMale(nicInputData.slice(2, 5) < 500);
    const endNumbers = nicInputData.slice(5, 9);
    return { year, date, endNumbers };
  }

  function dataFinderFromNew() {
    const year = nicInputData.slice(2, 4);
    const date = nicInputData.slice(4, 7);
    setIsMale(nicInputData.slice(4, 7) < 500);
    const endNumbers = nicInputData.slice(8, 12);
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

        <div className="input-container">
          <input
              className="nic-output"
              type="text"
              name="nicOutput"
              value={nicOutputData}
              onChange={handleInputChange}
          />
          <span>
            <Copy24Regular
                className="icon"
                onClick={() => {
                  if (isValidNic) {
                    navigator.clipboard.writeText(nicOutputData).then(r => {
                      alert(`Your new id "${nicOutputData}" Copied to clipboard`)
                    });
                  }
                }}
            />
          </span>
        </div>

        <button className="Nic-button" onClick={handleSubmit}>
          Convert
        </button>
      </form>
    </div>
  );
}

export default Nic;
