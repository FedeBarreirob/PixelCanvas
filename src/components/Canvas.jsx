import { useEffect, useRef, useState } from "react"
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

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const size = width / BOXES_X;
            const yCount = Math.floor(window.innerHeight / size);
        
            const canvas = canvasRef.current;
            canvas.width = width;
            canvas.height = yCount * size;
        
            const initialGrid = Array(yCount)
                .fill(null)
                .map(() => Array(BOXES_X).fill("#ffffff"));
        
            setBoxSize(size);
            setBoxesY(yCount);
            setGrid(initialGrid);
        };
        

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    useEffect(() => {
        if (!grid.length) return;
        console.log('llega a useeffect boxesy', boxesY);
        console.log('boxsize', boxSize);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        for (let y = 0; y < boxesY; y++) {
            for (let x = 0; x < BOXES_X; x++) {
                ctx.fillStyle = grid[y][x];
                ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
                ctx.strokeStyle = "#dddddd";
                ctx.strokeRect(x * boxSize, y * boxSize, boxSize, boxSize);
            }
        }
    }, [grid, boxSize, boxesY]);

    const handleClick = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        const x = Math.floor((e.clientX - rect.left) / boxSize);
        const y = Math.floor((e.clientY - rect.top) / boxSize);

        const newGrid = grid.map((row, yi) =>
            row.map((color, xi) => {
                let newColor;
                if ((xi === x && yi === y) && color === selectedColor) {
                    newColor = '#ffffff';
                } else {
                    newColor = selectedColor;
                }
                return (xi === x && yi === y) ? newColor : color;
            })
        );
        setGrid(newGrid);
    };



    const handleRightClick = (e) => {
        e.preventDefault()
        setPositionClickY(e.pageY)
        setPositionClickX(e.pageX)
        setOpenOptions(true)
    }

    return (
        <div onContextMenu={handleRightClick}>
            <Options open={openOptions} setOpen={setOpenOptions} pageX={clickX} pageY={clickY} setColor={setSelectedColor} />

            <canvas
                ref={canvasRef}
                onClick={handleClick}
                className="border border-gray-400 block"
            />

        </div>
    )
}