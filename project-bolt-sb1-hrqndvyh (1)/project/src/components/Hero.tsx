import { Shield, Zap } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-b border-amber-900/30">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzkyNDAwZSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="flex items-center justify-center mb-6">
          <Shield className="w-12 h-12 text-amber-500" />
          <h1 className="text-5xl font-bold text-white ml-4 tracking-tight">
            Vikings<span className="text-amber-500">Farm</span>
          </h1>
        </div>

        <p className="text-center text-xl text-slate-300 mb-2 font-light">
          Multichain Synchronized Operation for Perp DEX Farming
        </p>

        <p className="text-center text-sm text-slate-400 mb-8 max-w-2xl mx-auto">
          Trust is built with data, not promises. Every wallet is a cog in the war machine.
        </p>

        <div className="flex justify-center gap-4 mb-12">
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 shadow-lg shadow-amber-900/50">
            <Zap className="w-5 h-5" />
            Start Synchronized Operation
          </button>
          <button className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold transition-all border border-slate-600">
            Connect Read-Only Wallets
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold text-amber-500">1,111</div>
            <div className="text-xs text-slate-400 uppercase tracking-wide">Total Supply</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold text-amber-500">66,750</div>
            <div className="text-xs text-slate-400 uppercase tracking-wide">Total Power</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold text-amber-500">80%</div>
            <div className="text-xs text-slate-400 uppercase tracking-wide">Holders</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold text-amber-500">15%</div>
            <div className="text-xs text-slate-400 uppercase tracking-wide">Treasury</div>
          </div>
        </div>
      </div>
    </div>
  );
}
