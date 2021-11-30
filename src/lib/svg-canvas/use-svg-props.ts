import React from "react";
import { useCanvasContext } from "./Context";
import { CanvasPath, Point, WriteSVGPoint } from "./types";
export function useSvgProps(props: { ref: React.Ref<SVGSVGElement> }) {
  const { strokeColor, strokeWidth, paths, isDrawing, dispatch } =
    useCanvasContext();
  let internalRef = React.useRef<SVGSVGElement | null>(null);
  let externalRef = props?.ref;
  // Refs for the canvas and the dynamically create SVG point
  const canvasRef = externalRef || internalRef;
  const pointRef = React.useRef<WriteSVGPoint | null>(null);
  // Is the user pinching to zoom?
  const [isZooming, setIsZooming] = React.useState(false);
  // Set point ref once we have the canvas
  React.useEffect(() => {
    if (canvasRef.current) {
      pointRef.current = canvasRef.current.createSVGPoint();
    }
  }, [canvasRef.current]);

  // get coordinate of current point in svg canvas
  function getCoordinates(pointerEvent: React.PointerEvent): Point {
    const scrollLeft = window.scrollX ?? 0;
    const scrollTop = window.scrollY ?? 0;
    let svgPoint = pointRef.current;
    if (!svgPoint) {
      return { x: 0, y: 0 };
    }
    svgPoint.x = pointerEvent.pageX - scrollLeft;
    svgPoint.y = pointerEvent.pageY - scrollTop;
    return svgPoint.matrixTransform(
      canvasRef.current?.getScreenCTM()?.inverse()
    );
  }

  // Detects pinch to zoom
  function handleTouchStart(event: React.TouchEvent): void {
    if (event.touches.length > 1) {
      setIsZooming(true);
    }
  }

  // Unsets pinch to zoom
  function handleTouchEnd(event: React.TouchEvent): void {
    setIsZooming(false);
  }

  function isLeftClick(event: React.PointerEvent): boolean {
    return event.buttons === 1;
  }

  function handlePointerDown(event: React.PointerEvent): void {
    if (isZooming || !isLeftClick(event)) return;
    const point = getCoordinates(event);

    dispatch({ type: "TOGGLE_DRAWING", isDrawing: true });
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const stroke: CanvasPath = {
      strokeColor,
      strokeWidth,
      paths: [point],
    };
    dispatch({ type: "SET_PATHS", paths: [...paths, stroke] });
  }

  function handlePointerUp(event: React.PointerEvent): void {
    if (isZooming || !isLeftClick(event)) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dispatch({ type: "TOGGLE_DRAWING", isDrawing: false });
  }

  function handlePointerMove(event: React.PointerEvent): void {
    if (!isDrawing || isZooming || !isLeftClick(event)) return;
    const point = getCoordinates(event);
    const newPaths = [...paths];
    const currentStroke = newPaths[newPaths.length - 1];
    currentStroke?.paths?.push(point);
    dispatch({ type: "SET_PATHS", paths: newPaths });
  }

  const SVGProps = {
    ref: canvasRef,
    onPointerDown: (e: React.PointerEvent) => handlePointerDown(e),
    onPointerUp: (e: React.PointerEvent) => handlePointerUp(e),
    onPointerMove: (e: React.PointerEvent) => handlePointerMove(e),
    onTouchStart: (e: React.TouchEvent) => handleTouchStart(e),
    onTouchEnd: (e: React.TouchEvent) => handleTouchEnd(e),
  };

  return SVGProps;
}
