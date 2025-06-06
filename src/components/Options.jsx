import { useEffect, useState } from "react";

export default function Options({ open, pageY, pageX, setColor, setOpen }) {
    const COLOR_CLASSES = {
        red: "bg-red-500",
        blue: "bg-blue-500",
        green: "bg-green-500",
        yellow: "bg-yellow-500",
        black: "bg-black",
        custom: ""
    };
    const [RED, BLUE, GREEN, YELLOW, BLACK, CUSTOM] = ["red", "blue", "green", "yellow", "black", "custom"]
    const COLORS = [RED, BLUE, GREEN, YELLOW, BLACK, CUSTOM];
    const [isOpened, setIsOpened] = useState(open);

    useEffect(() => {
        if (open) {
            setIsOpened(true);
        } else if (open === false) {
            setTimeout(() => {
                setIsOpened(false);
            }, 200);
        }
    }, [open]);

    return (
        <>
            {isOpened && (
                <div className={`absolute ${open ? "fade-in" : "fade-out"}`} style={{ left: pageX, top: pageY }}>
                    <div className="bg-white rounded-lg shadow-xl p-2 sm:p-3 flex flex-wrap gap-2 items-center sm:gap-3 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                        {COLORS.map((color) => (
                            <div
                                key={color}
                                className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full cursor-pointer transition-transform duration-200 transform hover:scale-110 border-2 border-transparent hover:border-gray-300 ${COLOR_CLASSES[color]}`}
                                style={color === "custom" ? { backgroundImage: "linear-gradient(to right, #ff0080, #ff8c00, #ffed00, #00ff80, #00bfff, #8a2be2)", position: "relative", overflow: "hidden" } : {}}
                                onClick={() => {
                                    setColor(color);
                                    setOpen(false);
                                }}
                            >
                                {color === "custom" && (
                                    <input
                                        type="color"
                                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                        onClick={(e) => e.stopPropagation()}
                                        onChange={(e) => {
                                            setColor(e.target.value);
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                        <div
                            className="w-8 h-8 sm:w-10 sm:h-10 scale-110 rounded-full cursor-pointer transition-transform duration-200 transform hover:scale-130 border-2 border-transparent hover:border-gray-300"
                            onClick={() => {
                                setColor("white");
                                setOpen(false);
                            }}
                        >
                            <img src="/eraser.webp" alt="eraser" />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}