import { useEffect, useState, MouseEvent, useRef } from "react";
import "./rectangle.scss";
import Image from "next/image";

type RectangleProps = {
  id: string;
  top: number;
  left: number;
  img: string;
  onMouseDown: (id: string) => void;
};

const Rectangle = (props: RectangleProps) => {
  console.log(1);
  const { id, top, left, onMouseDown } = props;
  const refEl = useRef<HTMLImageElement>(null);

  const [style, setStyle] = useState({ top: `0px`, left: `0px` });

  const [isAnimated, setIsAnimated] = useState(true);

  useEffect(() => {
    const { width, height } = refEl.current!.getBoundingClientRect();
    const topEl = top - height / 2;
    const leftEl = left - width / 2;
    const _top = topEl < 0 ? 0 : topEl;
    const _left = leftEl < 0 ? 0 : leftEl;

    setStyle({ top: `${_top}px`, left: `${_left}px` });

    setTimeout(() => {
      setIsAnimated(false);
    }, 300);
  }, [top, left]);

  return (
    <Image
      src={props.img}
      alt="rectangle"
      className={`rectangle ${isAnimated ? "animated" : ""}`}
      width={100}
      height={100}
      style={style}
      draggable="false"
      onMouseDownCapture={(event) => onMouseDown(id)}
      ref={refEl}
    ></Image>
  );
};
export default Rectangle;
