import React, { useState } from 'react';
import { X, Sparkles, Check, CheckCircle2, Shield, Flame, Wand2 } from 'lucide-react';
import { AnimatedAvatar, AVATAR_OPTIONS, AvatarArchetype } from './AnimatedAvatar';
import { UserProfile } from '../types';

interface AvatarCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateAvatar: (avatarId: string, frameStyle?: 'ps_blue' | 'xb_green' | 'trophy_gold' | 'mythic_purple' | 'rgb_cycle') => void;
}

export const AvatarCustomizerModal: React.FC<AvatarCustomizerModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdateAvatar,
}) => {
  const [selectedArchetype, setSelectedArchetype] = useState<AvatarArchetype>(() => {
    if (userProfile.avatar && userProfile.avatar.startsWith('avatar-')) {
      return (userProfile.avatar.replace('avatar-', '') as AvatarArchetype);
    }
    return 'monarch';
  });

  const [selectedFrame, setSelectedFrame] = useState<'ps_blue' | 'xb_green' | 'trophy_gold' | 'mythic_purple' | 'rgb_cycle'>('trophy_gold');
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const currentOption = AVATAR_OPTIONS.find((opt) => opt.id === selectedArchetype) || AVATAR_OPTIONS[0];

  const handleApply = () => {
    onUpdateAvatar(`avatar-${selectedArchetype}`, selectedFrame);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 800);
  };

  const frames = [
    { id: 'trophy_gold', label: 'Trophy Gold', bg: 'bg-amber-400 text-amber-950', ring: 'ring-amber-400' },
    { id: 'ps_blue', label: 'PlayStation Blue', bg: 'bg-blue-600 text-white', ring: 'ring-blue-600' },
    { id: 'xb_green', label: 'Xbox Emerald', bg: 'bg-emerald-600 text-white', ring: 'ring-emerald-600' },
    { id: 'mythic_purple', label: 'Mythic Void', bg: 'bg-purple-600 text-white', ring: 'ring-purple-600' },
    { id: 'rgb_cycle', label: 'RGB Gamer', bg: 'bg-gradient-to-r from-blue-500 via-yellow-400 to-emerald-500 text-slate-900', ring: 'ring-indigo-400' },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h2 className="font-orbitron font-extrabold text-lg text-slate-900">
                Animated Avatar Studio
              </h2>
              <p className="text-xs text-slate-500">Live animated cyber & trophy hunter profile pictures</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Live Full Preview Showcase */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden flex flex-col sm:flex-row items-center gap-5 border border-slate-800 shadow-inner">
            {/* Background cyber grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <AnimatedAvatar
                avatarId={`avatar-${selectedArchetype}`}
                name={userProfile.name}
                size="2xl"
                frameStyle={selectedFrame}
                status="online"
                interactive
              />
              <span className="mt-2 text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live Animated
              </span>
            </div>

            <div className="relative z-10 text-center sm:text-left space-y-1.5 flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {currentOption.rarity}
                </span>
                <span className="text-xs font-mono text-slate-400">ID: {currentOption.id}</span>
              </div>
              <h3 className="font-orbitron font-extrabold text-xl text-white">
                {currentOption.name}
              </h3>
              <p className="text-xs text-slate-300">{currentOption.title}</p>
              <p className="text-[11px] text-slate-400 pt-1">
                Fully animated vector avatar equipped with glowing visors, radar sweeps, and live blinking shaders.
              </p>
            </div>
          </div>

          {/* Avatar Archetype Grid */}
          <div className="space-y-3">
            <label className="font-orbitron font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center justify-between">
              <span>Choose Animated Archetype</span>
              <span className="text-[11px] font-normal text-slate-400 font-mono">8 Available</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {AVATAR_OPTIONS.map((opt) => {
                const isSelected = selectedArchetype === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedArchetype(opt.id)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 relative ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/50 shadow-md ring-2 ring-blue-500/30'
                        : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}

                    <AnimatedAvatar
                      avatarId={`avatar-${opt.id}`}
                      size="md"
                      frameStyle={isSelected ? selectedFrame : 'slate'}
                    />

                    <div>
                      <div className="font-orbitron font-bold text-xs text-slate-900">{opt.name}</div>
                      <div className="text-[10px] text-slate-500 font-medium">{opt.rarity}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Aura / Frame Glow Customizer */}
          <div className="space-y-2.5">
            <label className="font-orbitron font-bold text-xs uppercase tracking-wider text-slate-700">
              Avatar Frame & Glow Theme
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {frames.map((frame) => {
                const isSelected = selectedFrame === frame.id;
                return (
                  <button
                    key={frame.id}
                    type="button"
                    onClick={() => setSelectedFrame(frame.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{frame.label}</span>
                    <span className={`w-3 h-3 rounded-full ${frame.bg} border border-white/50`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Success Banner */}
          {saveSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Animated profile picture updated across all consoles & friend feeds!
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-orbitron text-xs font-bold transition-all shadow-md hover:shadow-lg"
          >
            <Wand2 className="w-4 h-4" />
            <span>Apply Animated Avatar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
