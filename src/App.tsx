import React, { useState } from 'react';
import { Trophy, CheckCircle2, RefreshCw, Gamepad2, Shield, Heart } from 'lucide-react';
import { initialUserProfile, sampleGames, sampleFriends, liveFriendFeed, sampleDeals, sampleGamesOfTheMonth, featureAdvisories } from './data/mockData';
import { UserProfile, Game, FriendActivity } from './types';
import { Header } from './components/Header';
import { PersonalProgressView } from './components/PersonalProgressView';
import { FriendsProgressView } from './components/FriendsProgressView';
import { DealsAndMonthlyView } from './components/DealsAndMonthlyView';
import { FeatureAdvisorView } from './components/FeatureAdvisorView';
import { AccountConnectModal } from './components/AccountConnectModal';
import { AvatarCustomizerModal } from './components/AvatarCustomizerModal';
import { resolveAvatarArchetype } from './components/AnimatedAvatar';

export default function App() {
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [games, setGames] = useState<Game[]>(sampleGames);
  const [friends, setFriends] = useState(sampleFriends);
  const [activities, setActivities] = useState<FriendActivity[]>(liveFriendFeed);
  const [activeTab, setActiveTab] = useState<'my_progress' | 'friends' | 'deals' | 'advisory'>('my_progress');
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleSync = () => {
    setIsSyncing(true);
    showToast('Connecting to PlayStation Network & Xbox Live...');

    setTimeout(() => {
      setIsSyncing(false);
      setUserProfile((prev) => ({
        ...prev,
        lastSyncTime: 'Just now',
      }));
      showToast('Trophy & Gamerscore sync completed! 100% up-to-date.');
    }, 1200);
  };

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => ({
      ...prev,
      ...updated,
    }));
    showToast('Console connections updated.');
  };

  const handleUpdateAvatar = (avatarId: string) => {
    setUserProfile((prev) => ({
      ...prev,
      avatar: avatarId,
    }));
    showToast('Animated profile picture updated successfully!');
  };

  const handleAddFriend = (name: string, platform: 'playstation' | 'xbox' | 'both') => {
    const archetype = resolveAvatarArchetype(undefined, name);
    const newFriend = {
      id: `friend-${Date.now()}`,
      name,
      avatar: `avatar-${archetype}`,
      status: 'online' as const,
      psnId: platform !== 'xbox' ? `${name.replace(/\s+/g, '_')}_PS` : undefined,
      xboxGamertag: platform !== 'playstation' ? `${name.replace(/\s+/g, '')}XB` : undefined,
      platforms: platform,
      totalTrophies: Math.floor(Math.random() * 800) + 200,
      gamerscore: Math.floor(Math.random() * 25000) + 5000,
      recentActivity: {
        gameTitle: 'Astro Bot',
        trophyTitle: 'Welcome to the Squad',
        type: 'gold' as const,
        timestamp: 'Just now',
      },
      games: sampleGames.slice(0, 3),
    };

    setFriends((prev) => [newFriend, ...prev]);
    showToast(`Added ${name} to your friends list with animated avatar!`);
  };

  const handleToggleTrophyUnlock = (gameId: string, trophyId: string) => {
    setGames((prevGames) =>
      prevGames.map((game) => {
        if (game.id !== gameId) return game;

        const updatedTrophies = game.trophies.map((t) => {
          if (t.id !== trophyId) return t;
          const nextState = !t.unlocked;
          return {
            ...t,
            unlocked: nextState,
            unlockedAt: nextState ? 'Just now' : undefined,
          };
        });

        const unlockedCount = updatedTrophies.filter((t) => t.unlocked).length;
        const newCompletionPct = Math.round((unlockedCount / game.totalTrophies) * 100);

        // Find the trophy
        const targetTrophy = updatedTrophies.find((t) => t.id === trophyId);
        if (targetTrophy && targetTrophy.unlocked) {
          showToast(`Trophy Unlocked: "${targetTrophy.title}" in ${game.title}!`);

          // Add to activity feed
          const newActivity: FriendActivity = {
            id: `act-self-${Date.now()}`,
            friendId: 'self',
            friendName: `${userProfile.name} (You)`,
            friendAvatar: userProfile.avatar,
            gameTitle: game.title,
            gameCover: game.coverUrl,
            platform: game.platform,
            trophyName: targetTrophy.title,
            trophyType: targetTrophy.type,
            points: targetTrophy.points,
            rarity: targetTrophy.rarity,
            timestamp: 'Just now',
          };
          setActivities((prev) => [newActivity, ...prev]);
        }

        return {
          ...game,
          unlockedTrophies: unlockedCount,
          completionPercentage: newCompletionPct,
          status: newCompletionPct === 100 ? 'completed' : 'in_progress',
          trophies: updatedTrophies,
        };
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFD] text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-22 right-5 z-50 animate-in slide-in-from-top-3 fade-in duration-200">
          <div className="bg-slate-950 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-2.5 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Global Navigation Header */}
      <Header
        userProfile={userProfile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenConnectModal={() => setIsConnectModalOpen(true)}
        onOpenAvatarCustomizer={() => setIsAvatarModalOpen(true)}
        onSync={handleSync}
        isSyncing={isSyncing}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'my_progress' && (
          <PersonalProgressView
            userProfile={userProfile}
            games={games}
            onOpenConnectModal={() => setIsConnectModalOpen(true)}
            onOpenAvatarCustomizer={() => setIsAvatarModalOpen(true)}
            onToggleTrophyUnlock={handleToggleTrophyUnlock}
          />
        )}

        {activeTab === 'friends' && (
          <FriendsProgressView
            userProfile={userProfile}
            userGames={games}
            friends={friends}
            activities={activities}
            onAddFriend={handleAddFriend}
          />
        )}

        {activeTab === 'deals' && (
          <DealsAndMonthlyView
            deals={sampleDeals}
            gamesOfTheMonth={sampleGamesOfTheMonth}
          />
        )}

        {activeTab === 'advisory' && (
          <FeatureAdvisorView advisories={featureAdvisories} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="font-orbitron font-bold text-slate-900 tracking-wider">
              CHAMP COLLECTORS
            </span>
            <span>• PlayStation & Xbox Friends Connector</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-medium">
            <button
              onClick={() => setIsAvatarModalOpen(true)}
              className="text-amber-600 font-semibold hover:underline flex items-center gap-1"
            >
              ★ Animated Avatar Studio
            </button>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1 text-blue-700">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              PSN Sync Active
            </span>
            <span className="flex items-center gap-1 text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              Xbox Live Connected
            </span>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => setActiveTab('advisory')}
              className="hover:text-purple-600 transition-colors"
            >
              Suggested Features Roadmap
            </button>
          </div>
        </div>
      </footer>

      {/* Account Connect / Manage Modal */}
      <AccountConnectModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        userProfile={userProfile}
        onUpdateProfile={handleUpdateProfile}
        onTriggerSync={handleSync}
        onOpenAvatarStudio={() => setIsAvatarModalOpen(true)}
      />

      {/* Animated Avatar Customizer Modal */}
      <AvatarCustomizerModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        userProfile={userProfile}
        onUpdateAvatar={handleUpdateAvatar}
      />
    </div>
  );
}
