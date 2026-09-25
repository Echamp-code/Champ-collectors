import React, { useState } from 'react';
import { 
  Users, 
  Trophy, 
  Gamepad2, 
  Swords, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Search, 
  Sparkles, 
  ArrowRight,
  UserPlus,
  Heart,
  MessageSquare
} from 'lucide-react';
import { Friend, FriendActivity, UserProfile, Game } from '../types';
import { GameDetailsModal } from './GameDetailsModal';
import { AnimatedAvatar } from './AnimatedAvatar';

interface FriendsProgressViewProps {
  userProfile: UserProfile;
  userGames: Game[];
  friends: Friend[];
  activities: FriendActivity[];
  onAddFriend?: (name: string, platform: 'playstation' | 'xbox' | 'both') => void;
}

export const FriendsProgressView: React.FC<FriendsProgressViewProps> = ({
  userProfile,
  userGames,
  friends,
  activities,
  onAddFriend,
}) => {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(friends[0] || null);
  const [activeSubTab, setActiveSubTab] = useState<'roster' | 'compare' | 'feed'>('roster');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGameToInspect, setSelectedGameToInspect] = useState<Game | null>(null);
  const [cheeredActivities, setCheeredActivities] = useState<Record<string, number>>({});
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [newFriendInput, setNewFriendInput] = useState('');
  const [newFriendPlatform, setNewFriendPlatform] = useState<'playstation' | 'xbox' | 'both'>('playstation');
  const [friendAddSuccess, setFriendAddSuccess] = useState(false);

  const filteredFriends = friends.filter((f) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      f.name.toLowerCase().includes(q) ||
      (f.psnId && f.psnId.toLowerCase().includes(q)) ||
      (f.xboxGamertag && f.xboxGamertag.toLowerCase().includes(q))
    );
  });

  const handleCheer = (actId: string) => {
    setCheeredActivities((prev) => ({
      ...prev,
      [actId]: (prev[actId] || 0) + 1,
    }));
  };

  const handleAddFriendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFriendInput.trim()) return;
    if (onAddFriend) {
      onAddFriend(newFriendInput.trim(), newFriendPlatform);
    }
    setFriendAddSuccess(true);
    setTimeout(() => {
      setFriendAddSuccess(false);
      setNewFriendInput('');
      setIsAddFriendOpen(false);
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Friends Header Banner */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="font-orbitron font-extrabold text-2xl text-slate-900 tracking-wide">
                Gaming Friends Progress
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Track trophies, inspect games played, and compete head-to-head across PlayStation & Xbox
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveSubTab('roster')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeSubTab === 'roster'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Friends List ({friends.length})
            </button>
            <button
              onClick={() => setActiveSubTab('compare')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeSubTab === 'compare'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Swords className="w-3.5 h-3.5 text-amber-500" />
              <span>Head-to-Head</span>
            </button>
            <button
              onClick={() => setActiveSubTab('feed')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeSubTab === 'feed'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-blue-600" />
              <span>Live Trophy Feed</span>
            </button>
          </div>

          <button
            onClick={() => setIsAddFriendOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Friend</span>
          </button>
        </div>
      </section>

      {/* Sub-tab 1: Friends Roster & Details */}
      {activeSubTab === 'roster' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Friends List */}
          <div className="lg:col-span-5 space-y-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search friends by name, PSN, or Gamertag..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 shadow-xs"
              />
            </div>

            {/* Friend Cards */}
            <div className="space-y-2.5">
              {filteredFriends.map((friend) => {
                const isSelected = selectedFriend?.id === friend.id;
                return (
                  <div
                    key={friend.id}
                    onClick={() => setSelectedFriend(friend)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-blue-50/70 border-blue-300 shadow-xs ring-1 ring-blue-400/30'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <AnimatedAvatar
                        avatarId={friend.avatar}
                        name={friend.name}
                        size="md"
                        frameStyle={
                          friend.platforms === 'xbox'
                            ? 'xb_green'
                            : friend.platforms === 'playstation'
                            ? 'ps_blue'
                            : 'mythic_purple'
                        }
                        status={friend.status}
                        interactive
                      />

                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-semibold text-sm text-slate-900">{friend.name}</h3>
                          {friend.platforms === 'both' && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                              Dual
                            </span>
                          )}
                        </div>

                        {/* Current activity or last unlocked */}
                        {friend.status === 'in_game' && friend.currentGame ? (
                          <p className="text-[11px] text-purple-700 font-medium flex items-center gap-1">
                            <Gamepad2 className="w-3 h-3" />
                            Playing: {friend.currentGame.title}
                          </p>
                        ) : (
                          <p className="text-[11px] text-slate-500 font-mono">
                            Latest: {friend.recentActivity.trophyTitle}
                          </p>
                        )}

                        {/* Badges */}
                        <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-slate-600">
                          <span className="text-blue-700 font-semibold">PS: {friend.totalTrophies} Trophies</span>
                          <span>•</span>
                          <span className="text-emerald-700 font-semibold">XB: {friend.gamerscore.toLocaleString()} G</span>
                        </div>
                      </div>
                    </div>

                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-blue-600 translate-x-1' : 'text-slate-300'}`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Friend's Detailed Showcase */}
          <div className="lg:col-span-7">
            {selectedFriend ? (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <AnimatedAvatar
                      avatarId={selectedFriend.avatar}
                      name={selectedFriend.name}
                      size="xl"
                      frameStyle={
                        selectedFriend.platforms === 'xbox'
                          ? 'xb_green'
                          : selectedFriend.platforms === 'playstation'
                          ? 'ps_blue'
                          : 'mythic_purple'
                      }
                      status={selectedFriend.status}
                      interactive
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-orbitron font-bold text-xl text-slate-900">{selectedFriend.name}</h2>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
                          Friend
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 font-mono">
                        {selectedFriend.psnId && <span className="text-blue-600">PSN: {selectedFriend.psnId}</span>}
                        {selectedFriend.psnId && selectedFriend.xboxGamertag && <span>•</span>}
                        {selectedFriend.xboxGamertag && <span className="text-emerald-600">XB: {selectedFriend.xboxGamertag}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Compare button */}
                  <button
                    onClick={() => setActiveSubTab('compare')}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-orbitron text-xs font-bold transition-colors shadow-xs"
                  >
                    <Swords className="w-3.5 h-3.5" />
                    <span>Compare with Me</span>
                  </button>
                </div>

                {/* Friend Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">PS Trophies</span>
                    <div className="font-orbitron font-extrabold text-lg sm:text-xl text-blue-600 mt-0.5">
                      {selectedFriend.totalTrophies}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Gamerscore</span>
                    <div className="font-orbitron font-extrabold text-lg sm:text-xl text-emerald-600 mt-0.5">
                      {selectedFriend.gamerscore.toLocaleString()} G
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Games Listed</span>
                    <div className="font-orbitron font-extrabold text-lg sm:text-xl text-slate-800 mt-0.5">
                      {selectedFriend.games.length}
                    </div>
                  </div>
                </div>

                {/* Games Played by this friend */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-orbitron font-bold text-sm text-slate-900">
                      Games Played by {selectedFriend.name.split(' ')[0]}
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">Trophies & Completion</span>
                  </div>

                  <div className="space-y-3">
                    {selectedFriend.games.map((game) => (
                      <div
                        key={game.id}
                        onClick={() => setSelectedGameToInspect(game)}
                        className="p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 transition-all flex items-center justify-between gap-4 cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={game.coverUrl}
                            alt={game.title}
                            className="w-12 h-14 rounded-lg object-cover ring-1 ring-slate-200 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                                {game.title}
                              </h4>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded text-white ${
                                  game.platform === 'playstation' ? 'bg-blue-600' : 'bg-emerald-600'
                                }`}
                              >
                                {game.platform === 'playstation' ? 'PS5' : 'Xbox'}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 mt-1">
                              <div className="w-24 sm:w-36 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                <div
                                  className="bg-amber-400 h-full rounded-full"
                                  style={{ width: `${game.completionPercentage}%` }}
                                />
                              </div>
                              <span className="font-orbitron text-xs font-bold text-slate-700">
                                {game.completionPercentage}%
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-500 mt-1">
                              {game.unlockedTrophies} of {game.totalTrophies} trophies unlocked
                            </p>
                          </div>
                        </div>

                        <span className="text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                          View Trophies →
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500">Select a friend to view their progress & games.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sub-tab 2: Head-to-Head Comparison */}
      {activeSubTab === 'compare' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-slate-100">
              <div>
                <h2 className="font-orbitron font-extrabold text-xl text-slate-900 flex items-center gap-2">
                  <Swords className="w-5 h-5 text-amber-500" />
                  Head-to-Head Trophy Showdown
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Compare your personal trophy cabinet directly against any friend
                </p>
              </div>

              {/* Friend Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-semibold">Challenger:</span>
                <select
                  value={selectedFriend?.id || ''}
                  onChange={(e) => {
                    const found = friends.find((f) => f.id === e.target.value);
                    if (found) setSelectedFriend(found);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {friends.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.platforms === 'both' ? 'Dual' : f.platforms.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedFriend && (
              <div className="mt-6 space-y-8">
                {/* Side by side player cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* You */}
                  <div className="p-5 rounded-2xl border-2 border-blue-500/80 bg-blue-50/20 shadow-xs">
                    <div className="flex items-center gap-3 mb-4">
                      <AnimatedAvatar
                        avatarId={userProfile.avatar}
                        name={userProfile.name}
                        size="md"
                        frameStyle="ps_blue"
                        status="online"
                        interactive
                      />
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Player 1 (You)</span>
                        <h3 className="font-orbitron font-bold text-lg text-slate-900">{userProfile.name}</h3>
                        <p className="text-xs text-slate-500 font-mono">PS: {userProfile.psnId} • XB: {userProfile.xboxGamertag}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 rounded-xl bg-white border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-semibold">Platinums</span>
                        <div className="font-orbitron font-bold text-base text-blue-600">★ {userProfile.trophies.platinum}</div>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-semibold">Total Trophies</span>
                        <div className="font-orbitron font-bold text-base text-amber-600">{userProfile.trophies.total}</div>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-semibold">Gamerscore</span>
                        <div className="font-orbitron font-bold text-base text-emerald-600">{userProfile.xboxGamerscore.toLocaleString()} G</div>
                      </div>
                    </div>
                  </div>

                  {/* Friend */}
                  <div className="p-5 rounded-2xl border-2 border-amber-400/80 bg-amber-50/20 shadow-xs">
                    <div className="flex items-center gap-3 mb-4">
                      <AnimatedAvatar
                        avatarId={selectedFriend.avatar}
                        name={selectedFriend.name}
                        size="md"
                        frameStyle="trophy_gold"
                        status={selectedFriend.status}
                        interactive
                      />
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Player 2 (Challenger)</span>
                        <h3 className="font-orbitron font-bold text-lg text-slate-900">{selectedFriend.name}</h3>
                        <p className="text-xs text-slate-500 font-mono">
                          {selectedFriend.psnId ? `PS: ${selectedFriend.psnId}` : ''}{' '}
                          {selectedFriend.xboxGamertag ? `• XB: ${selectedFriend.xboxGamertag}` : ''}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 rounded-xl bg-white border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-semibold">Platinums</span>
                        <div className="font-orbitron font-bold text-base text-blue-600">
                          ★ {Math.round(selectedFriend.totalTrophies / 60)}
                        </div>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-semibold">Total Trophies</span>
                        <div className="font-orbitron font-bold text-base text-amber-600">{selectedFriend.totalTrophies}</div>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-semibold">Gamerscore</span>
                        <div className="font-orbitron font-bold text-base text-emerald-600">{selectedFriend.gamerscore.toLocaleString()} G</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shared Games Comparison Breakdown */}
                <div>
                  <h3 className="font-orbitron font-bold text-base text-slate-900 mb-4">
                    Shared Games Comparison
                  </h3>

                  <div className="space-y-4">
                    {userGames.slice(0, 4).map((game) => {
                      // Find if friend has this game
                      const friendGame = selectedFriend.games.find(
                        (fg) => fg.title.toLowerCase() === game.title.toLowerCase()
                      );
                      const friendPct = friendGame ? friendGame.completionPercentage : 0;
                      const youPct = game.completionPercentage;
                      const youLead = youPct > friendPct;
                      const friendLead = friendPct > youPct;

                      return (
                        <div
                          key={game.id}
                          className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img
                                src={game.coverUrl}
                                alt={game.title}
                                className="w-10 h-10 rounded-lg object-cover ring-1 ring-slate-200"
                              />
                              <div>
                                <h4 className="font-semibold text-sm text-slate-900">{game.title}</h4>
                                <span className="text-[11px] text-slate-500">{game.genre.join(', ')}</span>
                              </div>
                            </div>

                            <div className="text-right">
                              {youLead && (
                                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                                  You're Leading (+{youPct - friendPct}%)
                                </span>
                              )}
                              {friendLead && (
                                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                                  {selectedFriend.name.split(' ')[0]} Leads (+{friendPct - youPct}%)
                                </span>
                              )}
                              {youPct === friendPct && (
                                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                                  Tied at {youPct}%
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Progress comparison visual */}
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            {/* You */}
                            <div>
                              <div className="flex justify-between text-slate-600 mb-1">
                                <span className="font-semibold">You</span>
                                <span className="font-orbitron font-bold text-blue-600">{youPct}%</span>
                              </div>
                              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div
                                  className="bg-blue-600 h-full rounded-full"
                                  style={{ width: `${youPct}%` }}
                                />
                              </div>
                            </div>

                            {/* Friend */}
                            <div>
                              <div className="flex justify-between text-slate-600 mb-1">
                                <span className="font-semibold">{selectedFriend.name.split(' ')[0]}</span>
                                <span className="font-orbitron font-bold text-amber-600">{friendPct}%</span>
                              </div>
                              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div
                                  className="bg-amber-400 h-full rounded-full"
                                  style={{ width: `${friendPct}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sub-tab 3: Live Trophy Feed */}
      {activeSubTab === 'feed' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div>
            <h2 className="font-orbitron font-extrabold text-xl text-slate-900 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              Live Friend Activity & Trophy Ticker
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Real-time feed of newly unlocked trophies, 1000G completions, and friend milestones
            </p>
          </div>

          <div className="space-y-4">
            {activities.map((act) => {
              const cheers = (cheeredActivities[act.id] || 0);
              return (
                <div
                  key={act.id}
                  className="p-4 rounded-2xl bg-slate-50/70 hover:bg-slate-50 border border-slate-200/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <AnimatedAvatar
                      avatarId={act.friendAvatar}
                      name={act.friendName}
                      size="sm"
                      frameStyle={act.platform === 'playstation' ? 'ps_blue' : 'xb_green'}
                      interactive
                    />

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-slate-900">{act.friendName}</span>
                        <span className="text-xs text-slate-500">unlocked in</span>
                        <span className="font-semibold text-xs text-slate-800">{act.gameTitle}</span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded text-white ${
                            act.platform === 'playstation' ? 'bg-blue-600' : 'bg-emerald-600'
                          }`}
                        >
                          {act.platform === 'playstation' ? 'PS5' : 'Xbox'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <Trophy className="w-3.5 h-3.5 text-amber-500" />
                        <span className="font-orbitron font-semibold text-xs text-slate-900">
                          {act.trophyName}
                        </span>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          {act.rarity}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">• {act.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Reactions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleCheer(act.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-amber-300 hover:text-amber-600 transition-colors shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Cheer GG!</span>
                      {cheers > 0 && (
                        <span className="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                          +{cheers}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Friend Modal */}
      {isAddFriendOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <h3 className="font-orbitron font-bold text-lg text-slate-900">Add Gaming Friend</h3>
            <p className="text-xs text-slate-500">Connect with a gamer friend using their PSN ID or Xbox Gamertag.</p>

            <form onSubmit={handleAddFriendSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Gamer Handle / ID</label>
                <input
                  type="text"
                  required
                  value={newFriendInput}
                  onChange={(e) => setNewFriendInput(e.target.value)}
                  placeholder="e.g. SpartanHunter_99"
                  className="w-full px-3 py-2 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Platform</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewFriendPlatform('playstation')}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      newFriendPlatform === 'playstation'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    PlayStation
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewFriendPlatform('xbox')}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      newFriendPlatform === 'xbox'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Xbox
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewFriendPlatform('both')}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      newFriendPlatform === 'both'
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Cross-Console
                  </button>
                </div>
              </div>

              {friendAddSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Friend request sent and trophy sync initialized!
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddFriendOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inspect Friend's Game Trophies Modal */}
      <GameDetailsModal
        game={selectedGameToInspect}
        isOpen={!!selectedGameToInspect}
        onClose={() => setSelectedGameToInspect(null)}
      />
    </div>
  );
};
