import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.day052.countdown",
  appName: "Day 052",
  webDir: "dist/client",
  android: {
    backgroundColor: "#08090B",
  },
  plugins: {
    SplashScreen: {
      backgroundColor: "#08090B",
      showSpinner: false,
      androidSplashResourceName: "splash",
      splashFullScreen: true,
      splashImmersive: true,
      launchAutoHide: true,
      launchShowDuration: 600,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#08090B",
      overlaysWebView: false,
    },
  },
};

export default config;
