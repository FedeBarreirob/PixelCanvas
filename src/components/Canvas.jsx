import { useCallback, useEffect, useRef, useState } from "react"
import Options from "./Options"

export default function Canvas() {
    const BOXES_X = 100
    const canvasRef = useRef(null)

    const [selectedColor, setSelectedColor] = useState('red')
    const [openOptions, setOpenOptions] = useState(false)
    const [clickY, setPositionClickY] = useState()
    const [clickX, setPositionClickX] = useState()

    const [boxSize, setBoxSize] = useState(0);
    const [boxesY, setBoxesY] = useState(0);
    const [grid, setGrid] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const size = width / BOXES_X;
            const yCount = Math.floor(window.innerHeight / size);
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d");
            if (canvas) {
                canvas.width = width;
                canvas.height = yCount * size;
            }
            const initialGrid = Array.from({ length: yCount }, () =>
                Array(BOXES_X).fill("#ffffff")
            );
            setBoxSize(size);
            setBoxesY(yCount);
            setGrid(initialGrid);

            if (canvas && ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (let y = 0; y < yCount; y++) {
                    for (let x = 0; x < BOXES_X; x++) {
                        ctx.fillStyle = "#ffffff";
                        ctx.fillRect(x * size, y * size, size, size);
                        ctx.strokeStyle = "#dddddd";
                        ctx.strokeRect(x * size, y * size, size, size);
                    }
                }
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleClick = useCallback(
        (e) => {
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            const x = Math.floor((e.clientX - rect.left) / boxSize);
            const y = Math.floor((e.clientY - rect.top) / boxSize);

            const newGrid = [...grid];
            const newRow = [...newGrid[y]];
            newRow[x] = newRow[x] === selectedColor ? "#ffffff" : selectedColor;
            newGrid[y] = newRow;
            setGrid(newGrid);

            const ctx = canvas.getContext("2d");
            ctx.fillStyle = newRow[x];
            ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
            ctx.strokeStyle = "#dddddd";
            ctx.strokeRect(x * boxSize, y * boxSize, boxSize, boxSize);
        },
        [boxSize, grid, selectedColor]
    );

    const handleMouseDown = useCallback((e) => {
        if (e.button !== 0) return;
        setIsDrawing(true);
        handleClick(e);
    }, [handleClick]);

    const handleMouseUp = useCallback(() => {
        setIsDrawing(false);
    }, []);

    const handleRightClick = (e) => {
        e.preventDefault()
        setPositionClickY(e.pageY)
        setPositionClickX(e.pageX)
        setOpenOptions(true)
    }

    const handleDraw = useCallback((e) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / boxSize);
        const y = Math.floor((e.clientY - rect.top) / boxSize);
        if (x < 0 || y < 0 || x >= BOXES_X || y >= boxesY) return;
        if (grid[y][x] === selectedColor) return;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = selectedColor;
        ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
        ctx.strokeStyle = "#dddddd";
        ctx.strokeRect(x * boxSize, y * boxSize, boxSize, boxSize);
        const newRow = [...grid[y]];
        newRow[x] = selectedColor;
        const newGrid = [...grid];
        newGrid[y] = newRow;
        setGrid(newGrid);
    }, [isDrawing, grid, boxSize, selectedColor, boxesY]);


    return (
        <div onContextMenu={handleRightClick}>
            <Options open={openOptions} setOpen={setOpenOptions} pageX={clickX} pageY={clickY} setColor={setSelectedColor} />
            <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleDraw}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="border border-gray-400 block w-screen h-screen"
            />
        </div>
    )
}