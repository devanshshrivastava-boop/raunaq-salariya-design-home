import { motion } from "framer-motion";

/**
 * Per-letter springy bounce-in for hero titles.
 * Splits each word into letters; preserves wrapping by keeping words intact.
 */
export function BouncingTitle({
  text,
  italic,
  className = "",
  delay = 0,
}: {
  text: string;
  italic?: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  let charIdx = 0;
  return (
    <h1 className={`font-display leading-[0.92] ${className}`} aria-label={text + (italic ? " " + italic : "")}>
      <span className="inline-block">
        {words.map((w, wi) => (
          <span key={wi} className="inline-block whitespace-nowrap mr-[0.25em]">
            {w.split("").map((c, ci) => {
              const i = charIdx++;
              return (
                <motion.span
                  key={`${wi}-${ci}`}
                  className="inline-block"
                  initial={{ y: "0.6em", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: delay + i * 0.06,
                    type: "spring",
                    stiffness: 110,
                    damping: 14,
                    mass: 0.9,
                  }}
                >
                  {c}
                </motion.span>
              );
            })}
          </span>
        ))}
      </span>
      {italic && (
        <>
          <br />
          <em className="italic text-[var(--gold-soft)] inline-block">
            {italic.split("").map((c, ci) => (
              <motion.span
                key={ci}
                className="inline-block"
                initial={{ y: "0.9em", opacity: 0, rotate: 4 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{
                  delay: delay + (charIdx + ci) * 0.045,
                  type: "spring",
                  stiffness: 240,
                  damping: 10,
                }}
              >
                {c === " " ? "\u00A0" : c}
              </motion.span>
            ))}
          </em>
        </>
      )}
    </h1>
  );
}
