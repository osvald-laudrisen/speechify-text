import { useEffect, useState } from "react";

/**
 * Gets bounding boxes for an element. This is implemented for you
 */
export function getElementBounds(elem: HTMLElement) {
  const bounds = elem.getBoundingClientRect();
  const top = bounds.top + window.scrollY;
  const left = bounds.left + window.scrollX;

  return {
    x: left,
    y: top,
    top,
    left,
    width: bounds.width,
    height: bounds.height,
  };
}

/**
 * **TBD:** Implement a function that checks if a point is inside an element
 */
export function isPointInsideElement(
  coordinate: { x: number; y: number },
  element: HTMLElement
): boolean {
  const { left, width, top, height } = getElementBounds(element);
  if (coordinate.x >= left && coordinate.x <= left + width && coordinate.y >= top && coordinate.y <= top + height) {
    return true;
  }
  return false;
}

/**
 * **TBD:** Implement a function that returns the height of the first line of text in an element
 * We will later use this to size the HTML element that contains the hover player
 */
export function getLineHeightOfFirstLine(element: HTMLElement): number {
  const style = window.getComputedStyle(element);
  return Number(style.lineHeight);
}

export type HoveredElementInfo = {
  element: HTMLElement;
  top: number;
  left: number;
  heightOfFirstLine: number;
};

/**
 * **TBD:** Implement a React hook to be used to help to render hover player
 * Return the absolute coordinates on where to render the hover player
 * Returns null when there is no active hovered paragraph
 * Note: If using global event listeners, attach them window instead of document to ensure tests pass
 */
export function useHoveredParagraphCoordinate(
  parsedElements: HTMLElement[]
): HoveredElementInfo | null {
  const [hoveredElementInfo, setHoveredElementInfo] = useState<HoveredElementInfo | null>(null);

  const onMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    parsedElements.forEach((elem: HTMLElement) => {
      if (isPointInsideElement({ x: clientX, y: clientY }, elem)) {
        const { left, top } = getElementBounds(elem);
        setHoveredElementInfo({
          element: elem,
          left,
          top,
          heightOfFirstLine: getLineHeightOfFirstLine(elem)
        })
      }
    })
  }

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    }
  })
  
  return hoveredElementInfo;
}
