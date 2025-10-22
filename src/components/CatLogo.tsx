export default function CatLogo() {
  return (
    <svg
      viewBox="0 0 60 60"
      className="w-10 h-10"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Head */}
      <circle cx="30" cy="30" r="20" fill="#94a3b8" />
      
      {/* Face patch */}
      <ellipse cx="30" cy="32" rx="15" ry="13" fill="#e2e8f0" />
      
      {/* Left Ear */}
      <path d="M 18 15 L 12 5 L 22 12 Z" fill="#94a3b8" />
      <path d="M 18 16 L 15 10 L 20 14 Z" fill="#fbbf24" />
      
      {/* Right Ear */}
      <path d="M 42 15 L 48 5 L 38 12 Z" fill="#94a3b8" />
      <path d="M 42 16 L 45 10 L 40 14 Z" fill="#fbbf24" />
      
      {/* Eyes */}
      <ellipse cx="24" cy="28" rx="3" ry="5" fill="#1e293b" />
      <ellipse cx="36" cy="28" rx="3" ry="5" fill="#1e293b" />
      
      {/* Eye highlights */}
      <circle cx="25" cy="27" r="1.5" fill="#ffffff" />
      <circle cx="37" cy="27" r="1.5" fill="#ffffff" />
      
      {/* Nose */}
      <path d="M 30 33 L 28 35 L 32 35 Z" fill="#f472b6" />
      
      {/* Mouth */}
      <path d="M 30 35 Q 27 37, 25 36" stroke="#1e293b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 30 35 Q 33 37, 35 36" stroke="#1e293b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      
      {/* Whiskers */}
      <line x1="17" y1="30" x2="8" y2="28" stroke="#64748b" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <line x1="17" y1="33" x2="8" y2="33" stroke="#64748b" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <line x1="43" y1="30" x2="52" y2="28" stroke="#64748b" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <line x1="43" y1="33" x2="52" y2="33" stroke="#64748b" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}
