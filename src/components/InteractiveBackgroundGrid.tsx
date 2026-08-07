"use client";
import { useEffect, useRef } from "react";

export default function InteractiveBackgroundGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const gridSize = 40; // 40px grid squares
    let cols = Math.ceil(width / gridSize);
    let rows = Math.ceil(height / gridSize);

    // Grid cells state storing opacity intensity (0 to 1)
    const grid: number[][] = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => 0)
    );

    let mouseX = -1000;
    let mouseY = -1000;

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      cols = Math.ceil(width / gridSize);
      rows = Math.ceil(height / gridSize);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      const col = Math.floor(mouseX / gridSize);
      const row = Math.floor(mouseY / gridSize);

      if (row >= 0 && row < rows && col >= 0 && col < cols) {
        grid[row][col] = 1.0; // Light up cell instantly
        
        // Light up neighboring cells slightly for splash glow
        if (row > 0) grid[row - 1][col] = Math.max(grid[row - 1][col], 0.4);
        if (row < rows - 1) grid[row + 1][col] = Math.max(grid[row + 1][col], 0.4);
        if (col > 0) grid[row][col - 1] = Math.max(grid[row][col - 1], 0.4);
        if (col < cols - 1) grid[row][col + 1] = Math.max(grid[row][col + 1], 0.4);
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint base grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;

      for (let c = 0; c <= cols; c++) {
        ctx.beginPath();
        ctx.moveTo(c * gridSize, 0);
        ctx.lineTo(c * gridSize, height);
        ctx.stroke();
      }
      for (let r = 0; r <= rows; r++) {
        ctx.beginPath();
        ctx.moveTo(0, r * gridSize);
        ctx.lineTo(width, r * gridSize);
        ctx.stroke();
      }

      // Draw lit-up neon squares & fade them out
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (grid[r][c] > 0.01) {
            const alpha = grid[r][c];

            // Fill vibrant flame red glow
            ctx.fillStyle = `rgba(248, 69, 37, ${alpha * 0.45})`;
            ctx.fillRect(c * gridSize + 1, r * gridSize + 1, gridSize - 2, gridSize - 2);

            // Bright border stroke
            ctx.strokeStyle = `rgba(255, 120, 90, ${alpha * 0.8})`;
            ctx.lineWidth = 1;
            ctx.strokeRect(c * gridSize + 1, r * gridSize + 1, gridSize - 2, gridSize - 2);

            // Fade intensity down over time
            grid[r][c] *= 0.93;
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none w-full h-full"
    />
  );
}
