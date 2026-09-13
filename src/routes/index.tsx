import { createFileRoute } from "@tanstack/react-router";

import { Atmosphere } from "@/components/background/Atmosphere";
import { Countdown } from "@/components/countdown/Countdown";
import { DEADLINE_LABEL } from "@/utils/countdown";
import { useAudio } from "@/hooks/useAudio";

export const Route = createFileRoute("/")(  {
  head: () => ({
    meta: [
      { title: "Day 052 — October 10, 2026" },
      {
        name: "description",
        content:
          "A quiet, continuously running countdown to October 10, 2026. No controls, no clutter — just the time that remains.",
      },
      { property: "og:title", content: "Day 052 — October 10, 2026" },
      {
        property: "og:description",
        content: "A quiet, continuously running countdown to October 10, 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  // Plays Dandelions.mp3 at 70% volume, looped.
  // Double-click / double-tap anywhere toggles mute.
  useAudio("/Dandelions.mp3", 0.7);

  return (
    <>
      <Atmosphere />
      <main className="screen">
        <header className="masthead">
          <h1 className="masthead-eyebrow">Day 052</h1>
          <p className="masthead-date">{DEADLINE_LABEL}</p>
        </header>
        <Countdown />
      </main>
    </>
  );
}

