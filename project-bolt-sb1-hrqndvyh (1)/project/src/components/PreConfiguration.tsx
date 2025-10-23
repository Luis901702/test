import { useState } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';
import { AVAILABLE_DEXES, TRADING_PAIRS, TradeConfig } from '../types';

interface PreConfigurationProps {
  onStartOperation: (config: TradeConfig) => void;
}

export function PreConfiguration({ onStartOperation }: PreConfigurationProps) {
  const [config, setConfig] = useState<TradeConfig>({
    dexes: ['Hyperliquid'],
    pair: 'BTC/USDC',
    side: 'Long',
    leverage: 5,
    amount: 1000,
    takeProfitPercent: 2,
    stopLossPercent: 1,
    slippage: 0.5,
    orderType: 'market',
    deltaNeutral: false,
  });

  const leveragePresets = [1, 2, 5, 10, 20];

  const handleDexToggle = (dex: string) => {
    setConfig(prev => ({
      ...prev,
      dexes: prev.dexes.includes(dex)
        ? prev.dexes.filter(d => d !== dex)
        : [...prev.dexes, dex],
    }));
  };

  const estimatedMargin = config.amount * config.dexes.length;
  const maxLeverage = config.dexes.includes('Hyperliquid') ? 50 : 20;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-amber-500">⚔️</span> Pre-Configuration Panel
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Select DEXs (Multi-select)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_DEXES.map(dex => (
                <button
                  key={dex}
                  onClick={() => handleDexToggle(dex)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    config.dexes.includes(dex)
                      ? 'bg-amber-600 text-white border-2 border-amber-500'
                      : 'bg-slate-700 text-slate-300 border-2 border-slate-600 hover:border-slate-500'
                  }`}
                >
                  {config.dexes.includes(dex) && <CheckCircle className="w-3 h-3 inline mr-1" />}
                  {dex}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Trading Pair</label>
            <select
              value={config.pair}
              onChange={e => setConfig({ ...config, pair: e.target.value })}
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              {TRADING_PAIRS.map(pair => (
                <option key={pair} value={pair}>
                  {pair}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Side</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setConfig({ ...config, side: 'Long' })}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  config.side === 'Long'
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <TrendingUp className="w-4 h-4" /> Long
              </button>
              <button
                onClick={() => setConfig({ ...config, side: 'Short' })}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  config.side === 'Short'
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <TrendingDown className="w-4 h-4" /> Short
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Leverage: {config.leverage}x
            </label>
            <div className="flex gap-2 mb-2">
              {leveragePresets.map(lev => (
                <button
                  key={lev}
                  onClick={() => setConfig({ ...config, leverage: lev })}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                    config.leverage === lev
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {lev}x
                </button>
              ))}
            </div>
            <input
              type="number"
              value={config.leverage}
              onChange={e => setConfig({ ...config, leverage: Number(e.target.value) })}
              min="1"
              max={maxLeverage}
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Amount (USDC per wallet)
            </label>
            <input
              type="number"
              value={config.amount}
              onChange={e => setConfig({ ...config, amount: Number(e.target.value) })}
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
            <div className="flex gap-2 mt-2">
              {[10, 25, 50, 100].map(percent => (
                <button
                  key={percent}
                  className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded text-xs"
                >
                  {percent}%
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Take Profit %
              </label>
              <input
                type="number"
                value={config.takeProfitPercent}
                onChange={e => setConfig({ ...config, takeProfitPercent: Number(e.target.value) })}
                step="0.1"
                className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Stop Loss %
              </label>
              <input
                type="number"
                value={config.stopLossPercent}
                onChange={e => setConfig({ ...config, stopLossPercent: Number(e.target.value) })}
                step="0.1"
                className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Slippage %
              </label>
              <input
                type="number"
                value={config.slippage}
                onChange={e => setConfig({ ...config, slippage: Number(e.target.value) })}
                step="0.1"
                className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Order Type</label>
              <select
                value={config.orderType}
                onChange={e => setConfig({ ...config, orderType: e.target.value as 'market' | 'limit' })}
                className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="market">Market</option>
                <option value="limit">Limit</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={config.deltaNeutral}
              onChange={e => setConfig({ ...config, deltaNeutral: e.target.checked })}
              className="w-4 h-4 rounded bg-slate-700 border-slate-600"
            />
            <label className="text-sm text-slate-300">Delta-neutral mode</label>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-slate-900 border border-slate-700 rounded-lg">
        <div className="flex items-start gap-2 mb-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">Estimated Requirements</h3>
            <p className="text-sm text-slate-300">
              Total Margin Required: <span className="text-amber-500 font-bold">{estimatedMargin.toLocaleString()} USDC</span>
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {config.dexes.length} DEX(s) × 5 wallets × {config.amount} USDC
            </p>
          </div>
        </div>

        {config.leverage > maxLeverage && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertTriangle className="w-4 h-4" />
            Warning: Leverage exceeds maximum for selected DEXs ({maxLeverage}x)
          </div>
        )}
      </div>

      <button
        onClick={() => onStartOperation(config)}
        className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white px-6 py-4 rounded-lg font-bold text-lg transition-all shadow-lg shadow-amber-900/50 flex items-center justify-center gap-2"
      >
        <span className="text-xl">⚡</span>
        Start Synchronized Operation
      </button>
    </div>
  );
}
