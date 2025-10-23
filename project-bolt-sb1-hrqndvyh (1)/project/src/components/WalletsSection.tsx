import { ExternalLink, Wallet as WalletIcon } from 'lucide-react';
import { Wallet } from '../types';
import { useState } from 'react';

interface WalletsSectionProps {
  wallets: Wallet[];
}

// Define supported chains for DeBank
const SUPPORTED_CHAINS = {
  eth: 'eth',
  arb: 'arb',
  bsc: 'bsc',
  polygon: 'matic',
} as const;

type ChainId = keyof typeof SUPPORTED_CHAINS;

export function WalletsSection({ wallets }: WalletsSectionProps) {
  // State to manage tags for each wallet and editing state
  const [walletTags, setWalletTags] = useState<{ [key: string]: string }>({});
  const [editingWalletId, setEditingWalletId] = useState<string | null>(null);
  const [tempTag, setTempTag] = useState<string>('');

  const getExplorerUrl = (address: string, chain: ChainId = 'eth') => {
    return `https://debank.com/profile/${address}?chain=${SUPPORTED_CHAINS[chain]}`;
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.usdcBalance, 0);

  // Handle tag editing
  const handleTagClick = (walletId: string, currentTag: string = 'TAG') => {
    setEditingWalletId(walletId);
    setTempTag(walletTags[walletId] || currentTag);
  };

  const handleTagSave = (walletId: string) => {
    setWalletTags((prev) => ({
      ...prev,
      [walletId]: tempTag.trim() || 'TAG',
    }));
    setEditingWalletId(null);
    setTempTag('');
  };

  const handleTagCancel = () => {
    setEditingWalletId(null);
    setTempTag('');
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-amber-500">🛡️</span> Connected Wallets
        </h2>
        <div className="text-right">
          <div className="text-sm text-slate-400">Total Balance</div>
          <div className="text-2xl font-bold text-amber-500">
            {totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDC
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {wallets.map((wallet) => (
          <div
            key={wallet.id}
            className="bg-slate-900 border border-slate-700 rounded-lg p-4 hover:border-amber-600 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <WalletIcon className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-semibold text-white">{wallet.label}</span>
              </div>
              {editingWalletId === wallet.id ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempTag}
                    onChange={(e) => setTempTag(e.target.value)}
                    className="text-xs px-2 py-1 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-amber-500"
                    placeholder="Enter tag"
                    maxLength={20}
                  />
                  <button
                    onClick={() => handleTagSave(wallet.id)}
                    className="text-xs px-2 py-1 rounded bg-green-900/30 text-green-400 border border-green-700 hover:bg-green-900/50"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleTagCancel}
                    className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-400 border border-slate-600 hover:bg-slate-600"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleTagClick(wallet.id, walletTags[wallet.id])}
                  className="text-xs px-2 py-1 rounded bg-amber-900/30 text-amber-400 border border-amber-700 hover:bg-amber-900/50"
                >
                  {walletTags[wallet.id] || 'TAG'}
                </button>
              )}
            </div>

            <div className="mb-3">
              <div className="text-xs text-slate-400 mb-1">Address</div>
              <div className="text-sm font-mono text-slate-300">{shortenAddress(wallet.address)}</div>
            </div>

            <div className="mb-3">
              <div className="text-xs text-slate-400 mb-1">USDC Balance</div>
              <div className="text-lg font-bold text-white">
                {wallet.usdcBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            <a
              href={getExplorerUrl(wallet.address, wallet.chain as ChainId)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-xs text-amber-500 hover:text-amber-400 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              View on DeBank
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}