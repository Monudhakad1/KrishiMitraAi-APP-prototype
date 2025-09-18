import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AssistantScreen() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your KrishiMitra AI assistant. How can I help you with your farming needs today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);

  // Sample AI responses for different farming queries
  const aiResponses = {
    wheat: [
      "For wheat cultivation, ensure soil pH is between 6.0-7.0. Best sowing time is October-November in North India.",
      "Wheat requires moderate irrigation at critical stages: crown root initiation, tillering, jointing, flowering and grain filling.",
      "Common wheat diseases include rust, powdery mildew, and smut. Early detection and appropriate fungicide application are important.",
    ],
    rice: [
      "Rice cultivation needs proper land preparation, including puddling to reduce water percolation.",
      "Maintain 5cm water level during the vegetative stage. Drain field 10 days before harvesting.",
      "Rice blast and bacterial leaf blight are common diseases. Use resistant varieties and proper spacing for management.",
    ],
    tomato: [
      "Tomatoes grow best in well-drained soil with pH 6.0-6.8. Seedlings should be transplanted after 4-6 weeks.",
      "Water regularly, maintaining consistent soil moisture. Avoid overhead watering to prevent diseases.",
      "Common issues include early blight, late blight and blossom end rot. Proper spacing and crop rotation help prevent these.",
    ],
    fertilizer: [
      "NPK ratio should be balanced based on soil tests and crop requirements.",
      "Apply organic fertilizers like compost and manure to improve soil health and structure.",
      "For most crops, split fertilizer application is more effective than a single heavy dose.",
    ],
    pest: [
      "Implement Integrated Pest Management (IPM) approaches combining biological, cultural and chemical controls.",
      "Beneficial insects like ladybugs and lacewings can help control aphids and other pests naturally.",
      "Neem-based solutions are effective organic pesticides for many common garden pests.",
    ],
  };

  // Function to handle sending a message
  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI thinking and responding
    setTimeout(() => {
      generateAIResponse(inputMessage);
    }, 1500);
  };

  // Generate AI response based on user input
  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase();
    let response =
      "I'm not sure how to help with that. Could you ask about specific crops like wheat, rice, tomatoes, or topics like fertilizers and pest control?";

    // Check if the input contains any keywords
    Object.keys(aiResponses).forEach((key) => {
      if (input.includes(key)) {
        // Randomly select one of the responses for the matched keyword
        const responses = aiResponses[key];
        response = responses[Math.floor(Math.random() * responses.length)];
      }
    });

    const aiMessage = {
      id: messages.length + 2,
      text: response,
      sender: "ai",
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, aiMessage]);
    setIsTyping(false);
  };

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // Format timestamp
  const formatTime = (date) => {
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>AI Assistant</Text>
          <Text style={styles.headerSubtitle}>Get expert farming advice</Text>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          style={styles.messageList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageBubble,
                item.sender === "user" ? styles.userMessage : styles.aiMessage,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
              <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
            </View>
          )}
        />

        {isTyping && (
          <View style={styles.typingIndicator}>
            <ActivityIndicator size="small" color="#2e7d32" />
            <Text style={styles.typingText}>KrishiMitra AI is typing...</Text>
          </View>
        )}

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.input}
            placeholder="Ask about farming, crops, pests..."
            value={inputMessage}
            onChangeText={setInputMessage}
            multiline
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
          >
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </KeyboardAvoidingView>

        <View style={styles.suggestionContainer}>
          <Text style={styles.suggestionTitle}>Try asking about:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={styles.suggestionChip}
              onPress={() => setInputMessage("How to grow wheat?")}
            >
              <Text style={styles.suggestionText}>Wheat cultivation</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.suggestionChip}
              onPress={() => setInputMessage("Best fertilizers for tomatoes?")}
            >
              <Text style={styles.suggestionText}>Tomato fertilizers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.suggestionChip}
              onPress={() => setInputMessage("How to control pests naturally?")}
            >
              <Text style={styles.suggestionText}>Natural pest control</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.suggestionChip}
              onPress={() => setInputMessage("When should I harvest rice?")}
            >
              <Text style={styles.suggestionText}>Rice harvesting</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
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
    padding: 0,
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
  messageList: {
    flex: 1,
    padding: 16,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  userMessage: {
    backgroundColor: "#e8f5e9",
    alignSelf: "flex-end",
    borderTopRightRadius: 4,
  },
  aiMessage: {
    backgroundColor: "white",
    alignSelf: "flex-start",
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  timestamp: {
    fontSize: 10,
    color: "#999",
    alignSelf: "flex-end",
    marginTop: 4,
  },
  typingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  typingText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2e7d32",
    justifyContent: "center",
    alignItems: "center",
  },
  suggestionContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  suggestionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 8,
  },
  suggestionChip: {
    backgroundColor: "#e8f5e9",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#c8e6c9",
  },
  suggestionText: {
    color: "#2e7d32",
    fontSize: 14,
  },
});
