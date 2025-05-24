import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './App.css';

const ElectionVisualizationRedesign = () => {
  const [viewMode, setViewMode] = useState('treemap');
  const [showOriginalFlaws, setShowOriginalFlaws] = useState(false);

  // Dados simulados da eleição 2016 (estados selecionados para demonstração)
  const electionData = [
    { state: 'California', electoralVotes: 55, winner: 'Democrat', margin: 30.1, population: 39538223, area: 163696 },
    { state: 'Texas', electoralVotes: 38, winner: 'Republican', margin: 9.0, population: 29145505, area: 268596 },
    { state: 'Florida', electoralVotes: 29, winner: 'Republican', margin: 1.2, population: 21538187, area: 65758 },
    { state: 'New York', electoralVotes: 29, winner: 'Democrat', margin: 22.5, population: 20201249, area: 54555 },
    { state: 'Pennsylvania', electoralVotes: 20, winner: 'Republican', margin: 0.7, population: 13002700, area: 46054 },
    { state: 'Illinois', electoralVotes: 20, winner: 'Democrat', margin: 17.1, population: 12812508, area: 57914 },
    { state: 'Ohio', electoralVotes: 18, winner: 'Republican', margin: 8.1, population: 11799448, area: 44826 },
    { state: 'Georgia', electoralVotes: 16, winner: 'Republican', margin: 5.1, population: 10711908, area: 59425 },
    { state: 'Michigan', electoralVotes: 16, winner: 'Republican', margin: 0.3, population: 10037261, area: 96714 },
    { state: 'North Carolina', electoralVotes: 15, winner: 'Republican', margin: 3.6, population: 10439388, area: 53819 },
    { state: 'Arizona', electoralVotes: 11, winner: 'Republican', margin: 3.5, population: 7151502, area: 113990 },
    { state: 'Wisconsin', electoralVotes: 10, winner: 'Republican', margin: 0.8, population: 5893718, area: 65496 },
    { state: 'Colorado', electoralVotes: 9, winner: 'Democrat', margin: 4.9, population: 5773714, area: 104094 },
    { state: 'Minnesota', electoralVotes: 10, winner: 'Democrat', margin: 1.5, population: 5737915, area: 86936 },
    { state: 'Nevada', electoralVotes: 6, winner: 'Democrat', margin: 2.4, population: 3104614, area: 110572 },
    { state: 'Wyoming', electoralVotes: 3, winner: 'Republican', margin: 46.3, population: 576851, area: 97813 },
    { state: 'Vermont', electoralVotes: 3, winner: 'Democrat', margin: 26.4, population: 643077, area: 9616 },
    { state: 'Delaware', electoralVotes: 3, winner: 'Democrat', margin: 11.4, population: 989948, area: 2489 }
  ];

  const totalElectoral = electionData.reduce((sum, state) => sum + state.electoralVotes, 0);
  const republicanTotal = electionData.filter(s => s.winner === 'Republican').reduce((sum, state) => sum + state.electoralVotes, 0);
  const democratTotal = totalElectoral - republicanTotal;

  const getColor = (state) => {
    const intensity = Math.min(Math.abs(state.margin) / 50, 1);
    if (state.winner === 'Republican') {
      return `rgba(220, 38, 38, ${0.3 + intensity * 0.7})`;
    } else {
      return `rgba(37, 99, 235, ${0.3 + intensity * 0.7})`;
    }

  
  };

  const TreemapCell = ({ state, x, y, width, height }) => (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={getColor(state)}
        stroke="#fff"
        strokeWidth={1}
        className="hover:opacity-80 transition-opacity cursor-pointer"
      />
      <text
        x={x + width/2}
        y={y + height/2 - 8}
        textAnchor="middle"
        fontSize={width > 80 ? "12px" : width > 40 ? "10px" : "8px"}
        fill="#000"
        fontWeight="bold"
      >
        {state.state}
      </text>
      <text
        x={x + width/2}
        y={y + height/2 + 6}
        textAnchor="middle"
        fontSize={width > 80 ? "10px" : width > 40 ? "8px" : "6px"}
        fill="#000"
      >
        {state.electoralVotes} votos
      </text>
      <text
        x={x + width/2}
        y={y + height/2 + 18}
        textAnchor="middle"
        fontSize={width > 80 ? "8px" : width > 40 ? "6px" : "4px"}
        fill="#000"
      >
        {state.margin.toFixed(1)}%
      </text>
    </g>
  );

  const TreemapVisualization = () => {
    const sortedData = [...electionData].sort((a, b) => b.electoralVotes - a.electoralVotes);
    const positions = [];
    let currentX = 10, currentY = 10;
    let currentRowHeight = 0;
    const containerWidth = 800;
    
    sortedData.forEach(state => {
      const area = state.electoralVotes * 8; // Scaling factor
      const width = Math.sqrt(area * 1.5);
      const height = area / width;
      
      if (currentX + width > containerWidth - 10) {
        currentX = 10;
        currentY += currentRowHeight + 5;
        currentRowHeight = 0;
      }
      
      positions.push({
        ...state,
        x: currentX,
        y: currentY,
        width: width,
        height: height
      });
      
      currentX += width + 5;
      currentRowHeight = Math.max(currentRowHeight, height);
    });

    return (
      <div className="w-full">
        <svg width="800" height="400" className="border border-gray-300">
          {positions.map((state, i) => (
            <TreemapCell
              key={i}
              state={state}
              x={state.x}
              y={state.y}
              width={state.width}
              height={state.height}
            />
          ))}
        </svg>
      </div>
    );
  };

  const OriginalFlawsDemo = () => (
    <div className="bg-red-50 p-6 rounded-lg border border-red-200">
      <h3 className="text-lg font-bold text-red-800 mb-4">Demonstração das Falhas do Mapa Original</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-4 rounded border">
          <h4 className="font-semibold text-red-700">Falha: Dominância Visual Enganosa</h4>
          <p className="text-sm text-gray-700 mt-2">
            Wyoming (área: 97,813 mi²) tem apenas 3 votos eleitorais, mas visualmente domina 
            Delaware (área: 2,489 mi²) que também tem 3 votos eleitorais.
          </p>
          <div className="mt-2 flex gap-2">
            <div className="bg-red-300 px-2 py-1 text-xs">Wyoming: 97,813 mi² = 3 votos</div>
            <div className="bg-blue-300 px-2 py-1 text-xs">Delaware: 2,489 mi² = 3 votos</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded border">
          <h4 className="font-semibold text-red-700">Falha: Perda de Informação</h4>
          <p className="text-sm text-gray-700 mt-2">
            Margens de vitória são perdidas. Pennsylvania (0.7%) aparece igual ao Wyoming (46.3%).
          </p>
          <div className="mt-2">
            <div className="bg-red-200 px-2 py-1 text-xs mb-1">Pennsylvania: 0.7% (20 votos)</div>
            <div className="bg-red-400 px-2 py-1 text-xs">Wyoming: 46.3% (3 votos)</div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-100 p-3 rounded">
        <p className="text-sm text-yellow-800">
          <strong>Resultado:</strong> O mapa tradicional pode fazer parecer uma "vitória esmagadora" 
          republicana quando na verdade a eleição foi muito disputada em estados-chave.
        </p>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Redesign de Visualização: Eleição Presidencial 2016
      </h1>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <button
          onClick={() => setViewMode('treemap')}
          className={`px-4 py-2 rounded font-medium transition-colors ${
            viewMode === 'treemap' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Treemap Proporcional
        </button>
        <button
          onClick={() => setViewMode('bar')}
          className={`px-4 py-2 rounded font-medium transition-colors ${
            viewMode === 'bar' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Gráfico de Barras
        </button>
        <button
          onClick={() => setShowOriginalFlaws(!showOriginalFlaws)}
          className={`px-4 py-2 rounded font-medium transition-colors ${
            showOriginalFlaws 
              ? 'bg-red-600 text-white' 
              : 'bg-red-200 text-red-700 hover:bg-red-300'
          }`}
        >
          {showOriginalFlaws ? 'Ocultar' : 'Mostrar'} Falhas do Original
        </button>
      </div>

      {/* Results Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-red-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-600">{republicanTotal}</div>
          <div className="text-sm text-red-800">Votos Eleitorais Republicanos</div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-gray-600">{totalElectoral}</div>
          <div className="text-sm text-gray-800">Total de Votos Eleitorais</div>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{democratTotal}</div>
          <div className="text-sm text-blue-800">Votos Eleitorais Democratas</div>
        </div>
      </div>

      {/* Show Original Flaws */}
      {showOriginalFlaws && <OriginalFlawsDemo />}

      {/* Main Visualization */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {viewMode === 'treemap' ? 'Treemap Proporcional aos Votos Eleitorais' : 'Distribuição por Votos Eleitorais'}
        </h2>
        
        {viewMode === 'treemap' ? (
          <div className="flex justify-center">
            <TreemapVisualization />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={electionData.sort((a, b) => b.electoralVotes - a.electoralVotes)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="state" 
                angle={-45} 
                textAnchor="end" 
                height={100}
                fontSize={12}
              />
              <YAxis />
              <Tooltip 
                formatter={(value, name, props) => [
                  `${value} votos eleitorais`,
                  `${props.payload.winner} +${props.payload.margin.toFixed(1)}%`
                ]}
              />
              <Bar dataKey="electoralVotes">
                {electionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(entry)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Improvements Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="text-lg font-bold text-green-800 mb-4">✅ Melhorias Implementadas</h3>
          <ul className="space-y-2 text-sm text-green-700">
            <li><strong>Proporcionalidade:</strong> Tamanho = Importância eleitoral real</li>
            <li><strong>Margem Visível:</strong> Intensidade de cor mostra competitividade</li>
            <li><strong>Informação Completa:</strong> Números de votos eleitorais visíveis</li>
            <li><strong>Contexto Claro:</strong> Totais nacionais destacados</li>
            <li><strong>Múltiplas Perspectivas:</strong> Treemap + Gráfico de barras</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-bold text-blue-800 mb-4">📊 Legenda</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-400 rounded"></div>
              <span>Republicano (vermelho)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-400 rounded"></div>
              <span>Democrata (azul)</span>
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-600 mb-1">Intensidade da cor:</div>
              <div className="flex gap-1">
                <div className="w-6 h-3 bg-red-200 rounded-l"></div>
                <div className="w-6 h-3 bg-red-300"></div>
                <div className="w-6 h-3 bg-red-400"></div>
                <div className="w-6 h-3 bg-red-500 rounded-r"></div>
              </div>
              <div className="text-xs text-gray-600 mt-1">Margem: 0% → 50%+</div>
            </div>
          </div>
        </div>
      </div>

      {/* Guidelines Applied */}
      <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
        <h3 className="text-lg font-bold text-purple-800 mb-4">📋 Diretrizes Aplicadas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-700">
          <div>
            <h4 className="font-semibold mb-2">Representação</h4>
            <ul className="space-y-1 list-disc list-inside">
              <li>Proporcionalidade visual mantida</li>
              <li>Geografia não distorce percepção</li>
              <li>Contexto populacional considerado</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Codificação</h4>
            <ul className="space-y-1 list-disc list-inside">
              <li>Gradientes mostram nuances</li>
              <li>Escalas numéricas visíveis</li>
              <li>Múltiplas dimensões representadas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ElectionVisualizationRedesign;
