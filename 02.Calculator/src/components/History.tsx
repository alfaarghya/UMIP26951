import React from "react";
import { HistoryProps } from "../types";

const History: React.FC<HistoryProps> = ({ history }) => (
  <div className="md:max-h-96 max-h-40 overflow-y-auto p-2 rounded-lg shadow-inner 
    bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
    {history.length === 0 ? (
      <p className="text-sm text-gray-500 dark:text-gray-400">No history yet.</p>
    ) : (
      <ul className="space-y-1">
        {history.map((entry, index) => (
          <li key={index} className="text-sm border-b border-gray-300 dark:border-gray-700 pb-1 last:border-none">
            {entry}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default History;