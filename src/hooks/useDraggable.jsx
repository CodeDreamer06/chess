import { useRef, useState, useEffect, useCallback } from "react";
import { throttle } from '../utils/throttle';

const id = (x) => x;
export const useDraggable = ({ onDrag = id } = {}) => {
  const [pressed, setPressed] = useState(false);
  const position = useRef({ x: 0, y: 0 });
  const ref = useRef();
  const unsubscribe = useRef();
  const legacyRef = useCallback(elem => {  
    ref.current = elem;
    if (unsubscribe.current) unsubscribe.current();
    if (!elem) return;
    const handleMouseDown = e => {
      e.target.style.userSelect = "none";
      e.target.style.cursor = "grabbing";
      setPressed(true);
    };
    elem.addEventListener("mousedown", handleMouseDown);
    unsubscribe.current = () => {
      elem.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  useEffect(() => {
    if (!pressed) return
    const handleMouseMove = throttle(event => {
      if (!ref.current || !position.current) return;
      const pos = position.current;
      const elem = ref.current;
      position.current = onDrag({
        x: pos.x + event.movementX,
        y: pos.y + event.movementY
      });
      elem.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    });
    const handleMouseUp = ({ target }) => {
      target.style.userSelect = "auto";
      target.style.cursor = "grab";
      setPressed(false);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      handleMouseMove.cancel();
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [pressed, onDrag]);

  return [legacyRef, pressed];
};