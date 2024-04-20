import React, { useState } from "react";
import "../../styling/colorSelector.css";

const ColorSelector = () => {
    const [selectedColor, setSelectedColor] = useState("");

    const handleColorSelection = (color) => {
        setSelectedColor(color);
    };

    return (
        <div className="wrapper-outter">
            <div className="material-intro">
                <h2>Color</h2>
                <div className="selection">
                    <div className={`selected-swatch ${selectedColor}`}></div>
                    
                </div>
            </div>

            <div className="swatches">
                <div
                    className="color-swatch"
                    onClick={() => handleColorSelection("black")}
                >
                    <div className="swatch black"></div>
                    <div>Black</div>
                </div>
                <div
                    className="color-swatch"
                    onClick={() => handleColorSelection("red")}
                >
                    <div className="swatch red"></div>
                    <div>Red</div>
                </div>
                <div
                    className="color-swatch"
                    onClick={() => handleColorSelection("white")}
                >
                    <div className="swatch white"></div>
                    <div>White</div>
                </div>
                <div
                    className="color-swatch"
                    onClick={() => handleColorSelection("yellow")}
                >
                    <div className="swatch yellow"></div>
                    <div>Yellow</div>
                </div>
                <div
                    className="color-swatch"
                    onClick={() => handleColorSelection("blue")}
                >
                    <div className="swatch blue"></div>
                    <div>Blue</div>
                </div>
               
                <div
                    className="color-swatch"
                    onClick={() => handleColorSelection("green")}
                >
                    <div className="swatch green"></div>
                    <div>Green</div>
                </div>
                <div
                    className="color-swatch"
                    onClick={() => handleColorSelection("orange")}
                >
                    <div className="swatch orange"></div>
                    <div>Orange</div>
                </div>
                <div
                    className="color-swatch"
                    onClick={() => handleColorSelection("purple")}
                >
                    <div className="swatch purple"></div>
                    <div>Purple</div>
                </div>
                <div
                    className="color-swatch"
                    onClick={() => handleColorSelection("silver")}
                >
                    <div className="swatch silver"></div>
                    <div>Silver</div>
                </div>
                <div
                    className="color-swatch"
                    onClick={() => handleColorSelection("violet")}
                >
                    <div className="swatch violet"></div>
                    <div>Violet</div>
                </div>
            </div>
        </div>
    );
};

export default ColorSelector;
