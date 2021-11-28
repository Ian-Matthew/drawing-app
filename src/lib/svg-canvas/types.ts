export type Point = {
  x: number;
  y: number;
  data?: any;
};

export type CanvasPath = {
  readonly paths: Point[];
  readonly strokeWidth: number;
  readonly strokeColor: string;
};

export type CanvasPaths = CanvasPath[];

export type ControlPoints = {
  current: Point;
  previous?: Point;
  next?: Point;
  reverse?: boolean;
};

export interface CanvasState {
  paths: Array<CanvasPath>;
  isDrawing: boolean;
  strokeColor: string;
  strokeWidth: number;
  isDisabled?: boolean;
}

export type State =
  | "alabama"
  | "alaska"
  | "arizona"
  | "arkansas"
  | "california"
  | "colorado"
  | "connecticut"
  | "delaware"
  | "florida"
  | "georgia"
  | "hawaii"
  | "idaho"
  | "illinois"
  | "indiana"
  | "iowa"
  | "kansas"
  | "kentucky"
  | "louisiana"
  | "maine"
  | "maryland"
  | "massachusetts"
  | "michigan"
  | "minnesota"
  | "mississippi"
  | "missouri"
  | "montana"
  | "nebraska"
  | "nevada"
  | "new"
  | "new"
  | "new"
  | "new"
  | "north"
  | "north"
  | "ohio"
  | "oklahoma"
  | "oregon"
  | "pennsylvania"
  | "rhode"
  | "south"
  | "south"
  | "tennessee"
  | "texas"
  | "utah"
  | "vermont"
  | "virginia"
  | "washington"
  | "west"
  | "wisconsin"
  | "wyoming";
export type WriteSVGPoint = Omit<SVGPoint, "x" | "y"> & Point;

export type CanvasAction =
  | { type: "SET_ACTIVE_TOOL_TYPE"; tool: "marker" | "pen" }
  | { type: "TOGGLE_DRAWING"; isDrawing: boolean }
  | { type: "TOGGLE_DISABLE"; isDisabled: boolean }
  | { type: "SET_PATHS"; paths: CanvasPath[] }
  | { type: "SET_STROKE_COLOR"; color: string }
  | { type: "SET_STROKE_WIDTH"; width: number }
  | { type: "UNDO_LAST_PATH" }
  | { type: "CLEAR_CANVAS" };

export type Dispatch = (action: CanvasAction) => void;
