import { View, StyleSheet, FlatList ,TextInput,Text,TouchableOpacity } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Product from "./product";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Shopping(){
   const[search,setSearch] = useState('');
   const[filteredProducts,setFilterProducts] = useState([]);
   const[noProduct,setNoProduct] = useState(false);
   const navigation = useNavigation();

   const Logout = ()=>{
    AsyncStorage.setItem('login','0');
    navigation.navigate('Login');
   }
   const handleSearch = (text) => {
    setSearch(text);
    

    const filterData = products.filter((item) => 
        item.name.toLowerCase().includes(text.toLowerCase())

    );
    if(filterData.length === 0){
      setNoProduct(true);
    }
    setFilterProducts(filterData);
   }

    const products = [
        
        {
            name: 'Samsung Galaxy S23',
            description:
              'Samsung Galaxy S23 – a technological marvel that redefines the smartphone experience. Packed with cutting-edge features and sleek design, the Galaxy S23 is set to elevate your daily interactions.',
            price: 63000,
            image: require('../prodImage/samsung23.jpg'),
            ratingUsers: '4.3⭐ | 103224',
          },
          {
            name: 'Apple MacBook',
            description:
              'Introducing the Apple MacBook Pro X, the epitome of elegance and performance in the world of laptops. Meticulously designed and engineered, the MacBook Pro X sets new standards for creativity, productivity, and innovation.',
            price: 125000,
            image: require('../prodImage/apple-macbook.jpg'),
            ratingUsers: '4.1⭐ | 20322',
          },
          {
            name: 'Apple Watch Series 9',
            description:
              'Smartwatch with Midnight Aluminum Case with Midnight Sport Band M/L. Fitness Tracker, Blood Oxygen & ECG Apps, Always-On Retina Display, Water Resistant ',
            price: 44900,
            image: require('../prodImage/appleWatch.jpg'),
            ratingUsers: '4.4⭐ | 7989',
          },
          {
            name: 'Apple AirPods Pro (2nd Generation)',
            description:
              'One of the standout features of the AirPods Pro is its active noise cancellation, providing a tranquil listening environment by blocking out external sounds. The transparency mode effortlessly blends the surrounding environment with your audio, ensuring you stay connected to the world when needed.',
            price: 21999,
            image: require('../prodImage/airpods.jpg'),
            ratingUsers: '4.5⭐ | 220322',
          },
          {
            name: 'Apple 2023 Mac Mini',
            description:
              'Apple 2023 Mac Mini Desktop Computer M2 chip with 8‑core CPU and 10‑core GPU, 8GB Unified Memory, 256GB SSD Storage, Gigabit Ethernet. Works with iPhone/iPad',
            price: 56492,
            image: require('../prodImage/macmini.jpg'),
            ratingUsers: '4.1⭐ | 20322',
          },
          {
            name: 'Apple Magic Mouse 2',
            description:
              'The Magic Mouse combines the functionality of a traditional mouse with innovative touch-sensitive features. Its smooth, multi-touch surface allows users to perform a variety of gestures, such as swiping, scrolling, and tapping, providing a seamless and intuitive navigation experience. The absence of physical buttons enhances the minimalist design while maintaining the mouse\'s versatility.',
            price: 7500,
            image: require('../prodImage/magicMouse.jpeg'),
            ratingUsers: '3.8⭐ | 10372',
          },
    ];
    return (
  <View>
    <View style = {styles.buttonNdInp}>
   
    <TextInput style = {styles.inputBar} placeholder="  Search for Products,Brands..." placeholderTextColor='black' onChangeText={handleSearch}/>
    <TouchableOpacity onPress = {()=>navigation.navigate('Cart')} style = {styles.cartButton}><Text style = {styles.cartText}>Cart</Text></TouchableOpacity>
    <TouchableOpacity style = {styles.goBack} onPress={Logout}><Text style = {styles.text}>Logout</Text></TouchableOpacity>
    </View>
  <FlatList data = {search.length > 0?filteredProducts : products}
  keyExtractor={item => item.name}
   renderItem={({item}) => <Product name = {item.name} description = {item.description} price = {item.price} image = {item.image} ratingUsers = {item.ratingUsers} />}
   contentContainerStyle = {styles.scroll}
    />
    {noProduct?<View style={styles.noProductContainer}>
        <Text style={styles.noProductText}>No Product Found</Text>
      </View>:null}
    </View>
    );
}
const styles = StyleSheet.create({ 
scroll:{
    flexGrow: 1,
   marginTop:20,
   paddingBottom:100
},
inputBar:{
backgroundColor:'white',
height:70,
width:'60%'
},
buttonNdInp:{
    flexDirection:'row',
    
},
goBack:{
    width:'20%',
    height:70,
    backgroundColor:'#E57373',
    justifyContent:'center',
    alignItems:'center'

},
text:{
    color:'white'
},
noProductContainer:{

  justifyContent:'center',
  alignItems:'center',
 

},
noProductText:{
  fontSize: 18,
    color: 'black', 
},
cartButton:{
  justifyContent:'center',
  alignItems:'center',
  width:'20%',
  backgroundColor:'yellow'
},
cartText:{
  color:'black'
}

})