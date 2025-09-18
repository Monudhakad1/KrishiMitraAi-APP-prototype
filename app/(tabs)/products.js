import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Dummy products data
const productsData = [
  {
    id: 1,
    name: "Organic Fertilizer Premium",
    price: 850,
    originalPrice: 950,
    dealer: "Green Valley Supplies",
    rating: 4.5,
    reviews: 128,
    category: "Fertilizer",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3",
    description: "High quality organic fertilizer for all crops"
  },
  {
    id: 2,
    name: "NPK Complex Fertilizer",
    price: 1200,
    originalPrice: 1350,
    dealer: "AgriTech Solutions",
    rating: 4.3,
    reviews: 89,
    category: "Fertilizer",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3",
    description: "Balanced NPK for better crop yield"
  },
  {
    id: 3,
    name: "Bio Pesticide Spray",
    price: 450,
    originalPrice: 500,
    dealer: "Eco Farm Products",
    rating: 4.7,
    reviews: 156,
    category: "Pesticide",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3",
    description: "Organic pest control solution"
  },
  {
    id: 4,
    name: "High Yield Wheat Seeds",
    price: 320,
    originalPrice: 380,
    dealer: "Premium Seeds Co.",
    rating: 4.6,
    reviews: 203,
    category: "Seeds",
    image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?ixlib=rb-4.0.3",
    description: "Disease resistant wheat variety"
  },
  {
    id: 5,
    name: "Drip Irrigation Kit",
    price: 2500,
    originalPrice: 2800,
    dealer: "Water Solutions Ltd",
    rating: 4.4,
    reviews: 67,
    category: "Equipment",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3",
    description: "Complete drip irrigation system"
  },
  {
    id: 6,
    name: "Soil Testing Kit",
    price: 180,
    originalPrice: 220,
    dealer: "Farm Analytics",
    rating: 4.2,
    reviews: 94,
    category: "Tools",
    image: "https://images.unsplash.com/photo-1551798507-629020c81463?ixlib=rb-4.0.3",
    description: "Test soil pH and nutrients at home"
  }
];

export default function ProductsScreen() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Fertilizer", "Pesticide", "Seeds", "Equipment", "Tools"];

  const filteredProducts = selectedCategory === "All" 
    ? productsData 
    : productsData.filter(product => product.category === selectedCategory);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    
    Alert.alert(
      "Added to Cart",
      `${product.name} has been added to your cart`
    );
  };

  const buyNow = (product) => {
    Alert.alert(
      "Order Confirmation",
      `Would you like to buy ${product.name} for ₹${product.price}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Buy Now",
          onPress: () => {
            Alert.alert(
              "Success!",
              "Your order has been placed successfully"
            );
          },
        },
      ]
    );
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.dealerName}>By {item.dealer}</Text>
        
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            {[...Array(5)].map((_, index) => (
              <Ionicons
                key={index}
                name={index < Math.floor(item.rating) ? "star" : "star-outline"}
                size={14}
                color="#FFD700"
              />
            ))}
          </View>
          <Text style={styles.ratingText}>({item.reviews})</Text>
        </View>

        <Text style={styles.productDescription}>{item.description}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>₹{item.price}</Text>
          <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
          <Text style={styles.discount}>
            {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => addToCart(item)}
          >
            <Ionicons name="cart" size={16} color="#4CAF50" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buyNowButton}
            onPress={() => buyNow(item)}
          >
            <Text style={styles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Products</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.cartButton}>
            <Ionicons name="cart" size={24} color="#2E7D32" />
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.selectedCategoryChip
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.selectedCategoryText
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productsList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartButton: {
    position: "relative",
    marginRight: 15,
  },
  cartBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#FF5722",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  categoriesContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  selectedCategoryChip: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  categoryText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },
  selectedCategoryText: {
    color: "#fff",
  },
  productsList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#f5f5f5",
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  dealerName: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  stars: {
    flexDirection: "row",
    marginRight: 8,
  },
  ratingText: {
    fontSize: 12,
    color: "#666",
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    lineHeight: 20,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32",
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 16,
    color: "#999",
    textDecorationLine: "line-through",
    marginRight: 10,
  },
  discount: {
    fontSize: 12,
    color: "#FF5722",
    fontWeight: "bold",
    backgroundColor: "#FFE0DD",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4CAF50",
    backgroundColor: "#fff",
  },
  addToCartText: {
    color: "#4CAF50",
    fontWeight: "600",
    marginLeft: 5,
  },
  buyNowButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#4CAF50",
  },
  buyNowText: {
    color: "#fff",
    fontWeight: "600",
  },
});