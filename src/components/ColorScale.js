import React from 'react';

const colorArray = [ "#C7E7D8", "#9ACDB8", "#7BBD9F", "#5F9F80", "#3D7E5D", "#2A634B"];

const ColorScale = () => {
  return (
    <div className="color-scale">
      <div className="emojis">🌱</div>
      {colorArray.map((color, index) => (
        <div
          key={index}
          className="color-scale-item "
          style={{ backgroundColor: color }}
        />
      ))}
      <div className="emojis">🌳</div>
    </div>
  );
};

export default ColorScale;
