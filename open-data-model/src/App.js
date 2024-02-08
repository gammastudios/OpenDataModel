import React, { useState } from 'react';
import './App.css';

import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 100, y: 100 }, data: { label: 'Box 1' } },
  { id: '2', position: { x: 400, y: 100 }, data: { label: 'Box 2' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'step' },
];

function App() {
  const [nodes, setNodes , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [terminalText, setTerminalText] = useState(''); // Add this line to define terminalText

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  const handleTerminalChange = (event) => {
    setTerminalText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Find the node with id '1' and update its label
      const updatedNodes = nodes.map((node) => {
        if (node.id === '1') {
          return {
            ...node,
            data: { ...node.data, label: terminalText },
          };
        }
        return node;
      });

      setNodes(updatedNodes); // Update the nodes state with the modified node
      setTerminalText(''); // Clear the terminal input after updating the node label
    }
  };
  return (
    <div className="App">
      {/* Navbar at the top */}
      <div className="navbar bg-gray-800 text-white p-4">Navbar</div>
      
      {/* Working area below */}
      <div className="flex flex-1 min-h-0">
      {/* Left-hand bar simulating a Linux terminal */}        
      <div className="left-hand-bar w-1/4 bg-black text-white p-4">
          <textarea
            className="terminal-input"
            value={terminalText}
            onChange={handleTerminalChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your command..."
          />
        </div>      
        {/* React Flow canvas */}
        <div className="table-canvas flex-1 bg-gray-200 p-4 relative">
          <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
            >
              <MiniMap />
              <Controls />
              <Background />
            </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default App;