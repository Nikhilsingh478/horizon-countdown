import { FlipNumber } from "./FlipNumber";
import { ScoreboardNumber } from "./ScoreboardNumber";

type Props = {
  value: string;
  label: string;
  variant: "flip" | "roll";
  reducedMotion: boolean;
};

export function CountdownUnit({ value, label, variant, reducedMotion }: Props) {
  return (
    <div className="unit">
      <div className="unit-panel">
        {variant === "flip" ? (
          <FlipNumber value={value} reducedMotion={reducedMotion} />
        ) : (
          <ScoreboardNumber value={value} reducedMotion={reducedMotion} />
        )}
      </div>
      <span className="unit-label">{label}</span>
    </div>
  );
}
