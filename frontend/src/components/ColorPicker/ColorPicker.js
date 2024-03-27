import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

const ColorPicker = () => {
  const [color, setColor] = useState({ red: 0, green: 0, blue: 0 });
  const [currentColor, setCurrentColor] = useState({ red: 0, green: 0, blue: 0 });

  const handleColorChange = () => {
    socket.emit('colorChange', color);
  };

  useEffect(() => {
    const updateCurrentColor = (newColor) => setCurrentColor(newColor);
    socket.on('currentColor', updateCurrentColor);

    return () => {
      socket.off('currentColor', updateCurrentColor);
    };
  }, []);

  return (
    <div>
      <h1>ESP Color Picker</h1>
      <div>
        <label htmlFor="red">Red:</label>
        <input
          type="range"
          id="red"
          min="0"
          max="255"
          value={color.red}
          onChange={(e) => setColor({ ...color, red: parseInt(e.target.value) })}
        />
        {color.red}
      </div>
      <div>
        <label htmlFor="green">Green:</label>
        <input
          type="range"
          id="green"
          min="0"
          max="255"
          value={color.green}
          onChange={(e) => setColor({ ...color, green: parseInt(e.target.value) })}
        />
        {color.green}
      </div>
      <div>
        <label htmlFor="blue">Blue:</label>
        <input
          type="range"
          id="blue"
          min="0"
          max="255"
          value={color.blue}
          onChange={(e) => setColor({ ...color, blue: parseInt(e.target.value) })}
        />
        {color.blue}
      </div>
      <button onClick={handleColorChange}>Change Color</button>

      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: `rgb(${currentColor.red}, ${currentColor.green}, ${currentColor.blue})`,
          marginTop: '20px',
        }}
      ></div>
    </div>
  );
};

export default ColorPicker;