const COLOR_CLASSES = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    black: "bg-black",
    custom: ""
};

export default function Options({ open, pageY, pageX, setColor, setOpen }) {
    const COLORS = ["red", "blue", "green", "yellow", "black", "custom"]
    return (
        <>
            {open && <div className="fade-in fade-out absolute" style={{ left: pageX, top: pageY }}>
                <div className="bg-white rounded-lg shadow-xl p-3 flex gap-3">
                    {COLORS.map((color) => (
                        <div
                            key={color}
                            className={`w-10 h-10 rounded-full cursor-pointer transition-transform duration-200 transform hover:scale-110 border-2 border-transparent hover:border-gray-300 ${COLOR_CLASSES[color]}`}
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
                </div>
            </div>}

        </>
    )
}