import { ExternalLink, Download, TrendingUp, TrendingDown, AlertTriangle, X } from 'lucide-react';
import { ActivityLog } from '../types';

interface ActivityFeedProps {
  activities: ActivityLog[];
  onExport: () => void;
}

export function ActivityFeed({ activities, onExport }: ActivityFeedProps) {
  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'open':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'close':
        return <TrendingDown className="w-4 h-4 text-slate-400" />;
      case 'tp_hit':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'sl_hit':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'emergency':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <X className="w-4 h-4 text-slate-400" />;
    }
  };

  const getActionLabel = (actionType: string) => {
    switch (actionType) {
      case 'open':
        return 'Position Opened';
      case 'close':
        return 'Position Closed';
      case 'tp_hit':
        return 'Take Profit Hit';
      case 'sl_hit':
        return 'Stop Loss Hit';
      case 'emergency':
        return 'Emergency Close';
      default:
        return 'Action';
    }
  };

  const getActionColor = (actionType: string) => {
    switch (actionType) {
      case 'open':
        return 'border-green-700 bg-green-900/20';
      case 'close':
        return 'border-slate-700 bg-slate-900/50';
      case 'tp_hit':
        return 'border-green-600 bg-green-900/30';
      case 'sl_hit':
        return 'border-red-600 bg-red-900/30';
      case 'emergency':
        return 'border-red-700 bg-red-900/40';
      default:
        return 'border-slate-700 bg-slate-900/50';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-amber-500">📊</span> Activity Feed
        </h2>
        <button
          onClick={onExport}
          className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            No activity recorded yet
          </div>
        ) : (
          activities.map(activity => (
            <div
              key={activity.id}
              className={`border rounded-lg p-4 ${getActionColor(activity.actionType)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getActionIcon(activity.actionType)}
                  <span className="text-white font-semibold text-sm">
                    {getActionLabel(activity.actionType)}
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  {formatTimestamp(activity.timestamp)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs mb-2">
                <div>
                  <span className="text-slate-400">Wallet:</span>{' '}
                  <span className="text-white font-mono">{activity.walletAddress}</span>
                </div>
                <div>
                  <span className="text-slate-400">DEX:</span>{' '}
                  <span className="text-white font-semibold">{activity.dex}</span>
                </div>
                <div>
                  <span className="text-slate-400">Pair:</span>{' '}
                  <span className="text-white font-mono">{activity.pair}</span>
                </div>
                {activity.details.side && (
                  <div>
                    <span className="text-slate-400">Side:</span>{' '}
                    <span className={activity.details.side === 'Long' ? 'text-green-400' : 'text-red-400'}>
                      {activity.details.side}
                    </span>
                  </div>
                )}
                {activity.details.leverage && (
                  <div>
                    <span className="text-slate-400">Leverage:</span>{' '}
                    <span className="text-amber-400 font-semibold">{activity.details.leverage}x</span>
                  </div>
                )}
                {activity.details.size && (
                  <div>
                    <span className="text-slate-400">Size:</span>{' '}
                    <span className="text-white">{activity.details.size} USDC</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs">
                <a
                  href={`https://etherscan.io/tx/${activity.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-500 hover:text-amber-400 flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  View Transaction
                </a>
                <span className="text-slate-500 font-mono">{activity.txHash.slice(0, 10)}...</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
