import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAppContext } from "../../context/AppContext";

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useAppContext();

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "hi" : "en";
    changeLanguage(newLanguage);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={toggleLanguage}>
      <View style={styles.languageButton}>
        <Text style={styles.languageText}>
          {language === "en" ? "हिंदी" : "English"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  languageButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#e8f5e9",
    borderWidth: 1,
    borderColor: "#c8e6c9",
  },
  languageText: {
    color: "#2e7d32",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default LanguageSwitcher;
