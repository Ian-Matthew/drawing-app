import React from "react";
import { CanvasPaths } from "../lib/svg-canvas";
import { useSvgProps, useCanvasContext, Paths } from "../lib/svg-canvas";

export function Canvas() {
  const svgProps = useSvgProps();
  console.log(svgProps);
  const { paths } = useCanvasContext();
  return (
    <div
      style={{ zIndex: 1 }}
      className="max-w-[500px] max-h-[500px] h-full w-full border bg-white border-black my-4 p-3"
    >
      <div className="w-full h-full bg-black text-white p-4">
        <div className="w-full h-full bg-white text-black flex items-center justify-center text-2xl">
          <div
            className="flex flex-col w-full h-full max-w-screen-sm max-h-full mx-auto overflow-hidden sm:h-auto"
            role="presentation"
            touch-action="pinch-zoom"
            style={{ touchAction: "pinch-zoom" }}
          >
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 500 500"
                {...svgProps}
                ref={svgProps.ref}
              >
                {paths?.length && (
                  <g id="artPaths">
                    <Paths paths={paths} />
                  </g>
                )}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
