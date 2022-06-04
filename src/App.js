import React, { useEffect, useState } from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import {
  numbersCharacters,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from "./Chracters";
import { COPY_SUCCESS } from "./Message";

const App = () => {
  const [password, setPassword] = useState("");

  const [passwordLength, setPasswordLength] = useState(20);
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbol, setSymbol] = useState(false);

  // create password
  const createPassword = (characterList) => {
    let pass = "";

    const characterListLength = characterList.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);

      pass = pass + characterList.charAt(characterIndex);
    }

    return pass;
  };

  // copyToClipboard func define
  const copyToClipboard = () => {
    const newTextArea = document.createElement("textarea");

    newTextArea.innerText = password;

    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand("copy");
    newTextArea.remove();
  };

  // copy password
  const handleCopy = (e) => {
    copyToClipboard();
  };

  // generate password
  const generatePassword = (e) => {
    let characterList = "";

    if (lowercase) {
      characterList = characterList + lowerCaseLetters;
    }

    if (uppercase) {
      characterList = characterList + upperCaseLetters;
    }

    if (numbers) {
      characterList = characterList + numbersCharacters;
    }

    if (symbol) {
      characterList = characterList + specialCharacters;
    }

    setPassword(createPassword(characterList));
  };

  return (
    <>
      <div className="App">
        <div className="container">
          <div className="generator">
            <h2 className="generator__header text-center">
              Password Generator
            </h2>
            <div className="generator__password">
              <h3>password : {password}</h3>

              <button className="copy__btn" onClick={handleCopy}>
                <i className="far fa-clipboard"></i>
              </button>
            </div>

            <div className="form-group">
              <label htmlFor="password-strength">Password length</label>

              <input
                type="number"
                id="password-strength"
                name="password-strength"
                max="20"
                min="10"
                defaultValue={passwordLength}
                onChange={(e) => setPasswordLength(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="uppercase-letters">
                Include Uppercase Letters
              </label>
              <input
                type="checkbox"
                id="uppercase-letters"
                name="uppercase-letters"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lowercase-letters">
                Include Lowercase Letters
              </label>
              <input
                type="checkbox"
                id="lowercase-letters"
                name="lowercase-letters"
                checked={lowercase}
                onChange={(e) => setLowercase(e.target.checked)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="include-numbers">Include Numbers</label>
              <input
                type="checkbox"
                id="include-numbers"
                name="include-numbers"
                checked={numbers}
                onChange={(e) => setNumbers(e.target.checked)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="include-symbols">Include Symbols</label>
              <input
                type="checkbox"
                id="include-symbols"
                name="include-symbols"
                checked={symbol}
                onChange={(e) => setSymbol(e.target.checked)}
              />
            </div>

            <button className="generator__btn" onClick={generatePassword}>
              Generate Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
