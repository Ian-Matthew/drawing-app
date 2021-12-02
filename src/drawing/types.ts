import { Dispatch, ReactNode, SetStateAction } from "react";

import { CanvasPaths } from "../lib/svg-canvas";
export interface Colors {
  [key: string]: string;
}

export type ToolsProps = {
  handleSubmit: (paths: CanvasPaths) => void;
};
export type ToolButtonProps = {
  label: string | ReactNode;
  name?: string;
  activeTool: Tool;
  setActiveTool: SetTool;
  handleClick?: () => void;
  icon?: ReactNode;
};
export type SetTool = Dispatch<SetStateAction<Tool>>;
export type Tool = string | null;
