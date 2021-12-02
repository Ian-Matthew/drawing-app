import type { NextPage } from "next";
import React from "react";
import { useGallery } from "../../lib/gallery";
import { Paths } from "../../lib/svg-canvas";
import Link from "next/link";
import { useRouter } from "next/router";
const Drawing: NextPage = () => {
  const router = useRouter();
  const indexOfDrawing = router?.query?.index as unknown as number;
  const { drawings } = useGallery();
  const drawing = drawings[indexOfDrawing];
  return (
    <div className="h-full min-h-screen flex flex-col items-center  font-display text-8xl font-bold uppercase py-20 max-w-screen-md mx-auto">
      <h1 className="mb-2">
        The
        <br />
        Drawing App
      </h1>
      <h2 className="text-sm">(Artwork)</h2>
      <div className="flex flex-col w-full my-4 space-y-4">
        <div className="h-full w-full border bg-white border-black p-[3%]">
          <div className="w-full h-full bg-black text-white p-[2%]">
            <div className="w-full h-full  bg-white text-black flex items-center justify-center text-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 500 500"
                className="w-full h-full"
              >
                {drawing?.paths.length && (
                  <g id="artPaths">
                    <Paths paths={drawing.paths} />
                  </g>
                )}
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center w-full text-2xl font-semibold space-y-2">
          <div>Download As Image</div>
          <div>or</div>
          <div>Delete forever</div>
        </div>
      </div>
    </div>
  );
};

export default Drawing;
