import React from 'react'
import { SafeAreaView, Text, TextInput, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import {router} from 'expo-router'
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

const MyLogin = () => {
  const hardcodedPassword = 'jirehPSA2024!';
  const [password, setPassword] = React.useState('');
  const [isValid, setIsValid] = React.useState(true);

  React.useEffect(() => {
    const storeEncryptedPassword = async () => {
      const hashedPassword = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, hardcodedPassword);
      await SecureStore.setItemAsync('storedPassword', hashedPassword);
      console.log('Hashed password:', hashedPassword);
    };
    storeEncryptedPassword();
  }, []);

  
  const passwordRequirements = {
    hasUppercase: /[A-Z]/,
    hasLowercase: /[a-z]/,
    hasNumber: /[0-9]/,
    hasSpecialCharacter: /[!@#$%^&*(),.?":{}|<>]/,
  };
 
  const validatePassword = (pass) => {
    if (pass.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (!passwordRequirements.hasUppercase.test(pass)) {
      return 'Password must include at least one uppercase letter.';
    }
    if (!passwordRequirements.hasLowercase.test(pass)) {
      return 'Password must include at least one lowercase letter.';
    }
    if (!passwordRequirements.hasNumber.test(pass)) {
      return 'Password must include at least one number.';
    }
    if (!passwordRequirements.hasSpecialCharacter.test(pass)) {
      return 'Password must include at least one special character.';
    }
    return ''; 
  };

  const handleChangePassword = (newPassword) => {
    setPassword(newPassword);
    const validationMessage = validatePassword(newPassword);
    setIsValid(!validationMessage);
  };

  const handleSubmit = async () => {
    const validationMessage = validatePassword(password);
    if (validationMessage) {
      Alert.alert(validationMessage);
      return;
    }
  //   Alert.alert('Login Successful.');
  //   router.push('/(tabs)');
  // };

  const storedPassword = await SecureStore.getItemAsync('storedPassword');
  const hashedEnteredPassword = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);

  if (hashedEnteredPassword !== storedPassword) {
    Alert.alert('Password is incorrect.');
    return;
  }

  Alert.alert('Login Successful.');
  router.push('/(tabs)');
};

    return(
        <SafeAreaView>
         <TextInput
        style={[styles.input /*, isDarkTheme && styles.darkInput*/]}
        onChangeText={handleChangePassword}
        value={password}
        placeholder="Enter Password"
        secureTextEntry={true}
        // placeholderTextColor={placeholderColor}
      />
      <TouchableOpacity
        style={[styles.button /*, isDarkTheme && styles.darkButton*/]}
        onPress={handleSubmit}>
      <Text style={{fontSize: 20}}>Submit</Text>
      </TouchableOpacity>
      
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  input:{
    fontSize:16,
          borderBottomWidth: 1,
          padding: 5,
          width: '50%'},
})
export default MyLogin;