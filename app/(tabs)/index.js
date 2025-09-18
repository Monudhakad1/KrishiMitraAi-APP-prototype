import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  // Weather data (dummy data)
  const weatherData = {
    temperature: 28,
    condition: "Sunny",
    humidity: 65,
    wind: 12,
  };

  // Crop calendar (dummy data)
  const cropCalendar = [
    {
      id: 1,
      crop: "Rice",
      sowingTime: "June - July",
      harvestTime: "October - November",
    },
    {
      id: 2,
      crop: "Wheat",
      sowingTime: "November - December",
      harvestTime: "March - April",
    },
    {
      id: 3,
      crop: "Maize",
      sowingTime: "June - July",
      harvestTime: "September - October",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>KrishiMitraAi</Text>
            <Text style={styles.headerSubtitle}>
              Your Smart Farming Assistant
            </Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle" size={40} color="#2e7d32" />
          </TouchableOpacity>
        </View>

        {/* Weather Card */}
        <View style={styles.weatherCard}>
          <View style={styles.weatherHeader}>
            <Ionicons name="sunny" size={24} color="#FF9800" />
            <Text style={styles.weatherTitle}>Today's Weather</Text>
          </View>
          <View style={styles.weatherContent}>
            <Text style={styles.temperature}>{weatherData.temperature}°C</Text>
            <Text style={styles.weatherCondition}>{weatherData.condition}</Text>
            <View style={styles.weatherDetails}>
              <View style={styles.weatherDetail}>
                <Ionicons name="water" size={16} color="#4FC3F7" />
                <Text style={styles.detailText}>
                  {weatherData.humidity}% Humidity
                </Text>
              </View>
              <View style={styles.weatherDetail}>
                <Ionicons name="speedometer" size={16} color="#78909C" />
                <Text style={styles.detailText}>
                  {weatherData.wind} km/h Wind
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.cardContainer}>
          {/* Feature cards */}
          <TouchableOpacity style={styles.card} onPress={() => {}}>
            <View style={[styles.cardIcon, { backgroundColor: "#e8f5e9" }]}>
              <Ionicons name="leaf" size={24} color="#2e7d32" />
            </View>
            <Text style={styles.cardTitle}>Crop Analysis</Text>
            <Text style={styles.cardDescription}>
              Scan and identify crop health issues
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => {}}>
            <View style={[styles.cardIcon, { backgroundColor: "#e3f2fd" }]}>
              <Ionicons name="water" size={24} color="#1976D2" />
            </View>
            <Text style={styles.cardTitle}>Irrigation</Text>
            <Text style={styles.cardDescription}>Smart water management</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => {}}>
            <View style={[styles.cardIcon, { backgroundColor: "#fff3e0" }]}>
              <Ionicons name="bar-chart" size={24} color="#E65100" />
            </View>
            <Text style={styles.cardTitle}>Market Prices</Text>
            <Text style={styles.cardDescription}>
              Check current crop market prices
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => {}}>
            <View style={[styles.cardIcon, { backgroundColor: "#f3e5f5" }]}>
              <Ionicons name="chatbubble-ellipses" size={24} color="#7B1FA2" />
            </View>
            <Text style={styles.cardTitle}>AI Assistant</Text>
            <Text style={styles.cardDescription}>
              Get farming advice from AI
            </Text>
          </TouchableOpacity>
        </View>

        {/* Crop Calendar */}
        <Text style={styles.sectionTitle}>Crop Calendar</Text>
        <View style={styles.calendarContainer}>
          {cropCalendar.map((crop) => (
            <View key={crop.id} style={styles.calendarItem}>
              <View style={styles.calendarIconContainer}>
                <Ionicons name="calendar" size={24} color="#2e7d32" />
              </View>
              <View style={styles.calendarInfo}>
                <Text style={styles.cropName}>{crop.crop}</Text>
                <Text style={styles.cropTiming}>Sowing: {crop.sowingTime}</Text>
                <Text style={styles.cropTiming}>
                  Harvest: {crop.harvestTime}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Tips Section */}
        <Text style={styles.sectionTitle}>Farming Tips</Text>
        <View style={styles.tipCard}>
          <Ionicons
            name="bulb"
            size={24}
            color="#FFC107"
            style={styles.tipIcon}
          />
          <Text style={styles.tipTitle}>Tip of the Day</Text>
          <Text style={styles.tipContent}>
            Water your crops early in the morning or late in the evening to
            minimize evaporation and make the most of your water resources.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5fcf9",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: 60,
    backgroundColor: "#f5fcf9",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e7d32",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#689f38",
  },
  profileButton: {
    padding: 5,
  },
  weatherCard: {
    margin: 16,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  weatherHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  weatherTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#424242",
  },
  weatherContent: {
    alignItems: "center",
    marginVertical: 10,
  },
  temperature: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FF9800",
  },
  weatherCondition: {
    fontSize: 18,
    color: "#616161",
    marginVertical: 5,
  },
  weatherDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  weatherDetail: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    marginLeft: 5,
    color: "#616161",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 16,
    color: "#2e7d32",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  card: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
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
  calendarContainer: {
    marginHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  calendarItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  calendarIconContainer: {
    marginRight: 12,
  },
  calendarInfo: {
    flex: 1,
  },
  cropName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  cropTiming: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  tipCard: {
    margin: 16,
    backgroundColor: "#FFF8E1",
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
  },
  tipIcon: {
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  tipContent: {
    color: "#666",
    lineHeight: 20,
  },
});
