import { StyleSheet, View, Pressable, Image } from 'react-native'
import React, { useState, useContext } from 'react'
import AuthContext from '../store/authContext';
import { Modal, Portal, Button, Text } from 'react-native-paper';


const Account = ({navigation}) => {
    const [modalVisibility, setModalVisibility] = useState(false);
    const authCtx = useContext(AuthContext);
    console.log(authCtx)

    return (
    <View style={styles.wrapper}>
        {/* <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 10}}>
            <Pressable style={ styles.backButton}>
                <Text style={styles.backButtonText}>←</Text>
            </Pressable>
            <Text style={{fontSize: 22, fontWeight:900}}>
                account
            </Text>
        </View> */}
        <View style={{alignItems: "center"}}>
            <Image source={{
            uri: authCtx?.profile,
            }}  style={{width: 120, height: 120, borderRadius: 10}}/>
        </View>
        <View style={styles.userBox}>
            <Text style={{ color: "white", fontSize: 24, fontWeight: 700 }}> { authCtx?.firstName + " " + authCtx?.lastName} </Text>
            <Text style={{ color: "white", paddingLeft:2, fontSize: 16, paddingTop: 4 }}> { authCtx.email} </Text>
        </View>

        <View style={ styles.cardRow }>
            <View>
                <Text>
                    My Files
                </Text>
            </View>
            <View>
                <Text>
                    My Files
                </Text>
            </View>
        </View>
        <Pressable onPress={() => { setModalVisibility(true)
        }} style={ styles.cardRow }>
            <Text>
                Log out
            </Text>
        </Pressable>
        <Portal>
            <Modal visible={modalVisibility} onDismiss={() => setModalVisibility(false)} contentContainerStyle={styles.modal}>
                <Text variant='titleMedium' > Are you sure, wanna logout?</Text>
                <View style={{ flexDirection: "row", justifyContent:"space-around", marginTop: 10}}>
                    <Button mode='outlined' onPress={() => authCtx.logout()} style={{borderColor: '#2C0703', color: '#2C0703'}}>Yes</Button>
                    <Button mode='contained' onPress={() => setModalVisibility(false)} style={{backgroundColor: '#2C0703'}}>No</Button>
                </View>
            </Modal>
        </Portal>
        
    </View>
  )
}

export default Account

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#dee4f7',
        padding: 20,
    },
    backButton:{
        position: 'absolute',
        left: 0,
        backgroundColor: '#ffff',
        width: 40,
        height: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: "center"
    },
    backButtonText:{
        fontSize: 20,
        fontWeight: 700
    },
    cardRow: {
        flexDirection: 'row',
        marginTop: 20,
        height: 80,
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    userBox:{
        marginTop: 30,
        backgroundColor: '#2C0703',
        borderRadius: 10,
        padding: 20,
        height: 100
    },
    modal:{
        width:'90%',
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 10
    },
})