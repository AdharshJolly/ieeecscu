"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface OfficeBearer {
  _id: string;
  name: string;
  role: string;
  year: string;
  order: number;
  imageUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

const DECK_ROTATIONS = [-7, 5, -4, 8, -6, 3, -8, 6, -3, 7, -5, 4];
const DECK_X_OFFSETS = [-6, 5, -4, 7, -3, 6, -5, 4];
const DECK_Y_OFFSETS = [-4, 6, -3, 5, -5, 3, -4, 5];

/**
 * Strict IEEE CS CU Hierarchy Order:
 * 1. Faculty Advisor (Top)
 * 2. Student Chair
 * 3. Vice Chair
 * 4. Secretary
 * 5. Treasurer
 * 6. Webmaster (Bottom)
 */
function getRolePriority(role: string): number {
  const r = (role || "").toLowerCase().trim();
  if (r.includes("advisor") || r.includes("faculty")) return 1;
  if (r.includes("vice chair") || r.includes("vice-chair") || r.includes("vice president")) return 3;
  if (r.includes("chair") || r.includes("president")) return 2;
  if (r.includes("secretary")) return 4;
  if (r.includes("treasurer")) return 5;
  if (r.includes("webmaster") || r.includes("web master") || r.includes("web lead")) return 6;
  return 7;
}

export default function TeamDeck({
  bearers,
  activeYear,
}: {
  bearers: OfficeBearer[];
  activeYear: string;
}) {
  const [isSpread, setIsSpread] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Strictly enforce the specified hierarchy: Faculty Advisor -> Chair -> Vice Chair -> Secretary -> Treasurer -> Webmaster
  const sortedBearers = useMemo(() => {
    return [...(bearers || [])].sort((a, b) => {
      const priorityA = getRolePriority(a.role);
      const priorityB = getRolePriority(b.role);
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      return (a.order ?? 0) - (b.order ?? 0);
    });
  }, [bearers]);

  const toggleFlip = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCardClick = (id: string, index: number) => {
    if (!isSpread) {
      // If deck is stacked, clicking any card spreads the deck!
      setIsSpread(true);
    } else {
      // If already spread, clicking toggles the card's 3D flip!
      toggleFlip(id);
    }
  };

  if (!sortedBearers || sortedBearers.length === 0) {
    return (
      <div className="text-center py-24 bg-white/50 dark:bg-[#0D1622]/60 rounded-3xl border border-slate-200 dark:border-white/10 p-8 max-w-xl mx-auto backdrop-blur-md">
        <p className="text-slate-500 dark:text-slate-400 font-bold text-lg">
          No team members listed for {activeYear}.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Deck Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 max-w-5xl mx-auto px-4">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 rounded-full bg-ieee-cyan animate-pulse" />
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
            {isSpread
              ? `Showing all ${sortedBearers.length} members in hierarchy order • Click any card to flip`
              : `Playing Card Deck • Faculty Advisor on top, Webmaster at bottom`}
          </span>
        </div>

        {/* Toggle Mode Button */}
        <button
          onClick={() => {
            setIsSpread(!isSpread);
            if (isSpread) setFlippedCards({}); // Reset flips when re-stacking
          }}
          className={`group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full font-extrabold text-sm transition-all duration-300 shadow-md ${
            isSpread
              ? "bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-800 dark:text-white border border-slate-300 dark:border-white/10"
              : "bg-gradient-to-r from-ieee-primary to-ieee-cyan text-white shadow-ieee-primary/40 hover:shadow-lg hover:scale-105"
          }`}
        >
          {isSpread ? (
            <>
              <svg className="w-4 h-4 text-ieee-cyan transition-transform group-hover:-rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>Collect / Re-stack Deck 🃏</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              <span>Click to Deal / Spread Cards ⚡</span>
            </>
          )}
        </button>
      </div>

      {/* Main Interactive Container */}
      <div className="relative w-full">
        <AnimatePresence mode="wait">
          {!isSpread ? (
            /* =========================================================================
               1. THE MESSY DECK VIEW (COLLAPSED STACK OF PLAYING CARDS)
               Strict Stack Order:
               - Index 0 (Faculty Advisor) gets HIGHEST z-index (top of stack)
               - Index N-1 (Webmaster) gets LOWEST z-index (bottom of stack)
               ========================================================================= */
            <motion.div
              key="stacked-deck"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative min-h-[560px] flex flex-col items-center justify-center cursor-pointer select-none py-10"
              onClick={() => setIsSpread(true)}
            >
              {/* Glow aura underneath deck */}
              <div className="absolute w-72 h-96 bg-gradient-to-tr from-ieee-primary/30 via-ieee-cyan/30 to-amber-500/20 blur-[80px] rounded-full pointer-events-none -z-10" />

              {/* The Pile of Cards */}
              <div className="relative w-[320px] sm:w-[340px] h-[460px] group">
                {sortedBearers.map((bearer, index) => {
                  const rotation = DECK_ROTATIONS[index % DECK_ROTATIONS.length];
                  const xOffset = DECK_X_OFFSETS[index % DECK_X_OFFSETS.length];
                  const yOffset = DECK_Y_OFFSETS[index % DECK_Y_OFFSETS.length];
                  const isTop = index === 0;

                  // Faculty advisor (index 0) gets highest z-index so it sits right on top!
                  const cardZIndex = sortedBearers.length - index + 10;

                  return (
                    <motion.div
                      key={bearer._id || index}
                      style={{
                        zIndex: cardZIndex,
                        transformOrigin: "center center",
                      }}
                      animate={{
                        rotate: rotation,
                        x: xOffset,
                        y: yOffset,
                      }}
                      whileHover={{
                        rotate: rotation * 1.3,
                        x: xOffset * 1.5,
                        y: yOffset * 1.5 - 8,
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="absolute inset-0 rounded-[28px] bg-white dark:bg-[#0D1826] border-2 border-slate-200/90 dark:border-white/15 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.35)] dark:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col p-4 backface-hidden"
                    >
                      {/* Playing Card Top Corners */}
                      <div className="flex justify-between items-center px-1 mb-2">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-black text-ieee-primary dark:text-ieee-cyan">IEEE CS</span>
                          <span className="text-xs text-amber-500">
                            {isTop ? "👑" : index === 1 ? "♠" : index === 2 ? "♣" : "♦"}
                          </span>
                        </div>
                        <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-ieee-primary/10 dark:bg-ieee-cyan/10 text-ieee-primary dark:text-ieee-cyan border border-ieee-primary/20">
                          {bearer.year}
                        </span>
                      </div>

                      {/* Photo or Avatar */}
                      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#060B12] border border-slate-100 dark:border-white/10">
                        {bearer.imageUrl ? (
                          <Image
                            src={bearer.imageUrl}
                            alt={bearer.name}
                            fill
                            className="object-cover"
                            sizes="340px"
                            priority={isTop}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-700">
                            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        <div className="absolute bottom-2.5 left-3 right-3 text-white">
                          <h4 className="font-extrabold text-base truncate">{bearer.name}</h4>
                          <p className="text-xs font-semibold text-ieee-cyan truncate uppercase tracking-wider">{bearer.role}</p>
                        </div>
                      </div>

                      {/* Card Bottom Meta */}
                      <div className="mt-auto pt-3 flex items-center justify-between px-1">
                        <span className="text-[11px] font-bold text-slate-400">
                          {isTop ? "Top Card • Advisor" : `Card #${index + 1}`}
                        </span>
                        <span className="text-[11px] font-extrabold text-ieee-primary dark:text-ieee-cyan flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Flip Deck &rarr;
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Pulsing Hint Beneath Stack */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="mt-12 flex flex-col items-center gap-2 text-center"
              >
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white dark:bg-[#0D1622] border border-ieee-primary/30 dark:border-ieee-cyan/30 shadow-lg text-xs font-black uppercase tracking-wider text-ieee-primary dark:text-ieee-cyan">
                  <span>🃏 Click deck to deal {sortedBearers.length} cards</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Stacked order: Faculty Advisor (top) &rarr; Chair &rarr; Vice Chair &rarr; Secretary &rarr; Treasurer &rarr; Webmaster (bottom)
                </p>
              </motion.div>
            </motion.div>
          ) : (
            /* =========================================================================
               2. THE SPREAD / FLIP-OUT VIEW (INTERACTIVE 3D PLAYING CARDS)
               Rendered in strict hierarchy order
               ========================================================================= */
            <motion.div
              key="spread-cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-4"
            >
              {sortedBearers.map((bearer, index) => {
                const isFlipped = Boolean(flippedCards[bearer._id || index]);

                return (
                  <motion.div
                    key={bearer._id || index}
                    layout
                    initial={{
                      opacity: 0,
                      scale: 0.7,
                      rotate: DECK_ROTATIONS[index % DECK_ROTATIONS.length] * 2,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 20,
                      delay: index * 0.04,
                    }}
                    className="h-[460px] perspective-1000 select-none cursor-pointer group"
                    onClick={() => handleCardClick(bearer._id || index.toString(), index)}
                  >
                    {/* 3D Flipping Card Body */}
                    <div
                      className={`relative w-full h-full rounded-[28px] transition-transform duration-700 transform-style-3d shadow-xl hover:shadow-2xl hover:shadow-ieee-primary/20 ${
                        isFlipped ? "rotate-y-180" : ""
                      }`}
                    >
                      {/* =============================================================
                          CARD FRONT: High-res portrait + role badge + flip trigger
                          ============================================================= */}
                      <div className="absolute inset-0 rounded-[28px] bg-white dark:bg-[#0D1826] border-2 border-slate-200/90 dark:border-white/10 p-5 flex flex-col justify-between backface-hidden overflow-hidden">
                        {/* Top Card Bar */}
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-black text-ieee-primary dark:text-ieee-cyan">IEEE CS</span>
                            <span className="text-xs text-amber-500">
                              {index === 0 ? "👑" : index === 1 ? "♠" : index === 2 ? "♣" : "♦"}
                            </span>
                          </div>
                          <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-ieee-primary/10 dark:bg-ieee-cyan/10 text-ieee-primary dark:text-ieee-cyan border border-ieee-primary/25">
                            {bearer.year}
                          </span>
                        </div>

                        {/* Portrait */}
                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#060B12] border border-slate-100 dark:border-white/10 group-hover:scale-[1.02] transition-transform duration-500">
                          {bearer.imageUrl ? (
                            <Image
                              src={bearer.imageUrl}
                              alt={bearer.name}
                              fill
                              className="object-cover"
                              sizes="340px"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-700">
                              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                        </div>

                        {/* Info Header */}
                        <div className="mt-4 text-center">
                          <h3 className="text-lg font-black text-slate-900 dark:text-white truncate">
                            {bearer.name}
                          </h3>
                          <div className="inline-block mt-1 px-3 py-0.5 rounded-full bg-ieee-primary/10 dark:bg-ieee-cyan/10 border border-ieee-primary/20 dark:border-ieee-cyan/20">
                            <span className="text-xs font-bold text-ieee-primary dark:text-ieee-cyan uppercase tracking-wider">
                              {bearer.role}
                            </span>
                          </div>
                        </div>

                        {/* Flip Call-to-Action */}
                        <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                          <span>Rank #{index + 1}</span>
                          <button
                            type="button"
                            onClick={(e) => toggleFlip(bearer._id || index.toString(), e)}
                            className="text-ieee-primary dark:text-ieee-cyan flex items-center gap-1 hover:underline"
                          >
                            Flip for Bio &amp; Links ↺
                          </button>
                        </div>
                      </div>

                      {/* =============================================================
                          CARD BACK: Dark metallic obsidian card back + social links
                          ============================================================= */}
                      <div className="absolute inset-0 rounded-[28px] bg-slate-900 dark:bg-[#07101C] text-white border-2 border-ieee-primary/40 dark:border-ieee-cyan/40 p-6 flex flex-col justify-between rotate-y-180 backface-hidden shadow-2xl overflow-hidden">
                        {/* Metallic Circuit Watermark Overlay */}
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00C4B4_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                        {/* Header */}
                        <div className="relative z-10 flex justify-between items-center border-b border-white/10 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-ieee-cyan text-sm font-black">IEEE CS CU</span>
                            <span className="text-amber-400 text-xs font-bold">★ Executive Card</span>
                          </div>
                          <span className="text-xs font-bold text-slate-400">{bearer.year}</span>
                        </div>

                        {/* Middle Content */}
                        <div className="relative z-10 my-auto text-center space-y-3">
                          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-ieee-primary to-ieee-cyan flex items-center justify-center p-1 shadow-lg shadow-ieee-cyan/30">
                            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-black text-xl text-ieee-cyan">
                              {bearer.name.charAt(0)}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xl font-black text-white">{bearer.name}</h4>
                            <p className="text-xs font-bold uppercase tracking-wider text-ieee-cyan mt-1">
                              {bearer.role}
                            </p>
                          </div>

                          <p className="text-xs text-slate-300/80 leading-relaxed max-w-xs mx-auto">
                            Driving engineering leadership and technical collaboration for the {bearer.year} chapter council at CHRIST University.
                          </p>

                          {/* Clickable Social Buttons */}
                          <div className="flex justify-center gap-3 pt-2">
                            {bearer.linkedinUrl && (
                              <a
                                href={bearer.linkedinUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="px-4 py-2 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white text-xs font-bold inline-flex items-center gap-1.5 transition-transform hover:scale-105 shadow-md"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                <span>LinkedIn</span>
                              </a>
                            )}

                            {bearer.githubUrl && (
                              <a
                                href={bearer.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-transform hover:scale-105 shadow-md"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                <span>GitHub</span>
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Back Footer */}
                        <div className="relative z-10 pt-3 border-t border-white/10 flex justify-between items-center text-xs font-semibold text-slate-400">
                          <span>Rank #{index + 1}</span>
                          <button
                            type="button"
                            onClick={(e) => toggleFlip(bearer._id || index.toString(), e)}
                            className="text-ieee-cyan font-bold hover:underline flex items-center gap-1"
                          >
                            Flip Back ↺
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
