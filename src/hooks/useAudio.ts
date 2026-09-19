import { useEffect } from "react";

/**
 * Plays a looping background audio track.
 *
 * - Attempts to autoplay at `volume` on mount (falls back silently if blocked by browser policy).
 * - Single click / tap anywhere on the website toggles play / pause like a switch.
 */
export function useAudio(src: string, volume = 0.7) {
  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;
    audio.preload = "auto";

    // Attempt autoplay immediately
    audio.play().catch(() => {
      // Autoplay blocked by browser policy; will start on user's first click
    });

    const handleClick = () => {
      if (audio.paused) {
        audio.play().catch(() => {
          // Play request interrupted or rejected
        });
      } else {
        audio.pause();
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
      audio.pause();
      audio.src = "";
    };
  }, [src, volume]);
}