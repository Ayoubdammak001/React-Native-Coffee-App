import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ScreenTemplate from '../templates/ScreenTemplate';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

// Import conditionnel pour gérer les erreurs AsyncStorage
let useAuth: any;
try {
  const authContext = require('../../context/AuthContext');
  useAuth = authContext.useAuth;
} catch (error) {
  // Fallback si AuthContext n'est pas disponible
  useAuth = () => ({
    register: async () => ({ success: false, error: 'Authentication not available' }),
  });
}

function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { register } = useAuth();

  const handleSubmit = async () => {
    // Validation
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);
    const result = await register(email, password, name);
    setLoading(false);

    if (result.success) {
      Alert.alert('Succès', 'Inscription réussie !', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('HomeScreen' as never),
        },
      ]);
    } else {
      Alert.alert('Erreur', result.error || 'Erreur lors de l\'inscription');
    }
  };

  return (
    <ScreenTemplate>
      <LinearGradient
        colors={['#B08149', '#D7A870']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Image
          source={require('../../assets/images/background/coffee_pattern.png')}
          style={styles.pattern}
          resizeMode="repeat"
        />

        <View style={styles.container}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

          <View style={styles.form}>
            <Input
              placeholder="Name (optional)"
              value={name}
              onChangeText={setName}
            />
            <Input
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Input
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <Button
              title={loading ? 'Creating...' : 'Sign Up'}
              onPress={handleSubmit}
              style={styles.button}
              disabled={loading}
            />
            {loading && <ActivityIndicator style={styles.loader} />}
          </View>

          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('Login' as never)}
            >
              Login
            </Text>
          </Text>
        </View>
      </LinearGradient>
    </ScreenTemplate>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  pattern: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.18,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 40,
  },
  form: {
    width: '100%',
    gap: 20,
  },
  button: {
    marginTop: 10,
  },
  footerText: {
    marginTop: 40,
    fontSize: 14,
    color: '#777',
  },
  link: {
    color: '#2E7D32',
    fontWeight: '700',
  },
  loader: {
    marginTop: 10,
  },
});

export default SignUpPage;