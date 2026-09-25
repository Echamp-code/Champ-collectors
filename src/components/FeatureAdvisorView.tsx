import React, { useState } from 'react';
import { 
  Sparkles, 
  ThumbsUp, 
  Compass, 
  Bot, 
  Users2, 
  TrendingDown, 
  Award, 
  Gamepad, 
  Sliders, 
  Send, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Shield,
  Layers
} from 'lucide-react';
import { FeatureAdvice } from '../types';

interface FeatureAdvisorViewProps {
  advisories: FeatureAdvice[];
}

export const FeatureAdvisorView: React.FC<FeatureAdvisorViewProps> = ({ advisories }) => {
  const [featureList, setFeatureList] = useState<FeatureAdvice[]>(advisories);
  const [userVotes, setUserVotes] = useState<Record<string, boolean>>({});
  const [activeDemo, setActiveDemo] = useState<string>('ai_roadmap');

  // Interactive Demo 1 State (AI Roadmap)
  const [selectedGameForRoadmap, setSelectedGameForRoadmap] = useState<'Astro Bot' | 'Elden Ring' | 'Spider-Man 2'>('Astro Bot');
  const [roadmapStep, setRoadmapStep] = useState<number>(1);

  // Interactive Demo 2 State (Co-op Booster)
  const [boostingSquads, setBoostingSquads] = useState([
    { id: 'sq-1', game: 'Helldivers 2', trophy: 'Hold My Primary', platform: 'both', host: 'VanceCollector_PS', members: 3, max: 4, joined: false },
    { id: 'sq-2', game: 'Halo Infinite', trophy: 'Headmaster (LASO)', platform: 'xbox', host: 'ChiefMiller_117', members: 2, max: 4, joined: false },
    { id: 'sq-3', game: 'Elden Ring', trophy: 'Malenia Co-Op Help', platform: 'playstation', host: 'NeoTokyo_Chloe', members: 1, max: 3, joined: false },
  ]);

  // Interactive Demo 3 State (Price Radar)
  const [radarTargetPrice, setRadarTargetPrice] = useState(29.99);
  const [radarSaved, setRadarSaved] = useState(false);

  // Feature suggestion form
  const [userSuggestion, setUserSuggestion] = useState('');
  const [suggestCategory, setSuggestCategory] = useState<'social' | 'hunting' | 'deals' | 'hardware'>('hunting');
  const [submittedSuggestion, setSubmittedSuggestion] = useState(false);

  const handleVote = (id: string) => {
    const hasVoted = userVotes[id];
    setUserVotes((prev) => ({ ...prev, [id]: !hasVoted }));
    setFeatureList((prev) =>
      prev.map((f) => (f.id === id ? { ...f, upvotes: f.upvotes + (hasVoted ? -1 : 1) } : f))
    );
  };

  const handleJoinSquad = (id: string) => {
    setBoostingSquads((prev) =>
      prev.map((sq) => (sq.id === id ? { ...sq, joined: !sq.joined, members: sq.joined ? sq.members - 1 : sq.members + 1 } : sq))
    );
  };

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userSuggestion.trim()) return;
    setSubmittedSuggestion(true);
    setTimeout(() => {
      setUserSuggestion('');
      setSubmittedSuggestion(false);
    }, 2500);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Advisor Header */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-orbitron font-extrabold text-2xl text-slate-900 tracking-wide">
                  Feature Advisory & Architecture Roadmap
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                  Expansion Advisory
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Strategic feature recommendations to elevate Champ Collectors into the ultimate gamer hub
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Prototype Sandbox for Advised Features */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">
              Interactive Prototypes
            </span>
            <h2 className="font-orbitron font-bold text-lg text-slate-900">
              Test Advised Features in Real-Time
            </h2>
          </div>

          {/* Prototype Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl overflow-x-auto">
            <button
              onClick={() => setActiveDemo('ai_roadmap')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeDemo === 'ai_roadmap' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1. AI Trophy Roadmap
            </button>
            <button
              onClick={() => setActiveDemo('coop_finder')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeDemo === 'coop_finder' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2. Co-Op Boosting Lobby
            </button>
            <button
              onClick={() => setActiveDemo('price_radar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeDemo === 'price_radar' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              3. Backlog Price Radar
            </button>
          </div>
        </div>

        {/* Demo 1: AI Trophy Roadmap */}
        {activeDemo === 'ai_roadmap' && (
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-600" />
                <h3 className="font-orbitron font-bold text-sm text-slate-900">
                  AI 100% Playthrough Route Generator
                </h3>
              </div>

              {/* Game picker */}
              <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 text-xs">
                {(['Astro Bot', 'Elden Ring', 'Spider-Man 2'] as const).map((game) => (
                  <button
                    key={game}
                    onClick={() => setSelectedGameForRoadmap(game)}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                      selectedGameForRoadmap === game ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {game}
                  </button>
                ))}
              </div>
            </div>

            {/* Generated Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div
                onClick={() => setRoadmapStep(1)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  roadmapStep === 1 ? 'bg-white border-blue-400 shadow-xs ring-1 ring-blue-300' : 'bg-white/60 border-slate-200'
                }`}
              >
                <span className="text-[10px] font-bold text-blue-600 uppercase">Stage 1</span>
                <h4 className="font-semibold text-xs text-slate-900 mt-1">Main Story & Blind Run</h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  Enjoy without spoilers. Collect 25 VIP Bots naturally. No permanent missables in early levels.
                </p>
              </div>

              <div
                onClick={() => setRoadmapStep(2)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  roadmapStep === 2 ? 'bg-white border-amber-400 shadow-xs ring-1 ring-amber-300' : 'bg-white/60 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-600 uppercase">Stage 2</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-red-100 text-red-700 flex items-center gap-0.5">
                    <AlertTriangle className="w-2.5 h-2.5" /> Missable Alert
                  </span>
                </div>
                <h4 className="font-semibold text-xs text-slate-900 mt-1">Lost Galaxies & Artifacts</h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  Activate wormhole portals in World 4 before the final boss trigger to avoid chapter re-run.
                </p>
              </div>

              <div
                onClick={() => setRoadmapStep(3)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  roadmapStep === 3 ? 'bg-white border-emerald-400 shadow-xs ring-1 ring-emerald-300' : 'bg-white/60 border-slate-200'
                }`}
              >
                <span className="text-[10px] font-bold text-emerald-600 uppercase">Stage 3</span>
                <h4 className="font-semibold text-xs text-slate-900 mt-1">Speedrun & Platinum Sweep</h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  Clean up remaining miscellaneous challenge stages and trigger the Golden Trophy unlock.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-center justify-between text-xs text-blue-900">
              <span>Estimated 100% Trophy Time: <strong>18-22 hours</strong> (Saved ~9 hours vs unguided play)</span>
              <span className="font-semibold text-blue-700">Powered by Collector Intelligence</span>
            </div>
          </div>
        )}

        {/* Demo 2: Co-op Boosting Lobby */}
        {activeDemo === 'coop_finder' && (
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users2 className="w-5 h-5 text-emerald-600" />
                <h3 className="font-orbitron font-bold text-sm text-slate-900">
                  Cross-Platform Co-Op Trophy Lobbies
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">3 active hunting sessions</span>
            </div>

            <div className="space-y-2.5">
              {boostingSquads.map((sq) => (
                <div
                  key={sq.id}
                  className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-3 shadow-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-xs text-slate-900">{sq.game}</h4>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                        {sq.trophy}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Host: {sq.host}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Mic optional • Co-op sync • {sq.members}/{sq.max} Players ready
                    </p>
                  </div>

                  <button
                    onClick={() => handleJoinSquad(sq.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      sq.joined
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    {sq.joined ? 'Squad Joined ✓' : 'Join Squad'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Demo 3: Backlog Price Radar */}
        {activeDemo === 'price_radar' && (
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-amber-500" />
              <h3 className="font-orbitron font-bold text-sm text-slate-900">
                Backlog Price Radar & Deal Trigger
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Set Alert Price for "Silent Hill 2" (Current: $69.99):</span>
                <span className="font-orbitron font-bold text-base text-blue-600">${radarTargetPrice.toFixed(2)}</span>
              </div>

              <input
                type="range"
                min={19.99}
                max={59.99}
                step={5}
                value={radarTargetPrice}
                onChange={(e) => setRadarTargetPrice(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-500">
                  Target: {Math.round(((69.99 - radarTargetPrice) / 69.99) * 100)}% Discount threshold
                </span>
                <button
                  onClick={() => setRadarSaved(true)}
                  className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  {radarSaved ? 'Alert Active ✓' : 'Save Price Radar'}
                </button>
              </div>

              {radarSaved && (
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Price Radar saved! You will receive notification whenever PS Store or Xbox Store drops to ${radarTargetPrice.toFixed(2)}.
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Recommended Features Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-orbitron font-bold text-lg text-slate-900">
              Curated Expansion Feature Catalogue
            </h2>
            <p className="text-xs text-slate-500">
              Ranked and evaluated for technical feasibility, engagement, and cross-console value
            </p>
          </div>
          <span className="text-xs text-slate-400 font-medium">Click thumb icon to upvote</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featureList.map((feature) => {
            const hasVoted = userVotes[feature.id];
            return (
              <div
                key={feature.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-100 text-purple-800">
                          {feature.category}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          Ease: {feature.implementationEase}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                          Value: {feature.userValue}
                        </span>
                      </div>
                      <h3 className="font-orbitron font-bold text-base text-slate-900">
                        {feature.title}
                      </h3>
                    </div>

                    {/* Upvote button */}
                    <button
                      onClick={() => handleVote(feature.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all shrink-0 ${
                        hasVoted
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{feature.upvotes}</span>
                    </button>
                  </div>

                  <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                    {feature.shortSummary}
                  </p>

                  <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {feature.detailedRationale}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                  {feature.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Suggest Your Own Feature Box */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <h3 className="font-orbitron font-bold text-lg">Have Another Feature in Mind?</h3>
          </div>
          <p className="text-xs text-slate-300 mb-4">
            Share your dream collector feature to include in future Champ Collectors sprint cycles.
          </p>

          <form onSubmit={handleSuggestionSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={userSuggestion}
                onChange={(e) => setUserSuggestion(e.target.value)}
                placeholder="e.g. Discord bot sync for automated trophy celebrations..."
                className="flex-1 px-4 py-2.5 text-xs rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 text-xs font-bold font-orbitron transition-all flex items-center justify-center gap-2 shrink-0 shadow-md"
              >
                <span>Submit Idea</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {submittedSuggestion && (
              <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Thank you! Your feature suggestion has been added to the community backlog.
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};
