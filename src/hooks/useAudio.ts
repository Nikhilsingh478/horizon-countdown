import { useEffect, useRef } from "react";

/**
 * Plays a looping background audio track and wires global play/pause gestures.
 *
 * Behaviour:
 *  - Auto-plays at `volume` (0-1) on mount; falls back to first user interaction
 *    if the browser blocks autoplay.
 *  - Double-click  (desktop)  -> toggle play / pause.
 *  - Double-tap    (mobile)   -> toggle play / pause (two taps <= 300 ms apart).
 *
 * All listeners are attached to `document` so z-index stacking never matters.
 */
export function useAudio(src: string, volume = 0.7) {
  const audioRef   = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);
  const lastTapRef = useRef<number>(0);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop    = true;
    audio.volume  = volume;
    audio.preload = "auto";
    audioRef.current = audio;

    /** Start playback (idempotent - won't restart if already playing). */
    const start = () => {
      if (startedRef.current) return Promise.resolve();
      return audio.play().then(() => {
        startedRef.current = true;
      }).catch(() => {});
    };

    // Attempt immediate autoplay
    start();

    // Double-click: toggle play / pause
    const handleDblClick = () => {
      if (!startedRef.current) {
        // First ever gesture - just start the track
        start();
        return;
      }
      if (audio.paused) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
    };

    // Double-tap (touch): toggle play / pause
    const handleTouchEnd = () => {
      const now = Date.now();
      const gap = now - lastTapRef.current;

      if (!startedRef.current) {
        // First touch - start the track
        start();
        lastTapRef.current = now;
        return;
      }

      if (gap < 300 && gap > 0) {
        // Second tap within window -> toggle
        if (audio.paused) {
          audio.play().catch(() => {});
        } else {
          audio.pause();
        }
        lastTapRef.current = 0; // reset so a 3rd tap does not re-toggle
      } else {
        lastTapRef.current = now;
      }
    };

    // Fallback: any first interaction starts audio
    const handleFirstInteraction = () => start();

    document.addEventListener("dblclick", handleDblClick);
    document.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("click",    handleFirstInteraction, { once: true });
    document.addEventListener("keydown",  handleFirstInteraction, { once: true });

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
      document.removeEventListener("dblclick", handleDblClick);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("click",    handleFirstInteraction);
      document.removeEventListener("keydown",  handleFirstInteraction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);
}
