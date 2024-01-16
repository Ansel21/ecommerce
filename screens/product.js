import { View,StyleSheet,Text, Image, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function Product(props){
    const navigation = useNavigation();
    const productdetails = ()=>{
      navigation.navigate("ProductDetails",{product:props})
    }
    return (
     <View style={styles.prodContent}>
        <TouchableOpacity style = {styles.touch} onPress = {productdetails}>
        <Image source={props.image} style = {styles.prodImg} resizeMode="contain"/>
        <View style = {styles.textContainer}>
        <Text style={styles.text} numberOfLines={2}>{props.name}</Text>
        <Text style = {styles.description} numberOfLines={3}>{props.description}</Text>
        <Text style = {styles.star}>{props.ratingUsers}</Text>
         <Text style = {styles.mrp}>₹{props.price}</Text>
        </View>
        </TouchableOpacity>
      
     </View>
    );
}
const styles = StyleSheet.create({
    prodContent:{
        width:'100%',
        height:200,
        marginBottom:10,
        backgroundColor:"#FAFAFA"
        
    },
    prodImg:{
       
        width: '33%',
        height: '100%',
        marginLeft:10
        
       
    },
    text:{
        
        color:'black',
        marginTop:25,
        marginLeft:10,
        fontSize:19,
        fontWeight:'bold',
        maxWidth:'75%'
    },
    touch:{
        flex:1,
        flexDirection: 'row', 
    
    },
    description:{
        color:'black',
        marginLeft:10,
        fontSize:15,
        maxWidth:'75%'
        
        
    },
    textContainer:{
        flexDirection:'column',

    },
    mrp:{
        marginStart:10,
        color:'black',
        marginTop:10,
        fontWeight:'bold',
        fontSize:20
    },
    star:{
      marginStart:10,
      marginTop:10,
      color:"black"
    }
   
})