import React, { useState } from 'react';
import './App.css';
import Draggable from 'react-draggable';

// Draggable Table Component
const DraggableTable = ({ id, onDrag, children }) => {
  return (
    <Draggable onStop={(e, data) => onDrag(id, data.lastX, data.lastY)}>
      <div className="w-24 h-24 bg-white p-4 shadow rounded cursor-move flex items-center justify-center">
        {children}
      </div>
    </Draggable>
  );
};

// App Component
const App = () => {
  // Initial positions for the tables
  const [positions, setPositions] = useState({
    table1: { x: 50, y: 50 },
    table2: { x: 300, y: 150 }
  });

  // Update position for a specific table
  const handleDrag = (id, x, y) => {
    setPositions(prevPositions => ({
      ...prevPositions,
      [id]: { x, y }
    }));
  };

  return (
    <div className="App">
      {/* Navbar at the top */}
      <div className="navbar bg-gray-800 text-white p-4">Navbar</div>
      
      {/* Working area below */}
      <div className="flex flex-1 min-h-0">
        {/* Left-hand bar with black background and 25% viewport */}
        <div className="left-hand-bar w-1/4 bg-black text-white p-4">Left Hand Bar</div>
        
        {/* Draggable table canvas */}
        <div className="table-canvas flex-1 bg-gray-200 p-4 relative">
          <DraggableTable id="table1" onDrag={handleDrag}>
            Table 1
          </DraggableTable>
          <DraggableTable id="table2" onDrag={handleDrag}>
            Table 2
          </DraggableTable>
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <line
              x1={positions.table1.x + 50} // Assuming the table is 100x100, +50 centers the line
              y1={positions.table1.y + 50}
              x2={positions.table2.x + 100}
              y2={positions.table2.y + 100}
              stroke="black"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default App;