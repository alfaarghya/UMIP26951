import { ResultProps } from "../types";

const ResultDisplay = ({ result, players, currentTurn }: ResultProps) => (
  <div className="text-center text-base font-semibold text-gray-200">
    {result
      ?
      (result === "Tie"
        ?
        <p className="text-yellow-300"> It&apos;s a Tie!</p>
        :
        <p className="text-green-500">{result} wins the game</p>
      )
      :
      <p className="text-gray-300">
        Turn:  {players[currentTurn] || "Waiting for players..."}
      </p>
    }
  </div>
);

export default ResultDisplay;
