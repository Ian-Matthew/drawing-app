import type { NextPage } from "next";
import React from "react";
import { useGallery } from "../../lib/gallery";
import { Paths } from "../../lib/svg-canvas";
import { useRouter } from "next/router";
import { Layout } from "../../Layout";
import Link from "next/link";
const Drawing: NextPage = () => {
  const router = useRouter();

  // This is some typescript jazz. Surely there is a better way
  let indexOfDrawing: string = Array.isArray(router?.query?.index)
    ? router?.query?.index[0]
    : (router?.query.index as string);

  let indexAsNumber: number = parseInt(indexOfDrawing);

  const { drawings, removeDrawing } = useGallery();
  const drawing = drawings[indexAsNumber];
  const svgRef = React.useRef<SVGSVGElement>(null);

  // Praise you stack overflow! https://stackoverflow.com/questions/37820449/image-cropped-while-converting-svg-to-png
  function downloadAsImage() {
    // SVG element and XML string.
    const svg = svgRef.current;
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);

      // Canvas to hold the image.
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // Canvas size = SVG size.
      const svgSize = svg.viewBox.baseVal;
      canvas.width = svgSize.width;
      canvas.height = svgSize.height;

      // Image element appended with data.
      const img = document.createElement("img");
      img.setAttribute("src", "data:image/svg+xml;base64," + btoa(svgData));

      img.onload = function () {
        // Draw image on canvas and convert to URL.
        context?.drawImage(img, 0, 0);
        const url = canvas.toDataURL("image/png");
        // download the image
        download(url, "drawing");
      };
    }

    // Fake a link to initiate download.
    function download(href: string, name: string) {
      const link = document.createElement("a");
      link.download = name;
      link.style.opacity = "0";
      link.href = href;
      link.click();
      link.remove();
    }
  }
  return (
    <Layout title="(Artwork)">
      <div className="flex flex-row text-semibold justify-between items-center w-full my-3">
        <Link href={"/gallery"}>
          <a>Back to Gallery</a>
        </Link>
        <Link href={"/"}>
          <a>Add New Drawing</a>
        </Link>
      </div>
      <div className="flex flex-col w-full my-1 space-y-4 relative">
        <div className="h-full w-full">
          <svg
            ref={svgRef}
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
        <button onClick={downloadAsImage}>Download As Image</button>
        <div>or</div>
        <button onClick={() => removeDrawing(indexAsNumber)}>
          Delete forever
        </button>
      </div>
    </Layout>
  );
};

export default Drawing;
