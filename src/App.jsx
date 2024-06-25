import React, { useState } from 'react';
import './App.css';
import IconPicker from './IconPicker';
import feather from 'feather-icons';

const App = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Icon Picker</h1>
      <div
        onClick={() => setShowPicker(true)}
        className="w-24 h-24 border-2 bg-zinc-200 rounded-lg border-black flex items-center justify-center cursor-pointer"
      >
        {selectedIcon ? (
          <span dangerouslySetInnerHTML={{ __html: feather.icons[selectedIcon].toSvg() }} />
        ) : (
          'Select Icon'
        )}
      </div>
      {showPicker && (
        <div className="absolute z-50">
          <IconPicker
            rowsInOnePage={6}
            columnsInOnePage={8}
            iconHeight={50}
            iconWidth={50}
            onIconSelect={(icon) => {
              setSelectedIcon(icon);
              setShowPicker(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default App;
