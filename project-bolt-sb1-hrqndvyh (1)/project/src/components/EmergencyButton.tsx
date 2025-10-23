import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface EmergencyButtonProps {
  onEmergencyClose: () => void;
  disabled?: boolean;
}

export function EmergencyButton({ onEmergencyClose, disabled = false }: EmergencyButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  const handleConfirm = async () => {
    if (confirmText !== 'PANIC') return;

    setIsExecuting(true);
    await onEmergencyClose();
    setTimeout(() => {
      setIsExecuting(false);
      setShowModal(false);
      setConfirmText('');
    }, 2000);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={disabled}
        className="bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg flex items-center gap-2 border-2 border-red-500 disabled:border-slate-600"
      >
        <AlertTriangle className="w-5 h-5" />
        EMERGENCY CLOSE
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border-2 border-red-600 rounded-xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-red-600 p-3 rounded-full">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Emergency Closure</h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6 space-y-3">
              <p className="text-slate-300">
                You are about to initiate an <span className="text-red-400 font-bold">emergency closure</span> of ALL positions across ALL wallets and DEXs.
              </p>
              <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
                <p className="text-red-300 text-sm font-semibold mb-2">This action will:</p>
                <ul className="text-red-300 text-sm space-y-1 list-disc list-inside">
                  <li>Close all open positions immediately</li>
                  <li>Execute market orders (may incur slippage)</li>
                  <li>Create an audit log entry</li>
                  <li>Cannot be undone</li>
                </ul>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">
                Type <span className="text-red-400 font-mono">PANIC</span> to confirm:
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={e => setConfirmText(e.target.value)}
                className="w-full bg-slate-900 border-2 border-slate-700 focus:border-red-600 text-white rounded-lg px-4 py-3 font-mono text-lg focus:outline-none"
                placeholder="Type PANIC"
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                disabled={isExecuting}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={confirmText !== 'PANIC' || isExecuting}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold transition-all"
              >
                {isExecuting ? 'Executing...' : 'CONFIRM EMERGENCY CLOSE'}
              </button>
            </div>

            {isExecuting && (
              <div className="mt-4 bg-amber-900/20 border border-amber-700 rounded-lg p-3">
                <p className="text-amber-300 text-sm font-semibold">
                  Emergency closure in progress...
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
