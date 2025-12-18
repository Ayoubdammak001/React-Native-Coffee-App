import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function ProfileDetailsScreen({ navigation }: any) {
    const { user, logout } = useAuth();
    const { theme } = useTheme();

    const handleLogout = () => {
        Alert.alert(
            'Déconnexion',
            'Êtes-vous sûr de vouloir vous déconnecter ?',
            [
                {
                    text: 'Annuler',
                    style: 'cancel',
                },
                {
                    text: 'Déconnexion',
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'WelcomeScreen' }],
                        });
                    },
                },
            ]
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color={theme.colors.primary} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Profile</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {/* PROFILE IMAGE SECTION */}
                <View style={styles.profileImageContainer}>
                    <Image
                        source={require('../../assets/icons/avatar.png')}
                        style={styles.profileImage}
                    />
                    <TouchableOpacity style={styles.editImageButton}>
                        <Ionicons name="camera" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* USER INFO SECTION */}
                <View style={styles.infoSection}>
                    <View style={[styles.infoCard, { backgroundColor: theme.colors.surface }]}> 
                        <View style={styles.infoRow}>
                            <Ionicons name="person-outline" size={24} color={theme.colors.primary} />
                            <View style={styles.infoContent}>
                                <Text style={[styles.infoLabel, { color: theme.colors.textMuted }]}>
                                    Nom
                                </Text>
                                <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                                    {user?.name || 'Non défini'}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.infoCard, { backgroundColor: theme.colors.surface }]}>
                        <View style={styles.infoRow}>
                            <Ionicons name="mail-outline" size={24} color={theme.colors.primary} />
                            <View style={styles.infoContent}>
                                <Text style={[styles.infoLabel, { color: theme.colors.textMuted }]}>
                                    Email
                                </Text>
                                <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                                    {user?.email || ''}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.infoCard, { backgroundColor: theme.colors.surface }]}>
                        <View style={styles.infoRow}>
                            <Ionicons name="key-outline" size={24} color={theme.colors.primary} />
                            <View style={styles.infoContent}>
                                <Text style={[styles.infoLabel, { color: theme.colors.textMuted }]}>
                                    ID Utilisateur
                                </Text>
                                <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                                    {user?.id || ''}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* MENU OPTIONS */}
                <View style={styles.menuSection}>
                    <TouchableOpacity 
                        style={styles.menuItem}
                        onPress={() => navigation.navigate('Settings')}
                    >
                        <View style={styles.menuItemLeft}>
                            <Ionicons name="settings-outline" size={24} color={theme.colors.primary} />
                            <Text style={[styles.menuItemText, { color: theme.colors.text }]}>
                                Paramètres
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#999" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.menuItem}
                        onPress={() => navigation.navigate('Notifications')}
                    >
                        <View style={styles.menuItemLeft}>
                            <Ionicons name="notifications-outline" size={24} color={theme.colors.primary} />
                            <Text style={[styles.menuItemText, { color: theme.colors.text }]}>
                                Notifications
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#999" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.menuItem}
                        onPress={() => navigation.navigate('HelpSupport')}
                    >
                        <View style={styles.menuItemLeft}>
                            <Ionicons name="help-circle-outline" size={24} color={theme.colors.primary} />
                            <Text style={[styles.menuItemText, { color: theme.colors.text }]}>
                                Aide & Support
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#999" />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.menuItem}
                        onPress={() => navigation.navigate('PrivacyPolicy')}
                    >
                        <View style={styles.menuItemLeft}>
                            <Ionicons name="document-text-outline" size={24} color={theme.colors.primary} />
                            <Text style={[styles.menuItemText, { color: theme.colors.text }]}>
                                Politique de confidentialité
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#999" />
                    </TouchableOpacity>
                </View>

                {/* LOGOUT BUTTON */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={24} color="#fff" />
                    <Text style={styles.logoutButtonText}>Déconnexion</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* BOTTOM NAVIGATION */}
            <View
                style={[
                    styles.bottomTab,
                    { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
                ]}
            >
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                    <Ionicons name="home" size={26} color={theme.colors.textMuted} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('FavoriteProduct')}>
                    <Ionicons name="heart-outline" size={26} color={theme.colors.textMuted} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    <Ionicons name="cart-outline" size={26} color={theme.colors.textMuted} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="person-outline" size={26} color={theme.colors.primary} />
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
    placeholder: {
        width: 32,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    profileImageContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
        position: 'relative',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#00512C',
    },
    editImageButton: {
        position: 'absolute',
        bottom: 0,
        right: '35%',
        backgroundColor: '#00512C',
        borderRadius: 20,
        padding: 8,
        borderWidth: 3,
        borderColor: '#fff',
    },
    infoSection: {
        marginBottom: 30,
    },
    infoCard: {
        backgroundColor: '#F4F4F4',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    menuSection: {
        marginBottom: 30,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    menuItemText: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
    },
    logoutButton: {
        backgroundColor: '#00512C',
        borderRadius: 16,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 20,
    },
    logoutButtonText: {
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
});

