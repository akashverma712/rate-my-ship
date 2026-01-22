import React from "react";

export default function GoogleButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="group w-full flex items-center justify-center gap-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 py-4 px-6 rounded-2xl transition-all duration-300 active:scale-[0.98]"
    >
      <svg
        className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#FFC107"
          d="M43.6 20.1H42V20H24v8h11.3C33.7 32.4 29.2 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.2 2.8l5.7-5.7C33.5 7 28.9 5 24 5 12.9 5 4 13.9 4 25s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.2-.4-3.9z"
        />
        <path
          fill="#FF3D00"
          d="M6.3 14.7l6.6 4.8C14.6 16.3 19 13 24 13c2.8 0 5.3 1 7.2 2.8l5.7-5.7C33.5 7 28.9 5 24 5 16.3 5 9.6 9.3 6.3 14.7z"
        />
        <path
          fill="#4CAF50"
          d="M24 45c4.9 0 9.4-1.9 12.8-5.1l-6.3-5.2C28.7 36.4 26.4 37 24 37c-5.1 0-9.4-3.4-10.9-8.1l-6.5 5C9.9 40.5 16.4 45 24 45z"
        />
        <path
          fill="#1976D2"
          d="M43.6 20.1H42V20H24v8h11.3c-1.1 2.9-3.1 5.3-5.8 6.9l.1.1 6.3 5.2C35.4 39.8 44 33 44 25c0-1.3-.1-2.2-.4-3.9z"
        />
      </svg>

      <span className="text-gray-300 font-semibold text-sm tracking-wide">
        Continue with Google
      </span>
    </button>
  );
}