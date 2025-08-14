import { motion } from "framer-motion";
import React from "react";

export default function PulseLoading({ size = 20, color = "#22d3ee" }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Outer mana ring */}
      <motion.div
        className="absolute rounded-full border"
        style={{
          width: size,
          height: size,
          borderColor: `${color}40`,
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      />

      {/* Inner glow */}
      <motion.div
        className="rounded-full"
        style={{
          width: size / 2,
          height: size / 2,
          backgroundColor: `${color}aa`,
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
      />
    </div>
  );
}
