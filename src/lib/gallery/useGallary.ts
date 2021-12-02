import { useRouter } from "next/dist/client/router";
import { useLocalStorageState } from "../useLocalStorageState";
import { Drawing, Gallery, GalleryContext } from "./types";
export function useGallery(): GalleryContext {
  const router = useRouter();
  const [gallery, setGallery] = useLocalStorageState(
    {
      drawings: [] as Drawing[],
    },
    "drawings"
  );

  function saveDrawing(drawing: Drawing) {
    let safePaths = drawing.paths.map((path) => {
      return {
        ...path,
        paths: path.paths.map((point) => {
          return {
            x: point.x,
            y: point.y,
            data: point.data,
          };
        }),
      };
    });

    setGallery((g: Gallery) => ({
      ...g,
      drawings: [...g.drawings, { ...drawing, paths: safePaths }],
    }));
    router.push("/gallery");
  }

  function removeDrawing(index: number) {
    setGallery((g: Gallery) => ({
      ...g,
      drawings: g.drawings.filter((_, i) => i !== index),
    }));
  }

  return {
    drawings: gallery.drawings,
    saveDrawing,
    removeDrawing,
  };
}
