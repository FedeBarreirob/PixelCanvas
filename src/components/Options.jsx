export default function Options({ open, pageY, pageX, setColor, setOpen }) {
    const COLORS = ["red", "blue", "green", "yellow", "brown"]
    return (
        <>
            {open && <div className="fade-in fade-out absolute w-25 h-25" style={{ left: pageX, top: pageY }}>
                <ul className="bg-gray-200 text-gray-800 px-4 py-3">
                    {COLORS.map((color) => <li className="hover:bg-gray-400 cursor-pointer" onClick={() => {
                        setColor(color)
                        setOpen(false)

                    }}>{color}</li>)}
                </ul>
            </div>}
        </>
    )
}