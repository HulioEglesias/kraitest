import DefaultLayout from "@/layouts/default";
import Rectangle from "@/components/rectangle";
import { DependencyList, useEffect, useRef, useState, MouseEvent } from "react";
import { v4 as uuidv4 } from "uuid";

import "./game.scss";

type RectElement = {
  id: string;
  img: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

const imageSrc = require("@/assets/logo.png");

const GamePage = () => {
  const [elements, setElements] = useState<RectElement[]>([]);
  const [draggedElementId, setDraggedElementId] = useState<string | null>(null);

  const gameElement = useRef<HTMLDivElement>(null);

  const moveElementById = (id: string, x: number, y: number) => {
    const index = elements.findIndex((el) => el.id === id);
    if (index === -1) return;
    const [removed] = elements.splice(index, 1);
    const movingElement = { ...removed, x, y };
    setElements([...elements, movingElement]);
  };

  const onMouseDown = (id: string) => {
    console.log("onMouseDown");
    setDraggedElementId(id);
  };
  const onMouseUp = () => {
    console.log("onMouseUp");
    setTimeout(() => setDraggedElementId(null));
  };

  const normalizeCoords = (
    areaElement: HTMLDivElement,
    targetElement: RectElement
  ) => {
    const gameRect = areaElement.getBoundingClientRect();
    // console.log(gameRect.right);
    const targetRect = targetElement;
    const resultTargetBounds = {
      x: targetRect.x < gameRect.x ? gameRect.x : targetRect.x,
      y:
        targetRect.y - targetRect.height / 2 < gameRect.y
          ? gameRect.y + targetRect.height / 2
          : targetRect.y,
    };
    if (targetRect.x + targetRect.width / 2 > gameRect.right) {
      resultTargetBounds.x = gameRect.right - targetRect.width / 2;
    }
    if (targetRect.y + targetRect.height / 2 > gameRect.bottom) {
      resultTargetBounds.y = gameRect.bottom - targetRect.height / 2;
    }
    return {
      ...resultTargetBounds,
    };
  };

  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (!draggedElementId) return;
    console.log("onMouseMove");
    const { clientX, clientY } = event;
    const coords = normalizeCoords(gameElement.current!, {
      id: draggedElementId,
      img: imageSrc,
      x: clientX,
      y: clientY,
      width: 100,
      height: 100,
    });
    moveElementById(draggedElementId, coords.x, coords.y);
  };

  const createRect = (e: MouseEvent<HTMLElement>) => {
    if (draggedElementId) return;
    const { clientX, clientY } = e;
    setElements([
      ...elements,
      {
        id: uuidv4(),
        img: imageSrc,
        x: clientX,
        y: clientY,
        width: 100,
        height: 100,
      },
    ]);
  };

  let isAnimate = useRef(false);

  const requestFrame = () => {
    let resultElements = [...elements];
    elements.forEach((el) => {
      const coords = normalizeCoords(gameElement.current!, el);

      const index = elements.findIndex((_el) => _el.id === el.id);
      if (index === -1) return;
      const [removed] = elements.slice(index, index + 1);
      const movingElement = { ...removed, x: coords.x, y: coords.y };
      resultElements[index] = movingElement;
    });

    setElements(resultElements);
    isAnimate.current = false;
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      // console.log("resize", elements);
      isAnimate.current = true;
      window.requestAnimationFrame(requestFrame);
    });
  });

  return (
    <DefaultLayout>
      <div
        className="game"
        onClick={createRect}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        ref={gameElement}
      >
        {elements.map((el) => (
          <Rectangle
            id={el.id}
            img={imageSrc}
            key={el.id}
            top={el.y}
            left={el.x}
            onMouseDown={onMouseDown}
          />
        ))}
      </div>
    </DefaultLayout>
  );
};
export default GamePage;
