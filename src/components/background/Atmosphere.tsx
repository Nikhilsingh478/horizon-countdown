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
        waveColor="#101319"
        crestColor="#292D35"
        speed={0.25}
        amplitude={1.8}
        waveScale={0.5}
        waveRatio={0.9}
        swell={28}
        turbulence={16}
        tilt={1.11}
        zoom={1.0}
        height={5.5}
        fogDepth={12}
        detail="medium"
        brightness={0.9}
        opacity={1.0}
        mouseInteraction={true}
        parallaxStrength={0.3}
        grain={true}
        grainIntensity={0.04}
      />
      {/* Vignette overlay — keeps text readable without hiding the waves */}
      <div className="atmosphere-vignette" />
    </div>
  );
}

