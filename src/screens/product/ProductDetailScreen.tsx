import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useCart } from "../../context/CartContext";
import { useFavorite } from "../../context/FavoriteContext";

export default function ProductDetailsScreen({ route, navigation }: any) {
  // Tous les hooks doivent être appelés en premier, dans le même ordre à chaque rendu
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorite();
  const [selectedSize, setSelectedSize] = useState("Small");
  const [selectedSugar, setSelectedSugar] = useState("No Sugar");

  // Accéder aux paramètres après les hooks
  const product = route.params?.product;

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, selectedSize, selectedSugar);
    Alert.alert(
      "Success",
      "Product added to cart!",
      [
        {
          text: "Continue Shopping",
          style: "cancel",
        },
        {
          text: "View Cart",
          onPress: () => navigation.navigate("Cart"),
        },
      ]
    );
  };

  // Si le produit n'est pas disponible, afficher un message d'erreur
  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Product not found</Text>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={26} color="#0A2F17" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* TOP IMAGE */}
      <Image source={product.image} style={styles.image} />

      {/* BACK BUTTON */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={26} color="#0A2F17" />
      </TouchableOpacity>

      {/* FAVORITE BUTTON */}
      <TouchableOpacity 
        style={styles.favoriteBtn}
        onPress={() => product && toggleFavorite(product.id)}
      >
        <Ionicons 
          name={product && isFavorite(product.id) ? "heart" : "heart-outline"} 
          size={26} 
          color={product && isFavorite(product.id) ? "#FF0000" : "#0A2F17"} 
        />
      </TouchableOpacity>

      {/* WHITE CONTENT */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.subtitle}>{product.subtitle}</Text>

        <View style={styles.ratingBox}>
          <Ionicons name="star" size={16} color="#fff" />
          <Text style={styles.ratingText}>4.8</Text>
        </View>

        {/* CUP SIZE */}
        <Text style={styles.sectionTitle}>Cup Size</Text>

        <View style={styles.row}>
          {["Small", "Medium", "Large"].map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.optionBtn,
                selectedSize === size && styles.optionBtnActive,
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedSize === size && styles.optionTextActive,
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* SUGAR LEVEL */}
        <Text style={styles.sectionTitle}>Level Sugar</Text>

        <View style={styles.row}>
          {["No Sugar", "Low", "Medium"].map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.optionBtn,
                selectedSugar === level && styles.optionBtnActive,
              ]}
              onPress={() => setSelectedSugar(level)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedSugar === level && styles.optionTextActive,
                ]}
              >
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ABOUT */}
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat...
        </Text>
      </ScrollView>

      {/* ADD TO CART */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cartBtn} onPress={handleAddToCart}>
          <Text style={styles.cartBtnText}>Add to cart</Text>
          <Text style={styles.cartPrice}>Rp {product.price.toLocaleString()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  image: {
    width: "100%",
    height: 350,
    resizeMode: "cover",
  },

  backBtn: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 50,
  },

  favoriteBtn: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 50,
  },

  content: {
    marginTop: -40,
    backgroundColor: "#fff",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0A2F17",
  },

  subtitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },

  ratingBox: {
    flexDirection: "row",
    backgroundColor: "#C7A26E",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: "center",
    width: 55,
    marginBottom: 20,
  },

  ratingText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 5,
    fontSize: 12,
  },

  sectionTitle: {
    marginTop: 10,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "600",
    color: "#0A2F17",
  },

  row: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 10,
  },

  optionBtn: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: "#EEE",
  },

  optionBtnActive: {
    backgroundColor: "#0A2F17",
  },

  optionText: { color: "#444", fontSize: 14 },

  optionTextActive: { color: "#fff", fontWeight: "600" },

  aboutText: {
    color: "#666",
    lineHeight: 18,
    marginBottom: 50,
  },

  footer: {
    padding: 20,
    backgroundColor: "#fff",
  },

  cartBtn: {
    backgroundColor: "#0A2F17",
    paddingVertical: 16,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },

  cartBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  cartPrice: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
