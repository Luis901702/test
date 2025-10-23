import { useState } from 'react';
import { ExternalLink, X, Filter, TrendingUp, TrendingDown } from 'lucide-react';
import { Position } from '../types';

interface PositionsTableProps {
  positions: Position[];
  onClosePosition: (id: string) => void;
  onCloseAll: () => void;
}

export function PositionsTable({ positions, onClosePosition, onCloseAll }: PositionsTableProps) {
  const [filterDex, setFilterDex] = useState<string>('all');
  const [filterSide, setFilterSide] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredPositions = positions.filter(pos => {
    if (filterDex !== 'all' && pos.dex !== filterDex) return false;
    if (filterSide !== 'all' && pos.side !== filterSide) return false;
    if (filterStatus !== 'all' && pos.status !== filterStatus) return false;
    return true;
  });

  const uniqueDexes = Array.from(new Set(positions.map(p => p.dex)));
  const totalPnl = filteredPositions.reduce((sum, pos) => sum + pos.unrealizedPnl, 0);
  const totalSize = filteredPositions.reduce((sum, pos) => sum + pos.sizeUsdc, 0);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-amber-500">⚔️</span> Open Positions
        </h2>
        <div className="flex gap-3">
          <div className="text-right">
            <div className="text-xs text-slate-400">Total P&L</div>
            <div className={`text-lg font-bold ${totalPnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {totalPnl >= 0 ? '+' : ''}{totalPnl.toFixed(2)} USDC
            </div>
          </div>
          <button
            onClick={onCloseAll}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
          >
            Close All Selected
          </button>
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterDex}
            onChange={e => setFilterDex(e.target.value)}
            className="bg-slate-700 border border-slate-600 text-white rounded px-3 py-1 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
          >
            <option value="all">All DEXs</option>
            {uniqueDexes.map(dex => (
              <option key={dex} value={dex}>{dex}</option>
            ))}
          </select>
        </div>
        <select
          value={filterSide}
          onChange={e => setFilterSide(e.target.value)}
          className="bg-slate-700 border border-slate-600 text-white rounded px-3 py-1 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
        >
          <option value="all">All Sides</option>
          <option value="Long">Long</option>
          <option value="Short">Short</option>
        </select>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="bg-slate-700 border border-slate-600 text-white rounded px-3 py-1 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
        >
          <option value="all">All Status</option>
          <option value="Open">Open</option>
          <option value="Closing">Closing</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3 px-2 text-slate-400 font-medium">DEX</th>
              <th className="text-left py-3 px-2 text-slate-400 font-medium">Pair</th>
              <th className="text-left py-3 px-2 text-slate-400 font-medium">Wallet</th>
              <th className="text-left py-3 px-2 text-slate-400 font-medium">Side</th>
              <th className="text-right py-3 px-2 text-slate-400 font-medium">Leverage</th>
              <th className="text-right py-3 px-2 text-slate-400 font-medium">Size</th>
              <th className="text-right py-3 px-2 text-slate-400 font-medium">Entry</th>
              <th className="text-right py-3 px-2 text-slate-400 font-medium">TP %</th>
              <th className="text-right py-3 px-2 text-slate-400 font-medium">SL %</th>
              <th className="text-right py-3 px-2 text-slate-400 font-medium">P&L</th>
              <th className="text-center py-3 px-2 text-slate-400 font-medium">Status</th>
              <th className="text-center py-3 px-2 text-slate-400 font-medium">Tx</th>
              <th className="text-center py-3 px-2 text-slate-400 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPositions.length === 0 ? (
              <tr>
                <td colSpan={13} className="text-center py-8 text-slate-400">
                  No positions match the current filters
                </td>
              </tr>
            ) : (
              filteredPositions.map(position => (
                <tr key={position.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="py-3 px-2">
                    <span className="text-white font-medium">{position.dex}</span>
                  </td>
                  <td className="py-3 px-2">
                    <span className="text-white font-mono">{position.pair}</span>
                  </td>
                  <td className="py-3 px-2">
                    <span className="text-slate-300 font-mono text-xs">{position.walletAddress}</span>
                  </td>
                  <td className="py-3 px-2">
                    <span className={`flex items-center gap-1 ${position.side === 'Long' ? 'text-green-400' : 'text-red-400'}`}>
                      {position.side === 'Long' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {position.side}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className="text-amber-400 font-semibold">{position.leverage}x</span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className="text-white">{position.sizeUsdc.toLocaleString()}</span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className="text-white font-mono">{position.entryPrice.toLocaleString()}</span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className="text-green-400">{position.takeProfitPercent}%</span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className="text-red-400">{position.stopLossPercent}%</span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className={`font-semibold ${position.unrealizedPnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {position.unrealizedPnl >= 0 ? '+' : ''}{position.unrealizedPnl.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      position.status === 'Open'
                        ? 'bg-green-900/30 text-green-400 border border-green-700'
                        : 'bg-amber-900/30 text-amber-400 border border-amber-700'
                    }`}>
                      {position.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <a
                      href={`https://etherscan.io/tx/${position.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-500 hover:text-amber-400"
                    >
                      <ExternalLink className="w-4 h-4 inline" />
                    </a>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <button
                      onClick={() => onClosePosition(position.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                      title="Close position"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center text-xs text-slate-400">
        <span>Showing {filteredPositions.length} of {positions.length} positions</span>
        <span>Total Size: {totalSize.toLocaleString()} USDC</span>
      </div>
    </div>
  );
}
