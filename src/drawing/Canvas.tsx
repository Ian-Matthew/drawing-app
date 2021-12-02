import React from "react";
import { useSvgProps, useCanvasContext, Paths } from "../lib/svg-canvas";
import useMouse from "@react-hook/mouse-position";

export function Canvas() {
  const svgProps = useSvgProps();
  const { paths } = useCanvasContext();
  const mouse = useMouse(svgProps.ref as any, { fps: 60 });

  return (
    <div
      style={{ zIndex: 1 }}
      className="max-w-[500px] max-h-[500px] h-full w-full relative mx-auto"
    >
      {mouse.isOver && (
        <Cursor clientX={mouse.clientX} clientY={mouse.clientY} />
      )}
      <div
        className="flex flex-col w-full h-full max-w-screen-sm max-h-full mx-auto overflow-hidden sm:h-auto"
        role="presentation"
        touch-action="pinch-zoom"
        style={{ touchAction: "pinch-zoom" }}
      >
        <div style={{ cursor: "none" }}>
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

const Cursor = ({
  clientX,
  clientY,
}: {
  clientX: number | null;
  clientY: number | null;
}) => {
  const { strokeColor, strokeWidth } = useCanvasContext();
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <div
        className="absolute transform -translate-y-1/2 -translate-x-1/2 rounded-full opacity-60"
        style={{
          backgroundColor: strokeColor,
          position: "absolute",
          left: clientX,
          top: clientY,
          height: strokeWidth,
          width: strokeWidth,
          transform: "translate(-50%, -50%)",
          border: `2px solid ${strokeColor === "black" ? "white" : "black"}`,
        }}
      ></div>
    </div>
  );
};
