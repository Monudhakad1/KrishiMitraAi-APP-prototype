import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create the context
const AppContext = createContext();

// Create provider component
export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState({
    state: null,
    district: null,
  });

  // Load saved data on app start
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem("language");
        const savedUserData = await AsyncStorage.getItem("userData");
        const savedLocation = await AsyncStorage.getItem("location");

        if (savedLanguage) setLanguage(savedLanguage);
        if (savedUserData) setUserData(JSON.parse(savedUserData));
        if (savedLocation) setLocation(JSON.parse(savedLocation));
      } catch (error) {
        console.error("Error loading saved data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedData();
  }, []);

  // Function to change language
  const changeLanguage = async (lang) => {
    try {
      setLanguage(lang);
      await AsyncStorage.setItem("language", lang);
    } catch (error) {
      console.error("Error saving language:", error);
    }
  };

  // Function to update user data
  const updateUserData = async (data) => {
    try {
      const updatedData = { ...userData, ...data };
      setUserData(updatedData);
      await AsyncStorage.setItem("userData", JSON.stringify(updatedData));
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  // Function to update location
  const updateLocation = async (stateKey, districtKey) => {
    try {
      const newLocation = {
        state: stateKey,
        district: districtKey,
      };
      setLocation(newLocation);
      await AsyncStorage.setItem("location", JSON.stringify(newLocation));
    } catch (error) {
      console.error("Error saving location:", error);
    }
  };

  // Context value
  const contextValue = {
    language,
    changeLanguage,
    userData,
    updateUserData,
    location,
    updateLocation,
    isLoading,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

// Create a custom hook for using the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export default AppContext;
