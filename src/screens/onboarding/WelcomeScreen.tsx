import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function WelcomeScreen({ navigation }: any) {
    return (
        <LinearGradient
            colors={['#B08149', '#D7A870']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
        >
            {/* Motif en overlay */}
            <Image
                source={require('../../assets/images/background/coffee_pattern.png')}
                style={styles.pattern}
                resizeMode="cover"
            />

            {/* CONTENU */}
            <View style={styles.container}>

                {/* Image café (Figma: 453x302, top:141, left:-21) */}
                <Image
                    source={require('../../assets/images/onboarding/coffee_package.png')}
                    style={styles.heroImage}
                    resizeMode="contain"
                />

                {/* Texte principal */}
                <Text style={styles.title}>
                    Coffee so good,{"\n"}
                    your taste buds{"\n"}
                    will love it
                </Text>

                {/* Sous-texte */}
                <Text style={styles.subtitle}>
                    The best grain, the finest roast,{"\n"}
                    the most powerful flavor.
                </Text>

                <View style={styles.dotsRow}>
                    <View style={styles.indicator} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                </View>


                {/* Bouton */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={styles.buttonText}>Get started</Text>
                </TouchableOpacity>

            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },

    pattern: {
        ...StyleSheet.absoluteFillObject,
        opacity: 1,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 60,
    },

    heroImage: {
        width: 453,
        height: 302,
        position: 'absolute',
        top: 141,
        left: -21,
    },

    title: {
        marginTop: 380,
        fontSize: 26,
        fontWeight: '700',
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 34,
    },

    subtitle: {
        marginTop: 10,
        fontSize: 14,
        color: 'rgba(255,255,255,0.85)',
        textAlign: 'center',
        lineHeight: 20,
    },

    indicatorWrapper: {
        marginTop: 25,
        marginBottom: 25,
    },

    button: {
        backgroundColor: "#00512C",
        paddingVertical: 14,
        paddingHorizontal: 70,
        borderRadius: 50,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: '600',
    },
    indicator: {
        width: 30,
        height: 6,
        borderRadius: 6,
        backgroundColor: "#0A6638",
    },

    dotsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 20,
        marginBottom: 20,
    },

    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#ffffff',
        opacity: 0.35,  // pour un effet léger comme Figma
    },

});
