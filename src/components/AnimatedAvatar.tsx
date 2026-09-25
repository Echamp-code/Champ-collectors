import React from 'react';

export type AvatarArchetype = 
  | 'spartan'     // Emerald Spartan with glowing radar visor
  | 'astro'       // Astro Bot with blinking digital LED blue eyes
  | 'valkyrie'    // Cyber Valkyrie with holographic golden crown & laser sights
  | 'shinobi'     // Phantom Shinobi with ethereal violet flame & glowing slit eyes
  | 'elden'       // Arcane Rune Lord with golden halo & orbiting stardust
  | 'titan'       // Heavy Armor Mecha with twin pulsating plasma cores
  | 'pixel'       // Retro 8-Bit Champ with animated blinking pixels
  | 'monarch';    // Platinum Hunter Monarch with shimmering trophy aura

export interface AnimatedAvatarProps {
  avatarId?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  frameStyle?: 'ps_blue' | 'xb_green' | 'trophy_gold' | 'mythic_purple' | 'rgb_cycle' | 'slate';
  status?: 'online' | 'in_game' | 'offline';
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
  showLevelBadge?: boolean;
  level?: number;
}

// Deterministically resolve avatar archetype from avatar string or name
export function resolveAvatarArchetype(avatarIdOrUrl?: string, name?: string): AvatarArchetype {
  if (!avatarIdOrUrl && !name) return 'spartan';
  
  const query = (avatarIdOrUrl || name || '').toLowerCase();
  
  if (query.includes('astro') || query.includes('bot')) return 'astro';
  if (query.includes('valkyrie') || query.includes('elena') || query.includes('sofia')) return 'valkyrie';
  if (query.includes('shinobi') || query.includes('ninja') || query.includes('chloe') || query.includes('ghost')) return 'shinobi';
  if (query.includes('elden') || query.includes('marcus') || query.includes('rune') || query.includes('ring')) return 'elden';
  if (query.includes('titan') || query.includes('miller') || query.includes('mech') || query.includes('heavy')) return 'titan';
  if (query.includes('pixel') || query.includes('retro') || query.includes('8bit')) return 'pixel';
  if (query.includes('monarch') || query.includes('king') || query.includes('queen') || query.includes('vance') || query.includes('alex')) return 'monarch';
  if (query.includes('spartan') || query.includes('chief') || query.includes('halo') || query.includes('117')) return 'spartan';

  // Hash code mapping fallback
  let hash = 0;
  for (let i = 0; i < query.length; i++) {
    hash = (hash << 5) - hash + query.charCodeAt(i);
    hash |= 0;
  }
  const archetypes: AvatarArchetype[] = ['monarch', 'valkyrie', 'spartan', 'shinobi', 'astro', 'elden', 'titan', 'pixel'];
  return archetypes[Math.abs(hash) % archetypes.length];
}

export const AVATAR_OPTIONS: { id: AvatarArchetype; name: string; title: string; rarity: string; theme: string }[] = [
  { id: 'monarch', name: 'Platinum Sovereign', title: 'Trophy Hunter Monarch', rarity: 'Legendary', theme: 'from-amber-500 via-yellow-300 to-blue-500' },
  { id: 'spartan', name: 'Spartan Vanguard', title: 'Emerald Power Suit 117', rarity: 'Epic', theme: 'from-emerald-500 to-teal-700' },
  { id: 'astro', name: 'Astro Explorer', title: 'Cybernetic Bot Mk.IV', rarity: 'Mythic', theme: 'from-blue-500 via-indigo-400 to-sky-300' },
  { id: 'valkyrie', name: 'Valkyrie Horizon', title: 'Solar Tech Scout', rarity: 'Epic', theme: 'from-amber-400 via-rose-500 to-purple-600' },
  { id: 'shinobi', name: 'Void Shinobi', title: 'Phantom Blade SpecOps', rarity: 'Ultra Rare', theme: 'from-purple-600 via-violet-800 to-slate-900' },
  { id: 'elden', name: 'Arcane Elden', title: 'Golden Grace Sorcerer', rarity: 'Legendary', theme: 'from-yellow-500 via-amber-600 to-amber-900' },
  { id: 'titan', name: 'Mecha Colossus', title: 'Dual Core Titan Unit', rarity: 'Rare', theme: 'from-slate-700 via-cyan-600 to-blue-700' },
  { id: 'pixel', name: '8-Bit Brawler', title: 'Chiptune Arcade Master', rarity: 'Special', theme: 'from-emerald-400 via-yellow-400 to-purple-500' },
];

export const AnimatedAvatar: React.FC<AnimatedAvatarProps> = ({
  avatarId,
  name,
  size = 'md',
  frameStyle = 'ps_blue',
  status,
  className = '',
  interactive = false,
  onClick,
  showLevelBadge = false,
  level,
}) => {
  const archetype = resolveAvatarArchetype(avatarId, name);

  // Size dimensions map
  const sizeMap = {
    xs: { px: 28, text: 'text-[9px]', badge: 'w-3 h-3 text-[7px]', statusDot: 'w-2 h-2 -bottom-0.5 -right-0.5' },
    sm: { px: 36, text: 'text-[10px]', badge: 'w-3.5 h-3.5 text-[8px]', statusDot: 'w-2.5 h-2.5 -bottom-0.5 -right-0.5' },
    md: { px: 48, text: 'text-xs', badge: 'w-4.5 h-4.5 text-[9px]', statusDot: 'w-3 h-3 -bottom-1 -right-1' },
    lg: { px: 64, text: 'text-sm', badge: 'w-5 h-5 text-[10px]', statusDot: 'w-3.5 h-3.5 -bottom-1 -right-1' },
    xl: { px: 80, text: 'text-base', badge: 'w-6 h-6 text-xs', statusDot: 'w-4 h-4 -bottom-1 -right-1' },
    '2xl': { px: 104, text: 'text-lg', badge: 'w-7 h-7 text-xs', statusDot: 'w-5 h-5 -bottom-1 -right-1' },
  };

  const dim = sizeMap[size];

  // Frame outer border styling
  const frameClasses = {
    ps_blue: 'ring-2 ring-blue-500/80 shadow-[0_0_12px_rgba(59,130,246,0.35)]',
    xb_green: 'ring-2 ring-emerald-500/80 shadow-[0_0_12px_rgba(16,185,129,0.35)]',
    trophy_gold: 'ring-2 ring-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.45)]',
    mythic_purple: 'ring-2 ring-purple-500/80 shadow-[0_0_12px_rgba(168,85,247,0.35)]',
    rgb_cycle: 'ring-2 ring-transparent shadow-md border-2 border-dashed border-indigo-400',
    slate: 'ring-1 ring-slate-200/90 shadow-xs',
  };

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${
        interactive ? 'cursor-pointer hover:scale-105 transition-transform duration-200 active:scale-95' : ''
      } ${className}`}
      style={{ width: dim.px, height: dim.px }}
      title={name ? `${name} (Animated Avatar)` : 'Animated Gaming Avatar'}
    >
      {/* Outer Glow Ring for Extra Depth */}
      <div 
        className={`absolute inset-0 rounded-2xl ${frameClasses[frameStyle]} overflow-hidden`}
        style={{
          borderRadius: size === 'xs' ? '8px' : size === 'sm' ? '10px' : size === 'md' ? '14px' : '18px',
        }}
      >
        {/* Render Specific SVG Animated Avatar */}
        <AvatarSVG archetype={archetype} />

        {/* Hologram Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/15 to-transparent h-1/2 w-full animate-avatar-scanline opacity-60" />

        {/* Ambient Corner Flare */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-white/20 blur-xs rounded-full pointer-events-none" />
      </div>

      {/* Online / Activity Status Dot */}
      {status && (
        <span
          className={`absolute ${dim.statusDot} rounded-full ring-2 ring-white z-20 ${
            status === 'in_game'
              ? 'bg-purple-500 animate-pulse ring-purple-200'
              : status === 'online'
              ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]'
              : 'bg-slate-400'
          }`}
          title={`Status: ${status === 'in_game' ? 'Playing a Game' : status}`}
        />
      )}

      {/* Optional Level Badge */}
      {showLevelBadge && (
        <div
          className={`absolute -top-1.5 -left-1.5 ${dim.badge} rounded-md bg-slate-900 border border-amber-400 text-amber-300 font-orbitron font-black flex items-center justify-center shadow-xs z-20`}
        >
          {level || '★'}
        </div>
      )}
    </div>
  );
};

// SVG Animated Visuals for Each Archetype
const AvatarSVG: React.FC<{ archetype: AvatarArchetype }> = ({ archetype }) => {
  switch (archetype) {
    case 'monarch':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950">
          <defs>
            <linearGradient id="monarchGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="monarchPlat" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0e7ff" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#4338ca" />
            </linearGradient>
            <filter id="monarchGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Radial animated trophy ring */}
          <circle cx="50" cy="50" r="42" fill="none" stroke="url(#monarchGold)" strokeWidth="1.5" strokeDasharray="6 4" className="animate-avatar-radar opacity-70" />
          <circle cx="50" cy="50" r="36" fill="none" stroke="url(#monarchPlat)" strokeWidth="1" opacity="0.4" />

          {/* Orbiting Platinum Gem */}
          <g className="animate-avatar-orbit">
            <polygon points="50,14 53,19 50,24 47,19" fill="#38bdf8" filter="url(#monarchGlow)" />
          </g>

          {/* Majestic Monarch Helmet Silhouette */}
          <path
            d="M26,76 C26,58 36,46 50,46 C64,46 74,58 74,76 L70,84 L30,84 Z"
            fill="#1e1b4b"
            stroke="#4338ca"
            strokeWidth="2"
          />

          {/* Visor Screen with Pulsing Gold Light */}
          <rect x="36" y="55" width="28" height="10" rx="5" fill="#0f172a" stroke="url(#monarchGold)" strokeWidth="1.5" />
          <line x1="40" y1="60" x2="60" y2="60" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" className="animate-avatar-pulse">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
          </line>

          {/* Golden Crown */}
          <g className="animate-avatar-float" filter="url(#monarchGlow)">
            <path
              d="M32,45 L38,30 L45,39 L50,23 L55,39 L62,30 L68,45 Z"
              fill="url(#monarchGold)"
              stroke="#fef08a"
              strokeWidth="1.5"
            />
            {/* Crown Center Gem */}
            <circle cx="50" cy="33" r="2.5" fill="#38bdf8">
              <animate attributeName="r" values="2;3.2;2" dur="1.8s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>
      );

    case 'spartan':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-950">
          <defs>
            <linearGradient id="spartanVisor" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="spartanArmor" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#065f46" />
              <stop offset="60%" stopColor="#047857" />
              <stop offset="100%" stopColor="#022c22" />
            </linearGradient>
          </defs>

          {/* Tactical Hex Grid Background */}
          <path d="M50,8 L65,17 L65,33 L50,42 L35,33 L35,17 Z" fill="none" stroke="#059669" strokeWidth="1" opacity="0.3" />
          <path d="M50,58 L65,67 L65,83 L50,92 L35,83 L35,67 Z" fill="none" stroke="#059669" strokeWidth="1" opacity="0.3" />

          {/* Spartan Helmet */}
          <path
            d="M30,36 C30,22 40,16 50,16 C60,16 70,22 70,36 L72,66 C72,76 62,84 50,84 C38,84 28,76 28,66 Z"
            fill="url(#spartanArmor)"
            stroke="#10b981"
            strokeWidth="2"
          />

          {/* Brow Shield Plate */}
          <polygon points="34,35 66,35 62,42 38,42" fill="#064e3b" stroke="#34d399" strokeWidth="1" />

          {/* Visor Shell */}
          <path
            d="M34,44 C34,44 42,40 50,40 C58,40 66,44 66,44 L64,57 C64,57 58,61 50,61 C42,61 36,57 36,57 Z"
            fill="url(#spartanVisor)"
            stroke="#fbbf24"
            strokeWidth="1.5"
            className="animate-avatar-glow"
          />

          {/* Oscillating Visor Scanning Beam */}
          <rect x="36" y="44" width="28" height="15" fill="none">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
          </rect>
          <line x1="38" y1="50" x2="62" y2="50" stroke="#fff" strokeWidth="1.5" strokeLinecap="round">
            <animate attributeName="y1" values="44;57;44" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="y2" values="44;57;44" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2.2s" repeatCount="indefinite" />
          </line>

          {/* Tactical Cheek Intakes */}
          <rect x="34" y="65" width="8" height="4" rx="2" fill="#022c22" stroke="#10b981" strokeWidth="0.8" />
          <rect x="58" y="65" width="8" height="4" rx="2" fill="#022c22" stroke="#10b981" strokeWidth="0.8" />
          <circle cx="50" cy="74" r="3" fill="#10b981" className="animate-avatar-pulse" />
        </svg>
      );

    case 'astro':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full bg-gradient-to-b from-sky-950 via-slate-900 to-blue-950">
          <defs>
            <linearGradient id="astroWhite" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="astroScreen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
          </defs>

          {/* Head Chassis */}
          <rect x="22" y="26" width="56" height="52" rx="26" fill="url(#astroWhite)" stroke="#38bdf8" strokeWidth="2.5" />

          {/* Antenna with Pulsing Light */}
          <line x1="50" y1="26" x2="50" y2="12" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="10" r="4.5" fill="#38bdf8" className="animate-avatar-pulse">
            <animate attributeName="r" values="3.5;5.5;3.5" dur="1.4s" repeatCount="indefinite" />
          </circle>

          {/* Blue Ear Cups */}
          <rect x="17" y="44" width="7" height="16" rx="3.5" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
          <rect x="76" y="44" width="7" height="16" rx="3.5" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />

          {/* Digital Face Screen */}
          <rect x="29" y="36" width="42" height="34" rx="14" fill="url(#astroScreen)" stroke="#0369a1" strokeWidth="1.5" />

          {/* Glowing Animated Blue LED Eyes (Blinking) */}
          <g className="animate-avatar-blink">
            {/* Left Eye */}
            <circle cx="41" cy="52" r="5.5" fill="#38bdf8">
              <animate attributeName="fill" values="#38bdf8;#67e8f9;#38bdf8" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="42" cy="50" r="1.8" fill="#ffffff" />

            {/* Right Eye */}
            <circle cx="59" cy="52" r="5.5" fill="#38bdf8">
              <animate attributeName="fill" values="#38bdf8;#67e8f9;#38bdf8" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="60" cy="50" r="1.8" fill="#ffffff" />
          </g>

          {/* Cheerful Digital Smile */}
          <path d="M45,61 Q50,65 55,61" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'valkyrie':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full bg-gradient-to-b from-rose-950 via-slate-900 to-amber-950">
          <defs>
            <linearGradient id="valkWings" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
            <linearGradient id="valkFace" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fbd38d" />
            </linearGradient>
          </defs>

          {/* Ethereal Wing Plates */}
          <g className="animate-avatar-float">
            <path d="M22,50 C12,38 12,20 26,16 C22,28 25,40 32,46 Z" fill="url(#valkWings)" opacity="0.9" />
            <path d="M78,50 C88,38 88,20 74,16 C78,28 75,40 68,46 Z" fill="url(#valkWings)" opacity="0.9" />
          </g>

          {/* Stylized Face & Hair */}
          <path d="M36,36 C36,22 64,22 64,36 L64,60 C64,72 50,78 50,78 C50,78 36,72 36,60 Z" fill="url(#valkFace)" />
          
          {/* Cybernetic Golden Hair with Flow */}
          <path d="M34,28 C38,18 62,18 66,28 C72,42 66,62 66,62 C62,44 54,34 50,34 C46,34 38,44 34,62 Z" fill="#f59e0b" />

          {/* Cyber Visor / Headset Band */}
          <rect x="35" y="44" width="30" height="9" rx="4.5" fill="#1e1b4b" stroke="#f43f5e" strokeWidth="1.5" />
          
          {/* Neon Rose Eye Target */}
          <circle cx="44" cy="48.5" r="2.5" fill="#f43f5e">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <circle cx="56" cy="48.5" r="2.5" fill="#f43f5e">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="1.6s" repeatCount="indefinite" />
          </circle>

          {/* Valkyrie Crest Diadem */}
          <polygon points="50,22 54,32 50,30 46,32" fill="#fbbf24" stroke="#fff" strokeWidth="0.8" />
        </svg>
      );

    case 'shinobi':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full bg-gradient-to-b from-purple-950 via-slate-950 to-black">
          <defs>
            <radialGradient id="smokeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Shadow Aura Pulse */}
          <circle cx="50" cy="50" r="40" fill="url(#smokeGlow)" className="animate-avatar-pulse" />

          {/* Ninja Cowl Hood */}
          <path
            d="M26,78 C26,50 32,22 50,22 C68,22 74,50 74,78 L68,84 L32,84 Z"
            fill="#18181b"
            stroke="#a855f7"
            strokeWidth="1.8"
          />

          {/* Face Mask Opening */}
          <polygon points="34,44 66,44 62,60 38,60" fill="#09090b" stroke="#3f3f46" strokeWidth="1" />

          {/* Fierce Slit Neon Violet Glowing Eyes */}
          <g>
            {/* Left Eye */}
            <path d="M40,51 Q45,49 47,53 Q43,54 40,51 Z" fill="#c084fc">
              <animate attributeName="fill" values="#c084fc;#e879f9;#c084fc" dur="1.8s" repeatCount="indefinite" />
            </path>
            {/* Right Eye */}
            <path d="M60,51 Q55,49 53,53 Q57,54 60,51 Z" fill="#c084fc">
              <animate attributeName="fill" values="#c084fc;#e879f9;#c084fc" dur="1.8s" repeatCount="indefinite" />
            </path>
          </g>

          {/* Forehead Shinobi Plate */}
          <rect x="38" y="32" width="24" height="7" rx="2" fill="#27272a" stroke="#a855f7" strokeWidth="1" />
          {/* Symbol */}
          <circle cx="50" cy="35.5" r="1.8" fill="#e879f9" />
          <line x1="44" y1="35.5" x2="56" y2="35.5" stroke="#e879f9" strokeWidth="0.8" />
        </svg>
      );

    case 'elden':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full bg-gradient-to-b from-amber-950 via-slate-900 to-yellow-950">
          <defs>
            <radialGradient id="eldenGold" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#713f12" />
            </radialGradient>
          </defs>

          {/* Mystic Rune Circles with Rotation */}
          <circle cx="50" cy="48" r="38" fill="none" stroke="#eab308" strokeWidth="1" strokeDasharray="8 6" className="animate-avatar-radar opacity-60" />
          <circle cx="50" cy="48" r="28" fill="none" stroke="#fef08a" strokeWidth="0.8" opacity="0.4" />

          {/* Arcane Cloak & Cowl */}
          <path
            d="M28,82 C28,52 34,28 50,28 C66,28 72,52 72,82 Z"
            fill="#292524"
            stroke="#d97706"
            strokeWidth="1.5"
          />

          {/* Celestial Golden Arc Halo */}
          <path d="M30,30 Q50,14 70,30" fill="none" stroke="#fbbf24" strokeWidth="2.5" className="animate-avatar-glow" />

          {/* Shrouded Glowing Face with Amber Ember Eyes */}
          <ellipse cx="50" cy="54" rx="14" ry="12" fill="#0c0a09" />
          <circle cx="45" cy="53" r="2.5" fill="#fef08a">
            <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="55" cy="53" r="2.5" fill="#fef08a">
            <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Elden Ring Arc Rune at Collar */}
          <path d="M42,70 Q50,64 58,70" fill="none" stroke="#facc15" strokeWidth="2" />
          <line x1="50" y1="64" x2="50" y2="76" stroke="#facc15" strokeWidth="1.5" />
        </svg>
      );

    case 'titan':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full bg-gradient-to-b from-slate-900 via-blue-950 to-slate-950">
          {/* Heavy Armor Plating */}
          <polygon points="26,30 50,18 74,30 76,68 50,86 24,68" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />

          {/* Shoulder Exhaust Thrusters */}
          <rect x="18" y="38" width="6" height="20" rx="3" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1" />
          <circle cx="21" cy="48" r="1.8" fill="#38bdf8" className="animate-avatar-pulse" />

          <rect x="76" y="38" width="6" height="20" rx="3" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1" />
          <circle cx="79" cy="48" r="1.8" fill="#38bdf8" className="animate-avatar-pulse" />

          {/* Center Blast Shield Visor */}
          <polygon points="34,42 66,42 60,56 40,56" fill="#0284c7" stroke="#7dd3fc" strokeWidth="1.5" />
          <line x1="38" y1="49" x2="62" y2="49" stroke="#fff" strokeWidth="2" className="animate-avatar-glow" />

          {/* Dual Core Reactor */}
          <circle cx="50" cy="70" r="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="50" cy="70" r="3" fill="#38bdf8">
            <animate attributeName="r" values="2;3.8;2" dur="1.2s" repeatCount="indefinite" />
          </circle>
        </svg>
      );

    case 'pixel':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900">
          {/* Pixel grid background accents */}
          <rect x="15" y="15" width="8" height="8" fill="#4ade80" opacity="0.3" />
          <rect x="77" y="15" width="8" height="8" fill="#facc15" opacity="0.3" />
          <rect x="15" y="77" width="8" height="8" fill="#38bdf8" opacity="0.3" />
          <rect x="77" y="77" width="8" height="8" fill="#e879f9" opacity="0.3" />

          {/* 8-Bit Crown */}
          <g className="animate-avatar-float">
            <rect x="30" y="24" width="8" height="8" fill="#eab308" />
            <rect x="46" y="16" width="8" height="8" fill="#fde047" />
            <rect x="62" y="24" width="8" height="8" fill="#eab308" />
            <rect x="38" y="24" width="24" height="8" fill="#ca8a04" />
          </g>

          {/* 8-Bit Head Base */}
          <rect x="28" y="32" width="44" height="42" fill="#fdba74" stroke="#7c2d12" strokeWidth="2" />

          {/* 8-Bit Pixel Eyes (Blinking) */}
          <g className="animate-avatar-blink">
            {/* Left Pixel Eye */}
            <rect x="36" y="44" width="8" height="8" fill="#18181b" />
            <rect x="36" y="44" width="4" height="4" fill="#ffffff" />

            {/* Right Pixel Eye */}
            <rect x="56" y="44" width="8" height="8" fill="#18181b" />
            <rect x="56" y="44" width="4" height="4" fill="#ffffff" />
          </g>

          {/* 8-Bit Pixel Mouth */}
          <rect x="44" y="60" width="12" height="4" fill="#991b1b" />

          {/* Pixel Headband */}
          <rect x="28" y="36" width="44" height="6" fill="#3b82f6" />
        </svg>
      );
  }
};
