import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAppContext } from "../src/context/AppContext";
import { getText } from "../src/utils/translations";
import LanguageSwitcher from "../src/components/ui/LanguageSwitcher";

// Enhanced crop recommendation data with states and districts
const statesData = {
  "uttar-pradesh": {
    en: "Uttar Pradesh",
    hi: "उत्तर प्रदेश",
    districts: {
      allahabad: { en: "Allahabad", hi: "इलाहाबाद" },
      lucknow: { en: "Lucknow", hi: "लखनऊ" },
      kanpur: { en: "Kanpur", hi: "कानपुर" },
      agra: { en: "Agra", hi: "आगरा" },
      varanasi: { en: "Varanasi", hi: "वाराणसी" },
    },
  },
  punjab: {
    en: "Punjab",
    hi: "पंजाब",
    districts: {
      ludhiana: { en: "Ludhiana", hi: "लुधियाना" },
      amritsar: { en: "Amritsar", hi: "अमृतसर" },
      jalandhar: { en: "Jalandhar", hi: "जालंधर" },
      patiala: { en: "Patiala", hi: "पटियाला" },
      bathinda: { en: "Bathinda", hi: "बठिंडा" },
    },
  },
  haryana: {
    en: "Haryana",
    hi: "हरियाणा",
    districts: {
      gurgaon: { en: "Gurgaon", hi: "गुरुग्राम" },
      faridabad: { en: "Faridabad", hi: "फरीदाबाद" },
      panipat: { en: "Panipat", hi: "पानीपत" },
      karnal: { en: "Karnal", hi: "करनाल" },
      hisar: { en: "Hisar", hi: "हिसार" },
    },
  },
  maharashtra: {
    en: "Maharashtra",
    hi: "महाराष्ट्र",
    districts: {
      mumbai: { en: "Mumbai", hi: "मुंबई" },
      pune: { en: "Pune", hi: "पुणे" },
      nagpur: { en: "Nagpur", hi: "नागपुर" },
      nashik: { en: "Nashik", hi: "नासिक" },
      aurangabad: { en: "Aurangabad", hi: "औरंगाबाद" },
    },
  },
};

const soilTypes = {
  clay: { en: "Clay Soil", hi: "चिकनी मिट्टी" },
  sandy: { en: "Sandy Soil", hi: "बलुई मिट्टी" },
  loamy: { en: "Loamy Soil", hi: "दोमट मिट्टी" },
  black: { en: "Black Soil", hi: "काली मिट्टी" },
  red: { en: "Red Soil", hi: "लाल मिट्टी" },
};

const farmingSeasons = {
  kharif: {
    en: "Kharif (June-October)",
    hi: "खरीफ (जून-अक्टूबर)",
    months: "June-October",
  },
  rabi: {
    en: "Rabi (November-April)",
    hi: "रबी (नवंबर-अप्रैल)",
    months: "November-April",
  },
  zaid: {
    en: "Zaid (April-June)",
    hi: "जायद (अप्रैल-जून)",
    months: "April-June",
  },
};

// Enhanced crop recommendations
const cropRecommendations = {
  "uttar-pradesh-allahabad-clay-kharif": [
    { name: "Rice", yield: "4-6 tons/hectare", suitability: "Excellent" },
    {
      name: "Sugarcane",
      yield: "60-80 tons/hectare",
      suitability: "Very Good",
    },
    { name: "Maize", yield: "5-7 tons/hectare", suitability: "Good" },
    { name: "Cotton", yield: "15-20 quintal/hectare", suitability: "Good" },
  ],
  "uttar-pradesh-allahabad-clay-rabi": [
    { name: "Wheat", yield: "3-5 tons/hectare", suitability: "Excellent" },
    {
      name: "Mustard",
      yield: "12-18 quintal/hectare",
      suitability: "Very Good",
    },
    { name: "Peas", yield: "8-12 quintal/hectare", suitability: "Good" },
    { name: "Gram", yield: "10-15 quintal/hectare", suitability: "Good" },
  ],
  "uttar-pradesh-allahabad-clay-zaid": [
    { name: "Watermelon", yield: "20-30 tons/hectare", suitability: "Good" },
    { name: "Fodder", yield: "40-60 tons/hectare", suitability: "Very Good" },
    { name: "Vegetables", yield: "15-25 tons/hectare", suitability: "Good" },
  ],
  "punjab-ludhiana-loamy-rabi": [
    { name: "Wheat", yield: "4-6 tons/hectare", suitability: "Excellent" },
    { name: "Potato", yield: "25-35 tons/hectare", suitability: "Very Good" },
    { name: "Mustard", yield: "15-20 quintal/hectare", suitability: "Good" },
  ],
  "punjab-ludhiana-loamy-kharif": [
    { name: "Rice", yield: "5-7 tons/hectare", suitability: "Excellent" },
    { name: "Maize", yield: "6-8 tons/hectare", suitability: "Very Good" },
    { name: "Cotton", yield: "18-25 quintal/hectare", suitability: "Good" },
  ],
};

export default function CropRecommendationScreen() {
  const { language } = useAppContext();
  const router = useRouter();

  // Form state
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSoil, setSelectedSoil] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [yieldPerHectare, setYieldPerHectare] = useState("");
  const [hasSoilReport, setHasSoilReport] = useState(false);
  const [soilReport, setSoilReport] = useState("");

  // Modal states
  const [showStateModal, setShowStateModal] = useState(false);
  const [showDistrictModal, setShowDistrictModal] = useState(false);
  const [showSoilModal, setShowSoilModal] = useState(false);
  const [showSeasonModal, setShowSeasonModal] = useState(false);

  // Results
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Translation function
  const getTranslation = (key, fallback) => {
    return getText("cropRecommendation", key, language) || fallback;
  };

  const handleStateSelect = (stateKey) => {
    setSelectedState(stateKey);
    setSelectedDistrict(""); // Reset district when state changes
    setShowStateModal(false);
  };

  const handleDistrictSelect = (districtKey) => {
    setSelectedDistrict(districtKey);
    setShowDistrictModal(false);
  };

  const handleSoilSelect = (soilKey) => {
    setSelectedSoil(soilKey);
    setShowSoilModal(false);
  };

  const handleSeasonSelect = (seasonKey) => {
    setSelectedSeason(seasonKey);
    setShowSeasonModal(false);
  };

  const generateRecommendations = () => {
    if (
      !selectedState ||
      !selectedDistrict ||
      !selectedSoil ||
      !selectedSeason
    ) {
      Alert.alert(
        language === "hi" ? "त्रुटि" : "Error",
        language === "hi"
          ? "कृपया सभी आवश्यक फील्ड भरें"
          : "Please fill all required fields"
      );
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const key = `${selectedState}-${selectedDistrict}-${selectedSoil}-${selectedSeason}`;
      const crops = cropRecommendations[key] || [
        { name: "General Crop", yield: "Variable", suitability: "Good" },
      ];

      setRecommendations(crops);
      setShowResults(true);
      setIsLoading(false);
    }, 1500);
  };

  const resetForm = () => {
    setSelectedState("");
    setSelectedDistrict("");
    setSelectedSoil("");
    setSelectedSeason("");
    setYieldPerHectare("");
    setHasSoilReport(false);
    setSoilReport("");
    setRecommendations([]);
    setShowResults(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#2E7D32" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {getTranslation("title", "Crop Recommendation")}
          </Text>
          <LanguageSwitcher />
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <Ionicons name="leaf" size={60} color="#4CAF50" />
          <Text style={styles.bannerTitle}>
            {getTranslation("subtitle", "Smart Crop Recommendations")}
          </Text>
          <Text style={styles.bannerSubtitle}>
            {getTranslation(
              "description",
              "Get personalized crop recommendations based on your location, soil, and season"
            )}
          </Text>
        </View>

        {!showResults ? (
          /* Input Form */
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>
              {getTranslation("inputTitle", "Provide Your Details")}
            </Text>

            {/* State Selection */}
            <TouchableOpacity
              style={styles.inputButton}
              onPress={() => setShowStateModal(true)}
            >
              <View style={styles.inputContent}>
                <Text style={styles.inputLabel}>
                  {getTranslation("stateLabel", "State")}
                </Text>
                <Text style={styles.inputValue}>
                  {selectedState
                    ? statesData[selectedState][language]
                    : getTranslation("statePlaceholder", "Select State")}
                </Text>
              </View>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>

            {/* District Selection */}
            <TouchableOpacity
              style={[
                styles.inputButton,
                !selectedState && styles.disabledInput,
              ]}
              onPress={() => selectedState && setShowDistrictModal(true)}
              disabled={!selectedState}
            >
              <View style={styles.inputContent}>
                <Text style={styles.inputLabel}>
                  {getTranslation("districtLabel", "District")}
                </Text>
                <Text style={styles.inputValue}>
                  {selectedDistrict && selectedState
                    ? statesData[selectedState].districts[selectedDistrict][
                        language
                      ]
                    : getTranslation("districtPlaceholder", "Select District")}
                </Text>
              </View>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>

            {/* Soil Type Selection */}
            <TouchableOpacity
              style={styles.inputButton}
              onPress={() => setShowSoilModal(true)}
            >
              <View style={styles.inputContent}>
                <Text style={styles.inputLabel}>
                  {getTranslation("soilLabel", "Farming Soil")}
                </Text>
                <Text style={styles.inputValue}>
                  {selectedSoil
                    ? soilTypes[selectedSoil][language]
                    : getTranslation("soilPlaceholder", "Select Soil Type")}
                </Text>
              </View>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>

            {/* Season Selection */}
            <TouchableOpacity
              style={styles.inputButton}
              onPress={() => setShowSeasonModal(true)}
            >
              <View style={styles.inputContent}>
                <Text style={styles.inputLabel}>
                  {getTranslation("seasonLabel", "Farming Season")}
                </Text>
                <Text style={styles.inputValue}>
                  {selectedSeason
                    ? farmingSeasons[selectedSeason][language]
                    : getTranslation("seasonPlaceholder", "Select Season")}
                </Text>
              </View>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>

            {/* Optional Fields */}
            <View style={styles.optionalSection}>
              <Text style={styles.optionalTitle}>
                {getTranslation("optionalFields", "Optional Information")}
              </Text>

              {/* Yield Per Hectare */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  {getTranslation("yieldLabel", "Expected Yield per Hectare")}
                </Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={getTranslation(
                    "yieldPlaceholder",
                    "e.g., 25 quintal/hectare"
                  )}
                  value={yieldPerHectare}
                  onChangeText={setYieldPerHectare}
                  keyboardType="numeric"
                />
              </View>

              {/* Soil Report Toggle */}
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setHasSoilReport(!hasSoilReport)}
              >
                <Ionicons
                  name={hasSoilReport ? "checkbox" : "square-outline"}
                  size={24}
                  color="#4CAF50"
                />
                <Text style={styles.toggleText}>
                  {getTranslation(
                    "soilReportLabel",
                    "I have soil report available"
                  )}
                </Text>
              </TouchableOpacity>

              {/* Soil Report Input */}
              {hasSoilReport && (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>
                    {getTranslation("soilReportDetails", "Soil Report Details")}
                  </Text>
                  <TextInput
                    style={[styles.textInput, styles.multilineInput]}
                    placeholder={getTranslation(
                      "soilReportPlaceholder",
                      "Enter soil test results, pH, nutrients, etc."
                    )}
                    value={soilReport}
                    onChangeText={setSoilReport}
                    multiline
                    numberOfLines={3}
                  />
                </View>
              )}
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.recommendButton,
                  (!selectedState ||
                    !selectedDistrict ||
                    !selectedSoil ||
                    !selectedSeason) &&
                    styles.disabledButton,
                ]}
                onPress={generateRecommendations}
                disabled={
                  !selectedState ||
                  !selectedDistrict ||
                  !selectedSoil ||
                  !selectedSeason ||
                  isLoading
                }
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.recommendButtonText}>
                    {getTranslation(
                      "getRecommendations",
                      "Get Crop Recommendations"
                    )}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          /* Results Section */
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>
              {getTranslation("resultsTitle", "Recommended Crops")}
            </Text>
            <Text style={styles.resultsSubtitle}>
              {language === "hi"
                ? `${statesData[selectedState]?.hi}, ${statesData[selectedState]?.districts[selectedDistrict]?.hi} के लिए सुझावे गए फसलें`
                : `Recommendations for ${statesData[selectedState]?.en}, ${statesData[selectedState]?.districts[selectedDistrict]?.en}`}
            </Text>

            {recommendations.map((crop, index) => (
              <View key={index} style={styles.cropCard}>
                <View style={styles.cropHeader}>
                  <Ionicons name="leaf" size={24} color="#4CAF50" />
                  <View style={styles.cropInfo}>
                    <Text style={styles.cropName}>{crop.name}</Text>
                    <Text style={styles.cropSuitability}>
                      {crop.suitability} suitability
                    </Text>
                  </View>
                </View>
                <View style={styles.cropDetails}>
                  <Text style={styles.cropYield}>
                    Expected Yield: {crop.yield}
                  </Text>
                </View>
              </View>
            ))}

            <TouchableOpacity style={styles.resetButton} onPress={resetForm}>
              <Ionicons name="refresh" size={20} color="#4CAF50" />
              <Text style={styles.resetButtonText}>
                {getTranslation("newRecommendation", "New Recommendation")}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* State Selection Modal */}
        <Modal visible={showStateModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {getTranslation("selectState", "Select State")}
                </Text>
                <TouchableOpacity onPress={() => setShowStateModal(false)}>
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalContent}>
                {Object.keys(statesData).map((stateKey) => (
                  <TouchableOpacity
                    key={stateKey}
                    style={styles.modalOption}
                    onPress={() => handleStateSelect(stateKey)}
                  >
                    <Text style={styles.modalOptionText}>
                      {statesData[stateKey][language]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* District Selection Modal */}
        <Modal visible={showDistrictModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {getTranslation("selectDistrict", "Select District")}
                </Text>
                <TouchableOpacity onPress={() => setShowDistrictModal(false)}>
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalContent}>
                {selectedState &&
                  Object.keys(statesData[selectedState].districts).map(
                    (districtKey) => (
                      <TouchableOpacity
                        key={districtKey}
                        style={styles.modalOption}
                        onPress={() => handleDistrictSelect(districtKey)}
                      >
                        <Text style={styles.modalOptionText}>
                          {
                            statesData[selectedState].districts[districtKey][
                              language
                            ]
                          }
                        </Text>
                      </TouchableOpacity>
                    )
                  )}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Soil Selection Modal */}
        <Modal visible={showSoilModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {getTranslation("selectSoil", "Select Soil Type")}
                </Text>
                <TouchableOpacity onPress={() => setShowSoilModal(false)}>
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalContent}>
                {Object.keys(soilTypes).map((soilKey) => (
                  <TouchableOpacity
                    key={soilKey}
                    style={styles.modalOption}
                    onPress={() => handleSoilSelect(soilKey)}
                  >
                    <Text style={styles.modalOptionText}>
                      {soilTypes[soilKey][language]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Season Selection Modal */}
        <Modal visible={showSeasonModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {getTranslation("selectSeason", "Select Farming Season")}
                </Text>
                <TouchableOpacity onPress={() => setShowSeasonModal(false)}>
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalContent}>
                {Object.keys(farmingSeasons).map((seasonKey) => (
                  <TouchableOpacity
                    key={seasonKey}
                    style={styles.modalOption}
                    onPress={() => handleSeasonSelect(seasonKey)}
                  >
                    <Text style={styles.modalOptionText}>
                      {farmingSeasons[seasonKey][language]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  banner: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
    marginTop: 15,
    textAlign: "center",
  },
  bannerSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 20,
  },
  formContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 20,
  },
  inputButton: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  disabledInput: {
    backgroundColor: "#f0f0f0",
    opacity: 0.5,
  },
  inputContent: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
    fontWeight: "500",
  },
  inputValue: {
    fontSize: 16,
    color: "#333",
  },
  optionalSection: {
    marginTop: 25,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  optionalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  textInput: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  multilineInput: {
    height: 80,
    textAlignVertical: "top",
  },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  toggleText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  recommendButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: "#ccc",
    elevation: 0,
  },
  recommendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultsContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 10,
  },
  resultsSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    fontStyle: "italic",
  },
  cropCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
    elevation: 1,
  },
  cropHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cropInfo: {
    flex: 1,
    marginLeft: 10,
  },
  cropName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  cropSuitability: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  cropDetails: {
    paddingLeft: 34,
  },
  cropYield: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "500",
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 15,
  },
  resetButtonText: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  modalContent: {
    maxHeight: 300,
  },
  modalOption: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalOptionText: {
    fontSize: 16,
    color: "#333",
  },
});
