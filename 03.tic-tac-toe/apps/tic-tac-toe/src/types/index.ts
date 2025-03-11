export interface BoardProps {
  roomId: string;
  playerName: string;
}

export interface CellProps {
  value: string;
  onClick: () => void;
}

export interface ResultProps {
  result: string | null;
  players: Record<string, string>;
  currentTurn: string
}
