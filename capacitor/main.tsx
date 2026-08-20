import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Atmosphere } from "@/components/background/Atmosphere";
import { Countdown } from "@/components/countdown/Countdown";
import { DEADLINE_LABEL } from "@/utils/countdown";
import "../src/styles.css";

/**
 * Native (Capacitor) entry: mounts the exact same countdown UI as the web app
 * without the server-rendered router shell, so the Android WebView boots from
 * a purely static bundle.
 */
function NativeApp() {
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

async function configureSystemUi() {
  try {
    const { StatusBar, Style } = await import("@capacitor/status-bar");
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: "#08090B" });
  } catch {
    /* not running inside a native shell */
  }
  try {
    const { SplashScreen } = await import("@capacitor/splash-screen");
    await SplashScreen.hide();
  } catch {
    /* no splash screen available */
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NativeApp />
  </StrictMode>,
);

void configureSystemUi();
