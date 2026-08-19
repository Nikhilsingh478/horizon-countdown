/**
 * Lightweight CSS atmosphere: near-black base, two extremely subtle cool
 * gradients and a faint film grain. No WebGL, so it behaves identically in
 * Chrome, mobile Safari, an installed PWA and the Android WebView, and costs
 * almost nothing on battery. Motion is disabled under prefers-reduced-motion.
 */
export function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="atmosphere-glow" />
      <div className="atmosphere-wave" />
      <div className="atmosphere-vignette" />
      <div className="atmosphere-grain" />
    </div>
  );
}
