interface RapidmateLogoProps {
  variant?: 'on-yellow' | 'on-dark';
}

export function RapidmateLogo({ variant = 'on-yellow' }: RapidmateLogoProps) {
  const isDarkBg = variant === 'on-dark';

  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0">
      {/* Custom Stylized Location Pin + Courier Delivery Cap/Visor Icon */}
      <span
        className={`inline-flex items-center justify-center w-9 h-9 rounded-xl shrink-0 ${
          isDarkBg ? 'bg-[#FFD000]' : 'bg-[#111111]'
        }`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true"
          className="shrink-0"
        >
          {/* Location Pin Silhouette in Hot Magenta */}
          <path
            d="M16 3C10.48 3 6 7.36 6 12.74C6 19.65 14.32 27.95 15.32 28.92C15.7 29.29 16.3 29.29 16.68 28.92C17.68 27.95 26 19.65 26 12.74C26 7.36 21.52 3 16 3Z"
            fill="#E91E63"
          />
          {/* Delivery Cap Dome */}
          <path
            d="M10.5 11.8C10.5 8.85 12.95 6.8 16 6.8C19.05 6.8 21.5 8.85 21.5 11.8H10.5Z"
            fill="#FF1493"
            stroke={isDarkBg ? '#111111' : '#FFD000'}
            strokeWidth="1.2"
          />
          {/* Stylized Forward Cap Visor / Brim */}
          <path
            d="M10 11.8H24.2C24.75 11.8 25.1 12.42 24.74 12.84C23.72 14.02 21.45 14.5 18.8 14.5H10.6C10.25 14.5 10 14.2 10 13.85V11.8Z"
            fill={isDarkBg ? '#111111' : '#FFD000'}
          />
          {/* Courier Emblem / Pin Center Dot */}
          <circle cx="16" cy="18.2" r="2.2" fill={isDarkBg ? '#111111' : '#FFFFFF'} />
        </svg>
      </span>

      <span
        className={`font-display text-lg font-extrabold tracking-tight ${
          isDarkBg ? 'text-white' : 'text-[#111111]'
        }`}
      >
        Rapidmate
      </span>
    </span>
  );
}
