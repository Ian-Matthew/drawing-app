import type { NextPage } from "next";
import { Canvas } from "../drawing/Canvas";
import { ToolBar } from "../drawing/Toolbar";
import classNames from "classnames";
import { CanvasProvider, defaultState } from "../lib/svg-canvas";
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
            <div className="max-w-[500px] max-h-[500px] h-full w-full border border-black my-4 p-3">
              <div className="w-full h-full bg-black text-white p-4">
                <div className="w-full h-full bg-white text-black flex items-center justify-center text-2xl">
                  <Canvas />
                </div>
              </div>
            </div>
            <div className="text-3xl flex  ml-4 h-[500px]">
              {/* <div className="w-8 left-0 h-[500px] top-0 bg-red-500 mr-4"></div> */}
              <div className="flex flex-col">
                <div className="flex items-center space-x-5">
                  <div>Color</div>
                </div>
                <div className="flex items-center space-x-5">
                  <div>Brush Size</div>
                </div>
                <div>Undo</div>
                <div>Clear</div>
                <div>Save</div>
              </div>
            </div>
          </div>
        </CanvasProvider>
      </div>
    </div>
  );
};

function Tools() {
  return (
    <div className="flex flex-row items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center">
        {/* tool icon */}

        {/* tool name */}
      </div>
    </div>
  );
}

export default Home;
