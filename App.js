import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './screens/login';
import SignupScreen from './screens/signup';
import Success from './screens/success';
import Shopping from './screens/shopping';
import ProductDetails from './screens/productdetails';
import { ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import Cart from './screens/cart';



const Stack = createNativeStackNavigator();


function SplashScreenImage() {
  const navigation = useNavigation();

  useEffect(() => {
    const startScreen = async () => {
      try {
        const val = await AsyncStorage.getItem('login');
        navigation.replace(val === '1' ? 'Shopping' : 'Login');
      } catch (error) {
        console.error(error);
        navigation.replace('Login');
      }
    };

    setTimeout(() => {
      startScreen();
    }, 3000);
  }, []);

  return <ImageBackground style={{ flex: 1 }} source={require('./img/img_background.png')} />;
}


export default function App() {

  return (
    
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name = "Shopping" component={Shopping}/>
      <Stack.Screen name = "Splash" component={SplashScreenImage} />
      <Stack.Screen name = "Login" component={LoginPage}/>
      <Stack.Screen name = "Signup" component={SignupScreen}/>
     
      <Stack.Screen name = "ProductDetails" component={ProductDetails}/>
      <Stack.Screen name = "Cart" component={Cart}/>
      <Stack.Screen name = "Success" component={Success}/>
      
    </Stack.Navigator>
  </NavigationContainer>
  );
}
