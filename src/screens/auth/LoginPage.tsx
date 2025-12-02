import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ScreenTemplate from '../templates/ScreenTemplate';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();


  const handleSubmit = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    navigation.navigate('HomeScreen' as never);
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
          resizeMode="repeat"
        />

        {/* Contenu */}
        <View style={styles.container}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login to your account</Text>

          <View style={styles.form}>
            <Input placeholder="Email" value={email} onChangeText={setEmail} />
            <Input placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

            <Button title="Login" onPress={handleSubmit} style={styles.button} />
          </View>

          <Text style={styles.footerText}>
            Don’t have an account? <Text style={styles.link}>Sign Up</Text>
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
    opacity: 0.18,   // 🎯 EXACTEMENT comme ton design (ajuste ici)
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
});

export default LoginPage;
