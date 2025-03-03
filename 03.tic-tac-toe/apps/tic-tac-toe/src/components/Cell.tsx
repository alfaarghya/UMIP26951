import { FC } from "react";

interface CellProps {
  value: string;
  onClick: () => void;
}

const Cell: FC<CellProps> = ({ value, onClick }) => (
  <button
    onClick={onClick}
    className="w-20 h-20 flex justify-center items-center border text-2xl font-bold"
    disabled={!!value}
  >
    {value}
  </button>
);

export default Cell;
