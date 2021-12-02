import type { NextPage } from "next";
import { Canvas } from "../drawing/Canvas";
import React from "react";
import { CanvasProvider, defaultState } from "../lib/svg-canvas";
import { ToolBar } from "../drawing/Tools";
import { Layout } from "../Layout";
const Home: NextPage = () => {
  return (
    <Layout title={"(Canvas)"}>
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
    </Layout>
  );
};

export default Home;
