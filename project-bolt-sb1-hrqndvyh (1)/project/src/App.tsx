import { useState } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { Hero } from './components/Hero';
import { PreConfiguration } from './components/PreConfiguration';
import { WalletsSection } from './components/WalletsSection';
import { PositionsTable } from './components/PositionsTable';
import { EmergencyButton } from './components/EmergencyButton';
import { ActivityFeed } from './components/ActivityFeed';
import { PublicDashboard } from './components/PublicDashboard';
import {
  initialWallets,
  initialPositions,
  initialActivityLogs,
  initialProgramStats,
} from './data/seedData';
import { TradeConfig, Position, ActivityLog } from './types';

function App() {
  const [positions, setPositions] = useState<Position[]>(initialPositions);
  const [activities, setActivities] = useState<ActivityLog[]>(initialActivityLogs);
  const [showPreview, setShowPreview] = useState(false);
  const [pendingConfig, setPendingConfig] = useState<TradeConfig | null>(null);

  const handleStartOperation = (config: TradeConfig) => {
    setPendingConfig(config);
    setShowPreview(true);
  };

  const handleConfirmOperation = () => {
    if (!pendingConfig) return;

    const newPositions: Position[] = [];
    const newActivities: ActivityLog[] = [];

    initialWallets.forEach(wallet => {
      pendingConfig.dexes.forEach(dex => {
        const position: Position = {
          id: `pos-${Date.now()}-${Math.random()}`,
          walletId: wallet.id,
          walletAddress: wallet.address.slice(0, 6) + '...' + wallet.address.slice(-4),
          dex,
          pair: pendingConfig.pair,
          side: pendingConfig.side,
          leverage: pendingConfig.leverage,
          sizeUsdc: pendingConfig.amount,
          entryPrice: pendingConfig.pair === 'BTC/USDC' ? 49500 : 2850,
          takeProfitPercent: pendingConfig.takeProfitPercent,
          stopLossPercent: pendingConfig.stopLossPercent,
          unrealizedPnl: 0,
          status: 'Open',
          txHash: `0x${Math.random().toString(16).slice(2, 14)}`,
          openedAt: new Date(),
        };

        const activity: ActivityLog = {
          id: `log-${Date.now()}-${Math.random()}`,
          actionType: 'open',
          walletAddress: wallet.address.slice(0, 6) + '...' + wallet.address.slice(-4),
          dex,
          pair: pendingConfig.pair,
          details: {
            leverage: pendingConfig.leverage,
            size: pendingConfig.amount,
            side: pendingConfig.side,
          },
          txHash: position.txHash,
          timestamp: new Date(),
        };

        newPositions.push(position);
        newActivities.push(activity);
      });
    });

    setPositions([...positions, ...newPositions]);
    setActivities([...newActivities, ...activities]);
    setShowPreview(false);
    setPendingConfig(null);
  };

  const handleClosePosition = (id: string) => {
    setPositions(positions.map(pos =>
      pos.id === id ? { ...pos, status: 'Closing' as const } : pos
    ));

    const position = positions.find(pos => pos.id === id);
    if (position) {
      const activity: ActivityLog = {
        id: `log-${Date.now()}-${Math.random()}`,
        actionType: 'close',
        walletAddress: position.walletAddress,
        dex: position.dex,
        pair: position.pair,
        details: { side: position.side, pnl: position.unrealizedPnl },
        txHash: `0x${Math.random().toString(16).slice(2, 14)}`,
        timestamp: new Date(),
      };
      setActivities([activity, ...activities]);
    }

    setTimeout(() => {
      setPositions(positions.filter(pos => pos.id !== id));
    }, 2000);
  };

  const handleCloseAll = () => {
    const openPositions = positions.filter(pos => pos.status === 'Open');
    openPositions.forEach(pos => handleClosePosition(pos.id));
  };

  const handleEmergencyClose = async () => {
    const openPositions = positions.filter(pos => pos.status === 'Open');

    openPositions.forEach(pos => {
      const activity: ActivityLog = {
        id: `log-${Date.now()}-${Math.random()}`,
        actionType: 'emergency',
        walletAddress: pos.walletAddress,
        dex: pos.dex,
        pair: pos.pair,
        details: { side: pos.side, reason: 'Emergency closure initiated' },
        txHash: `0x${Math.random().toString(16).slice(2, 14)}`,
        timestamp: new Date(),
      };
      setActivities(prev => [activity, ...prev]);
    });

    setPositions([]);
  };

  const handleExportActivity = () => {
    const csv = [
      ['Timestamp', 'Action', 'Wallet', 'DEX', 'Pair', 'Details', 'Tx Hash'].join(','),
      ...activities.map(a =>
        [
          a.timestamp.toISOString(),
          a.actionType,
          a.walletAddress,
          a.dex,
          a.pair,
          JSON.stringify(a.details),
          a.txHash,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vikings-farm-activity-${Date.now()}.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-amber-500" />
            <div>
              <h1 className="text-xl font-bold text-white">
                Vikings<span className="text-amber-500">Farm</span>
              </h1>
              <p className="text-xs text-slate-400">Multichain Synchronized Operations</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <EmergencyButton
              onEmergencyClose={handleEmergencyClose}
              disabled={positions.length === 0}
            />
          </div>
        </div>
      </header>

      <Hero />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <PreConfiguration onStartOperation={handleStartOperation} />
        <WalletsSection wallets={initialWallets} />
        <PositionsTable
          positions={positions}
          onClosePosition={handleClosePosition}
          onCloseAll={handleCloseAll}
        />
        <ActivityFeed activities={activities} onExport={handleExportActivity} />
        <PublicDashboard wallets={initialWallets} stats={initialProgramStats} />
      </main>

      <footer className="border-t border-slate-800 bg-slate-900 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-slate-400 text-sm">
          <p className="mb-2">
            VikingsFarm - Multichain Synchronized Operation for Perp DEX Farming
          </p>
          <p className="text-xs">
            Every wallet is a cog in the war machine. Block by block visibility.
          </p>
        </div>
      </footer>

      {showPreview && pendingConfig && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border-2 border-amber-600 rounded-xl p-8 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-8 h-8 text-amber-500" />
              <h2 className="text-2xl font-bold text-white">Preview Synchronized Operation</h2>
            </div>

            <div className="mb-6 bg-slate-900 border border-slate-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">Configuration</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-slate-400">DEXs:</span>{' '}
                  <span className="text-white font-semibold">{pendingConfig.dexes.join(', ')}</span>
                </div>
                <div>
                  <span className="text-slate-400">Pair:</span>{' '}
                  <span className="text-white font-mono">{pendingConfig.pair}</span>
                </div>
                <div>
                  <span className="text-slate-400">Side:</span>{' '}
                  <span className={pendingConfig.side === 'Long' ? 'text-green-400' : 'text-red-400'}>
                    {pendingConfig.side}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Leverage:</span>{' '}
                  <span className="text-amber-400 font-bold">{pendingConfig.leverage}x</span>
                </div>
                <div>
                  <span className="text-slate-400">Amount per wallet:</span>{' '}
                  <span className="text-white">{pendingConfig.amount} USDC</span>
                </div>
                <div>
                  <span className="text-slate-400">TP / SL:</span>{' '}
                  <span className="text-green-400">{pendingConfig.takeProfitPercent}%</span>
                  {' / '}
                  <span className="text-red-400">{pendingConfig.stopLossPercent}%</span>
                </div>
              </div>
            </div>

            <div className="mb-6 bg-slate-900 border border-slate-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">
                Estimated Transactions ({pendingConfig.dexes.length * initialWallets.length})
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {initialWallets.map(wallet =>
                  pendingConfig.dexes.map(dex => (
                    <div
                      key={`${wallet.id}-${dex}`}
                      className="flex items-center justify-between py-2 px-3 bg-slate-800 rounded text-sm"
                    >
                      <div>
                        <span className="text-slate-400">Wallet:</span>{' '}
                        <span className="text-white font-mono">{wallet.address.slice(0, 10)}...</span>
                      </div>
                      <div>
                        <span className="text-slate-400">DEX:</span>{' '}
                        <span className="text-white font-semibold">{dex}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Gas:</span>{' '}
                        <span className="text-amber-400">~0.002 ETH</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPreview(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmOperation}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-bold transition-all"
              >
                Confirm & Execute
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
