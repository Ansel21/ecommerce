import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity,TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Cart() {
  const[products,setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigation = useNavigation();
  useEffect(
    ()=>{
        const cartProducts = async()=>{
            const storedproducts = await AsyncStorage.getItem('cartProducts');
            if (storedproducts) {
                const parsedProducts = JSON.parse(storedproducts);
                setProducts(parsedProducts);
                calculateTotalAmount(parsedProducts);
              }
        }
        cartProducts();
        
    },[]
  
   
  );

  const calculateTotalAmount = (cart) => {
    const total = cart.reduce((acc, product) => {
      return acc + product.quantity1 * product.price1;
    }, 0);

    setTotalAmount(total);
  };
  const incrementQuantity = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity1 += 1;
    setProducts(updatedProducts);
    AsyncStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
    calculateTotalAmount(updatedProducts);
  };
  
  const decrementQuantity = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity1 -= 1;
    if (updatedProducts[index].quantity1 <= 0) {
      updatedProducts.splice(index, 1);
    }
    setProducts(updatedProducts);
    AsyncStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
    calculateTotalAmount(updatedProducts);
  };
  

  const buyNow = ()=>{

    navigation.replace('Success');
  };
  if(products.length === 0){
    return(
        <View style = {styles.notFound}>
            <Text style = {{color:'black', fontSize:20}}>Your Cart is Empty</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Shopping')}><Text style = {{color:'#ff9900', fontSize:17,marginTop:10}}>Explore Products</Text></TouchableOpacity>
        </View>
    );
  }
  return (
    <View style = {styles.container1}>
      <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
        <Text style={{color:'black'}}>Back</Text>
      </TouchableOpacity>
    </View>
    <ScrollView contentContainerStyle={styles.container}>
    
    {products.map((product, index) => (
      <View key={index} style={styles.productContainer}>
        <Image source={product.image1} style={styles.image} />
        <View style={styles.textContainer}>
        <Text style = {styles.name} numberOfLines={2}>{product.name1}</Text>   
        <Text style={styles.quantity}>Quantity: {product.quantity1}</Text>
        <View style = {styles.buttons}>
        <TouchableOpacity style = {styles.plus} onPress={()=>incrementQuantity(index)}><Text style = {styles.symbol}>+</Text></TouchableOpacity>
        <TouchableOpacity style = {styles.plus} onPress={()=>decrementQuantity(index)}><Text style = {styles.symbol}>-</Text></TouchableOpacity>
        </View>
        <Text style={styles.price}>₹{product.price1}</Text>
        </View>
      </View>
    ))}

     </ScrollView>
    <View style = {styles.order}>
    <Text style={{color:'black', fontSize:18}}>Total Amount</Text>
    <Text style = {{color:'black', fontSize:18}}>₹{totalAmount}</Text>
    </View>
    <TouchableOpacity style = {styles.placeOrder} onPress = {buyNow}><Text style = {styles.placeOrderText} >Place your order</Text></TouchableOpacity>
    </View>

 
  );
}

const styles = StyleSheet.create({
  container1:{
    flex:1
  }
  ,
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  backButton:{ 
    height: 50,
    width: 70,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  image: {
   width:'33%',
   height:'100%',
   resizeMode:'contain'
  },
  productContainer:{
    flexDirection:'row',
    width:'100%',
    height:200,
    marginBottom:10,
    backgroundColor:"#FAFAFA"
  },
  textContainer:{
    flexDirection:'column',
    marginLeft:20,
    flex:1
  },
  name:{
    color:'black',
    marginTop:25,
    fontSize:19,
    fontWeight:'bold',
    maxWidth:'100%'
  },
  quantity:{
    marginTop:10,
    color:'#3c6e71',
    fontSize:15

  },
  price:{
    marginTop:15,
    fontWeight:'bold',
    color:'#6c757d',
    fontSize:20
  },
  order:{
  height:60,
  backgroundColor:'#ff9900',
  flexDirection:'row',
  justifyContent:'space-around',
  alignItems:'center'
  },
  placeOrder:{
    width:'100%',
    height:60,
    backgroundColor:'#FEDC56',
    justifyContent:'center',
    alignItems:'center'
  },
  placeOrderText:{
    color:'black',
    fontSize:18,
    
  },
  notFound:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  buttons:{
    flexDirection:'row', 
  },
  plus:{
    justifyContent:'center',
    alignItems:'center',
    height:25,
    width:25,
    backgroundColor:'#FEDC56',
    marginRight:30,
    marginTop:10,
    borderWidth:1,
    borderRadius:20,
    
  },
  symbol:{
    fontSize:15
  }
});
