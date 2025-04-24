import { ReactNode, RefObject } from "react";

export type card1Type = {
  title: string;
  icon: string;
};

export interface CardRevealProps {
  children: ReactNode; // Accept children instead of cards
  className?: string;
}

export interface CardProps {
  children: ReactNode;
  progress: any;
  range: [number, number];
  index: number;
}

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement>; // Container ref
  fromRef: RefObject<HTMLElement>;
  toRef: RefObject<HTMLElement>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}
