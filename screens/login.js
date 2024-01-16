import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput ,ScrollView,View, ImageBackground} from 'react-native';
import userStore from '../userStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputBox from '../InputBox';

export default function LoginPage({ navigation}) {
 
  const [username1, setUsername] = useState('');
  const [password1, setPassword] = useState('');
  const [credMatch,setCredMatch] = useState(false);
  
  const handleLogin = async () => {
    

    const storedUsers = await AsyncStorage.getItem('user');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
  

    const foundUser = users.find(user => user.email === username1 && user.password === password1);
  
    if (foundUser) {
      AsyncStorage.setItem('login','1');
      navigation.replace('Shopping'); 
    } else {
     
      setCredMatch(true);
    }

  };
  const signupPage = () => {
    navigation.navigate('Signup');
  };

  return (
    <ImageBackground source={require('../img/img_background.png')} style = {styles.imagBackGround}> 
    <ScrollView contentContainerStyle = {styles.container}>
      <View style = {styles.border}>
      <InputBox placeholderDetails = "Email"
      onChangeTextHandler ={(text) => setUsername(text)}

      />
      <InputBox placeholderDetails = "Password"
      onChangeTextHandler = {(text) => setPassword(text)}
      secureTextEntry
      />
    
       {credMatch?<Text style ={styles.warning}>*UserName and Password doesn't Match</Text>:null}
      <TouchableOpacity style={styles.login} onPress={handleLogin}>
        <Text style = {styles.signUpText}>Log in</Text>
      </TouchableOpacity>
      
      <Text style = {styles.dontHave}>Don't have an account?</Text>
      <TouchableOpacity onPress={signupPage} style={styles.signUp}>
        <Text style = {styles.signUpText}>Sign up</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  email: {
    width: '80%', 
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 25,
    height: 70,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    fontFamily: 'Roboto',
  },
  login: {
    width:'80%',
    maxWidth:400,
    backgroundColor: '#61DAFB', 
    margin: 10,
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  signUp: {
    backgroundColor: '#4CAF50', 
    margin: 10,
    borderRadius: 10,
    height: 40,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: 18,
  },
  border: {
    borderWidth: 1,
    borderColor: 'white',
    height:400,
    width: 350,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 200,
    paddingTop:20,
    marginTop:200
  },
  imagBackGround:{
    flex:1,
    justifyContent:'center'
  },
  dontHave:{
    fontFamily: 'Roboto',
    color:"white",
    fontSize:15
  },
  warning:{
    color:"#FFA500"
  }
});