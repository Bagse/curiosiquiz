interface Props {
  id: string;
  unlocked: boolean;
  className?: string;
}

export default function AchievementIcon({ id, unlocked, className = "w-full h-full" }: Props) {
  const icon = getIcon(id, unlocked);
  const gradientId = `ach-grad-${id}`;

  return (
    <div className={className}>
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="100" y2="100">
            <stop offset="0%" stopColor="#7857f6" />
            <stop offset="100%" stopColor="#00ddaa" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill={unlocked ? "#1a1a2e" : "#151515"} stroke={unlocked ? "#00ddaa" : "#333"} strokeWidth="2" />
        {unlocked && <circle cx="50" cy="50" r="48" fill={`url(#${gradientId})`} opacity="0.15" />}
        {icon}
        {!unlocked && lockOverlay()}
      </svg>
    </div>
  );
}

function lockOverlay() {
  return (
    <g opacity="0.4">
      <rect x="0" y="0" width="100" height="100" rx="50" fill="#000" opacity="0.5" />
      <rect x="38" y="48" width="24" height="18" rx="3" fill="#666" />
      <path d="M38 56V50a12 12 0 0 1 24 0v6" stroke="#666" strokeWidth="2.5" fill="none" />
      <circle cx="50" cy="60" r="3" fill="#666" />
      <rect x="49" y="60" width="2" height="6" rx="1" fill="#666" />
    </g>
  );
}

function getIcon(id: string, unlocked: boolean) {
  const c = unlocked ? "#fff" : "#555";
  const a = unlocked ? "1" : "0.4";
  const accent = unlocked ? "#00ddaa" : "#444";

  switch (id) {
    // Gaming gamepad
    case "gaming-flawless-5":
      return (
        <g opacity={a}>
          <rect x="10" y="35" width="80" height="38" rx="10" fill={accent} opacity="0.2" />
          <path d="M20 42h60a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6H20a6 6 0 0 1-6-6V48a6 6 0 0 1 6-6Z" fill={c} opacity="0.15" />
          <path d="M28 48a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill={c} />
          <path d="M72 48a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill={c} />
          <path d="M46 50a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill={c} />
          <path d="M54 50a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill={c} />
          <path d="M34 60a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" fill={c} />
          <path d="M66 60a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" fill={c} />
          <path d="M40 62h20" stroke={c} strokeWidth="2" strokeLinecap="round" />
        </g>
      );

    // Gaming console
    case "gaming-finished-10":
      return (
        <g opacity={a}>
          <rect x="10" y="30" width="80" height="40" rx="8" fill={accent} opacity="0.2" />
          <rect x="16" y="34" width="68" height="32" rx="6" fill={c} opacity="0.15" />
          <circle cx="34" cy="48" r="5" fill={c} />
          <circle cx="50" cy="48" r="5" fill={c} />
          <circle cx="66" cy="48" r="5" fill={c} />
          <rect x="34" y="54" width="32" height="4" rx="2" fill={c} />
          <circle cx="34" cy="62" r="3" fill={c} />
          <circle cx="66" cy="62" r="3" fill={c} />
          <path d="M40 38a6 6 0 0 1 20 0" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      );

    // Music headphones
    case "music-flawless-5":
      return (
        <g opacity={a}>
          <rect x="10" y="25" width="80" height="50" rx="12" fill={accent} opacity="0.2" />
          <path d="M30 45V38a20 20 0 0 1 40 0v7" stroke={c} strokeWidth="4" fill="none" strokeLinecap="round" />
          <rect x="22" y="42" width="14" height="18" rx="6" fill={c} />
          <rect x="64" y="42" width="14" height="18" rx="6" fill={c} />
          <rect x="24" y="48" width="10" height="6" rx="2" fill={accent} />
          <rect x="66" y="48" width="10" height="6" rx="2" fill={accent} />
          <path d="M30 60v-8" stroke={c} strokeWidth="2" />
          <path d="M70 60v-8" stroke={c} strokeWidth="2" />
        </g>
      );

    // Music microphone
    case "music-finished-10":
      return (
        <g opacity={a}>
          <rect x="10" y="20" width="80" height="60" rx="12" fill={accent} opacity="0.2" />
          <path d="M50 26a12 12 0 0 0-12 12v8a12 12 0 0 0 24 0v-8a12 12 0 0 0-12-12Z" fill={c} opacity="0.2" />
          <circle cx="50" cy="38" r="12" fill={c} opacity="0.15" />
          <path d="M50 26a12 12 0 0 0-12 12v2a12 12 0 0 0 24 0v-2a12 12 0 0 0-12-12Z" stroke={c} strokeWidth="3" fill="none" />
          <rect x="38" y="48" width="24" height="4" rx="2" fill={c} />
          <line x1="50" y1="52" x2="50" y2="66" stroke={c} strokeWidth="3" strokeLinecap="round" />
          <path d="M36 62a12 12 0 0 0 28 0" stroke={c} strokeWidth="3" strokeLinecap="round" fill="none" />
          <rect x="46" y="66" width="8" height="8" rx="2" fill={accent} />
        </g>
      );

    // Geography compass/map
    case "geo-flawless-5":
      return (
        <g opacity={a}>
          <rect x="10" y="20" width="80" height="60" rx="12" fill={accent} opacity="0.2" />
          <circle cx="50" cy="48" r="22" fill={c} opacity="0.1" />
          <circle cx="50" cy="48" r="22" stroke={c} strokeWidth="2.5" fill="none" />
          <circle cx="50" cy="48" r="6" fill={c} />
          <path d="M50 22v8M50 66v8M24 48h8M68 48h8" stroke={c} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M38 38l-6-6M62 58l6 6M62 38l6-6M38 58l-6 6" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          <polygon points="50,30 44,50 50,46 56,50" fill={accent} opacity="0.8" />
          <polygon points="50,66 44,46 50,50 56,46" fill={c} opacity="0.3" />
        </g>
      );

    // Geography globe
    case "geo-finished-10":
      return (
        <g opacity={a}>
          <rect x="10" y="20" width="80" height="60" rx="12" fill={accent} opacity="0.2" />
          <circle cx="50" cy="48" r="22" stroke={c} strokeWidth="2.5" fill="none" />
          <ellipse cx="50" cy="48" rx="12" ry="22" stroke={c} strokeWidth="1.5" fill="none" opacity="0.4" />
          <path d="M28 38h44M28 58h44" stroke={c} strokeWidth="1.5" opacity="0.4" />
          <path d="M32 42q18-4 36 0M32 54q18 4 36 0" stroke={c} strokeWidth="1.5" fill="none" opacity="0.3" />
          <circle cx="50" cy="48" r="4" fill={accent} />
          <rect x="26" y="72" width="48" height="6" rx="3" fill={c} opacity="0.15" />
          <rect x="38" y="70" width="24" height="3" rx="1.5" fill={accent} />
        </g>
      );

    // Tech CPU chip
    case "tech-flawless-5":
      return (
        <g opacity={a}>
          <rect x="10" y="20" width="80" height="60" rx="12" fill={accent} opacity="0.2" />
          <rect x="24" y="28" width="52" height="44" rx="6" fill={c} opacity="0.08" />
          <rect x="30" y="32" width="40" height="36" rx="4" fill={c} opacity="0.15" />
          <rect x="36" y="38" width="28" height="24" rx="3" fill={accent} opacity="0.3" />
          <rect x="42" y="44" width="16" height="12" rx="2" fill={accent} />
          <rect x="38" y="30" width="4" height="8" rx="1" fill={c} />
          <rect x="58" y="30" width="4" height="8" rx="1" fill={c} />
          <rect x="38" y="62" width="4" height="8" rx="1" fill={c} />
          <rect x="58" y="62" width="4" height="8" rx="1" fill={c} />
          <rect x="24" y="44" width="6" height="4" rx="1" fill={c} />
          <rect x="24" y="52" width="6" height="4" rx="1" fill={c} />
          <rect x="70" y="44" width="6" height="4" rx="1" fill={c} />
          <rect x="70" y="52" width="6" height="4" rx="1" fill={c} />
        </g>
      );

    // Tech robot
    case "tech-finished-10":
      return (
        <g opacity={a}>
          <rect x="10" y="20" width="80" height="60" rx="12" fill={accent} opacity="0.2" />
          <rect x="32" y="14" width="36" height="8" rx="4" fill={c} opacity="0.2" />
          <rect x="34" y="18" width="8" height="4" rx="2" fill={c} />
          <rect x="58" y="18" width="8" height="4" rx="2" fill={c} />
          <rect x="26" y="28" width="48" height="36" rx="8" fill={c} opacity="0.12" />
          <rect x="28" y="30" width="44" height="32" rx="7" fill={c} opacity="0.15" />
          <rect x="34" y="34" width="32" height="16" rx="4" fill={c} opacity="0.2" />
          <circle cx="42" cy="42" r="3" fill={accent} />
          <circle cx="58" cy="42" r="3" fill={accent} />
          <rect x="46" y="46" width="8" height="3" rx="1.5" fill={accent} />
          <rect x="40" y="54" width="20" height="4" rx="2" fill={c} />
          <rect x="34" y="64" width="8" height="10" rx="2" fill={c} opacity="0.15" />
          <rect x="58" y="64" width="8" height="10" rx="2" fill={c} opacity="0.15" />
          <rect x="44" y="66" width="12" height="6" rx="2" fill={accent} />
        </g>
      );

    default:
      return null;
  }
}
