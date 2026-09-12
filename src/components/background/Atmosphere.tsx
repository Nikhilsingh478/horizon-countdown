import { useEffect, useRef, useState } from "react";

const TOTAL_IMAGES = 20;
const INTERVAL_MS = 2000; // 2 seconds per image
const EXTENSIONS = ["jpg", "jpeg", "png", "webp"] as const;

/**
 * Resolves the correct extension for an image by trying each in order.
 * Returns the first src that loads successfully.
 */
function resolveImageSrc(index: number): Promise<string> {
  return new Promise((resolve) => {
    let i = 0;
    const tryNext = () => {
      if (i >= EXTENSIONS.length) {
        // All failed — resolve with empty string (slot stays invisible)
        resolve("");
        return;
      }
      const src = `/images/img${index}.${EXTENSIONS[i]}`;
      const probe = new Image();
      probe.onload = () => resolve(src);
      probe.onerror = () => { i++; tryNext(); };
      probe.src = src;
    };
    tryNext();
  });
}

/**
 * Full-screen looped image slideshow background.
 * Automatically detects .jpg / .jpeg / .png / .webp per image —
 * no manual configuration needed.
 * (mobile-first, fullscreen, ~55% darkened, smooth cross-fade)
 */
export function Atmosphere() {
  const [srcs, setSrcs] = useState<string[]>(Array(TOTAL_IMAGES).fill(""));
  const [current, setCurrent] = useState(0);
  const [introPlayed, setIntroPlayed] = useState(false);
  const resolved = useRef(false);

  // Resolve all image srcs once on mount
  useEffect(() => {
    if (resolved.current) return;
    resolved.current = true;
    Promise.all(
      Array.from({ length: TOTAL_IMAGES }, (_, i) => resolveImageSrc(i + 1))
    ).then(setSrcs);
  }, []);

  // Advance slide every INTERVAL_MS ms; mark intro as played on first tick
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => {
        if (prev === 0) setIntroPlayed(true);
        return (prev + 1) % TOTAL_IMAGES;
      });
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="atmosphere" aria-hidden="true">
      {srcs.map((src, i) =>
        src ? (
          <img
            key={i}
            src={src}
            alt=""
            className={[
            "atmosphere-slide",
            i === current ? "atmosphere-slide--active" : "",
            i === 0 && !introPlayed ? "atmosphere-slide--intro" : "",
          ]
            .filter(Boolean)
            .join(" ")}
            draggable={false}
          />
        ) : null
      )}
      {/* Dark overlay — keeps countdown text legible */}
      <div className="atmosphere-vignette" />
    </div>
  );
}

