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
import { ToolBar } from "../drawing/Tools";
const Home: NextPage = () => {
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
            <ToolBar />
          </div>
        </CanvasProvider>
      </div>
    </div>
  );
};

export default Home;
