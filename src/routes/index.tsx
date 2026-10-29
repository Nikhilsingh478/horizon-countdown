import { createFileRoute } from "@tanstack/react-router";

import { Atmosphere } from "@/components/background/Atmosphere";
import { Countdown } from "@/components/countdown/Countdown";
import { getElapsed, START_DATE_LABEL } from "@/utils/countdown";
import { useAudio } from "@/hooks/useAudio";
import { useElapsed } from "@/hooks/useCountdown";

export const Route = createFileRoute("/")({
  head: () => {
    const initial = getElapsed();
    const dayTag = `Day ${String(initial.totalDays).padStart(3, "0")}`;
    const title = `${dayTag} — ${START_DATE_LABEL}`;
    const description = `A quiet, continuous count since March 20, 2024. No controls, no clutter — just the journey of time.`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Index,
});

function Index() {
  // Plays Dandelions.mp3 at 70% volume, looped.
  // Clicking anywhere on the website toggles play / pause.
  useAudio("/Dandelions.mp3", 0.7);

  const { totalDays } = useElapsed();
  const dayDisplay = `Day ${String(totalDays).padStart(3, "0")}`;

  return (
    <>
      <Atmosphere />
      <main className="screen">
        <header className="masthead">
          <h1 className="masthead-eyebrow">{dayDisplay}</h1>
          <p className="masthead-date">{START_DATE_LABEL}</p>
        </header>
        <Countdown />
      </main>
    </>
  );
}
