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
        horizonColor="#07090e"
        waveColor="#151c2a"
        crestColor="#323b4e"
        speed={0.35}
        amplitude={2.3}
        waveScale={0.55}
        waveRatio={0.9}
        swell={30}
        turbulence={18}
        tilt={1.11}
        zoom={1.0}
        height={5.5}
        fogDepth={15}
        detail="medium"
        brightness={1.15}
        opacity={1.0}
        mouseInteraction={true}
        parallaxStrength={0.35}
        grain={true}
        grainIntensity={0.035}
      />
      {/* Vignette overlay — keeps text readable without hiding the waves */}
      <div className="atmosphere-vignette" />
    </div>
  );
}

