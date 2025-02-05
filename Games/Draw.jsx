import React, { useState, useRef } from "react";

function Draw() {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("black");
  const [width, setWidth] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  const startDrawing = (e) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;
    setLastPosition({ x: offsetX, y: offsetY });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const drawing = (e) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = e.nativeEvent;
    const ctx = canvasRef.current.getContext("2d");

    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();

    setLastPosition({ x: offsetX, y: offsetY });
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    
    // Create an anchor tag to download the image
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "drawing.png";
    link.click();
  };

  return (
    <>
      <nav style={{ width: "100%", height: "70px", background: "black" }}>
        <input
          onChange={(e) => setColor(e.target.value)}
          className="colorPicker"
          type="color"
          style={{ width: "100px", height: "50px" }}
        />
        <input
          onChange={(e) => setWidth(e.target.value)}
          className="widthPicker"
          type="number"
          style={{ width: "100px", height: "40px", margin: "0", padding: "0" }}
        />
        <button onClick={saveDrawing} style={{ padding: "10px", background: "green", color: "white" }}>Save Drawing</button>
      </nav>
      <div
        className="Canvas"
        style={{ width: "100%", height: "100vh", position: "relative" }}
      >
        <canvas
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={drawing}
          style={{ border: "1px solid black", cursor: "crosshair" }}
        />
      </div>
    </>
  );
}

export default Draw;
