import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Gamepad2, ArrowRight, RefreshCw, AlertCircle, Sparkles, Wand2 } from 'lucide-react';
import { UserProfile } from '../types';
import { AnimatedAvatar } from './AnimatedAvatar';

interface AccountConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onTriggerSync: () => void;
  onOpenAvatarStudio?: () => void;
}

export const AccountConnectModal: React.FC<AccountConnectModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdateProfile,
  onTriggerSync,
  onOpenAvatarStudio,
}) => {
  const [psnId, setPsnId] = useState(userProfile.psnId);
  const [psnConnected, setPsnConnected] = useState(userProfile.psnConnected);
  const [xboxGamertag, setXboxGamertag] = useState(userProfile.xboxGamertag);
  const [xboxConnected, setXboxConnected] = useState(userProfile.xboxConnected);
  const [isVerifying, setIsVerifying] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSaveAndSync = () => {
    setIsVerifying(true);
    setSuccessMessage(null);

    setTimeout(() => {
      onUpdateProfile({
        psnId: psnId.trim() || 'Guest_PSN',
        psnConnected,
        xboxGamertag: xboxGamertag.trim() || 'Guest_XB',
        xboxConnected,
        lastSyncTime: 'Just now',
      });
      setIsVerifying(false);
      setSuccessMessage('Consoles synchronized successfully! Progress updated.');
      onTriggerSync();
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 1200);
    }, 900);
  };

  const handleQuickPreset = (type: 'dual' | 'ps_only' | 'xb_only') => {
    if (type === 'dual') {
      setPsnId('VanceCollector_PS');
      setPsnConnected(true);
      setXboxGamertag('VanceChamp_XB');
      setXboxConnected(true);
    } else if (type === 'ps_only') {
      setPsnId('GhostHunter_PS');
      setPsnConnected(true);
      setXboxConnected(false);
    } else {
      setXboxGamertag('MasterChief_Collector');
      setXboxConnected(true);
      setPsnConnected(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="font-orbitron font-bold text-lg text-slate-900">Console Accounts</h2>
              <p className="text-xs text-slate-500">Connect PlayStation Network & Xbox Live</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Animated Gamer Avatar Showcase Bar */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 text-white border border-slate-800 shadow-xs">
            <div className="flex items-center gap-3">
              <AnimatedAvatar
                avatarId={userProfile.avatar}
                name={userProfile.name}
                size="md"
                frameStyle="trophy_gold"
                status="online"
                interactive
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-orbitron font-bold text-xs text-white">{userProfile.name}</span>
                  <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    Animated
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{userProfile.title}</p>
              </div>
            </div>

            {onOpenAvatarStudio && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAvatarStudio();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-xs"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Customize Avatar</span>
              </button>
            )}
          </div>

          {/* Quick Presets */}
          <div className="flex items-center justify-between bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/70">
            <span className="text-xs text-slate-500 font-medium">Quick Demo Profiles:</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickPreset('dual')}
                className="text-xs px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 font-medium transition-colors"
              >
                Both Active
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset('ps_only')}
                className="text-xs px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 font-medium transition-colors"
              >
                PSN Focus
              </button>
              <button
                type="button"
                onClick={() => handleQuickPreset('xb_only')}
                className="text-xs px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:text-emerald-600 hover:border-emerald-300 font-medium transition-colors"
              >
                Xbox Focus
              </button>
            </div>
          </div>

          {/* PlayStation Connection Card */}
          <div className={`p-4 rounded-2xl border transition-all ${
            psnConnected ? 'border-blue-300 bg-blue-50/40 shadow-xs' : 'border-slate-200 bg-white opacity-85'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-orbitron text-xs font-black shadow-xs">
                  PS
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-slate-900">PlayStation™ Network</h3>
                  <span className="text-[11px] text-blue-700 font-medium">Trophies, Level & Games Owned</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={psnConnected}
                  onChange={(e) => setPsnConnected(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {psnConnected && (
              <div className="mt-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">PSN Online ID</label>
                <div className="relative">
                  <input
                    type="text"
                    value={psnId}
                    onChange={(e) => setPsnId(e.target.value)}
                    placeholder="Enter your PSN Online ID"
                    className="w-full px-3 py-2 text-sm bg-white rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-slate-800"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-blue-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    Verified
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>Current Trophy Level: <strong className="text-slate-800">{userProfile.psnLevel}</strong></span>
                  <span>Syncs: <strong className="text-blue-600">Automatic (Hourly)</strong></span>
                </div>
              </div>
            )}
          </div>

          {/* Xbox Connection Card */}
          <div className={`p-4 rounded-2xl border transition-all ${
            xboxConnected ? 'border-emerald-300 bg-emerald-50/40 shadow-xs' : 'border-slate-200 bg-white opacity-85'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-orbitron text-xs font-black shadow-xs">
                  XB
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-slate-900">Xbox Live™ Network</h3>
                  <span className="text-[11px] text-emerald-700 font-medium">Gamerscore, Achievements & Stats</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={xboxConnected}
                  onChange={(e) => setXboxConnected(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            {xboxConnected && (
              <div className="mt-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Xbox Gamertag</label>
                <div className="relative">
                  <input
                    type="text"
                    value={xboxGamertag}
                    onChange={(e) => setXboxGamertag(e.target.value)}
                    placeholder="Enter your Xbox Gamertag"
                    className="w-full px-3 py-2 text-sm bg-white rounded-xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-slate-800"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Verified
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>Current Gamerscore: <strong className="text-slate-800">{userProfile.xboxGamerscore.toLocaleString()} G</strong></span>
                  <span>Syncs: <strong className="text-emerald-600">Automatic (Hourly)</strong></span>
                </div>
              </div>
            )}
          </div>

          {/* Privacy & Token Notice */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              Your passwords are never stored. Champ Collectors only queries official public gamer trophy and achievement records using encrypted API sync.
            </p>
          </div>

          {/* Success Banner */}
          {successMessage && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {successMessage}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            id="modal-save-sync-btn"
            onClick={handleSaveAndSync}
            disabled={isVerifying}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-60"
          >
            {isVerifying ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
                <span>Verifying Handshake...</span>
              </>
            ) : (
              <>
                <span>Save & Sync Consoles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
