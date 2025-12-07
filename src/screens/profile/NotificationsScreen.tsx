import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function NotificationsScreen({ navigation }: any) {
    const notifications = [
        {
            id: 1,
            title: 'Nouvelle promotion disponible',
            message: 'Découvrez notre nouvelle collection de cafés avec 20% de réduction',
            time: 'Il y a 2 heures',
            type: 'promotion',
            read: false,
        },
        {
            id: 2,
            title: 'Commande confirmée',
            message: 'Votre commande #1234 a été confirmée et sera livrée sous peu',
            time: 'Il y a 5 heures',
            type: 'order',
            read: false,
        },
        {
            id: 3,
            title: 'Nouveau produit disponible',
            message: 'Découvrez notre nouveau Cappuccino à la vanille',
            time: 'Hier',
            type: 'product',
            read: true,
        },
        {
            id: 4,
            title: 'Rappel de commande',
            message: 'N\'oubliez pas de finaliser votre commande dans le panier',
            time: 'Il y a 2 jours',
            type: 'reminder',
            read: true,
        },
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'promotion':
                return 'pricetag-outline';
            case 'order':
                return 'checkmark-circle-outline';
            case 'product':
                return 'cube-outline';
            case 'reminder':
                return 'time-outline';
            default:
                return 'notifications-outline';
        }
    };

    const getIconColor = (type: string) => {
        switch (type) {
            case 'promotion':
                return '#FF9500';
            case 'order':
                return '#34C759';
            case 'product':
                return '#00512C';
            case 'reminder':
                return '#007AFF';
            default:
                return '#00512C';
        }
    };

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="#00512C" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <TouchableOpacity>
                    <Text style={styles.markAllText}>Tout marquer</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {notifications.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="notifications-off-outline" size={64} color="#999" />
                        <Text style={styles.emptyText}>Aucune notification</Text>
                        <Text style={styles.emptySubtext}>Vous serez notifié des nouvelles activités</Text>
                    </View>
                ) : (
                    notifications.map((notification) => (
                        <TouchableOpacity
                            key={notification.id}
                            style={[
                                styles.notificationCard,
                                !notification.read && styles.notificationUnread
                            ]}
                        >
                            <View style={styles.notificationIconContainer}>
                                <Ionicons
                                    name={getIcon(notification.type)}
                                    size={24}
                                    color={getIconColor(notification.type)}
                                />
                            </View>
                            <View style={styles.notificationContent}>
                                <View style={styles.notificationHeader}>
                                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                                    {!notification.read && <View style={styles.unreadDot} />}
                                </View>
                                <Text style={styles.notificationMessage}>{notification.message}</Text>
                                <Text style={styles.notificationTime}>{notification.time}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000',
    },
    markAllText: {
        fontSize: 14,
        color: '#00512C',
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 100,
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
    notificationCard: {
        flexDirection: 'row',
        backgroundColor: '#F9F9F9',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    notificationUnread: {
        backgroundColor: '#F0F8F4',
        borderLeftWidth: 4,
        borderLeftColor: '#00512C',
    },
    notificationIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    notificationContent: {
        flex: 1,
    },
    notificationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
        flex: 1,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00512C',
        marginLeft: 8,
    },
    notificationMessage: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
        lineHeight: 20,
    },
    notificationTime: {
        fontSize: 12,
        color: '#999',
    },
});

