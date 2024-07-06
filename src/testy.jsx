import { useCallback } from "react";
import { useDraggable } from "./hooks/useDraggable";

const quickAndDirtyStyle = {
  width: "200px",
  height: "200px",
  background: "#FF9900",
  color: "#FFFFFF",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

export const DraggableComponent = () => {
  const handleDrag = useCallback(
    ({ x, y }) => ({
      x: Math.max(0, x),
      y: Math.max(0, y)
    }),
    []
  );

  const [ref, pressed] = useDraggable({onDrag: handleDrag});

  return (
    <div ref={ref} style={quickAndDirtyStyle}>
      <p>{pressed ? "Dragging..." : "Press to drag"}</p>
    </div>
  );
};