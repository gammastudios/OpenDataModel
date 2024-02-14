import React, { useState, useEffect, useMemo } from 'react';
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
import yaml from 'js-yaml'

// const initialNodes = [
//   { id: '1', position: { x: 100, y: 100 }, data: { label: 'Box 1' } },
//   { id: '2', position: { x: 400, y: 100 }, data: { label: 'Box 2' } },
// ];

// const initialEdges = [
//   { id: 'e1-2', source: '1', target: '2', type: 'step' },
// ];

function App() {
  const [yamlContent, setYamlContent] = useState('');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [terminalText, setTerminalText] = useState(''); 

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  useEffect(() => {
    fetch('/file.yaml')
      .then((response) => response.text())
      .then((text) => {
        setTerminalText(text)
        setYamlContent(text);
      });
  }, []);

  const parsedNodes = useMemo(() => {
    if (!yamlContent) return [];
    const yamlObj = yaml.load(yamlContent);
    return Object.keys(yamlObj).map((key, index) => {
      const table = yamlObj[key];
      const fields = Object.entries(table.fields)
        .map(([fieldName, fieldType]) => `${fieldName}: ${fieldType}`)
        .join('\n');
      const label = `${table.name}\n${fields}`;
      return {
        id: key,
        position: { x: index * 150, y: index * 50 },
        data: { label },
        type: 'default',
      };
    });
  }, [yamlContent]);

  useEffect(() => {
    setNodes(parsedNodes);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedNodes])

  const handleTerminalChange = (event) => {
    setTerminalText(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTerminalText(e.target.result);
      };
      reader.readAsText(file);
    }
  }

  // const saveFile = () => {
  //   const blob = new Blob([terminalText], { type: 'text/plain'});
  //   const href = URL.createObjectURL(blob)
  //   const link = document.createElement('a');
  //   link.href = href;
  //   link.download = "file.yaml";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link)
  // }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Find the node with id '1' and update its label
      // const updatedNodes = nodes.map((node) => {
      //   if (node.id === '1') {
      //     return {
      //       ...node,
      //       data: { ...node.data, label: terminalText },
      //     };
      //   }
      //   return node;
      // });

      // setNodes(updatedNodes); // Update the nodes state with the modified node
      setTerminalText(''); // Clear the terminal input after updating the node label
    }
  };
  return (
    <div className="App">
      
      {/* <button onClick={saveFile}>Save</button> */}
      {/* Navbar at the top */}
      <div className="navbar bg-gray-800 text-white p-4">
        <input type="file" onChange={handleFileChange} />
        Navbar</div>
      
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