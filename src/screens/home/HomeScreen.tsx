import React, { useState,useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { categories } from '../../data/categories';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';

export default function HomeScreen({ navigation }: any) {
    const [activeCategory, setActiveCategory] = useState("Cappuccino");
    const { addToCart, items } = useCart();
    
    const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <View style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>
                <Image
                    source={require('../../assets/icons/avatar.png')}
                    style={styles.avatar}
                />
                <View>
                    <Text style={styles.locationText}>Jakarta, Indonesia</Text>
                    <Text style={styles.greeting}>Good morning, Yudi</Text>
                </View>
                <Ionicons name="notifications-outline" size={24} color="#00512C" />
            </View>

            {/* SEARCH BAR */}
            <View style={styles.searchContainer}>
                <Feather name="search" size={20} color="#777" />
                <Text style={styles.searchPlaceholder}>Search Coffee ...</Text>
                <Feather name="sliders" size={20} color="#00512C" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>

                {/* CATEGORIES */}
                <Text style={styles.sectionTitle}>Categories</Text>

                <View style={styles.categoryContainer}>
                    {categories.map(cat => (
                        <TouchableOpacity
                            key={cat.id}
                            style={
                                activeCategory === cat.name
                                    ? styles.categoryActive
                                    : styles.category
                            }
                            onPress={() => setActiveCategory(cat.name)}
                        >
                            <Text
                                style={
                                    activeCategory === cat.name
                                        ? styles.categoryActiveText
                                        : styles.categoryText
                                }
                            >
                                {cat.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* PRODUCT LIST */}
                <View style={styles.cardRow}>
                    {products
                        .filter(p => p.category === activeCategory)
                        .map(product => (
                            <TouchableOpacity
                                key={product.id}
                                style={styles.card}
                                onPress={() => navigation.navigate("ProductDetails", { product })}
                            >

                                <Image source={product.image} style={styles.cardImage} />

                                <TouchableOpacity style={styles.favoriteBtn}>
                                    <Ionicons name="heart-outline" size={20} color="#00512C" />
                                </TouchableOpacity>

                                <Text style={styles.cardTitle}>{product.title}</Text>
                                <Text style={styles.cardSub}>{product.subtitle}</Text>

                                <View style={styles.cardBottom}>
                                    <Text style={styles.cardPrice}>
                                        Rp {product.price.toLocaleString()}
                                    </Text>

                                    <TouchableOpacity 
                                        style={styles.addBtn}
                                        onPress={() => addToCart(product)}
                                    >
                                        <Ionicons name="add" size={22} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        ))}
                </View>

                {/* SPECIAL OFFER */}
                <Text style={styles.sectionTitle}>Special Offer</Text>

                <View style={styles.cardRow}>
                    {products.slice(2, 4).map(product => (
                        <TouchableOpacity
                            key={product.id}
                            style={styles.card}
                            onPress={() => navigation.navigate("ProductDetails", { product })}
                        >
                            <Image source={product.image} style={styles.cardImage} />

                            <TouchableOpacity style={styles.favoriteBtn}>
                                <Ionicons name="heart-outline" size={20} color="#00512C" />
                            </TouchableOpacity>

                            <Text style={styles.cardTitle}>{product.title}</Text>
                            <Text style={styles.cardSub}>{product.subtitle}</Text>

                            <View style={styles.cardBottom}>
                                <Text style={styles.cardPrice}>
                                    Rp {product.price.toLocaleString()}
                                </Text>
                                <TouchableOpacity style={styles.addBtn}>
                                    <Ionicons name="add" size={22} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>

            {/* BOTTOM TAB */}
            <View style={styles.bottomTab}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                    <Ionicons name="home" size={26} color="#00512C" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="heart-outline" size={26} color="#999" />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Cart')}
                    style={styles.cartIconContainer}
                >
                    <Ionicons name="cart-outline" size={26} color="#999" />
                    {cartItemCount > 0 && (
                        <View style={styles.cartBadge}>
                            <Text style={styles.cartBadgeText}>
                                {cartItemCount > 99 ? '99+' : cartItemCount}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
                
                <TouchableOpacity>
                    <Ionicons name="person-outline" size={26} color="#999" />
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },

    header: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    avatar: { width: 42, height: 42, borderRadius: 21 },

    locationText: { fontSize: 12, color: '#000000' },

    greeting: { fontSize: 16, fontWeight: '600', color: '#000000' },

    searchContainer: {
        marginTop: 18,
        backgroundColor: '#F4F4F4',
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    searchPlaceholder: { flex: 1, marginLeft: 10, color: '#80A896' },

    sectionTitle: {
        marginTop: 22,
        marginBottom: 12,
        fontSize: 18,
        fontWeight: '700',
        color: '#00512C',
    },

    categoryContainer: { flexDirection: 'row', gap: 12 },

    category: {
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 20,
        backgroundColor: '#F3F3F3',
    },

    categoryActive: {
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 20,
        backgroundColor: '#00512C',
    },

    categoryText: { color: '#00582F' },

    categoryActiveText: { color: '#fff' },

    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 18,
        flexWrap: "wrap",
    },

    card: {
        width: '47%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        marginBottom: 15,
        elevation: 3,
    },

    cardImage: { width: '100%', height: 110, borderRadius: 12, marginBottom: 10 },

    favoriteBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#fff',
        padding: 6,
        borderRadius: 16,
    },

    cardTitle: { fontSize: 16, fontWeight: '600', },

    cardSub: { fontSize: 12, color: '#666', marginBottom: 8 },

    cardBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    cardPrice: { fontSize: 14, fontWeight: '700', color: '#00512C' },

    addBtn: {
        backgroundColor: '#00512C',
        padding: 6,
        borderRadius: 20,
    },

    bottomTab: {
        height: 70,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#EEE',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    cartIconContainer: {
        position: 'relative',
    },
    cartBadge: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: '#00512C',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    cartBadgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
    },
});
