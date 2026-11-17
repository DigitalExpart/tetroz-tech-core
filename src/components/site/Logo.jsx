import React from "react";
import { Link } from "react-router-dom";

export function TetrozMark({ className = "h-9 w-9" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="tetrozGradient" x1="12" y1="90" x2="90" y2="8" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00C3FF" />
          <stop offset="0.55" stopColor="#22D3EE" />
          <stop offset="1" stopColor="#8DFD00" />
        </linearGradient>
      </defs>
      <path d="M50 4 92 28v44L50 96 8 72V28Z" stroke="url(#tetrozGradient)" strokeWidth="4.5" strokeLinejoin="miter" />
      <path d="M50 74V36" stroke="url(#tetrozGradient)" strokeWidth="4.5" />
      <path d="M31 51 50 32l19 19" stroke="url(#tetrozGradient)" strokeWidth="4.5" strokeLinecap="square" />
      <path d="M36 63h28" stroke="url(#tetrozGradient)" strokeWidth="4.5" strokeLinecap="square" />
    </svg>
  );
}

export default function Logo({ withTagline = true, className = "" }) {
  return (
    <Link to="/" className={`group flex items-center gap-3 ${className}`} aria-label="Tetroz — home">
      <TetrozMark className="h-9 w-9 shrink-0 transition-transform duration-500 group-hover:rotate-[8deg]" />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-[1.02rem] font-semibold tracking-[0.36em] text-foreground">TETROZ</span>
        {withTagline && (
          <span className="mt-1.5 hidden font-mono text-[0.44rem] uppercase tracking-[0.26em] text-primary/60 sm:block">
            Solutions. Software. Intelligence.
          </span>
        )}
      </span>
    </Link>
  );
}