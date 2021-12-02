import type { NextPage } from "next";
import React from "react";
import { useGallery } from "../../lib/gallery";
import { Paths } from "../../lib/svg-canvas";
import { useRouter } from "next/router";
import { Layout } from "../../Layout";
const Drawing: NextPage = () => {
  const router = useRouter();
  const indexOfDrawing = router?.query?.index as unknown as number;
  const { drawings } = useGallery();
  const drawing = drawings[indexOfDrawing];
  return (
    <Layout title="(Artwork)">
      <div className="flex flex-col w-full my-4 space-y-4">
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
      </div>
      <div className="flex flex-col items-center w-full text-2xl font-semibold space-y-2">
        <div>Download As Image</div>
        <div>or</div>
        <div>Delete forever</div>
      </div>
    </Layout>
  );
};

export default Drawing;
