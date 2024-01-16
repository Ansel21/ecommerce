import { Text, ScrollView, StyleSheet, TextInput,Image ,TouchableOpacity,View,Modal} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProductDetails({ route }) {
  const [quantity, setQuantity] = useState(1);
  const { name, image, description, ratingUsers, price } = route.params.product;
  const prodObj = {
    name1: name,
    image1:image,
    description1:description,
    price1:price,
    quantity1:quantity,
  }
  const navigation = useNavigation();
  const[ModalOpening,SetOpeningDetails] = useState(false);
  
  const cartHandle = async() =>{
    if(quantity != 0){
      SetOpeningDetails(false);
      const cart = await AsyncStorage.getItem('cartProducts');
      const cartObj = JSON.parse(cart);
      AsyncStorage.setItem('cartProducts',JSON.stringify([...cartObj,prodObj]));
    }
    else{
      SetOpeningDetails(false);
    }
   
  }
  const BuyNow = async()=>{
    setQuantity(item => item + 1);
    const cart = await AsyncStorage.getItem('cartProducts');
    const cartObj = JSON.parse(cart);
    AsyncStorage.setItem('cartProducts',JSON.stringify([...cartObj,prodObj]));
    navigation.navigate('Cart');
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style = {styles.backButon} onPress={navigation.goBack}><Text style = {styles.text}>Back</Text></TouchableOpacity>
      <Image source={image}  style = {styles.image} resizeMode="contain"/>
      <Text style={styles.rating}>{ratingUsers}</Text>
      <Text style = {styles.prodName}>{name}</Text>
      <Text style = {styles.description}>{description}</Text> 
      <Text style = {styles.mrp}>₹{price}</Text>
      <View style={styles.buttons}>
      <TouchableOpacity style = {styles.touchButton1} onPress={()=>{SetOpeningDetails(true);}}>
        <Text style = {styles.cart}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.touchButton2} onPress={BuyNow}>
        <Text style = {styles.cart} >Buy Now</Text>
        </TouchableOpacity>

        

        <Modal visible={ModalOpening} transparent animationType="slide" >
          <View style={styles.modalContainer}>
           
            <View style={styles.modalBox}>
              <Text style = {{color:'black', fontSize:17}}>Quantity:</Text>
              <View styles = {styles.quantity}>
              <TouchableOpacity onPress = {()=>setQuantity(item => item + 1)} style={styles.plus}>
                <Text style={{color:'black'}}>+</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={quantity.toString() }
                onChangeText={(text) => {
                  const num = parseInt(text);
                  setQuantity(isNaN(num)?0:num);
                }}
              />
              <TouchableOpacity onPress = {()=>setQuantity(item => Math.max(item - 1,0))} style={styles.plus}><Text style={{color:'black', fontSize:24}}>-</Text></TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.modalButton} onPress={cartHandle}>
                <Text style={{color:'black'}}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={()=>SetOpeningDetails(false)}>
                <Text style={{color:'black'}}>Cancel</Text>
              </TouchableOpacity>
              
            </View>
          </View>
        </Modal>
        
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    
  },
  image:{
    width:'100%',
    height:400
  },
  rating:{
   marginLeft:15,
   fontSize:15,
   color:'black'
  },
  prodName:{
    fontWeight:'bold',
    fontSize:20,
    color:'black',
    marginLeft:10,
    
  },
  description:{
    marginLeft:10,
    marginBottom:15,
    maxWidth:"90%",
    color:'black',
    
  },
  mrp:{
    marginLeft:15,
    fontWeight:'bold',
    color:'black',
    fontSize:25
  },
  touchButton1:{
    width:'80%',
    maxWidth:400,
    marginLeft: 40,
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEDC56',
    marginTop:20 
  },
  cart:{
     color:'black'
  },
  touchButton2:{
    width:'80%',
    maxWidth:400,
    marginLeft: 40,
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff9900',
    marginTop:20 
  },
  buttons:{
    flex:1,
    marginBottom:20
  },
  backButon:{
    height:50,
    width:70,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center'
    
  },
  text:{
    color:"black",
    
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    height:325,
    width:200,
    
  },
  input: {
    height: 40,
    width: 90,
    justifyContent:'center',
    alignItems:'center',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    
  },
  modalButton: {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#FEDC56',
    width:'80%',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  quantity:{
    flexDirection:'row',
    
  },
  plus:{
    justifyContent:'center',
    alignItems:'center',
    height:40,
    width:40,
    backgroundColor:'#FEDC56',
    marginLeft:25,
    marginTop:10,
    borderRadius:20,
  },
  cancelButton:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#E53935',
    width:'80%',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  }
  

});
