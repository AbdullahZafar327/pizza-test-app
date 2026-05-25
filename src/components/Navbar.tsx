"use client";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a08]/90 backdrop-blur-sm border-b border-[#2a2a20]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="text-[#e8b86d] text-2xl">◆</span>
          <span
            className="text-white font-semibold tracking-[0.15em] text-sm uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Napoli
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {["Menu", "Story", "Reservations", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[#9a9a8a] hover:text-[#e8b86d] text-xs tracking-[0.12em] uppercase transition-colors duration-200"
            >
              {item}
            </a>
          ))}
          <a
            href="#order"
            className="bg-[#e8b86d] text-[#0a0a08] text-xs font-semibold tracking-[0.12em] uppercase px-4 py-2 hover:bg-[#d4a55e] transition-colors duration-200"
          >
            Order Now
          </a>
        </div>

        <button
          className="md:hidden text-[#9a9a8a] hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {open ? (
              <>
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0a0a08] border-t border-[#2a2a20] px-6 py-4 flex flex-col gap-4">
          {["Menu", "Story", "Reservations", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="text-[#9a9a8a] hover:text-[#e8b86d] text-sm tracking-widest uppercase transition-colors"
            >
              {item}
            </a>
          ))}
          <a
            href="#order"
            onClick={() => setOpen(false)}
            className="bg-[#e8b86d] text-[#0a0a08] text-sm font-semibold tracking-widest uppercase px-4 py-2 text-center"
          >
            Order Now
          </a>
        </div>
      )}
    </nav>
  );
}