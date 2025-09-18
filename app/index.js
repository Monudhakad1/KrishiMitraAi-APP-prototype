import { View, Text, StyleSheet, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
import { useEffect } from "react";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Navigate to the main screen after 3 seconds
    const timer = setTimeout(() => {
      router.replace("/(tabs)");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeIn"
        duration={1000}
        style={styles.logoContainer}
      >
        <Text style={styles.appName}>KrishiMitraAi</Text>

        {/* Plant with vegetables in center circle */}
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          duration={1500}
          style={styles.circleContainer}
        >
          {/* We'll use a placeholder for the image until we have the actual asset */}
          <View style={styles.plantCircle}>
            {/* This is a placeholder for the plant image */}
            <View style={styles.plant}>
              <View style={styles.stem}></View>
              <View style={styles.leaf1}></View>
              <View style={styles.leaf2}></View>
              <View style={styles.vegetable}></View>
            </View>
          </View>
        </Animatable.View>

        {/* Loading indicator */}
        <Animatable.View
          animation="rotate"
          iterationCount="infinite"
          duration={2000}
          style={styles.loadingContainer}
        >
          <View style={styles.loadingCircle} />
        </Animatable.View>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5fcf9",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 30,
  },
  circleContainer: {
    marginVertical: 20,
  },
  plantCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#e8f5e9",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#81c784",
  },
  plant: {
    width: 60,
    height: 80,
    position: "relative",
  },
  stem: {
    width: 4,
    height: 40,
    backgroundColor: "#4caf50",
    position: "absolute",
    bottom: 0,
    left: 28,
  },
  leaf1: {
    width: 20,
    height: 30,
    backgroundColor: "#66bb6a",
    borderRadius: 10,
    position: "absolute",
    bottom: 20,
    left: 10,
    transform: [{ rotate: "-30deg" }],
  },
  leaf2: {
    width: 20,
    height: 30,
    backgroundColor: "#66bb6a",
    borderRadius: 10,
    position: "absolute",
    bottom: 20,
    right: 10,
    transform: [{ rotate: "30deg" }],
  },
  vegetable: {
    width: 25,
    height: 25,
    backgroundColor: "#e53935", // Red tomato color
    borderRadius: 12.5,
    position: "absolute",
    top: 0,
    left: 17.5,
  },
  loadingContainer: {
    marginTop: 40,
  },
  loadingCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#2e7d32",
    borderTopColor: "transparent",
  },
});
