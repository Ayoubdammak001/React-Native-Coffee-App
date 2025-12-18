import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    Modal,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { categories } from '../../data/categories';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useFavorite } from '../../context/FavoriteContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function HomeScreen({ navigation }: any) {
    const [activeCategory, setActiveCategory] = useState("Cappuccino");
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState("default"); // default, priceLow, priceHigh, nameAZ
    const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
    const { addToCart, items } = useCart();
    const { isFavorite, toggleFavorite } = useFavorite();
    const { user } = useAuth();
    const { theme } = useTheme();
    
    const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    // Fonction pour obtenir le message de salutation selon l'heure
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    // Obtenir le nom à afficher (nom ou email ou valeur par défaut)
    const getUserDisplayName = () => {
        if (user?.name && user.name.trim()) {
            return user.name;
        }
        if (user?.email) {
            // Extraire la partie avant @ de l'email
            return user.email.split('@')[0];
        }
        return 'Guest';
    };

    // Filtrer et trier les produits
    const getFilteredProducts = () => {
        let filtered = products;

        // Filtrage par recherche
        if (searchQuery.trim()) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        } else {
            // Filtrer par catégorie si pas de recherche
            filtered = filtered.filter(p => p.category === activeCategory);
        }

        // Filtrage par prix
        filtered = filtered.filter(product =>
            product.price >= priceRange.min && product.price <= priceRange.max
        );

        // Tri
        let sorted = [...filtered];
        switch (sortBy) {
            case 'priceLow':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'priceHigh':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'nameAZ':
                sorted.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                // Ordre par défaut
                break;
        }

        return sorted;
    };

    const filteredProducts = getFilteredProducts();

    const resetFilters = () => {
        setSortBy("default");
        setPriceRange({ min: 0, max: 100000 });
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>

            {/* HEADER */}
            <View style={styles.header}>
                <Image
                    source={require('../../assets/icons/avatar.png')}
                    style={styles.avatar}
                />
                <View>
                    <Text style={[styles.locationText, { color: theme.colors.text }]}>Sfax, Tunisia</Text>
                    <Text style={[styles.greeting, { color: theme.colors.text }]}>
                        {getGreeting()}, {getUserDisplayName()}
                    </Text>
                </View>
                <Ionicons name="notifications-outline" size={24} color={theme.colors.primary} />
            </View>

            {/* SEARCH BAR */}
            <View style={[styles.searchContainer, { backgroundColor: theme.colors.input }]}>
                <Feather name="search" size={20} color={theme.colors.textMuted} />
                <TextInput
                    style={[styles.searchInput, { color: theme.colors.text }]}
                    placeholder="Search Coffee ..."
                    placeholderTextColor={theme.colors.textMuted}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoCapitalize="none"
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery("")}>
                        <Ionicons name="close-circle" size={20} color={theme.colors.textMuted} />
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => setShowFilters(true)}>
                    <Feather name="sliders" size={20} color={theme.colors.primary} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>

                {/* CATEGORIES - Masquer si recherche active */}
                {!searchQuery.trim() && (
                    <>
                        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Categories</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.categoryScroll}
                        >
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
                        </ScrollView>
                    </>
                )}

                {/* PRODUCT LIST */}
                {searchQuery.trim() ? (
                    <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                        Search Results ({filteredProducts.length})
                    </Text>
                ) : (
                    <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Products</Text>
                )}

                {filteredProducts.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="search-outline" size={64} color={theme.colors.textMuted} />
                        <Text style={[styles.emptyText, { color: theme.colors.text }]}>No products found</Text>
                        <Text style={[styles.emptySubtext, { color: theme.colors.textMuted }]}>
                            Try searching with different keywords
                        </Text>
                    </View>
                ) : (
                    <View style={styles.cardRow}>
                        {filteredProducts.map(product => (
                            <TouchableOpacity
                                key={product.id}
                                style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
                                onPress={() => navigation.navigate("ProductDetails", { product })}
                            >

                                <Image source={product.image} style={styles.cardImage} />

                                <TouchableOpacity 
                                    style={styles.favoriteBtn}
                                    onPress={() => toggleFavorite(product.id)}
                                >
                                    <Ionicons 
                                        name={isFavorite(product.id) ? "heart" : "heart-outline"} 
                                        size={20} 
                                        color={isFavorite(product.id) ? "#FF0000" : theme.colors.primary} 
                                    />
                                </TouchableOpacity>

                                <Text style={[styles.cardTitle, { color: theme.colors.text }]}>{product.title}</Text>
                                <Text style={[styles.cardSub, { color: theme.colors.textMuted }]}>{product.subtitle}</Text>

                                <View style={styles.cardBottom}>
                                    <Text style={[styles.cardPrice, { color: theme.colors.primary }]}>
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
                )}

                {/* SPECIAL OFFER - Masquer si recherche active */}
                {!searchQuery.trim() && (
                    <>
                        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Special Offer</Text>
                        <View style={styles.cardRow}>
                            {products.slice(2, 4).map(product => (
                                <TouchableOpacity
                                    key={product.id}
                                    style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
                                    onPress={() => navigation.navigate("ProductDetails", { product })}
                                >
                                    <Image source={product.image} style={styles.cardImage} />

                                    <TouchableOpacity 
                                        style={styles.favoriteBtn}
                                        onPress={() => toggleFavorite(product.id)}
                                    >
                                    <Ionicons 
                                        name={isFavorite(product.id) ? "heart" : "heart-outline"} 
                                        size={20} 
                                        color={isFavorite(product.id) ? "#FF0000" : theme.colors.primary} 
                                        />
                                    </TouchableOpacity>

                                    <Text style={[styles.cardTitle, { color: theme.colors.text }]}>{product.title}</Text>
                                    <Text style={[styles.cardSub, { color: theme.colors.textMuted }]}>{product.subtitle}</Text>

                                    <View style={styles.cardBottom}>
                                        <Text style={[styles.cardPrice, { color: theme.colors.primary }]}>
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
                    </>
                )}

            </ScrollView>

            {/* FILTER MODAL */}
            <Modal
                visible={showFilters}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowFilters(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {/* HEADER */}
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Filters</Text>
                            <TouchableOpacity onPress={() => setShowFilters(false)}>
                                <Ionicons name="close" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* SORT BY */}
                            <View style={styles.filterSection}>
                                <Text style={styles.filterSectionTitle}>Sort By</Text>
                                <View style={styles.filterOptions}>
                                    <TouchableOpacity
                                        style={[
                                            styles.filterOption,
                                            sortBy === 'default' && styles.filterOptionActive
                                        ]}
                                        onPress={() => setSortBy('default')}
                                    >
                                        <Text style={[
                                            styles.filterOptionText,
                                            sortBy === 'default' && styles.filterOptionTextActive
                                        ]}>
                                            Default
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.filterOption,
                                            sortBy === 'priceLow' && styles.filterOptionActive
                                        ]}
                                        onPress={() => setSortBy('priceLow')}
                                    >
                                        <Text style={[
                                            styles.filterOptionText,
                                            sortBy === 'priceLow' && styles.filterOptionTextActive
                                        ]}>
                                            Price: Low to High
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.filterOption,
                                            sortBy === 'priceHigh' && styles.filterOptionActive
                                        ]}
                                        onPress={() => setSortBy('priceHigh')}
                                    >
                                        <Text style={[
                                            styles.filterOptionText,
                                            sortBy === 'priceHigh' && styles.filterOptionTextActive
                                        ]}>
                                            Price: High to Low
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.filterOption,
                                            sortBy === 'nameAZ' && styles.filterOptionActive
                                        ]}
                                        onPress={() => setSortBy('nameAZ')}
                                    >
                                        <Text style={[
                                            styles.filterOptionText,
                                            sortBy === 'nameAZ' && styles.filterOptionTextActive
                                        ]}>
                                            Name: A to Z
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* PRICE RANGE */}
                            <View style={styles.filterSection}>
                                <Text style={styles.filterSectionTitle}>Price Range</Text>
                                <View style={styles.priceRangeContainer}>
                                    <View style={styles.priceInputContainer}>
                                        <Text style={styles.priceLabel}>Min</Text>
                                        <TextInput
                                            style={styles.priceInput}
                                            placeholder="0"
                                            keyboardType="numeric"
                                            value={priceRange.min.toString()}
                                            onChangeText={(text) => {
                                                const value = parseInt(text) || 0;
                                                setPriceRange({ ...priceRange, min: value });
                                            }}
                                        />
                                    </View>
                                    <View style={styles.priceInputContainer}>
                                        <Text style={styles.priceLabel}>Max</Text>
                                        <TextInput
                                            style={styles.priceInput}
                                            placeholder="100000"
                                            keyboardType="numeric"
                                            value={priceRange.max.toString()}
                                            onChangeText={(text) => {
                                                const value = parseInt(text) || 100000;
                                                setPriceRange({ ...priceRange, max: value });
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </ScrollView>

                        {/* FOOTER */}
                        <View style={styles.modalFooter}>
                            <TouchableOpacity
                                style={styles.resetButton}
                                onPress={resetFilters}
                            >
                                <Text style={styles.resetButtonText}>Reset</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.applyButton}
                                onPress={() => setShowFilters(false)}
                            >
                                <Text style={styles.applyButtonText}>Apply Filters</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* BOTTOM TAB */}
            <View
                style={[
                    styles.bottomTab,
                    { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
                ]}
            >
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                    <Ionicons name="home" size={26} color={theme.colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('FavoriteProduct')}>
                    <Ionicons name="heart-outline" size={26} color={theme.colors.textMuted} />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Cart')}
                    style={styles.cartIconContainer}
                >
                    <Ionicons name="cart-outline" size={26} color={theme.colors.textMuted} />
                    {cartItemCount > 0 && (
                        <View style={styles.cartBadge}>
                            <Text style={styles.cartBadgeText}>
                                {cartItemCount > 99 ? '99+' : cartItemCount}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => navigation.navigate('ProfileDetails')}>
                    <Ionicons name="person-outline" size={26} color={theme.colors.textMuted} />
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

    searchInput: {
        flex: 1,
        marginLeft: 10,
        color: '#000',
        fontSize: 14,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginTop: 16,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
        marginTop: 8,
    },

    sectionTitle: {
        marginTop: 22,
        marginBottom: 12,
        fontSize: 18,
        fontWeight: '700',
        color: '#00512C',
    },

    categoryScroll: {
        flexDirection: 'row',
        gap: 12,
        paddingRight: 12,
    },

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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '80%',
        paddingBottom: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000',
    },
    filterSection: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    filterSectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#00512C',
        marginBottom: 16,
    },
    filterOptions: {
        gap: 12,
    },
    filterOption: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: '#F4F4F4',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    filterOptionActive: {
        backgroundColor: '#F0F8F4',
        borderColor: '#00512C',
    },
    filterOptionText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    filterOptionTextActive: {
        color: '#00512C',
        fontWeight: '700',
    },
    priceRangeContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    priceInputContainer: {
        flex: 1,
    },
    priceLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        fontWeight: '500',
    },
    priceInput: {
        height: 48,
        borderWidth: 2,
        borderColor: '#EAEAEA',
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#F4F4F4',
    },
    modalFooter: {
        flexDirection: 'row',
        gap: 12,
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    resetButton: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 16,
        backgroundColor: '#F4F4F4',
        alignItems: 'center',
    },
    resetButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    applyButton: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 16,
        backgroundColor: '#00512C',
        alignItems: 'center',
    },
    applyButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },
});
