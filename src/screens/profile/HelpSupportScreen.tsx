import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';

export default function HelpSupportScreen({ navigation }: any) {
    const { theme } = useTheme();
    const helpItems = [
        {
            id: 1,
            title: 'FAQ',
            description: 'Questions fréquemment posées',
            icon: 'help-circle-outline',
            action: () => {},
        },
        {
            id: 2,
            title: 'Contacter le support',
            description: 'Envoyez-nous un message',
            icon: 'chatbubble-outline',
            action: () => {
                Linking.openURL('mailto:support@coffeeapp.com');
            },
        },
        {
            id: 3,
            title: 'Appeler le support',
            description: '+33 1 23 45 67 89',
            icon: 'call-outline',
            action: () => {
                Linking.openURL('tel:+33123456789');
            },
        },
        {
            id: 4,
            title: 'Chat en direct',
            description: 'Discutez avec notre équipe',
            icon: 'chatbox-outline',
            action: () => {},
        },
    ];

    const topics = [
        {
            id: 1,
            title: 'Comment passer une commande ?',
            content: 'Pour passer une commande, naviguez vers le produit souhaité, sélectionnez vos options (taille, niveau de sucre) et cliquez sur "Ajouter au panier". Ensuite, allez dans votre panier pour finaliser la commande.',
        },
        {
            id: 2,
            title: 'Comment modifier ma commande ?',
            content: 'Vous pouvez modifier votre commande en allant dans le panier. Cliquez sur les boutons + ou - pour ajuster les quantités, ou supprimez un article en utilisant l\'icône de suppression.',
        },
        {
            id: 3,
            title: 'Comment ajouter des produits aux favoris ?',
            content: 'Cliquez sur l\'icône cœur sur n\'importe quel produit pour l\'ajouter à vos favoris. Vous pouvez voir tous vos favoris en cliquant sur l\'icône cœur dans la barre de navigation.',
        },
        {
            id: 4,
            title: 'Comment modifier mon profil ?',
            content: 'Allez dans l\'écran de profil en cliquant sur l\'icône personne dans la barre de navigation. Vous pouvez voir et modifier vos informations personnelles.',
        },
    ];

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
                    Aide & Support
                </Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {/* HELP OPTIONS */}
                <View style={styles.section}>
                    {helpItems.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.helpItem}
                            onPress={item.action}
                        >
                            <View style={styles.helpItemLeft}>
                                <Ionicons name={item.icon} size={24} color={theme.colors.primary} />
                                <View style={styles.helpItemText}>
                                    <Text
                                        style={[styles.helpItemTitle, { color: theme.colors.text }]}
                                    >
                                        {item.title}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.helpItemDescription,
                                            { color: theme.colors.textMuted },
                                        ]}
                                    >
                                        {item.description}
                                    </Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color={theme.colors.textMuted} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* FAQ SECTION */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                        Questions fréquentes
                    </Text>
                    {topics.map((topic) => (
                        <View key={topic.id} style={styles.faqItem}>
                            <Text style={[styles.faqTitle, { color: theme.colors.text }]}>
                                {topic.title}
                            </Text>
                            <Text
                                style={[styles.faqContent, { color: theme.colors.textMuted }]}
                            >
                                {topic.content}
                            </Text>
                        </View>
                    ))}
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
    helpItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F4F4F4',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    helpItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        flex: 1,
    },
    helpItemText: {
        flex: 1,
    },
    helpItemTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
    },
    helpItemDescription: {
        fontSize: 14,
        color: '#666',
    },
    faqItem: {
        backgroundColor: '#F9F9F9',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    faqTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
        marginBottom: 8,
    },
    faqContent: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
});

