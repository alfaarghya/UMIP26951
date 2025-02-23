import React from "react";
import { ButtonProps } from "../types";

const Button: React.FC<ButtonProps> = ({ value, onClick }) => (
  <button
    onClick={() => onClick(value)}
    className="p-3 rounded-lg text-lg font-medium transition-colors duration-200 bg-gray-300 hover:bg-gray-400 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100"
  >
    {value}
  </button>
);

export default Button;
