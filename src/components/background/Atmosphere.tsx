import GradientWaves from "./GradientWaves";

/**
 * Full-screen WebGL GradientWaves background in a near-black/charcoal palette.
 * A subtle radial vignette sits on top to keep the countdown legible and
 * prevent bright wave crests from competing with the text.
 *
 * On touch devices the component automatically reduces raymarch steps and
 * disables mouse parallax for battery / GPU friendliness.
 */
export function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <GradientWaves
        horizonColor="#0b0e1a"
        waveColor="#1e273a"
        crestColor="#455577"
        speed={0.35}
        amplitude={2.6}
        waveScale={0.6}
        waveRatio={0.9}
        swell={32}
        turbulence={20}
        tilt={1.11}
        zoom={1.0}
        height={5.5}
        fogDepth={16}
        detail="medium"
        brightness={1.35}
        opacity={1.0}
        mouseInteraction={true}
        parallaxStrength={0.4}
        grain={true}
        grainIntensity={0.03}
      />
      {/* Vignette overlay — keeps text readable without hiding the waves */}
      <div className="atmosphere-vignette" />
    </div>
  );
}

