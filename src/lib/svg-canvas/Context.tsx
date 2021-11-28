import React from "react";

import { CanvasState, Dispatch, CanvasAction } from "./types";

export const defaultState = {
  paths: [],
  isDrawing: false,
  strokeColor: "black",
  strokeWidth: 10,
  disabled: false,
};

interface ContextType extends CanvasState {
  dispatch: Dispatch;
}

const CanvasContext = React.createContext<ContextType | undefined>(undefined);

function canvasReducer(state: CanvasState, action: CanvasAction) {
  switch (action.type) {
    case "SET_PATHS":
      return {
        ...state,
        paths: action.paths,
      };
    case "SET_STROKE_COLOR":
      return {
        ...state,
        strokeColor: action.color,
      };

    case "SET_STROKE_WIDTH":
      return {
        ...state,
        strokeWidth: action.width,
      };
    case "TOGGLE_DRAWING":
      return {
        ...state,
        isDrawing: action.isDrawing,
      };

    case "TOGGLE_DISABLE":
      return {
        ...state,
        isDisabled: action.isDisabled,
      };

    case "UNDO_LAST_PATH":
      const updated = [...state.paths];
      updated.pop();
      return {
        ...state,
        paths: updated,
      };

    case "CLEAR_CANVAS":
      return {
        ...state,
        paths: [],
      };

    default: {
      throw new Error(`Invalid Action Type ${action.type}`);
    }
  }
}

type CanvasProviderProps = { children: React.ReactNode; config?: CanvasState };

function CanvasProvider({
  children,
  config = defaultState,
}: CanvasProviderProps) {
  const [state, dispatch] = React.useReducer(canvasReducer, config);
  const value = { ...state, dispatch };
  return (
    <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
  );
}

function useCanvasContext() {
  const context = React.useContext(CanvasContext);
  if (context === undefined) {
    throw new Error("canvas context must be used within provider");
  }
  return context;
}

export { CanvasProvider, useCanvasContext };
