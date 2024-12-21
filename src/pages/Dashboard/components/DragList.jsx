import React, { useState, useRef } from "react";
import "./DragList.css";

const DragList = () => {
const [translateY, setTranslateY] = useState(100); // Posição inicial (100% fora da tela)
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0); // Referência para a posição inicial

  const handleStart = (e) => {
    setIsDragging(true);
    startY.current = e.touches ? e.touches[0].clientY : e.clientY;
  };

  const handleMove = (e) => {
    if (!isDragging) return;

    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = currentY - startY.current;
    startY.current = currentY;

    setTranslateY((prev) => {
      const newTranslateY = Math.min(100, Math.max(0, prev + (deltaY / 4))); // Ajuste proporcional
      return newTranslateY;
    });
  };

  const handleEnd = () => {
    setIsDragging(false);

    // Decide a posição final: expandir ou recolher
    setTranslateY((prev) => (prev > 50 ? 100 : 0));
  };

  return (   
      <div
        className="bottom-element"
        style={{
          transform: `translateY(${translateY}%)`,
          transition: isDragging ? "none" : "transform 0.2s ease-in-out",
        }}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        onMouseUp={handleEnd}
        onTouchEnd={handleEnd}
        onMouseLeave={handleEnd}
      >
        <p>Arraste para cima ou para baixo!</p>
      </div>
  );
};

export default DragList;
