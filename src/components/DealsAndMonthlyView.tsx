import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  Tag, 
  Clock, 
  Star, 
  CheckCircle2, 
  ExternalLink, 
  Bookmark, 
  Trophy, 
  Zap, 
  ShieldCheck,
  TrendingDown
} from 'lucide-react';
import { GameDeal, GameOfTheMonth, ConsolePlatform } from '../types';

interface DealsAndMonthlyViewProps {
  deals: GameDeal[];
  gamesOfTheMonth: GameOfTheMonth[];
}

export const DealsAndMonthlyView: React.FC<DealsAndMonthlyViewProps> = ({
  deals,
  gamesOfTheMonth,
}) => {
  const [activeMode, setActiveMode] = useState<'deals' | 'monthly'>('deals');
  const [selectedPlatform, setSelectedPlatform] = useState<ConsolePlatform>('both');
  const [claimedGames, setClaimedGames] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    gamesOfTheMonth.forEach((g) => {
      map[g.id] = g.claimed;
    });
    return map;
  });
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const toggleClaim = (id: string) => {
    setClaimedGames((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredDeals = deals.filter((d) => {
    if (selectedPlatform === 'playstation') return d.platform === 'playstation';
    if (selectedPlatform === 'xbox') return d.platform === 'xbox';
    return true;
  });

  const filteredMonthly = gamesOfTheMonth.filter((m) => {
    if (selectedPlatform === 'playstation') return m.platform === 'playstation';
    if (selectedPlatform === 'xbox') return m.platform === 'xbox';
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center">
              <Flame className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h1 className="font-orbitron font-extrabold text-2xl text-slate-900 tracking-wide">
                Console Deals & Monthly Games
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Curated PlayStation Store discounts, Xbox Game Pass additions, and free monthly drops
              </p>
            </div>
          </div>
        </div>

        {/* View Switcher: Deals vs Monthly */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveMode('deals')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeMode === 'deals'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Tag className="w-3.5 h-3.5 text-red-500" />
            <span>Hottest Deals</span>
            <span className="px-1.5 py-0.2 rounded-md bg-red-100 text-red-700 text-[10px] font-mono">
              Up to 65% OFF
            </span>
          </button>

          <button
            onClick={() => setActiveMode('monthly')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeMode === 'monthly'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Games of the Month</span>
            <span className="px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-mono">
              Free with Sub
            </span>
          </button>
        </div>
      </section>

      {/* Platform Filter Toolbar */}
      <section className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Filter Store:</span>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setSelectedPlatform('both')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedPlatform === 'both' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Both Consoles
            </button>
            <button
              onClick={() => setSelectedPlatform('playstation')}
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedPlatform === 'playstation' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              PlayStation Store
            </button>
            <button
              onClick={() => setSelectedPlatform('xbox')}
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedPlatform === 'xbox' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-emerald-600'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Xbox Store
            </button>
          </div>
        </div>

        <span className="text-xs text-slate-500 font-medium">
          {activeMode === 'deals' ? `${filteredDeals.length} deals active today` : `${filteredMonthly.length} monthly games available`}
        </span>
      </section>

      {/* Mode 1: Hottest Deals Grid */}
      {activeMode === 'deals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => {
            const isWishlisted = wishlist[deal.id];
            return (
              <div
                key={deal.id}
                className="bg-white rounded-3xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Cover banner */}
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <img
                      src={deal.coverUrl}
                      alt={deal.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold font-orbitron text-white shadow-xs ${
                          deal.platform === 'playstation' ? 'bg-blue-600' : 'bg-emerald-600'
                        }`}
                      >
                        {deal.platform === 'playstation' ? 'PlayStation Store' : 'Xbox Store'}
                      </span>
                      {deal.isHistoricalLow && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-400 text-slate-950 flex items-center gap-1 shadow-xs">
                          <TrendingDown className="w-3 h-3" />
                          All-Time Low
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(deal.id)}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isWishlisted
                          ? 'bg-amber-400 text-slate-950 shadow-md'
                          : 'bg-black/50 hover:bg-black/80 text-white backdrop-blur-xs'
                      }`}
                      title={isWishlisted ? 'Saved to Trophy Wishlist' : 'Add to Wishlist'}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>

                    {/* Discount badge & ends timer */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-lg bg-red-600 text-white font-orbitron font-extrabold text-sm shadow-md">
                        -{deal.discountPercentage}%
                      </span>
                      <span className="text-[11px] text-slate-200 font-medium bg-black/60 px-2 py-1 rounded-md backdrop-blur-xs flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        Ends in {deal.endsInDays} days
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="font-orbitron font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {deal.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{deal.edition}</p>
                    </div>

                    {/* Ratings */}
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded font-orbitron font-bold bg-emerald-100 text-emerald-800 text-[11px]">
                        Metascore: {deal.metacriticScore}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-600 font-semibold flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {deal.rating} / 5.0
                      </span>
                    </div>

                    {/* Subscription Benefit */}
                    {deal.subscriptionBenefit && (
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700 flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="line-clamp-1">{deal.subscriptionBenefit}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Price & Store Action */}
                <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div>
                    <span className="text-xs text-slate-400 line-through mr-2">
                      ${deal.originalPrice.toFixed(2)}
                    </span>
                    <span className="font-orbitron font-black text-xl text-slate-950">
                      ${deal.salePrice.toFixed(2)}
                    </span>
                  </div>

                  <a
                    href={deal.storeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <span>Store Deal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mode 2: Games of the Month */}
      {activeMode === 'monthly' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMonthly.map((gotm) => {
            const isClaimed = claimedGames[gotm.id];
            return (
              <div
                key={gotm.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Banner */}
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <img
                      src={gotm.coverUrl}
                      alt={gotm.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold font-orbitron text-white shadow-xs ${
                          gotm.platform === 'playstation' ? 'bg-blue-600' : 'bg-emerald-600'
                        }`}
                      >
                        {gotm.tier}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-200 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-xs">
                        {gotm.month}
                      </span>
                      <span className="px-2 py-0.5 rounded font-orbitron font-bold bg-amber-400 text-slate-950 text-xs">
                        Metascore {gotm.metacriticScore}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-orbitron font-bold text-lg text-slate-900">
                      {gotm.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {gotm.description}
                    </p>

                    {/* Trophy Hunter Insights */}
                    <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-amber-900 flex items-center gap-1">
                          <Trophy className="w-3.5 h-3.5 text-amber-500" />
                          Plat / 1000G Difficulty:
                        </span>
                        <strong className="text-slate-800 font-mono">{gotm.trophyDifficulty}</strong>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Estimated 100% Time:</span>
                        <strong className="text-slate-800 font-mono">~{gotm.approxCompletionHours} hours</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer with Claim Toggle */}
                <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-1.5 text-xs">
                    {isClaimed ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        In Your Library
                      </span>
                    ) : (
                      <span className="text-slate-500 font-medium">Available this month</span>
                    )}
                  </div>

                  <button
                    onClick={() => toggleClaim(gotm.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                      isClaimed
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    {isClaimed ? 'Claimed ✓' : 'Mark Claimed'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
