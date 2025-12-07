import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PrivacyPolicyScreen({ navigation }: any) {
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
                <Text style={styles.headerTitle}>Politique de confidentialité</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                <Text style={styles.lastUpdated}>Dernière mise à jour : 1er janvier 2024</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>1. Introduction</Text>
                    <Text style={styles.content}>
                        Nous nous engageons à protéger votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles lorsque vous utilisez notre application.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>2. Informations que nous collectons</Text>
                    <Text style={styles.content}>
                        Nous collectons les informations suivantes :
                    </Text>
                    <Text style={styles.bulletPoint}>• Informations d'identification (nom, email)</Text>
                    <Text style={styles.bulletPoint}>• Informations de commande (produits commandés, adresse de livraison)</Text>
                    <Text style={styles.bulletPoint}>• Données d'utilisation (produits favoris, préférences)</Text>
                    <Text style={styles.bulletPoint}>• Informations de paiement (traitées de manière sécurisée)</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>3. Comment nous utilisons vos informations</Text>
                    <Text style={styles.content}>
                        Nous utilisons vos informations pour :
                    </Text>
                    <Text style={styles.bulletPoint}>• Traiter et gérer vos commandes</Text>
                    <Text style={styles.bulletPoint}>• Améliorer nos services et votre expérience</Text>
                    <Text style={styles.bulletPoint}>• Vous envoyer des notifications importantes</Text>
                    <Text style={styles.bulletPoint}>• Personnaliser votre expérience utilisateur</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>4. Partage de vos informations</Text>
                    <Text style={styles.content}>
                        Nous ne vendons jamais vos informations personnelles. Nous pouvons partager vos informations uniquement avec :
                    </Text>
                    <Text style={styles.bulletPoint}>• Nos prestataires de services (livraison, paiement)</Text>
                    <Text style={styles.bulletPoint}>• Les autorités légales si requis par la loi</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>5. Sécurité de vos données</Text>
                    <Text style={styles.content}>
                        Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre tout accès non autorisé, altération, divulgation ou destruction.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>6. Vos droits</Text>
                    <Text style={styles.content}>
                        Vous avez le droit de :
                    </Text>
                    <Text style={styles.bulletPoint}>• Accéder à vos informations personnelles</Text>
                    <Text style={styles.bulletPoint}>• Corriger vos informations</Text>
                    <Text style={styles.bulletPoint}>• Supprimer votre compte</Text>
                    <Text style={styles.bulletPoint}>• Vous opposer au traitement de vos données</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>7. Cookies et technologies similaires</Text>
                    <Text style={styles.content}>
                        Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience, analyser l'utilisation de l'application et personnaliser le contenu.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>8. Modifications de cette politique</Text>
                    <Text style={styles.content}>
                        Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle politique sur cette page.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>9. Contact</Text>
                    <Text style={styles.content}>
                        Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à :
                    </Text>
                    <Text style={styles.contactInfo}>Email : privacy@coffeeapp.com</Text>
                    <Text style={styles.contactInfo}>Téléphone : +33 1 23 45 67 89</Text>
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
        flex: 1,
        textAlign: 'center',
    },
    placeholder: {
        width: 32,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    lastUpdated: {
        fontSize: 12,
        color: '#999',
        marginTop: 10,
        marginBottom: 20,
        fontStyle: 'italic',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#00512C',
        marginBottom: 12,
    },
    content: {
        fontSize: 14,
        color: '#666',
        lineHeight: 22,
        marginBottom: 8,
    },
    bulletPoint: {
        fontSize: 14,
        color: '#666',
        lineHeight: 22,
        marginLeft: 16,
        marginBottom: 4,
    },
    contactInfo: {
        fontSize: 14,
        color: '#00512C',
        fontWeight: '600',
        marginTop: 4,
    },
});

