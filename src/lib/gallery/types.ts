import { CanvasPaths } from "../svg-canvas";
export type Drawing = {
  paths: CanvasPaths;
  date: Date;
  name?: string;
  artist?: string;
};

export type Gallery = {
  drawings: Drawing[];
};

export interface GalleryContext {
  drawings: Drawing[];
  removeDrawing: (index: number) => void;
  saveDrawing: (drawing: Drawing) => void;
}
