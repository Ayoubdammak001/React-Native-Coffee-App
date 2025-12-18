import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ScreenTemplate from '../templates/ScreenTemplate';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { login } = useAuth();
  const { theme } = useTheme();

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigation.navigate('HomeScreen' as never);
    } else {
      Alert.alert('Erreur', result.error || 'Email ou mot de passe incorrect');
    }
  };

  return (
    <ScreenTemplate>
      {/* Fond dégradé café */}
      <LinearGradient
        colors={['#B08149', '#D7A870']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Motif textile en overlay */}
        <Image
          source={require('../../assets/images/background/coffee_pattern.png')}
          style={styles.pattern}
          resizeMode="cover"
          />

        {/* Contenu */}
        <View style={styles.container}>
          <Text style={[styles.title, { color: theme.colors.text }]}>{'Welcome Back'}</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textMuted }]}>
            Login to your account
          </Text>

          <View style={styles.form}>
            <Input placeholder="Email" value={email} onChangeText={setEmail} />
            <Input placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

            <Button
              title={loading ? 'Logging in...' : 'Login'}
              onPress={handleSubmit}
              style={styles.button}
              disabled={loading}
            />
            {loading && <ActivityIndicator style={styles.loader} />}
          </View>

          <Text style={[styles.footerText, { color: theme.colors.textMuted }]}>
            Don't have an account?{' '}
            <Text
              style={[styles.link, { color: theme.colors.primary }]}
              onPress={() => navigation.navigate('SignUp' as never)}
            >
              Sign Up
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
    opacity: 1,
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

export default LoginPage;