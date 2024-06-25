import React, { useState, useEffect } from 'react';
import feather from 'feather-icons';

const IconPicker = ({
  rowsInOnePage,
  columnsInOnePage,
  iconHeight,
  iconWidth,
  pickerHeight = '500px',
  pickerWidth = '500px',
  onIconSelect,
}) => {
  const [icons, setIcons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const iconKeys = Object.keys(feather.icons);
    setIcons(iconKeys);
  }, []);

  const filteredIcons = icons.filter((icon) =>
    icon.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const iconsPerPage = rowsInOnePage * columnsInOnePage;
  const totalPages = Math.ceil(filteredIcons.length / iconsPerPage);

  const handleIconClick = (icon) => {
    onIconSelect(icon);
  };

  return (
    <div
      className="flex flex-col overflow-hidden border border-gray-300 rounded-md bg-white"
      style={{ height: pickerHeight, width: pickerWidth }}
    >
      <div className="p-2">
        <input
          type="text"
          className="w-full p-2 border focus:outline-none focus:ring-2 border-gray-300 rounded-md"
          placeholder="Search icons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <div
          className="grid gap-2"
          style={{
            gridTemplateRows: `repeat(${rowsInOnePage}, ${iconHeight}px)`,
            gridTemplateColumns: `repeat(${columnsInOnePage}, ${iconWidth}px)`,
          }}
        >
          {filteredIcons
            .slice(currentPage * iconsPerPage, (currentPage + 1) * iconsPerPage)
            .map((icon) => (
              <div
                key={icon}
                className="relative flex items-center justify-center cursor-pointer hover:bg-gray-200 rounded-lg"
                style={{ width: iconWidth, height: iconHeight }}
                onClick={() => handleIconClick(icon)}
              >
                <div
                  className="absolute z-50 -top-5 left-0 w-full rounded bg-black text-white text-xs text-center "
                  style={{ display: 'none' }}
                >
                  {icon}
                </div>
                <span
                  className="flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: feather.icons[icon].toSvg() }}
                  onMouseEnter={(e) => (e.currentTarget.previousSibling.style.display = 'block')}
                  onMouseLeave={(e) => (e.currentTarget.previousSibling.style.display = 'none')}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="flex justify-center p-2">
        <button
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-800 hover:text-white transition-all disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span className="mx-4">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-800 transition-all hover:text-white disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default IconPicker;
