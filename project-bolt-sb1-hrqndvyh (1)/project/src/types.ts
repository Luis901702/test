export interface Wallet {
  id: string;
  address: string;
  label: string;
  usdcBalance: number;
  status: 'connected' | 'read-only';
}

export interface Position {
  id: string;
  walletId: string;
  walletAddress: string;
  dex: string;
  pair: string;
  side: 'Long' | 'Short';
  leverage: number;
  sizeUsdc: number;
  entryPrice: number;
  takeProfitPercent: number;
  stopLossPercent: number;
  unrealizedPnl: number;
  status: 'Open' | 'Closing' | 'Closed';
  txHash: string;
  openedAt: Date;
  closedAt?: Date;
}

export interface ActivityLog {
  id: string;
  actionType: 'open' | 'close' | 'tp_hit' | 'sl_hit' | 'emergency';
  walletAddress: string;
  dex: string;
  pair: string;
  details: Record<string, any>;
  txHash: string;
  timestamp: Date;
}

export interface ProgramStats {
  totalSupply: number;
  totalPower: number;
  treasuryPercent: number;
  holdersPercent: number;
  totalVolume: number;
}

export interface TradeConfig {
  dexes: string[];
  pair: string;
  side: 'Long' | 'Short';
  leverage: number;
  amount: number;
  amountPercent?: number;
  takeProfitPercent: number;
  stopLossPercent: number;
  slippage: number;
  orderType: 'market' | 'limit';
  deltaNeutral: boolean;
}

export const AVAILABLE_DEXES = [
  'Hyperliquid',
  'Extended',
  'Pacifica',
  'AsterDEX',
  'Based',
  'Lighter',
  'Backpack',
];

export const TRADING_PAIRS = [
  'BTC/USDC',
  'ETH/USDC',
  'SOL/USDC',
  'ARB/USDC',
  'OP/USDC',
];
