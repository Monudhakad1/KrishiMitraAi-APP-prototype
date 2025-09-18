import React from "react";
import { StatusBar } from "expo-status-bar";
import { AppProvider } from "./src/context/AppContext";

// Import expo router
import { useEffect } from "react";
import { SplashScreen } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function App() {
  // Ensure all app resources are loaded before rendering the app
  useEffect(() => {
    async function prepare() {
      try {
        // Artificially delay for demo purposes
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Hide the splash screen when ready
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <AppProvider>
      <StatusBar style="auto" />
    </AppProvider>
  );
}
