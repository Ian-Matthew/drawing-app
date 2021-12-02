import React from "react";
import { useSvgProps, useCanvasContext, Paths } from "../lib/svg-canvas";

export function Canvas() {
  const svgProps = useSvgProps();
  const { paths } = useCanvasContext();
  return (
    <div
      style={{ zIndex: 1 }}
      className="max-w-[500px] max-h-[500px] h-full w-full"
    >
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
            <rect
              width={500}
              height={500}
              stroke={"black"}
              strokeWidth={40}
            ></rect>
          </svg>
        </div>
      </div>
    </div>
  );
}
