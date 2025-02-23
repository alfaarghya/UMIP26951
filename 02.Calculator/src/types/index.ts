export interface DisplayProps {
  value: string;
}

export interface ButtonProps {
  value: string;
  onClick: (value: string) => void;
}

export interface HistoryProps {
  history: string[];
}
