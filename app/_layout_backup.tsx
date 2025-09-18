import React, { useEffect, useState } from 'react';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { AppProvider, useAppContext } from '../src/context/AppContext';

export const unstable_settings = {
  anchor: "(tabs)",
};

// Navigation container that handles auth state and first launch
function RootLayoutNavigator() {
  const { isAuthenticated, isFirstLaunch, isLoading, language } = useAppContext();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // Handle the navigation based on auth state and first launch
    const inAuthGroup = segments[0] === 'onboarding';
    
    if (isFirstLaunch) {
      // First time app launch - start with language selection
      if (!inAuthGroup) {
        router.replace('/onboarding/language');
      }
    } else if (isAuthenticated) {
      // User is authenticated, go to main app if not already there
      if (inAuthGroup) {
        router.replace('/(tabs)');
      }
    } else {
      // User is not authenticated and not first launch, go to auth
      if (!inAuthGroup) {
        router.replace('/onboarding/auth');
      }
    }
  }, [isAuthenticated, isFirstLaunch, isLoading]);

  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
