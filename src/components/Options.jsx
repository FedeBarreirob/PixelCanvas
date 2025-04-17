const COLOR_CLASSES = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    black: "bg-black",
};

export default function Options({ open, pageY, pageX, setColor, setOpen }) {
    const COLORS = ["red", "blue", "green", "yellow", "black"]
    return (
        <>
            {open && <div className="fade-in fade-out absolute" style={{ left: pageX, top: pageY }}>
                <div className="bg-white rounded-lg shadow-xl p-3 flex gap-3">
                    {COLORS.map((color) =>
                        <div key={color}
                            className={`w-10 h-10 rounded-full cursor-pointer transition-transform duration-200 transform hover:scale-110 border-2 border-transparent hover:border-gray-300 ${COLOR_CLASSES[color]}`}
                            onClick={() => {
                                setColor(color)
                                setOpen(false)
                            }}>
                        </div>)}
                </div>
            </div>}
        </>
    )
}