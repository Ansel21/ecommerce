import {StyleSheet,Text, View,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Success(){
  const navigation = useNavigation();
    const orderSuccess =()=>{
       AsyncStorage.setItem('cartProducts',JSON.stringify([]));
       navigation.navigate('Shopping')
    }
    return(
     <View style={styles.container}>
      <Text style = {{color:'black', fontSize:20}}>Order Success!</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Shopping')}><Text style = {{color:'#ff9900', fontSize:17,marginTop:10}} onPress={orderSuccess}>Keep Shopping</Text></TouchableOpacity>
     </View>
    
    );
}
const styles = StyleSheet.create(
    {
       container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
       },
       text:{
        color:'black',
        
       }

    }
);