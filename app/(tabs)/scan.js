import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ScanScreen() {
  const [isScanMode, setScanMode] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Function to simulate scan and analysis
  const handleScan = () => {
    setScanMode(true);

    // Simulate processing delay
    setTimeout(() => {
      setScanMode(false);

      // Mock analysis results
      setAnalysisResult({
        cropType: "Tomato",
        healthStatus: "Moderate",
        issues: [
          {
            id: 1,
            name: "Early Blight",
            probability: 87,
            description:
              "Fungal disease causing brown spots with concentric rings on leaves.",
            solution:
              "Apply fungicide containing chlorothalonil or copper. Remove infected leaves to prevent spread.",
          },
        ],
        recommendations: [
          "Remove infected leaves immediately",
          "Apply recommended fungicide every 7-10 days",
          "Ensure proper air circulation between plants",
          "Avoid overhead irrigation to keep foliage dry",
        ],
      });
    }, 2000);
  };

  // Function to reset and scan again
  const handleReset = () => {
    setAnalysisResult(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Crop Analysis</Text>
          <Text style={styles.headerSubtitle}>
            Scan plants to identify issues
          </Text>
        </View>

        <ScrollView style={styles.content}>
          {!isScanMode && !analysisResult ? (
            <View style={styles.scanContainer}>
              <View style={styles.cameraPlaceholder}>
                <Ionicons name="camera" size={60} color="#2e7d32" />
                <Text style={styles.cameraText}>Point camera at your crop</Text>
              </View>

              <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
                <Text style={styles.scanButtonText}>Start Scanning</Text>
              </TouchableOpacity>

              <View style={styles.instructionContainer}>
                <Text style={styles.instructionTitle}>How to scan:</Text>
                <View style={styles.instruction}>
                  <Ionicons name="checkmark-circle" size={18} color="#2e7d32" />
                  <Text style={styles.instructionText}>
                    Hold camera 15-30 cm from plant
                  </Text>
                </View>
                <View style={styles.instruction}>
                  <Ionicons name="checkmark-circle" size={18} color="#2e7d32" />
                  <Text style={styles.instructionText}>
                    Ensure good lighting conditions
                  </Text>
                </View>
                <View style={styles.instruction}>
                  <Ionicons name="checkmark-circle" size={18} color="#2e7d32" />
                  <Text style={styles.instructionText}>
                    Focus on affected areas of the plant
                  </Text>
                </View>
              </View>
            </View>
          ) : isScanMode ? (
            <View style={styles.scanningContainer}>
              <View style={styles.scanningAnimation}>
                <Ionicons name="scan-outline" size={80} color="#2e7d32" />
              </View>
              <Text style={styles.scanningText}>Analyzing crop...</Text>
              <Text style={styles.scanningSubtext}>Please hold steady</Text>
            </View>
          ) : (
            <View style={styles.resultContainer}>
              <View style={styles.resultHeader}>
                <Text style={styles.resultTitle}>Analysis Results</Text>
                <View
                  style={[
                    styles.statusIndicator,
                    analysisResult.healthStatus === "Healthy"
                      ? styles.healthyStatus
                      : analysisResult.healthStatus === "Moderate"
                      ? styles.moderateStatus
                      : styles.criticalStatus,
                  ]}
                >
                  <Text style={styles.statusText}>
                    {analysisResult.healthStatus}
                  </Text>
                </View>
              </View>

              <View style={styles.cropInfo}>
                <Text style={styles.cropType}>{analysisResult.cropType}</Text>
              </View>

              {analysisResult.issues.map((issue) => (
                <View key={issue.id} style={styles.issueCard}>
                  <View style={styles.issueHeader}>
                    <Text style={styles.issueName}>{issue.name}</Text>
                    <View style={styles.probabilityBadge}>
                      <Text style={styles.probabilityText}>
                        {issue.probability}%
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.issueDescription}>
                    {issue.description}
                  </Text>

                  <View style={styles.solutionContainer}>
                    <Text style={styles.solutionTitle}>
                      Recommended Solution:
                    </Text>
                    <Text style={styles.solutionText}>{issue.solution}</Text>
                  </View>
                </View>
              ))}

              <View style={styles.recommendationsContainer}>
                <Text style={styles.recommendationsTitle}>Action Steps:</Text>
                {analysisResult.recommendations.map((rec, index) => (
                  <View key={index} style={styles.recommendation}>
                    <Ionicons
                      name="arrow-forward-circle"
                      size={18}
                      color="#2e7d32"
                    />
                    <Text style={styles.recommendationText}>{rec}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={styles.newScanButton}
                onPress={handleReset}
              >
                <Text style={styles.newScanButtonText}>Scan Another Plant</Text>
              </TouchableOpacity>
            </View>
          )}
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
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#f5fcf9",
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
  content: {
    flex: 1,
  },
  scanContainer: {
    padding: 16,
    alignItems: "center",
  },
  cameraPlaceholder: {
    width: "100%",
    height: 300,
    backgroundColor: "#e8f5e9",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#81c784",
    marginVertical: 20,
  },
  cameraText: {
    marginTop: 10,
    color: "#2e7d32",
    fontSize: 16,
  },
  scanButton: {
    backgroundColor: "#2e7d32",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginVertical: 20,
  },
  scanButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  instructionContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  instruction: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  instructionText: {
    marginLeft: 8,
    color: "#555",
  },
  scanningContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  scanningAnimation: {
    marginBottom: 20,
  },
  scanningText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 8,
  },
  scanningSubtext: {
    color: "#689f38",
  },
  resultContainer: {
    padding: 16,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  statusIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  healthyStatus: {
    backgroundColor: "#c8e6c9",
  },
  moderateStatus: {
    backgroundColor: "#fff9c4",
  },
  criticalStatus: {
    backgroundColor: "#ffcdd2",
  },
  statusText: {
    fontWeight: "bold",
  },
  cropInfo: {
    marginBottom: 16,
  },
  cropType: {
    fontSize: 18,
    color: "#2e7d32",
    fontWeight: "500",
  },
  issueCard: {
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
  issueHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  issueName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d32f2f",
  },
  probabilityBadge: {
    backgroundColor: "#ffebee",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  probabilityText: {
    color: "#d32f2f",
    fontWeight: "bold",
    fontSize: 12,
  },
  issueDescription: {
    color: "#555",
    marginBottom: 12,
  },
  solutionContainer: {
    backgroundColor: "#e8f5e9",
    borderRadius: 8,
    padding: 12,
  },
  solutionTitle: {
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 4,
  },
  solutionText: {
    color: "#33691e",
  },
  recommendationsContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  recommendation: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  recommendationText: {
    marginLeft: 8,
    color: "#555",
    flex: 1,
  },
  newScanButton: {
    backgroundColor: "#2e7d32",
    paddingVertical: 14,
    borderRadius: 50,
    marginVertical: 10,
    alignItems: "center",
  },
  newScanButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
