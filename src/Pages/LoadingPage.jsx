import { motion, AnimatePresence } from "framer-motion";
import { Swords, Zap } from "lucide-react";
import React from "react";
export default function LevelUpLoading({
  message = "Synchronizing stats…",
  progress,
  tips = [
    "Arise, Hunter!",
    "Optimizing gates…",
    "Buffing agility…",
    "Forging artifacts…",
  ],
}){
  const [tipIndex, setTipIndex] = React.useState(0);

  React.useEffect(() => {
    if (!tips?.length) return;
    const id = setInterval(() => setTipIndex((i) => (i + 1) % tips.length), 2200);
    return () => clearInterval(id);
  }, [tips]);

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-zinc-950 text-zinc-100">
      {/* Background aurora / mana mist */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-500/15 via-indigo-500/10 to-fuchsia-500/10 blur-3xl" />
        <div className="absolute bottom-[-20rem] right-[-10rem] h-[40rem] w-[40rem] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mx-4 w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/60 to-zinc-900/30 p-6 shadow-2xl backdrop-blur-md"
      >
        {/* Neon top border */}
        <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />

        {/* Icon + Title */}
        <div className="mb-4 flex items-center gap-3">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
            className="grid h-12 w-12 place-items-center rounded-xl bg-zinc-900 border border-white/10 shadow-inner"
          >
            <Swords className="h-6 w-6" />
          </motion.div>
          <div className="leading-tight">
            <h1 className="text-xl font-semibold tracking-wide">LEVELUP</h1>
            <p className="text-sm text-zinc-400">Solo Leveling mode</p>
          </div>
        </div>

        {/* Main loader */}
        <div className="mb-5 flex items-center gap-3">
          <motion.div
            initial={{ scale: 0.9, opacity: 0.6 }}
            animate={{ scale: [0.9, 1, 0.9], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-12 w-12"
          >
            {/* Mana ring */}
            <div className="absolute inset-0 rounded-full border border-cyan-400/40" />
            <div className="absolute inset-1 rounded-full border border-cyan-400/30" />
            <div className="absolute inset-2 rounded-full border border-cyan-400/20" />
            {/* Rotating spark */}
            <motion.div
              className="absolute left-1/2 top-0 -ml-1 h-2 w-2 rounded-full bg-cyan-400"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
              style={{ originX: 0, originY: 24 }}
            />
          </motion.div>

          <div className="flex-1">
            <p className="mb-1 text-sm text-zinc-300">{message}</p>
            {/* Progress bar (optional) */}
            {typeof progress === "number" ? (
              <div className="relative mt-2 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(0, Math.min(progress, 100))}%` }}
                  transition={{ ease: "easeOut", duration: 0.4 }}
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400"
                />
              </div>
            ) : (
              // Indeterminate shimmer when no progress provided
              <div className="relative mt-2 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                <motion.div
                  className="absolute inset-y-0 left-0 h-full w-1/3 rounded-full bg-gradient-to-r from-cyan-400/90 via-indigo-400/90 to-fuchsia-400/90"
                  animate={{ x: ["-33%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Rotating tips */}
        <AnimatePresence mode="wait">
          <motion.p
            key={tipIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2 text-sm text-zinc-400"
          >
            <Zap className="h-4 w-4" />
            {tips[tipIndex]}
          </motion.p>
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between text-xs text-zinc-500">
          <span>Loading dungeon…</span>
          <span className="text-cyan-400">Hunter System v1.0</span>
        </div>
      </motion.div>

      {/* Subtle floor glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-[40rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
    </div>
  );
}
