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
        horizonColor="#050507"
        waveColor="#0d1017"
        crestColor="#21262f"
        speed={0.22}
        amplitude={1.6}
        waveScale={0.48}
        waveRatio={0.88}
        swell={26}
        turbulence={14}
        tilt={1.13}
        zoom={1.0}
        height={5.2}
        fogDepth={11}
        detail="medium"
        brightness={0.85}
        opacity={1.0}
        mouseInteraction={true}
        parallaxStrength={0.25}
        grain={true}
        grainIntensity={0.035}
      />
      {/* Vignette overlay — keeps text readable without hiding the waves */}
      <div className="atmosphere-vignette" />
    </div>
  );
}
