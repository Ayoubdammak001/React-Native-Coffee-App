import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCart } from '../../context/CartContext';

export default function CartScreen({ navigation }: any) {
    const { items, updateQuantity } = useCart();
    
    const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const discount = subtotal > 0 ? 25000 : 0;
    const total = Math.max(0, subtotal - discount);

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Cart</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {/* PRODUCT LIST */}
                {items.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="cart-outline" size={64} color="#999" />
                        <Text style={styles.emptyText}>Your cart is empty</Text>
                        <Text style={styles.emptySubtext}>Add items from the home screen</Text>
                    </View>
                ) : (
                    items.map((item) => (
                    <View key={item.id} style={styles.productCard}>
                        <Image source={item.product.image} style={styles.productImage} />
                        
                        <View style={styles.productInfo}>
                            <View style={styles.productHeader}>
                                <View style={styles.productTitleContainer}>
                                    <Text style={styles.productTitle}>{item.product.title}</Text>
                                    <Text style={styles.productSubtitle}>{item.product.subtitle}</Text>
                                </View>
                                <TouchableOpacity style={styles.favoriteBtn}>
                                    <Ionicons name="heart-outline" size={20} color="#00512C" />
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.productPrice}>
                                Rp {item.product.price.toLocaleString()}
                            </Text>

                            <View style={styles.productDetails}>
                                <View style={styles.detailsLeft}>
                                    <Text style={styles.detailText}>
                                        Cap Size: <Text style={styles.detailBold}>{item.size}</Text>
                                    </Text>
                                    <Text style={styles.detailText}>
                                        Level Sugar: <Text style={styles.detailBold}>{item.sugarLevel}</Text>
                                    </Text>
                                </View>

                                <View style={styles.quantityContainer}>
                                    <TouchableOpacity
                                        style={styles.quantityBtn}
                                        onPress={() => updateQuantity(item.id, -1)}
                                    >
                                        <Ionicons name="remove" size={20} color="#00512C" />
                                    </TouchableOpacity>
                                    <Text style={styles.quantityText}>{item.quantity}</Text>
                                    <TouchableOpacity
                                        style={[styles.quantityBtn, styles.quantityBtnPlus]}
                                        onPress={() => updateQuantity(item.id, 1)}
                                    >
                                        <Ionicons name="add" size={20} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    ))
                )}

                {/* ORDER SUMMARY */}
                {items.length > 0 && (
                    <>
                        <View style={styles.summaryContainer}>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryLabel}>Subtotal</Text>
                                <Text style={styles.summaryValue}>Rp {subtotal.toLocaleString()}</Text>
                            </View>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryLabel}>Discount</Text>
                                <Text style={styles.summaryValue}>Rp {discount.toLocaleString()}</Text>
                            </View>
                            <View style={styles.summaryDivider} />
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryTotalLabel}>Total</Text>
                                <Text style={styles.summaryTotalValue}>Rp {total.toLocaleString()}</Text>
                            </View>
                        </View>

                        {/* PAYMENT SECTION */}
                        <View style={styles.paymentSection}>
                            <Text style={styles.paymentTitle}>Payment</Text>
                            <View style={styles.paymentMethods}>
                                <TouchableOpacity style={styles.paymentMethod}>
                                    <Image 
                                        source={require('../../assets/icons/master_card.png')} 
                                        style={styles.paymentMethodImage}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.paymentMethod}>
                                    <Image 
                                        source={require('../../assets/icons/paypal.png')} 
                                        style={styles.paymentMethodImage}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.paymentMethod}>
                                    <Image 
                                        source={require('../../assets/icons/master_card.png')} 
                                        style={styles.paymentMethodImage}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* BUY BUTTON */}
                        <TouchableOpacity style={styles.buyButton}>
                            <Text style={styles.buyButtonText}>Buy</Text>
                        </TouchableOpacity>
                    </>
                )}
            </ScrollView>

            {/* BOTTOM NAVIGATION */}
            <View style={styles.bottomTab}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                    <Ionicons name="home" size={26} color="#00512C" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="heart-outline" size={26} color="#999" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.cartIconContainer}
                >
                    <Ionicons name="cart-outline" size={26} color="#00512C" />
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000',
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    productCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 12,
    },
    productInfo: {
        flex: 1,
    },
    productHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    productTitleContainer: {
        flex: 1,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 2,
    },
    productSubtitle: {
        fontSize: 12,
        color: '#999',
    },
    favoriteBtn: {
        padding: 4,
    },
    productPrice: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        marginBottom: 8,
    },
    productDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailsLeft: {
        flex: 1,
    },
    detailText: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    detailBold: {
        fontWeight: '700',
        color: '#000',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    quantityBtn: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#F3F3F3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityBtnPlus: {
        backgroundColor: '#00512C',
    },
    quantityText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        minWidth: 30,
        textAlign: 'center',
    },
    summaryContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginTop: 10,
        marginBottom: 20,
       
    },
    summaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#666',
    },
    summaryValue: {
        fontSize: 14,
        color: '#000',
        fontWeight: '600',
    },
    summaryDivider: {
        height: 1,
        backgroundColor: '#00512C',
        marginVertical: 8,
    },
    summaryTotalLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    summaryTotalValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    paymentSection: {
        marginBottom: 20,
    },
    paymentTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        marginBottom: 12,
    },
    paymentMethods: {
        flexDirection: 'row',
        gap: 0,
    },
    paymentMethod: {
        flex: 1,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    paymentMethodImage: {
        width: '80%',
        height: '70%',
    },
    buyButton: {
        backgroundColor: '#00512C',
        paddingVertical: 16,
        borderRadius: 16,
        marginBottom: 20,
        alignItems: 'center',
    },
    buyButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
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

