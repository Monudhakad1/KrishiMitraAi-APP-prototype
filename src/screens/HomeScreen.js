import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>KrishiMitraAi</Text>
          <Text style={styles.headerSubtitle}>
            Your Smart Farming Assistant
          </Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.cardContainer}>
            {/* Feature cards */}
            <TouchableOpacity style={styles.card} onPress={() => {}}>
              <View style={[styles.cardIcon, { backgroundColor: "#e8f5e9" }]}>
                {/* Plant icon placeholder */}
                <View style={styles.iconPlaceholder}></View>
              </View>
              <Text style={styles.cardTitle}>Crop Analysis</Text>
              <Text style={styles.cardDescription}>
                Scan and identify crop health issues
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => {}}>
              <View style={[styles.cardIcon, { backgroundColor: "#e3f2fd" }]}>
                {/* Weather icon placeholder */}
                <View style={styles.iconPlaceholder}></View>
              </View>
              <Text style={styles.cardTitle}>Weather Info</Text>
              <Text style={styles.cardDescription}>
                Get weather forecasts for farming
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => {}}>
              <View style={[styles.cardIcon, { backgroundColor: "#fff3e0" }]}>
                {/* Market icon placeholder */}
                <View style={styles.iconPlaceholder}></View>
              </View>
              <Text style={styles.cardTitle}>Market Prices</Text>
              <Text style={styles.cardDescription}>
                Check current crop market prices
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => {}}>
              <View style={[styles.cardIcon, { backgroundColor: "#f3e5f5" }]}>
                {/* AI icon placeholder */}
                <View style={styles.iconPlaceholder}></View>
              </View>
              <Text style={styles.cardTitle}>AI Assistant</Text>
              <Text style={styles.cardDescription}>
                Get farming advice from AI
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5fcf9",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2e7d32",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#689f38",
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  iconPlaceholder: {
    width: 30,
    height: 30,
    backgroundColor: "#2e7d32",
    borderRadius: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  cardDescription: {
    fontSize: 12,
    color: "#666",
  },
});

export default HomeScreen;
