import React from "react";

export default function Tooltip({ children, tooltipText }) {
    const tipRef = React.createRef(null);
    function handleMouseEnter() {
        tipRef.current.style.opacity = 1;
        tipRef.current.style.marginRight = "20px";
    }
    function handleMouseLeave() {
        tipRef.current.style.opacity = 0;
        tipRef.current.style.marginRight = "10px";
    }
    return (
        <div
            className="relative  flex items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="absolute w-96 whitespace-no-wrap bg-gradient-to-r from-black to-gray-700 text-white px-4 py-2 rounded flex items-center transition-all duration-150"
                style={{ left: "100%", opacity: 0 }}
                ref={tipRef}
            >
               
                {tooltipText}
            </div>
            {children}
        </div>
    );
}
