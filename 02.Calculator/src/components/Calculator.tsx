import React, { useState, useEffect, useCallback } from "react";
import 'remixicon/fonts/remixicon.css'
import Display from "./Display";
import Button from "./Button";
import History from "./History";
import { evaluate } from "mathjs";

// local storage keys
const LOCAL_STORAGE_KEY = "calculator_history";
const THEME_KEY = "calculator_theme";

const Calculator: React.FC = () => {
  //state: current input
  const [currentInput, setCurrentInput] = useState<string>("0");

  //state: history
  const [history, setHistory] = useState<string[]>(() => {
    const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedHistory ? JSON.parse(storedHistory) : [];
  });

  //state: theme
  const [theme, setTheme] = useState<string>(() => {
    const storedTheme = localStorage.getItem(THEME_KEY);
    return storedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  });

  //effect: update theme
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  //effect: update history
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  //handle button click
  const handleButtonClick = useCallback((value: string) => {
    if (value === "C") { //clear current input
      setCurrentInput("0");
    } else if (value === "←") { //backspace
      setCurrentInput((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    } else if (value === "=") { //evaluate
      try {
        //evaluate input
        const result = evaluate(currentInput);
        //set history
        setHistory((prev) => [`${currentInput} = ${result}`, ...prev]);
        //set current as result
        setCurrentInput(result.toString());
      } catch {
        setCurrentInput("Error");
      }
    } else if (value === "√") { //square root
      try {
        //evaluate square root
        const result = evaluate(`sqrt(${currentInput})`);
        //set history
        setHistory((prev) => [`√(${currentInput}) = ${result}`, ...prev]);
        //set current as result
        setCurrentInput(result.toString());
      } catch {
        setCurrentInput("Error");
      }
    } else if (value === "%") { //percentage
      try {
        //evaluate percentage
        const result = evaluate(`(${currentInput})/100`);
        //set history
        setHistory((prev) => [`${currentInput}% = ${result}`, ...prev]);
        //set current as result
        setCurrentInput(result.toString());
      } catch {
        setCurrentInput("Error");
      }
    } else if (value === "xʸ") { //power
      setCurrentInput((prev) => `${prev}^`);
    } else if (value === "log") { //logarithm
      setCurrentInput((prev) => `log(${prev})`);
    } else if (value === "eˣ") { //exponential
      setCurrentInput((prev) => `exp(${prev})`);
    } else {
      //set current input
      setCurrentInput((prev) => (prev === "0" || prev === "Error" ? value : prev + value));
    }
  }, [currentInput]);

  //clear history
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  //handle key press
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const { key } = event;
    const validKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "+", "-", "*", "/", "(", ")", "Enter", "=", "Backspace", "Escape", "^", "l", "e"];

    //check: if key is not valid
    if (!validKeys.includes(key)) return;

    //handle: enter, equals, backspace, escape, power, log, exponential
    if (key === "Enter" || key === "=") {
      handleButtonClick("=");
    } else if (key === "Backspace") {
      handleButtonClick("←");
    } else if (key === "Escape") {
      handleButtonClick("C");
    } else if (key === "^") {
      handleButtonClick("xʸ");
    } else if (key === "l") {
      handleButtonClick("log");
    } else if (key === "e") {
      handleButtonClick("eˣ");
    }
    else {
      handleButtonClick(key);
    }
  }, [handleButtonClick]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  //toggle theme
  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <div className="xl:w-3/5 w-4/5 mx-auto p-4 rounded-lg shadow-md transition-colors duration-300 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700">
      <div className="flex md:flex-row flex-col gap-4">
        <div className="md:w-1/2">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Calculator</h1>
            {/* toggle the theme */}
            <button
              onClick={toggleTheme}
              className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-500"
            >
              {theme === "dark" ? <i className="ri-sun-line"></i> : <i className="ri-moon-line"></i>}
            </button>
          </div>
          {/* display input & output */}
          <Display value={currentInput} />
          <div className="grid grid-cols-5 gap-2 mt-4">
            {["(", ")", "C", "←", "/",
              "7", "8", "9", "*", "√",
              "4", "5", "6", "-", "%",
              "1", "2", "3", "+", "xʸ",
              ".", "0", "=", "log", "eˣ"].map((item) => (
                // number & operator buttons
                <Button key={item} value={item} onClick={handleButtonClick} />
              ))}
          </div>
        </div>
        <div className="md:w-1/2 md:h-full">
          <div className=" flex justify-between items-center">
            <h3 className="text-lg font-bold">History</h3>
            {/* clear history */}
            <button
              onClick={clearHistory}
              className="px-3 mb-2 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
            >
              <i className="ri-delete-bin-5-line"></i>
            </button>
          </div>
          {/* display previous history */}
          <History history={history} />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
