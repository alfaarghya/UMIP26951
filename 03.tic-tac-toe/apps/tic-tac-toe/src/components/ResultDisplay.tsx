interface ResultProps {
  result: string | null;
  players: Record<string, string>;
  currentTurn: string
}

const ResultDisplay = ({ result, players, currentTurn }: ResultProps) => (
  <div className="text-center text-lg font-semibold">
    {result ? (result === "Tie" ? "It's a Tie!" : `Winner: ${result}`) : `Turn: ${players[currentTurn] || "Waiting for players..."}`}
  </div>
);

export default ResultDisplay;
