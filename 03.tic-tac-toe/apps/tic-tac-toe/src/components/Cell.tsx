import { CellProps } from "../types";

const Cell = ({ value, onClick }: CellProps) => {
  const getCellColor = (val: string) => {
    if (val === "X") return "text-blue-500"; // Blue for X
    if (val === "O") return "text-red-500"; // Red for O
    return "text-gray-800"; // Default color
  };

  return (
    <button
      onClick={onClick}
      className={`w-20 h-20 flex justify-center items-center border border-gray-600 text-2xl font-bold ${getCellColor(value)}`}
      disabled={!!value}
    >
      {value}
    </button>
  );
};

export default Cell;
