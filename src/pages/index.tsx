import type { NextPage } from "next";
import { Canvas } from "../drawing/Canvas";
import classNames from "classnames";
import React from "react";
import * as Slider from "@radix-ui/react-slider";
import {
  CanvasProvider,
  defaultState,
  useCanvasContext,
} from "../lib/svg-canvas";
const Home: NextPage = () => {
  const [activeToolMenu, setActiveToolMenu] = React.useState<string | null>(
    null
  );
  return (
    <div className="h-full min-h-screen flex flex-col items-center  font-display text-8xl font-bold uppercase py-20 max-w-screen-md mx-auto">
      <h1 className="mb-2">
        The
        <br />
        Drawing App
      </h1>
      <div className="flex flex-row space-x-2 w-full">
        <CanvasProvider config={{ ...defaultState, paths: [] }}>
          <div className="flex flex-row items-center justify-center w-full">
            <Canvas />
            <Tools
              activeToolMenu={activeToolMenu}
              setActiveToolMenu={setActiveToolMenu}
            />
          </div>
        </CanvasProvider>
      </div>
    </div>
  );
};

function BrushSize() {
  const { strokeWidth, dispatch } = useCanvasContext();
  return (
    <Slider.Root
      className="w-full h-full flex flex-col items-center justify-center"
      orientation="vertical"
      max={40}
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
  );
}

function ColorPicker() {
  const { strokeColor, dispatch } = useCanvasContext();
  const colors = ["red", "blue", "yellow", "black", "white", "green"];
  return (
    <div className="h-full transform -translate-x-2 flex flex-col items-center space-y-2">
      {colors.map((color) => {
        return (
          <div
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

function ToolButton({ children, active, onClick }) {
  return (
    <button
      className={classNames(
        "flex items-center space-x-5 font-bold uppercase  ease-out",
        active ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <div onClick={onClick}>{children}</div>
    </button>
  );
}
function Tools({ activeToolMenu, setActiveToolMenu }) {
  const brushActive = activeToolMenu === "brush";
  return (
    <div className={classNames("text-3xl flex h-[500px] relative ml-4")}>
      <div
        className={classNames(
          "absolute h-full transform transition  ease-in-out duration-300 ",
          activeToolMenu ? "translate-x-0 delay-75" : "-translate-x-56"
        )}
      >
        {activeToolMenu === "brush" && <BrushSize />}
        {activeToolMenu === "color" && <ColorPicker />}
      </div>
      <div
        className={classNames(
          "flex flex-col transform transition  ease-linear",
          activeToolMenu ? "translate-x-8" : "translate-x-0 delay-75"
        )}
      >
        <ToolButton
          onClick={() =>
            setActiveToolMenu(activeToolMenu !== "color" ? "color" : null)
          }
          active={activeToolMenu === "color"}
        >
          Color
        </ToolButton>
        <ToolButton
          onClick={() =>
            setActiveToolMenu(activeToolMenu !== "brush" ? "brush" : null)
          }
          active={activeToolMenu === "brush"}
        >
          Brush Size
        </ToolButton>

        <div>Undo</div>
        <div>Clear</div>
        <div>Save</div>
      </div>
    </div>
  );
}

export default Home;
