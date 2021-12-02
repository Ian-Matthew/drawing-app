import type { NextPage } from "next";
import React from "react";
import { useGallery } from "../lib/gallery";
import { Drawing } from "../lib/gallery/types";
import { Paths } from "../lib/svg-canvas";
import Link from "next/link";
const Gallery: NextPage = () => {
  const { drawings } = useGallery();
  return (
    <div className="h-full min-h-screen flex flex-col items-center  font-display text-8xl font-bold uppercase py-20 max-w-screen-md mx-auto">
      <h1 className="mb-2">
        The
        <br />
        Drawing App
      </h1>
      <h2 className="text-sm">(Gallery)</h2>
      <div className="max-w-screen-lg mx-auto w-full">
        <GalleryGrid drawings={drawings} />
      </div>
    </div>
  );
};

function GalleryGrid({ drawings }: { drawings: Drawing[] }) {
  return (
    <div className="gallery-grid">
      {drawings.map((drawing, i) => {
        return <GalleryItem key={`drawing-${i}`} index={i} drawing={drawing} />;
      })}
    </div>
  );
}

function GalleryItem({ drawing, index }: { drawing: Drawing; index: number }) {
  return (
    <Link href={`/drawing?index=${index}`}>
      <a className="gallery-item shadow-md">
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
      </a>
    </Link>
  );
}

export default Gallery;
