import React, { useState,useRef } from "react";
import CanvasDraw from "react-canvas-draw";

export default function Firma() {
  const [url, setUrl] = useState();

  const firstCanvas = useRef(null);

  const handleClick = () => {
    const data = firstCanvas.current.getSaveData();
    const exportURL = firstCanvas.current.getDataURL();
    setUrl(exportURL);
  };

  return (
    <div>
      <CanvasDraw
        brushRadius={1}
        canvasWidth={400}
        canvasHeight={150}
        hideGrid={true}
        catenaryColor="white"
        ref={firstCanvas}
        style={{ margin: "0 auto" }}
      />
      <img src={url} />
    </div>
  );
}
