import { useEffect, useRef } from "react";

/**
 * Plays a looping background audio track.
 *
 * - Auto-plays at `volume` on mount (falls back silently if browser blocks it).
 * - Double-click  (desktop) -> toggle play / pause.
 * - Double-tap    (mobile)  -> toggle play / pause (two taps within 300 ms).
 *
 * Uses a synchronous `shouldPlayRef` flag as the source of truth so there is
 * zero race condition between the async Audio.play() promise and the dblclick
 * event handler.
 */
export function useAudio(src: string, volume = 0.7) {
  // Tracks our INTENT - are we supposed to be playing right now?
  // Set synchronously so dblclick always reads the correct value.
  const shouldPlayRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop    = true;
    audio.volume  = volume;
    audio.preload = "auto";

    const play = () => {
      shouldPlayRef.current = true;
      audio.play().catch(() => {
        // Autoplay blocked - reset so first dblclick starts it correctly
        shouldPlayRef.current = false;
      });
    };

    const pause = () => {
      shouldPlayRef.current = false;
      audio.pause();
    };

    const toggle = () => {
      if (shouldPlayRef.current) {
        pause();
      } else {
        play();
      }
    };

    // Attempt immediate autoplay
    play();

    // Desktop: dblclick toggles play / pause
    const handleDblClick = () => toggle();

    // Mobile: two taps within 300 ms toggles play / pause
    let lastTap = 0;
    const handleTouchEnd = () => {
      const now = Date.now();
      const gap = now - lastTap;
      if (gap < 300 && gap > 0) {
        toggle();
        lastTap = 0;
      } else {
        lastTap = now;
      }
    };

    document.addEventListener("dblclick", handleDblClick);
    document.addEventListener("touchend",  handleTouchEnd);

    return () => {
      audio.pause();
      audio.src = "";
      document.removeEventListener("dblclick", handleDblClick);
      document.removeEventListener("touchend",  handleTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);
}