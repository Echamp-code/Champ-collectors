import React, { useState } from 'react';
import { X, Trophy, Sparkles, CheckCircle2, Lock, Clock, Calendar, ShieldCheck, Flame, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Game, Trophy as TrophyItem } from '../types';

interface GameDetailsModalProps {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleTrophyUnlock?: (gameId: string, trophyId: string) => void;
}

export const GameDetailsModal: React.FC<GameDetailsModalProps> = ({
  game,
  isOpen,
  onClose,
  onToggleTrophyUnlock,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [celebratingId, setCelebratingId] = useState<string | null>(null);

  if (!isOpen || !game) return null;

  const triggerCelebration = (trophyId: string, title: string) => {
    setCelebratingId(trophyId);
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#2563EB', '#EAB308', '#10B981', '#F59E0B'],
    });

    if (onToggleTrophyUnlock) {
      onToggleTrophyUnlock(game.id, trophyId);
    }

    setTimeout(() => {
      setCelebratingId(null);
    }, 1500);
  };

  const filteredTrophies = game.trophies.filter((t) => {
    if (filterType === 'unlocked') return t.unlocked;
    if (filterType === 'locked') return !t.unlocked;
    return true;
  });

  const getTrophyColorBadge = (type: TrophyItem['type']) => {
    switch (type) {
      case 'platinum':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'gold':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'silver':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'bronze':
        return 'bg-amber-900/10 text-amber-900 border-amber-800/30';
      case 'gamerscore':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden">
        {/* Banner Hero */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden shrink-0">
          <img
            src={game.bannerUrl || game.coverUrl}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors backdrop-blur-xs"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Platform & Genre */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-md text-xs font-bold font-orbitron tracking-wider text-white shadow-xs ${
                game.platform === 'playstation' ? 'bg-blue-600' : 'bg-emerald-600'
              }`}
            >
              {game.platform === 'playstation' ? 'PlayStation 5' : 'Xbox Series X|S'}
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-black/60 text-slate-200 backdrop-blur-xs">
              {game.releaseYear}
            </span>
          </div>

          {/* Title & Stats */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <h2 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white tracking-wide drop-shadow-md">
                {game.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-300 mt-1 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  {game.hoursPlayed}h played
                </span>
                <span>•</span>
                <span>Last played {game.lastPlayed}</span>
                <span>•</span>
                <span className="text-yellow-400 font-semibold">{game.genre.join(', ')}</span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="font-orbitron text-2xl font-black text-white drop-shadow-sm">
                {game.completionPercentage}%
              </span>
              <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Completed</p>
            </div>
          </div>
        </div>

        {/* Trophy Progress Metric Bar */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="font-semibold text-slate-800">
                {game.unlockedTrophies} / {game.totalTrophies} Unlocked
              </span>
            </div>
            {game.platform === 'playstation' && (
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="text-blue-600 font-bold">★ {game.trophyBreakdown.platinum}</span>
                <span className="text-amber-500 font-bold">◆ {game.trophyBreakdown.gold}</span>
                <span className="text-slate-500 font-bold">● {game.trophyBreakdown.silver}</span>
                <span className="text-amber-800 font-bold">■ {game.trophyBreakdown.bronze}</span>
              </div>
            )}
            {game.platform === 'xbox' && game.gamerscore && (
              <div className="flex items-center gap-1 text-emerald-600 font-bold font-mono text-xs">
                <span>{game.gamerscore.unlocked}</span>
                <span className="text-slate-400">/</span>
                <span>{game.gamerscore.total} G</span>
              </div>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                filterType === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({game.trophies.length})
            </button>
            <button
              onClick={() => setFilterType('unlocked')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                filterType === 'unlocked' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Unlocked ({game.trophies.filter((t) => t.unlocked).length})
            </button>
            <button
              onClick={() => setFilterType('locked')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                filterType === 'locked' ? 'bg-amber-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Remaining ({game.trophies.filter((t) => !t.unlocked).length})
            </button>
          </div>
        </div>

        {/* Trophies List */}
        <div className="p-6 overflow-y-auto space-y-3 divide-y divide-slate-100 flex-1">
          {filteredTrophies.map((trophy) => {
            const isJustCelebrated = celebratingId === trophy.id;
            return (
              <div
                key={trophy.id}
                className={`pt-3 first:pt-0 flex items-start justify-between gap-4 p-3 rounded-2xl transition-all ${
                  trophy.unlocked
                    ? 'bg-slate-50/70 hover:bg-slate-50'
                    : 'bg-white hover:bg-amber-50/30 border border-dashed border-slate-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Status Icon */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                      trophy.unlocked
                        ? 'bg-amber-50 border-amber-200 text-amber-500 shadow-xs'
                        : 'bg-slate-100 border-slate-200 text-slate-400'
                    }`}
                  >
                    {trophy.unlocked ? (
                      <Trophy className="w-5 h-5 text-amber-500" />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-400" />
                    )}
                  </div>

                  {/* Info */}
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm text-slate-900">{trophy.title}</h4>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${getTrophyColorBadge(
                          trophy.type
                        )}`}
                      >
                        {trophy.type === 'gamerscore' ? `${trophy.points || 50}G` : trophy.type}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        Rarity: <strong className="text-slate-700">{trophy.rarity} ({trophy.rarityPercentage}%)</strong>
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{trophy.description}</p>

                    {trophy.unlocked && trophy.unlockedAt && (
                      <span className="inline-block text-[11px] text-emerald-700 font-medium mt-1">
                        Unlocked on {trophy.unlockedAt}
                      </span>
                    )}
                  </div>
                </div>

                {/* Unlock / Test Button */}
                <div className="shrink-0 flex items-center gap-2">
                  <button
                    onClick={() => triggerCelebration(trophy.id, trophy.title)}
                    title={trophy.unlocked ? 'Celebrate Trophy Again' : 'Mark as Unlocked'}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
                      trophy.unlocked
                        ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    } ${isJustCelebrated ? 'scale-105 ring-2 ring-yellow-400' : ''}`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{trophy.unlocked ? 'Relive' : 'Unlock'}</span>
                  </button>
                </div>
              </div>
            );
          })}

          {filteredTrophies.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-xs">
              No trophies match this filter.
            </div>
          )}
        </div>

        {/* Modal Footer Tip */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Collector Tip: Check our AI Trophy Roadmap in Feature Advice for missables!</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
