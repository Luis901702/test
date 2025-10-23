import { Wallet, Position, ActivityLog, ProgramStats } from '../types';

export const initialWallets: Wallet[] = [
  {
    id: '1',
    address: '0xd9a5087ad1aee96dead33b1e18c7052572f22d14',
    label: 'Wallet 1',
    usdcBalance: 12450.50,
    status: 'connected',
  },
  {
    id: '2',
    address: '0xA1b2C3d4E5f678901234567890abcdefABCDef01',
    label: 'Wallet 2',
    usdcBalance: 8920.75,
    status: 'read-only',
  },
  {
    id: '3',
    address: '0xB2c3D4e5F678901234567890abcdefABCDef0123',
    label: 'Wallet 3',
    usdcBalance: 15680.30,
    status: 'connected',
  },
  {
    id: '4',
    address: '0xC3d4E5f678901234567890abcdefABCDef012345',
    label: 'Wallet 4',
    usdcBalance: 6540.00,
    status: 'read-only',
  },
  {
    id: '5',
    address: '0xD4e5F678901234567890abcdefABCDef01234567',
    label: 'Wallet 5',
    usdcBalance: 21300.45,
    status: 'connected',
  },
];

export const initialPositions: Position[] = [
  {
    id: 'pos-1',
    walletId: '1',
    walletAddress: '0xd9a5...2d14',
    dex: 'Hyperliquid',
    pair: 'BTC/USDC',
    side: 'Long',
    leverage: 5,
    sizeUsdc: 1000,
    entryPrice: 49500,
    takeProfitPercent: 2,
    stopLossPercent: 1,
    unrealizedPnl: 125.50,
    status: 'Open',
    txHash: '0x1234...abcd',
    openedAt: new Date(Date.now() - 3600000),
  },
  {
    id: 'pos-2',
    walletId: '3',
    walletAddress: '0xB2c3...0123',
    dex: 'Pacifica',
    pair: 'ETH/USDC',
    side: 'Short',
    leverage: 3,
    sizeUsdc: 1500,
    entryPrice: 2850,
    takeProfitPercent: 1.5,
    stopLossPercent: 1,
    unrealizedPnl: -45.30,
    status: 'Open',
    txHash: '0x5678...efgh',
    openedAt: new Date(Date.now() - 7200000),
  },
];

export const initialActivityLogs: ActivityLog[] = [
  {
    id: 'log-1',
    actionType: 'open',
    walletAddress: '0xd9a5...2d14',
    dex: 'Hyperliquid',
    pair: 'BTC/USDC',
    details: { leverage: 5, size: 1000, side: 'Long' },
    txHash: '0x1234...abcd',
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: 'log-2',
    actionType: 'open',
    walletAddress: '0xB2c3...0123',
    dex: 'Pacifica',
    pair: 'ETH/USDC',
    details: { leverage: 3, size: 1500, side: 'Short' },
    txHash: '0x5678...efgh',
    timestamp: new Date(Date.now() - 7200000),
  },
];

export const initialProgramStats: ProgramStats = {
  totalSupply: 1111,
  totalPower: 66750,
  treasuryPercent: 15,
  holdersPercent: 80,
  totalVolume: 2847650,
};
