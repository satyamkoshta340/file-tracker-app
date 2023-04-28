import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useContext} from 'react'
import AuthContext from '../store/authContext';

const AvatarButton = ({navigation}) => {
  const authCtx = useContext(AuthContext);
  return (
    <Pressable onPress={()=>{
        navigation.navigate('Account')
    }}
      style={styles.avatar}
    >
        <Image source={{ uri: authCtx.profile }} style={{width: 40, height: 40, borderRadius: 50}}></Image>
    </Pressable>
  )
}

export default AvatarButton

const styles = StyleSheet.create({
  avatar:{
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#2C0703"
  }
})