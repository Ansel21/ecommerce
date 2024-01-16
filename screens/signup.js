
import React, { useState } from 'react';
import { View, Text, StyleSheet,TextInput,TouchableOpacity, Alert, ScrollView, ImageBackground } from 'react-native';
import userStore from '../userStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignupScreen({navigation}) {
   
   

   const[newusername,setUsername] = useState('');
   const[newpassword,setPassword] = useState('');
   const[newEmail,setEmail] = useState('');
   const[emailError,setEmailError] = useState('');
   const[confirmPassword,setConfirmPassword] = useState('');
   const[passError,setPassError] = useState('');
   const[usrnameErr,setusrnameErr] = useState('');
   function isValidEmail(email){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
    
   }
   
   function passwordVerification(pass1 , pass2){
    if(pass1 === pass2){
      return true;
    }
    return false;
   }
   
   function userNameField(name){
    if(name === ''){
      return false;
    }
    return true;
   }


   const handleSignUp = async()=>{
    
    if(!(userNameField(newusername))){
     setusrnameErr('*UserName is empty');
     return;
    }
    if(!(isValidEmail(newEmail))){
      setEmailError('*Email Format is incorrect');
      return ;
    }
    if(!passwordVerification(newpassword,confirmPassword)){
       setPassError('*Password doesn\'t match');
       return;

    }
    else{
      setPassError('');
      
    const newUser = {username :newusername,
                    password : newpassword,
                    email : newEmail
    };
    try {
      const newUsers = await AsyncStorage.getItem('user');
      const existingUsers = newUsers ? JSON.parse(newUsers) : [];
      AsyncStorage.setItem('user', JSON.stringify([...existingUsers, newUser]));
      userStore.addUser(newUser);

      Alert.alert('You have successfully Signed up!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error saving user data: ', error);
    }
  }

   };



  return (
    <ImageBackground source={require('../img/img_background.png')} style={styles.imgBackground}>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.border}>
     <View style = {styles.inputContainer}>
     
     <TextInput placeholder = "Enter your name" placeholderTextColor = "black" style = {styles.textInp} onChangeText={(text)=>{setUsername(text);setusrnameErr('');}}></TextInput>
     {usrnameErr? <Text style={styles.warning}>{usrnameErr}</Text>:null}
     
     </View>
    
    
     
     <View style ={styles.inputContainer} >
        
        <TextInput placeholder = "Enter your Email ID" placeholderTextColor = "black" style = {styles.textInp} onChangeText={(text) => {setEmail(text);setEmailError('');}}></TextInput> 
        {emailError ? <Text style={styles.warning}>{emailError}</Text>:null}
     </View>
    
     <View style = {styles.inputContainer}>
        
        <TextInput placeholder = "Create password" placeholderTextColor = "black" style = {styles.textInp} onChangeText={(text) => setPassword(text)}></TextInput> 
     </View>
     
    <View style = {styles.inputContainer}>
     
      <TextInput placeholder="Confirm password" placeholderTextColor="black" style = {styles.textInp} secureTextEntry = {true}  onChangeText={(text)=> setConfirmPassword(text)}></TextInput>
      {passError?<Text style={styles.warning}>{passError}</Text>:null}
    </View>
    
     
      <TouchableOpacity  style = {styles.signUpButton} onPress = {handleSignUp}> 
      <Text style = {styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
    </ImageBackground>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  textInp:{
    width :"80%",
   backgroundColor:"white",
   borderRadius:25,
   height:70,
   marginBottom:20,
   justifyContent:"center",
   padding:20,
   fontFamily: 'Roboto'
  },
  
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#FFFFFF',
    }
      ,
   inputContainer: {
    flexDirection: 'column', 
    alignItems: 'center', 
    marginBottom: 20,
    width:'100%'
    },
  signUpButton: {
    backgroundColor: '#4CAF50', 
    margin: 10,
    borderRadius: 10,
    height: 50,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center'
  }
  ,
  signUpText:{
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: 18,
    
  },
  imgBackground:{
    flex:1,
    justifyContent:'center'
  },
  border:{
    borderWidth: 1,
    borderColor: 'white',
    flex: 1,
    width: 350,
    height:600,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20%',
    paddingTop:20,
    marginTop:'20%'
  }
  ,
  warning:{
    color:"red"
  }
  
});

