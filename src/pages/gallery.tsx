import type { NextPage } from "next";
import React from "react";
import { useGallery } from "../lib/gallery";
import { Drawing } from "../lib/gallery/types";
import { Paths } from "../lib/svg-canvas";
import Link from "next/link";
import { Layout } from "../Layout";
import classNames from "classnames";
const Gallery: NextPage = () => {
  const { drawings } = useGallery();
  return (
    <Layout title="(Gallery)">
      <div className="max-w-screen-lg mx-auto w-full">
        <GalleryGrid drawings={drawings} />
      </div>
    </Layout>
  );
};

function GalleryGrid({ drawings }: { drawings: Drawing[] }) {
  return (
    <div className="gallery-grid">
      {drawings.map((drawing, i) => {
        return <GalleryItem key={`drawing-${i}`} index={i} drawing={drawing} />;
      })}
      <AddNewItem />
    </div>
  );
}

function AddNewItem() {
  return (
    <Link href={`/`}>
      <a className="gallery-item shadow-md">
        <div className="h-full w-full text-center p-2 border flex items-center justify-center border-black text-2xl">
          New Drawing +
        </div>
      </a>
    </Link>
  );
}
function GalleryItem({ drawing, index }: { drawing: Drawing; index: number }) {
  return (
    <Link href={`/drawing?index=${index}`}>
      <a
        className={classNames(
          "gallery-item shadow-md",
          (index === 1 || index === 5) && "col-span-2 row-span-2"
        )}
      >
        <div className="h-full w-full">
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
            <rect
              width={500}
              height={500}
              stroke={"black"}
              strokeWidth={40}
            ></rect>
          </svg>
        </div>
      </a>
    </Link>
  );
}

export default Gallery;
