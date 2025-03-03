interface ResultProps {
  result: string | null;
  isXNext: boolean;
}

const ResultDisplay = ({ result, isXNext }: ResultProps) => (
  <div className="text-center text-lg font-semibold">
    {result ? (result === "Tie" ? "It's a Tie!" : `Winner: ${result}`) : `Next Player: ${isXNext ? "X" : "O"}`}
  </div>
);

export default ResultDisplay;
