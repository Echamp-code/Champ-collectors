export type ConsolePlatform = 'playstation' | 'xbox' | 'both';

export type TrophyRarity = 'Common' | 'Rare' | 'Very Rare' | 'Ultra Rare';

export type TrophyType = 'platinum' | 'gold' | 'silver' | 'bronze' | 'gamerscore';

export interface Trophy {
  id: string;
  title: string;
  description: string;
  type: TrophyType;
  points?: number; // For Xbox Gamerscore (e.g., 50G)
  rarity: TrophyRarity;
  rarityPercentage: number;
  unlocked: boolean;
  unlockedAt?: string;
  icon?: string;
  isSecret?: boolean;
}

export interface Game {
  id: string;
  title: string;
  coverUrl: string;
  bannerUrl: string;
  platform: 'playstation' | 'xbox';
  releaseYear: number;
  genre: string[];
  totalTrophies: number;
  unlockedTrophies: number;
  trophyBreakdown: {
    platinum: number;
    gold: number;
    silver: number;
    bronze: number;
  };
  gamerscore?: {
    total: number;
    unlocked: number;
  };
  hoursPlayed: number;
  lastPlayed: string;
  completionPercentage: number;
  status: 'completed' | 'in_progress' | 'backlog';
  trophies: Trophy[];
}

export interface UserProfile {
  name: string;
  avatar: string;
  title: string;
  psnId: string;
  psnConnected: boolean;
  psnLevel: number;
  psnLevelProgress: number;
  xboxGamertag: string;
  xboxConnected: boolean;
  xboxGamerscore: number;
  totalGamesOwned: number;
  totalHoursPlayed: number;
  trophies: {
    platinum: number;
    gold: number;
    silver: number;
    bronze: number;
    total: number;
  };
  completionRate: number;
  lastSyncTime: string;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'in_game' | 'offline';
  currentGame?: {
    title: string;
    platform: 'playstation' | 'xbox';
  };
  psnId?: string;
  xboxGamertag?: string;
  platforms: ConsolePlatform;
  totalTrophies: number;
  gamerscore: number;
  plasterLevel?: number;
  recentActivity: {
    gameTitle: string;
    trophyTitle: string;
    type: TrophyType;
    points?: number;
    timestamp: string;
  };
  games: Game[];
}

export interface FriendActivity {
  id: string;
  friendId: string;
  friendName: string;
  friendAvatar: string;
  gameTitle: string;
  gameCover: string;
  platform: 'playstation' | 'xbox';
  trophyName: string;
  trophyType: TrophyType;
  points?: number;
  rarity: TrophyRarity;
  timestamp: string;
}

export interface GameDeal {
  id: string;
  title: string;
  coverUrl: string;
  platform: 'playstation' | 'xbox';
  edition: string;
  originalPrice: number;
  salePrice: number;
  discountPercentage: number;
  endsInDays: number;
  rating: number;
  metacriticScore: number;
  subscriptionBenefit?: string; // e.g., "PS Plus Extra - Save 10% more" or "Included in Game Pass"
  isHistoricalLow?: boolean;
  storeUrl: string;
}

export interface GameOfTheMonth {
  id: string;
  title: string;
  coverUrl: string;
  bannerUrl: string;
  platform: 'playstation' | 'xbox';
  tier: string; // e.g. "PlayStation Plus Monthly Games", "Xbox Game Pass Day One"
  month: string;
  genre: string[];
  metacriticScore: number;
  approxCompletionHours: number;
  trophyDifficulty: string; // "3/10 (Easy)", "7/10 (Challenging)"
  claimed: boolean;
  description: string;
}

export interface FeatureAdvice {
  id: string;
  title: string;
  category: 'social' | 'hunting' | 'deals' | 'analytics' | 'hardware';
  shortSummary: string;
  detailedRationale: string;
  implementationEase: 'Easy' | 'Medium' | 'Advanced';
  userValue: 'Moderate' | 'Medium' | 'High' | 'Very High' | 'Essential';
  upvotes: number;
  tags: string[];
  interactiveDemoType?: 'ai_roadmap' | 'bounty_preview' | 'coop_finder' | 'price_radar';
}
