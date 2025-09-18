import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MarketScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy market data
  const marketData = [
    {
      id: 1,
      crop: "Rice",
      variety: "Basmati",
      price: "₹3,600",
      unit: "per quintal",
      trend: "up",
      change: "2.5%",
    },
    {
      id: 2,
      crop: "Wheat",
      variety: "Sharbati",
      price: "₹2,100",
      unit: "per quintal",
      trend: "down",
      change: "1.2%",
    },
    {
      id: 3,
      crop: "Potato",
      variety: "Kufri",
      price: "₹1,500",
      unit: "per quintal",
      trend: "up",
      change: "3.8%",
    },
    {
      id: 4,
      crop: "Tomato",
      variety: "Local",
      price: "₹1,800",
      unit: "per quintal",
      trend: "up",
      change: "5.2%",
    },
    {
      id: 5,
      crop: "Onion",
      variety: "Red",
      price: "₹1,200",
      unit: "per quintal",
      trend: "down",
      change: "2.1%",
    },
    {
      id: 6,
      crop: "Soybean",
      variety: "Yellow",
      price: "₹4,200",
      unit: "per quintal",
      trend: "up",
      change: "1.7%",
    },
    {
      id: 7,
      crop: "Maize",
      variety: "Hybrid",
      price: "₹1,850",
      unit: "per quintal",
      trend: "down",
      change: "0.9%",
    },
    {
      id: 8,
      crop: "Cotton",
      variety: "Long-staple",
      price: "₹6,300",
      unit: "per quintal",
      trend: "up",
      change: "4.3%",
    },
  ];

  // Categories for filter buttons
  const categories = ["All", "Cereals", "Vegetables", "Fruits", "Cash Crops"];

  // Filter market data based on selected category and search query
  const filteredMarketData = marketData.filter((item) => {
    const matchesSearch =
      item.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.variety.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === "All") {
      return matchesSearch;
    } else if (selectedCategory === "Cereals") {
      return (
        (item.crop === "Rice" ||
          item.crop === "Wheat" ||
          item.crop === "Maize") &&
        matchesSearch
      );
    } else if (selectedCategory === "Vegetables") {
      return (
        (item.crop === "Potato" ||
          item.crop === "Tomato" ||
          item.crop === "Onion") &&
        matchesSearch
      );
    } else if (selectedCategory === "Cash Crops") {
      return (
        (item.crop === "Soybean" || item.crop === "Cotton") && matchesSearch
      );
    } else if (selectedCategory === "Fruits") {
      return matchesSearch; // No fruits in our demo data, but keeping the filter
    }

    return matchesSearch;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Market Prices</Text>
          <Text style={styles.headerSubtitle}>
            Latest crop rates from local markets
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#2e7d32"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search crops..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterButton,
                selectedCategory === category && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedCategory === category &&
                    styles.filterButtonTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView style={styles.content}>
          <View style={styles.marketList}>
            <View style={styles.listHeader}>
              <Text style={[styles.columnHeader, { flex: 2 }]}>Crop</Text>
              <Text style={[styles.columnHeader, { flex: 1.5 }]}>Price</Text>
              <Text style={[styles.columnHeader, { flex: 1 }]}>Trend</Text>
            </View>

            {filteredMarketData.length > 0 ? (
              filteredMarketData.map((item) => (
                <View key={item.id} style={styles.listItem}>
                  <View style={{ flex: 2 }}>
                    <Text style={styles.cropName}>{item.crop}</Text>
                    <Text style={styles.cropVariety}>{item.variety}</Text>
                  </View>
                  <View style={{ flex: 1.5 }}>
                    <Text style={styles.cropPrice}>{item.price}</Text>
                    <Text style={styles.cropUnit}>{item.unit}</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <View style={styles.trendContainer}>
                      <Ionicons
                        name={item.trend === "up" ? "arrow-up" : "arrow-down"}
                        size={16}
                        color={item.trend === "up" ? "#4CAF50" : "#F44336"}
                      />
                      <Text
                        style={[
                          styles.trendText,
                          {
                            color: item.trend === "up" ? "#4CAF50" : "#F44336",
                          },
                        ]}
                      >
                        {item.change}
                      </Text>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.noResultsContainer}>
                <Ionicons name="search-outline" size={40} color="#bdbdbd" />
                <Text style={styles.noResultsText}>
                  No matching crops found
                </Text>
                <Text style={styles.noResultsSubtext}>
                  Try a different search term or category
                </Text>
              </View>
            )}
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Ionicons name="information-circle" size={20} color="#1976D2" />
              <Text style={styles.infoTitle}>Market Information</Text>
            </View>
            <Text style={styles.infoText}>
              Prices shown are daily wholesale rates from nearby agricultural
              markets. Actual prices may vary based on quality and local market
              conditions.
            </Text>
          </View>

          <TouchableOpacity style={styles.moreMarketsButton}>
            <Text style={styles.moreMarketsButtonText}>View More Markets</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5fcf9",
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
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
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    margin: 16,
    marginBottom: 8,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
  },
  filterContainer: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "#f1f1f1",
  },
  filterButtonActive: {
    backgroundColor: "#2e7d32",
  },
  filterButtonText: {
    color: "#555",
    fontWeight: "500",
  },
  filterButtonTextActive: {
    color: "white",
  },
  content: {
    flex: 1,
  },
  marketList: {
    margin: 16,
    marginTop: 8,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  listHeader: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  columnHeader: {
    fontWeight: "bold",
    color: "#555",
  },
  listItem: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  cropName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  cropVariety: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  cropPrice: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  cropUnit: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  trendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  trendText: {
    marginLeft: 2,
    fontWeight: "500",
  },
  noResultsContainer: {
    padding: 40,
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#757575",
    marginTop: 16,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: "#9e9e9e",
    marginTop: 8,
  },
  infoCard: {
    margin: 16,
    marginTop: 8,
    backgroundColor: "#e3f2fd",
    borderRadius: 12,
    padding: 16,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoTitle: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
    color: "#1976D2",
  },
  infoText: {
    color: "#333",
    lineHeight: 20,
  },
  moreMarketsButton: {
    margin: 16,
    backgroundColor: "#2e7d32",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginBottom: 30,
  },
  moreMarketsButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
