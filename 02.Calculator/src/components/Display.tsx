import React from "react";
import { DisplayProps } from "../types";

const Display: React.FC<DisplayProps> = ({ value }) => (
  <div className="w-full h-16 flex items-center justify-end px-4 text-3xl font-semibold rounded-lg shadow-inner 
    bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100">
    {value}
  </div>
);

export default Display;
