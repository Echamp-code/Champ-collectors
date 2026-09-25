import React from 'react';
import { Trophy, Gamepad2, RefreshCw, Users, Flame, Sparkles, SlidersHorizontal, CheckCircle2, ShieldAlert, Wand2 } from 'lucide-react';
import { UserProfile } from '../types';
import { AnimatedAvatar } from './AnimatedAvatar';

interface HeaderProps {
  userProfile: UserProfile;
  activeTab: 'my_progress' | 'friends' | 'deals' | 'advisory';
  setActiveTab: (tab: 'my_progress' | 'friends' | 'deals' | 'advisory') => void;
  onOpenConnectModal: () => void;
  onOpenAvatarCustomizer?: () => void;
  onSync: () => void;
  isSyncing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  userProfile,
  activeTab,
  setActiveTab,
  onOpenConnectModal,
  onOpenAvatarCustomizer,
  onSync,
  isSyncing,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('my_progress')}>
            <div className="relative w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center shadow-md overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-yellow-500 to-emerald-500 opacity-85 transition-opacity group-hover:opacity-100" />
              <Trophy className="relative w-6 h-6 text-white drop-shadow-sm transition-transform group-hover:scale-110" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-orbitron font-extrabold text-xl tracking-wider text-slate-900">
                  CHAMP <span className="text-blue-600">COLLECTORS</span>
                </span>
                <span className="hidden sm:inline-flex text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-300/70">
                  v2.4 Live
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Cross-Platform Trophy & Friends Hub</p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80">
            <button
              id="nav-my-progress-btn"
              onClick={() => setActiveTab('my_progress')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'my_progress'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Trophy className={`w-4 h-4 ${activeTab === 'my_progress' ? 'text-amber-500' : 'text-slate-400'}`} />
              <span>My Progress</span>
            </button>

            <button
              id="nav-friends-btn"
              onClick={() => setActiveTab('friends')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'friends'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Users className={`w-4 h-4 ${activeTab === 'friends' ? 'text-blue-600' : 'text-slate-400'}`} />
              <span>Friends & Activity</span>
            </button>

            <button
              id="nav-deals-btn"
              onClick={() => setActiveTab('deals')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'deals'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Flame className={`w-4 h-4 ${activeTab === 'deals' ? 'text-red-500' : 'text-slate-400'}`} />
              <span>Deals & Monthly</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </button>

            <button
              id="nav-advisory-btn"
              onClick={() => setActiveTab('advisory')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'advisory'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Sparkles className={`w-4 h-4 ${activeTab === 'advisory' ? 'text-purple-600' : 'text-slate-400'}`} />
              <span>Feature Advice</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-700">
                New
              </span>
            </button>
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-2.5">
            {/* Quick Console Link Status */}
            <button
              id="header-connect-consoles-btn"
              onClick={onOpenConnectModal}
              title="Manage PlayStation & Xbox Connections"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-xs text-xs font-medium text-slate-700"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-[10px] font-bold text-white ${
                    userProfile.psnConnected ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                  title={userProfile.psnConnected ? 'PlayStation Connected' : 'PlayStation Disconnected'}
                >
                  PS
                </span>
                <span
                  className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-[10px] font-bold text-white ${
                    userProfile.xboxConnected ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}
                  title={userProfile.xboxConnected ? 'Xbox Connected' : 'Xbox Disconnected'}
                >
                  XB
                </span>
              </div>
              <span className="hidden xl:inline text-slate-600">
                {userProfile.psnConnected && userProfile.xboxConnected ? 'Dual Sync' : 'Link Console'}
              </span>
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Quick Sync Button */}
            <button
              id="header-sync-btn"
              onClick={onSync}
              disabled={isSyncing}
              title="Sync latest trophies and gamerscore"
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-xs disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 text-blue-600 ${isSyncing ? 'animate-spin' : ''}`} />
            </button>

            {/* User Profile Mini Badge with Animated Avatar */}
            <div
              onClick={onOpenAvatarCustomizer || onOpenConnectModal}
              title="Click to customize your Animated Avatar & Profile"
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 cursor-pointer transition-all hover:border-amber-300 group shadow-2xs"
            >
              <AnimatedAvatar
                avatarId={userProfile.avatar}
                name={userProfile.name}
                size="sm"
                frameStyle="trophy_gold"
                status="online"
                interactive
              />
              <div className="hidden sm:block text-left">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">
                    {userProfile.name}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                  <span className="text-amber-600 font-semibold">★ {userProfile.trophies.platinum} Plats</span>
                  <span>•</span>
                  <span className="text-emerald-600 font-semibold">{userProfile.xboxGamerscore.toLocaleString()} G</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center justify-around py-2.5 border-t border-slate-100 overflow-x-auto">
          <button
            onClick={() => setActiveTab('my_progress')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeTab === 'my_progress' ? 'bg-blue-50 text-blue-700' : 'text-slate-600'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            My Progress
          </button>
          <button
            onClick={() => setActiveTab('friends')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeTab === 'friends' ? 'bg-blue-50 text-blue-700' : 'text-slate-600'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-blue-600" />
            Friends
          </button>
          <button
            onClick={() => setActiveTab('deals')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeTab === 'deals' ? 'bg-blue-50 text-blue-700' : 'text-slate-600'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-red-500" />
            Deals
          </button>
          <button
            onClick={() => setActiveTab('advisory')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeTab === 'advisory' ? 'bg-blue-50 text-blue-700' : 'text-slate-600'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            Advice
          </button>
        </div>
      </div>
    </header>
  );
};
