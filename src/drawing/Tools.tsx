import classNames from "classnames";
import React from "react";
import * as Slider from "@radix-ui/react-slider";
import { useCanvasContext } from "../lib/svg-canvas";
import { useGallery } from "../lib/gallery";
// ToolBar composed of all the tools + actions
export function ToolBar() {
  const { dispatch, paths } = useCanvasContext();
  const gallery = useGallery();
  return (
    // Container
    <div
      className={classNames(
        "text-3xl  space-y-4 sm:space-x-4 flex h-full max-h-[500px] w-full sm:w-auto sm:flex-row flex-col items-center sm:items-end sm:justify-center  relative sm:ml-4"
      )}
    >
      {/* Brush Tool */}
      <BrushSize />

      {/* Colors, Buttons, and Current Brush indicator */}
      <div className="flex flex-col justify-end w-full">
        <div className="flex sm:flex-row flex-col text-left">
          {/* Color Picker */}
          <ColorPicker />

          {/* Tool Buttons */}
          <div className="flex sm:flex-col flex-row sm:ml-4 space-x-2 sm:space-x-0 justify-center sm:justify-end">
            {/* Undo */}
            <ActionButton onClick={() => dispatch({ type: "UNDO_LAST_PATH" })}>
              Undo
            </ActionButton>
            {/* Clear */}
            <ActionButton onClick={() => dispatch({ type: "CLEAR_CANVAS" })}>
              Clear
            </ActionButton>
            {/* Save */}
            <ActionButton
              onClick={() => {
                gallery.saveDrawing({ paths, date: new Date() });
              }}
            >
              Save
            </ActionButton>
            {/* Current Tool */}
            <CurrentTool />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CurrentTool() {
  const { strokeWidth, strokeColor } = useCanvasContext();
  return (
    <div className="flex sm:border border-black sm:mt-4 w-28 h-28  items-center justify-center">
      <div
        style={{
          width: strokeWidth,
          height: strokeWidth,
          backgroundColor: strokeColor,
        }}
        className="rounded-full border-black dark:border-white border-2"
      ></div>
    </div>
  );
}

// Brush Size Tool
function BrushSize() {
  const { strokeWidth, dispatch } = useCanvasContext();
  return (
    <>
      {/*  Vertical for large screens */}
      <Slider.Root
        className="w-full h-full sm:flex flex-col items-center justify-center hidden"
        orientation="vertical"
        max={100}
        min={5}
        value={[strokeWidth]}
        onValueChange={(value) => {
          dispatch({ type: "SET_STROKE_WIDTH", width: value[0] });
        }}
      >
        <Slider.Track className="h-full w-2 bg-white border border-black relative">
          <Slider.Range className="bg-black w-2 rounded-full  absolute" />
        </Slider.Track>
        <Slider.Thumb className="w-6 h-6 bg-white rounded-full block border-2 border-black" />
      </Slider.Root>

      {/* Horizontal for small screens */}
      <Slider.Root
        className="w-full h-full sm:hidden flex-row items-center justify-center flex"
        orientation="horizontal"
        max={100}
        min={5}
        value={[strokeWidth]}
        onValueChange={(value) => {
          dispatch({ type: "SET_STROKE_WIDTH", width: value[0] });
        }}
      >
        <Slider.Track className="w-full h-2 bg-white border border-black relative">
          <Slider.Range className="bg-black w-2 rounded-full  absolute" />
        </Slider.Track>
        <Slider.Thumb className="w-6 h-6 bg-white rounded-full block border-2 border-black" />
      </Slider.Root>
    </>
  );
}

// Color Picker Toold
function ColorPicker() {
  const { dispatch } = useCanvasContext();
  const colors = [
    "#dfdfdf",
    "#fef200",
    "#ff0078",
    "#01ff00",
    "#0201ff",
    "black",
    "white",
  ];

  return (
    <div className="h-full flex sm:flex-col flex-row items-center sm:space-y-2 space-x-2 sm:space-x-0 justify-center sm:justify-end">
      {colors.map((color) => {
        return (
          <div
            key={`color-${color}`}
            onClick={() => {
              dispatch({
                type: "SET_STROKE_COLOR",
                color: color,
              });
            }}
            className="h-8 w-8 cursor-pointer"
            style={{
              backgroundColor: color,
              border: color === "white" ? "1px solid black" : "none",
            }}
          ></div>
        );
      })}
    </div>
  );
}

// Generic Tool Button
function ActionButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "flex sm:text-2xl text-center text-base items-center space-x-5 font-bold uppercase sm:text-left  ease-out"
      )}
    >
      {children}
    </button>
  );
}
