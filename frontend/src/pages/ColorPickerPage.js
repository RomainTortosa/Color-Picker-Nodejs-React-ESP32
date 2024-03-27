import React from 'react';
import ColorPicker from '../components/ColorPicker/ColorPicker';
import RandomColor from '../components/ColorPicker/RandomColor';

const ColorPickerPage = () => {
  return (
    <div>
      <ColorPicker />
      <RandomColor />
    </div>
  );
};

export default ColorPickerPage;