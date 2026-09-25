import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  Gamepad2, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ArrowUpDown, 
  ExternalLink,
  Flame,
  PlusCircle,
  BarChart3,
  Layers,
  Wand2
} from 'lucide-react';
import { Game, UserProfile, ConsolePlatform } from '../types';
import { GameDetailsModal } from './GameDetailsModal';
import { AnimatedAvatar } from './AnimatedAvatar';

interface PersonalProgressViewProps {
  userProfile: UserProfile;
  games: Game[];
  onOpenConnectModal: () => void;
  onOpenAvatarCustomizer?: () => void;
  onToggleTrophyUnlock: (gameId: string, trophyId: string) => void;
}

export const PersonalProgressView: React.FC<PersonalProgressViewProps> = ({
  userProfile,
  games,
  onOpenConnectModal,
  onOpenAvatarCustomizer,
  onToggleTrophyUnlock,
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<ConsolePlatform>('both');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'in_progress' | 'backlog'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'completion' | 'hours' | 'title'>('completion');
  const [inspectingGame, setInspectingGame] = useState<Game | null>(null);

  // Filtered and sorted games
  const filteredGames = useMemo(() => {
    return games
      .filter((g) => {
        if (selectedPlatform === 'playstation' && g.platform !== 'playstation') return false;
        if (selectedPlatform === 'xbox' && g.platform !== 'xbox') return false;
        if (statusFilter !== 'all' && g.status !== statusFilter) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = g.title.toLowerCase().includes(q);
          const matchGenre = g.genre.some((genre) => genre.toLowerCase().includes(q));
          if (!matchTitle && !matchGenre) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'completion') return b.completionPercentage - a.completionPercentage;
        if (sortBy === 'hours') return b.hoursPlayed - a.hoursPlayed;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [games, selectedPlatform, statusFilter, searchQuery, sortBy]);

  // Derived stats
  const psGamesCount = games.filter((g) => g.platform === 'playstation').length;
  const xbGamesCount = games.filter((g) => g.platform === 'xbox').length;
  const completedCount = games.filter((g) => g.completionPercentage === 100).length;

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Personal Progress Card */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs relative overflow-hidden">
        {/* Subtle decorative gaming color touches */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          {/* User info with Animated Avatar */}
          <div className="flex items-center gap-4">
            <div 
              className="relative cursor-pointer group"
              onClick={onOpenAvatarCustomizer}
              title="Click to customize your Animated Avatar"
            >
              <AnimatedAvatar
                avatarId={userProfile.avatar}
                name={userProfile.name}
                size="xl"
                frameStyle="trophy_gold"
                status="online"
                interactive
              />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-orbitron text-xs font-black shadow-xs ring-2 ring-white">
                ★
              </span>
              <div className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                <Wand2 className="w-4 h-4 text-amber-300 animate-bounce" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-wide">
                  {userProfile.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Hunter
                </span>
                {onOpenAvatarCustomizer && (
                  <button
                    onClick={onOpenAvatarCustomizer}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/90 hover:bg-amber-100 transition-colors cursor-pointer"
                  >
                    <Wand2 className="w-3 h-3 text-amber-600" />
                    <span>Change Avatar</span>
                  </button>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">{userProfile.title}</p>

              {/* Connected tags */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200/80 text-[11px] font-mono text-blue-800 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>PSN: {userProfile.psnId}</span>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200/80 text-[11px] font-mono text-emerald-800 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>XB: {userProfile.xboxGamertag}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick console action & sync time */}
          <div className="flex sm:flex-col items-start sm:items-end justify-between gap-2">
            <div className="text-right">
              <span className="text-xs text-slate-400 font-medium">Last synced:</span>
              <p className="text-xs font-semibold text-slate-700">{userProfile.lastSyncTime}</p>
            </div>
            <button
              onClick={onOpenConnectModal}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-800 shadow-xs transition-colors"
            >
              Manage Console IDs
            </button>
          </div>
        </div>

        {/* Big Trophy and Stats Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mt-6">
          {/* Platinum */}
          <div className="bg-slate-50 hover:bg-blue-50/50 p-4 rounded-2xl border border-slate-200/80 transition-all group">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Platinum</span>
              <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                <Trophy className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="font-orbitron font-extrabold text-2xl text-blue-700">
              {userProfile.trophies.platinum}
            </div>
            <span className="text-[11px] text-slate-400 font-medium">100% PS Platinums</span>
          </div>

          {/* Gold */}
          <div className="bg-slate-50 hover:bg-amber-50/50 p-4 rounded-2xl border border-slate-200/80 transition-all">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Gold</span>
              <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center text-amber-500">
                ★
              </div>
            </div>
            <div className="font-orbitron font-extrabold text-2xl text-amber-600">
              {userProfile.trophies.gold}
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Rare Gold Trophies</span>
          </div>

          {/* Silver & Bronze */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Silver / Bronze</span>
              <span className="text-[10px] font-bold text-slate-400">PSN</span>
            </div>
            <div className="font-orbitron font-extrabold text-xl text-slate-800">
              {userProfile.trophies.silver} <span className="text-slate-400 text-sm">/</span> {userProfile.trophies.bronze}
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Total: {userProfile.trophies.total}</span>
          </div>

          {/* Xbox Gamerscore */}
          <div className="bg-slate-50 hover:bg-emerald-50/50 p-4 rounded-2xl border border-slate-200/80 transition-all">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Gamerscore</span>
              <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 font-black text-xs">
                G
              </div>
            </div>
            <div className="font-orbitron font-extrabold text-2xl text-emerald-700">
              {userProfile.xboxGamerscore.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Xbox Live Points</span>
          </div>

          {/* Total Games Owned */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Library</span>
              <Gamepad2 className="w-4 h-4 text-slate-400" />
            </div>
            <div className="font-orbitron font-extrabold text-2xl text-slate-900">
              {games.length} <span className="text-xs font-normal text-slate-500">games</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium font-mono">
              <span className="text-blue-600">{psGamesCount} PS</span> • <span className="text-emerald-600">{xbGamesCount} XB</span>
            </span>
          </div>

          {/* Completion Rate */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completion</span>
              <BarChart3 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-orbitron font-extrabold text-2xl text-slate-900 flex items-baseline gap-1">
              <span>{userProfile.completionRate}%</span>
              <span className="text-xs font-bold text-amber-500">({completedCount} maxed)</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 via-amber-400 to-emerald-500 h-full rounded-full"
                style={{ width: `${userProfile.completionRate}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Toolbar */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Left: Console Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/80 overflow-x-auto">
          <button
            onClick={() => setSelectedPlatform('both')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              selectedPlatform === 'both'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Consoles ({games.length})
          </button>
          <button
            onClick={() => setSelectedPlatform('playstation')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              selectedPlatform === 'playstation'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-blue-600'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            PlayStation ({psGamesCount})
          </button>
          <button
            onClick={() => setSelectedPlatform('xbox')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              selectedPlatform === 'xbox'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-emerald-600'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Xbox ({xbGamesCount})
          </button>
        </div>

        {/* Right: Search, Status, and Sort */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search */}
          <div className="relative flex-1 sm:w-56">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search game or genre..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 focus:bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-800"
            />
          </div>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-50 rounded-xl border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Status: All</option>
            <option value="completed">100% Completed</option>
            <option value="in_progress">In Progress</option>
            <option value="backlog">Backlog</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-50 rounded-xl border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="completion">Sort: Completion %</option>
            <option value="hours">Sort: Hours Played</option>
            <option value="title">Sort: Alphabetical</option>
          </select>
        </div>
      </section>

      {/* Game Cards Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="font-orbitron font-bold text-lg text-slate-900">Your Owned Games</h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {filteredGames.length} shown
            </span>
          </div>
          <span className="text-xs text-slate-500">Click any game to inspect trophies & achievements</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGames.map((game) => {
            const isCompleted = game.completionPercentage === 100;
            return (
              <div
                key={game.id}
                onClick={() => setInspectingGame(game)}
                className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden flex flex-col group"
              >
                {/* Cover & Platform Badge Header */}
                <div className="relative h-44 overflow-hidden bg-slate-950">
                  <img
                    src={game.coverUrl}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold font-orbitron text-white shadow-xs ${
                        game.platform === 'playstation' ? 'bg-blue-600' : 'bg-emerald-600'
                      }`}
                    >
                      {game.platform === 'playstation' ? 'PlayStation' : 'Xbox'}
                    </span>
                    {isCompleted && (
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-400 text-slate-950 flex items-center gap-1 shadow-xs">
                        ★ 100% Champ
                      </span>
                    )}
                  </div>

                  {/* Completion Pill Bottom Right */}
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/20">
                    <span className="font-orbitron font-black text-sm text-white">
                      {game.completionPercentage}%
                    </span>
                  </div>

                  {/* Last played */}
                  <div className="absolute bottom-3 left-3 text-[11px] text-slate-300 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{game.hoursPlayed} hrs logged</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-orbitron font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {game.title}
                      </h3>
                      <span className="text-[11px] font-semibold text-slate-400 shrink-0">
                        {game.releaseYear}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {game.genre.map((g) => (
                        <span key={g} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-500 font-medium">Trophy Progress</span>
                      <span className="font-semibold text-slate-800">
                        {game.unlockedTrophies} of {game.totalTrophies} ({game.completionPercentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isCompleted
                            ? 'bg-amber-400'
                            : game.platform === 'playstation'
                            ? 'bg-blue-600'
                            : 'bg-emerald-600'
                        }`}
                        style={{ width: `${game.completionPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Trophy Details Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    {game.platform === 'playstation' ? (
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="text-blue-600 font-bold" title="Platinum">
                          ★ {game.trophyBreakdown.platinum}
                        </span>
                        <span className="text-amber-500 font-bold" title="Gold">
                          ◆ {game.trophyBreakdown.gold}
                        </span>
                        <span className="text-slate-400 font-bold" title="Silver">
                          ● {game.trophyBreakdown.silver}
                        </span>
                        <span className="text-amber-800 font-bold" title="Bronze">
                          ■ {game.trophyBreakdown.bronze}
                        </span>
                      </div>
                    ) : (
                      <div className="text-xs font-mono font-bold text-emerald-700">
                        {game.gamerscore ? `${game.gamerscore.unlocked} / ${game.gamerscore.total} G` : `${game.unlockedTrophies} Achievements`}
                      </div>
                    )}

                    <span className="text-xs font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Inspect
                      <span className="text-sm">→</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredGames.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <Trophy className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-orbitron font-bold text-base text-slate-800">No games found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Try adjusting your platform filters, search terms, or status selection.
            </p>
          </div>
        )}
      </section>

      {/* Game Details Inspection Modal */}
      <GameDetailsModal
        game={inspectingGame}
        isOpen={!!inspectingGame}
        onClose={() => setInspectingGame(null)}
        onToggleTrophyUnlock={onToggleTrophyUnlock}
      />
    </div>
  );
};
