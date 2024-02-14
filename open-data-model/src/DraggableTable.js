import React from 'react';
import Draggable from 'react-draggable';

const DraggableTable = ({ name }) => {
  return (
    <Draggable>
      <div className="w-24 h-24 bg-white p-4 shadow rounded cursor-default flex items-center justify-center hover:shadow-lg">
        <p>{name}</p>
      </div>
    </Draggable>
  );
};

export default DraggableTable;