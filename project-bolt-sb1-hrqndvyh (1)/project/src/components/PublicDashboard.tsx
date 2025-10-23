import { ExternalLink, BarChart3, Users, Wallet as WalletIcon } from 'lucide-react';
import { Wallet, ProgramStats } from '../types';

interface PublicDashboardProps {
  wallets: Wallet[];
  stats: ProgramStats;
}

export function PublicDashboard({ wallets, stats }: PublicDashboardProps) {
  const dexLeaderboards = [
    { name: 'Hyperliquid', url: 'https://app.hyperliquid.xyz/leaderboard' },
    { name: 'Pacifica', url: 'https://pacifica.trade/leaderboard' },
  ];

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-amber-500">🔒</span> Public Dashboard
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-semibold text-white">Program Statistics</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-slate-400 mb-1">Total Supply</div>
                <div className="text-xl font-bold text-white">{stats.totalSupply.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Total Power</div>
                <div className="text-xl font-bold text-white">{stats.totalPower.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Total Volume</div>
                <div className="text-xl font-bold text-amber-500">
                  ${(stats.totalVolume / 1000000).toFixed(2)}M
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Active Wallets</div>
                <div className="text-xl font-bold text-white">{wallets.length}</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-semibold text-white">Token Distribution</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Holders</span>
                  <span className="text-white font-semibold">{stats.holdersPercent}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${stats.holdersPercent}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Treasury</span>
                  <span className="text-white font-semibold">{stats.treasuryPercent}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500"
                    style={{ width: `${stats.treasuryPercent}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Team</span>
                  <span className="text-white font-semibold">5%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-500" style={{ width: '5%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <WalletIcon className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-semibold text-white">Public Wallet Addresses</h3>
            </div>
            <div className="space-y-2">
              {wallets.map((wallet, index) => (
                <div
                  key={wallet.id}
                  className="flex items-center justify-between py-2 px-3 bg-slate-800 rounded border border-slate-700 hover:border-amber-600 transition-colors"
                >
                  <div>
                    <div className="text-xs text-slate-400">Wallet {index + 1}</div>
                    <div className="text-sm font-mono text-white">{wallet.address}</div>
                  </div>
                  <a
                    href={`https://etherscan.io/address/${wallet.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-500 hover:text-amber-400"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">DEX Leaderboards</h3>
            <div className="space-y-2">
              {dexLeaderboards.map(dex => (
                <a
                  key={dex.name}
                  href={dex.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-2 px-3 bg-slate-800 rounded border border-slate-700 hover:border-amber-600 transition-colors group"
                >
                  <span className="text-white font-medium">{dex.name}</span>
                  <ExternalLink className="w-4 h-4 text-amber-500 group-hover:text-amber-400" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-slate-900 border border-slate-700 rounded-lg p-4">
        <p className="text-sm text-slate-300 text-center italic">
          "Block by block visibility. Trust is built with data, not promises." - VikingsFarm Whitepaper
        </p>
      </div>
    </div>
  );
}
