import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Switch,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';

export default function SettingsScreen({ navigation }: any) {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [language, setLanguage] = useState('Français');
    const { theme, toggleTheme } = useTheme();

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
                <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
                    Paramètres
                </Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {/* NOTIFICATIONS SECTION */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                        Notifications
                    </Text>
                    
                    <View style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <Ionicons name="notifications-outline" size={24} color={theme.colors.primary} />
                            <Text style={[styles.settingText, { color: theme.colors.text }]}>
                                Notifications push
                            </Text>
                        </View>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            trackColor={{ false: '#E0E0E0', true: theme.colors.primary }}
                            thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <Ionicons name="mail-outline" size={24} color={theme.colors.primary} />
                            <Text style={[styles.settingText, { color: theme.colors.text }]}>
                                Notifications email
                            </Text>
                        </View>
                        <Switch
                            value={emailNotifications}
                            onValueChange={setEmailNotifications}
                            trackColor={{ false: '#E0E0E0', true: theme.colors.primary }}
                            thumbColor={emailNotifications ? '#fff' : '#f4f3f4'}
                        />
                    </View>
                </View>

                {/* APPEARANCE SECTION */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                        Apparence
                    </Text>
                    
                    <View style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <Ionicons name="moon-outline" size={24} color={theme.colors.primary} />
                            <Text style={[styles.settingText, { color: theme.colors.text }]}>
                                Mode sombre
                            </Text>
                        </View>
                        <Switch
                            value={theme.name === 'dark'}
                            onValueChange={toggleTheme}
                            trackColor={{ false: '#E0E0E0', true: theme.colors.primary }}
                            thumbColor={theme.name === 'dark' ? '#fff' : '#f4f3f4'}
                        />
                    </View>
                </View>

                {/* LANGUAGE SECTION */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                        Langue
                    </Text>
                    
                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <Ionicons name="language-outline" size={24} color={theme.colors.primary} />
                            <Text style={[styles.settingText, { color: theme.colors.text }]}>
                                Langue de l'application
                            </Text>
                        </View>
                        <View style={styles.settingRight}>
                            <Text style={[styles.settingValue, { color: theme.colors.textMuted }]}>
                                {language}
                            </Text>
                            <Ionicons name="chevron-forward" size={20} color={theme.colors.textMuted} />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* ACCOUNT SECTION */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                        Compte
                    </Text>
                    
                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <Ionicons name="lock-closed-outline" size={24} color={theme.colors.primary} />
                            <Text style={[styles.settingText, { color: theme.colors.text }]}>
                                Changer le mot de passe
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#999" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <Ionicons name="trash-outline" size={24} color="#FF3B30" />
                            <Text style={[styles.settingText, styles.dangerText]}>
                                Supprimer le compte
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#999" />
                    </TouchableOpacity>
                </View>
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
    placeholder: {
        width: 32,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    section: {
        marginTop: 30,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#00512C',
        marginBottom: 16,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        flex: 1,
    },
    settingText: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
    },
    settingRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    settingValue: {
        fontSize: 16,
        color: '#666',
    },
    dangerText: {
        color: '#FF3B30',
    },
});

