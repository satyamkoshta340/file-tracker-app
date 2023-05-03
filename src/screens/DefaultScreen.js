import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useContext } from 'react'
import AuthContext from '../store/authContext'
import { ActivityIndicator, MD2Colors } from "react-native-paper"

const DefaultScreen = () => {
    const authCtx = useContext(AuthContext);

    return (
      <View style={styles.container}>
          <Text style={styles.title}>Let's Track</Text>
          <Image source={require('../../assets/background1.png')} style={{ width: 320, height: 200, marginBottom: 50}} />
          <Pressable style={({ pressed }) => [
          pressed && {
            transform: [{
              scale: 0.92
            }]
          },
          styles.loginButtun]}
          onPress={() => {
            authCtx.googleAuth();
          }}
          disabled={authCtx.isLoading}
          >
            {
              authCtx.isLoading &&
              <ActivityIndicator animating={true} color={MD2Colors.amber400} />
            }
            {
              !authCtx.isLoading &&
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image source={require('../../assets/google.png')} style={{width: 30, height: 30}}></Image>
                  <Text style={{color: 'white', fontSize: 17, fontWeight: 700}}>Continue with Google</Text>
              </View>
            }
          </Pressable>
          
      </View>
    )
  }
export default DefaultScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        paddingTop: 100
    },
    title:{
        fontSize: 35,
        fontWeight: 900,
        color: 'crimson',
        marginBottom: 80
    },
    loginButtun:{
        width: 250,
        height: 50,
        backgroundColor: '#395FD0',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
})