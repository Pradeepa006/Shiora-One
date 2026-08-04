"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Widget } from "./Widget";
import { Music, Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";

const tracks = [
  { title: "Sakura Rain", artist: "Lo-fi Café", duration: "3:42", emoji: "🌸" },
  { title: "Kyoto Morning", artist: "Chill Anime", duration: "4:15", emoji: "🍵" },
  { title: "Night Lanterns", artist: "Lo-fi Japan", duration: "3:58", emoji: "🏮" },
  { title: "Study Garden", artist: "Ambient Tokyo", duration: "5:01", emoji: "📚" },
  { title: "Moonlight Waves", artist: "Zen Sounds", duration: "4:33", emoji: "🌙" },
];

export function MusicWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 0.5));
      }, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const nextTrack = () => {
    setCurrentTrack((c) => (c + 1) % tracks.length);
    setProgress(0);
  };

  const prevTrack = () => {
    setCurrentTrack((c) => (c - 1 + tracks.length) % tracks.length);
    setProgress(0);
  };

  const track = tracks[currentTrack];

  return (
    <Widget
      title="Music"
      icon={<Music size={16} />}
      accentColor="#8b7fc7"
      delay={0.2}
    >
      <div className="space-y-4">
        {/* Album art */}
        <div className="flex items-center gap-4">
          <motion.div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, rgba(139,127,199,0.2), rgba(212,112,138,0.2))",
              border: "1px solid rgba(139,127,199,0.3)",
            }}
            animate={isPlaying ? { rotate: [0, 360] } : { rotate: 0 }}
            transition={isPlaying ? { duration: 8, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
          >
            {track.emoji}
          </motion.div>
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTrack}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <p className="font-semibold text-sm truncate" style={{ color: "var(--text-primary)" }}>
                  {track.title}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {track.artist}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <span className="text-xs flex-shrink-0" style={{ color: "var(--text-muted)" }}>
            {track.duration}
          </span>
        </div>

        {/* Progress */}
        <div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #8b7fc7, #d4708a)",
                width: `${progress}%`,
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <motion.button
            onClick={prevTrack}
            style={{ color: "var(--text-muted)" }}
            whileHover={{ scale: 1.1, color: "var(--color-secondary)" }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous track"
          >
            <SkipBack size={18} />
          </motion.button>

          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white"
            style={{ background: "linear-gradient(135deg, #8b7fc7, #d4708a)" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isPlaying ? "pause" : "play"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.15 }}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          <motion.button
            onClick={nextTrack}
            style={{ color: "var(--text-muted)" }}
            whileHover={{ scale: 1.1, color: "var(--color-secondary)" }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next track"
          >
            <SkipForward size={18} />
          </motion.button>
        </div>

        {/* Track list hint */}
        <div className="flex gap-1.5 justify-center">
          {tracks.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => { setCurrentTrack(i); setProgress(0); }}
              className="rounded-full transition-all"
              style={{
                width: i === currentTrack ? 16 : 6,
                height: 6,
                background: i === currentTrack ? "var(--color-secondary)" : "var(--border-soft)",
              }}
              whileHover={{ scale: 1.2 }}
              aria-label={`Track ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </Widget>
  );
}
