export default function AnimatedCat() {
  return (
    <div className="relative w-64 h-64">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Breathing animation */}
        <style>
          {`
            @keyframes breathe {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
            @keyframes ear-twitch {
              0%, 90%, 100% { transform: rotate(0deg); }
              95% { transform: rotate(-5deg); }
            }
            @keyframes tail-wave {
              0%, 100% { transform: rotate(-10deg); }
              50% { transform: rotate(10deg); }
            }
            @keyframes blink {
              0%, 90%, 100% { transform: scaleY(1); }
              95% { transform: scaleY(0.1); }
            }
            .body { 
              animation: breathe 3s ease-in-out infinite;
              transform-origin: center;
            }
            .left-ear {
              animation: ear-twitch 5s ease-in-out infinite;
              transform-origin: 65px 45px;
            }
            .right-ear {
              animation: ear-twitch 5s ease-in-out infinite 0.3s;
              transform-origin: 135px 45px;
            }
            .tail {
              animation: tail-wave 2s ease-in-out infinite;
              transform-origin: 40px 120px;
            }
            .eye-left, .eye-right {
              animation: blink 4s ease-in-out infinite;
              transform-origin: center;
            }
          `}
        </style>

        {/* Tail */}
        <g className="tail">
          <path
            d="M 40 120 Q 20 100, 15 75 Q 10 50, 20 30"
            stroke="#64748b"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Body */}
        <g className="body">
          {/* Main body */}
          <ellipse cx="100" cy="130" rx="60" ry="50" fill="#94a3b8" />
          
          {/* Belly */}
          <ellipse cx="100" cy="135" rx="40" ry="35" fill="#e2e8f0" />
        </g>

        {/* Head */}
        <g className="body">
          <circle cx="100" cy="80" r="45" fill="#94a3b8" />
          
          {/* Face patch */}
          <ellipse cx="100" cy="85" rx="35" ry="30" fill="#e2e8f0" />
        </g>

        {/* Left Ear */}
        <g className="left-ear">
          <path
            d="M 65 45 L 55 20 L 75 35 Z"
            fill="#94a3b8"
          />
          <path
            d="M 65 42 L 60 28 L 70 38 Z"
            fill="#fbbf24"
          />
        </g>

        {/* Right Ear */}
        <g className="right-ear">
          <path
            d="M 135 45 L 145 20 L 125 35 Z"
            fill="#94a3b8"
          />
          <path
            d="M 135 42 L 140 28 L 130 38 Z"
            fill="#fbbf24"
          />
        </g>

        {/* Eyes */}
        <g className="eye-left">
          <ellipse cx="85" cy="75" rx="8" ry="12" fill="#1e293b" />
          <ellipse cx="87" cy="72" rx="3" ry="4" fill="#ffffff" />
        </g>
        <g className="eye-right">
          <ellipse cx="115" cy="75" rx="8" ry="12" fill="#1e293b" />
          <ellipse cx="117" cy="72" rx="3" ry="4" fill="#ffffff" />
        </g>

        {/* Nose */}
        <path
          d="M 100 85 L 95 90 L 105 90 Z"
          fill="#f472b6"
        />

        {/* Mouth */}
        <path
          d="M 100 90 Q 95 95, 90 93"
          stroke="#1e293b"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 100 90 Q 105 95, 110 93"
          stroke="#1e293b"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Whiskers */}
        <line x1="60" y1="80" x2="35" y2="75" stroke="#64748b" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <line x1="60" y1="85" x2="35" y2="85" stroke="#64748b" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <line x1="60" y1="90" x2="35" y2="95" stroke="#64748b" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        
        <line x1="140" y1="80" x2="165" y2="75" stroke="#64748b" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <line x1="140" y1="85" x2="165" y2="85" stroke="#64748b" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <line x1="140" y1="90" x2="165" y2="95" stroke="#64748b" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

        {/* Front Paws */}
        <ellipse cx="80" cy="170" rx="15" ry="10" fill="#94a3b8" />
        <ellipse cx="120" cy="170" rx="15" ry="10" fill="#94a3b8" />
        
        {/* Paw pads */}
        <circle cx="80" cy="170" r="3" fill="#f472b6" opacity="0.6" />
        <circle cx="120" cy="170" r="3" fill="#f472b6" opacity="0.6" />
      </svg>

      {/* Floating hearts animation */}
      <style>
        {`
          @keyframes float-heart {
            0% {
              transform: translateY(0) scale(0);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(-100px) scale(1);
              opacity: 0;
            }
          }
          .heart {
            animation: float-heart 3s ease-in-out infinite;
          }
          .heart-1 { animation-delay: 0s; }
          .heart-2 { animation-delay: 1s; }
          .heart-3 { animation-delay: 2s; }
        `}
      </style>
      
      {/* Hearts */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`heart heart-${i + 1} absolute left-1/2 bottom-0`}
          style={{ marginLeft: `${(i - 1) * 20}px` }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="#f472b6"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
