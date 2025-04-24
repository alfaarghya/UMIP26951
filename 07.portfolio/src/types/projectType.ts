export type modal = {
  active: boolean;
  index: number;
};

export interface ProjectProps {
  index: number;
  title: string;
  description: string;
  link: string;
  setModal: ({}: modal) => void;
}

export interface modalProps {
  modal: modal;
  projects: project[];
}

export interface project {
  title: string;
  description: string;
  src: string;
  link: string;
  color: string;
}
