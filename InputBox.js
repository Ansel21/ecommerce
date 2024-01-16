import { StyleSheet , TextInput,View} from "react-native"
export default function InputBox({ placeholderDetails, onChangeTextHandler, secureTextEntry }){
    return(
        <View style = {styles.inputContainer}>
        <TextInput
          placeholder={placeholderDetails}
          placeholderTextColor="black" 
          onChangeText={onChangeTextHandler}
          secureTextEntry = {secureTextEntry}
          style={styles.Input}
        />
        </View>
    );
}
const styles = StyleSheet.create(
    {
        Input: {
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
          inputContainer: {
            width: '100%',
            maxWidth: 400,
            marginBottom: 20,
            alignItems:'center',
            justifyContent:'center'
          },
    }
)