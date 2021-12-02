import type { NextPage } from "next";
import { Canvas } from "../drawing/Canvas";
import React from "react";
import { CanvasProvider, defaultState } from "../lib/svg-canvas";
import { ToolBar } from "../drawing/Tools";
const Home: NextPage = () => {
  return (
    <div className="h-full min-h-screen flex flex-col items-center  font-display  font-bold uppercase py-20 max-w-screen-md mx-auto">
      <h1 className="mb-2 text-2xl md:text-8xl">
        The
        <br />
        Drawing App
      </h1>
      <h2 className="text-sm">(Canvas)</h2>

      <div className="flex my-4 flex-row space-x-2 w-full">
        <CanvasProvider config={{ ...defaultState, paths: [] }}>
          <div className="flex flex-col sm:px-1 px-3 sm:flex-row items-center sm:items-end justify-center w-full">
            <div className="w-full">
              <Canvas />
            </div>
            <ToolBar />
          </div>
        </CanvasProvider>
      </div>
    </div>
  );
};

export default Home;
