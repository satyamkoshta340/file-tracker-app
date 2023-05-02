import { StyleSheet, View, Pressable, Image } from 'react-native'
import React, { useState, useContext } from 'react'
import AuthContext from '../store/authContext';
import { Modal, Portal, Button, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Account = ({navigation}) => {
    const [modalVisibility, setModalVisibility] = useState(false);
    const authCtx = useContext(AuthContext);
    const theme = useTheme();

    return (
    <View style={[styles.wrapper]}>
        <View style={{alignItems: "center"}}>
            {
                authCtx?.profile ? 
                <Image source={{ uri: authCtx.profile,}}  style={{width: 120, height: 120, borderRadius: 10, borderColor: "#ffffff", borderWidth: 4}}/> :
                <Image source={require("../../assets/avatar.png")}  style={{width: 120, height: 120, borderRadius: 10, borderColor: "#ffffff", borderWidth: 4}}/>
            }
            
        </View>
        <View style={styles.userBox}>
            <Text style={{ color: "white", fontSize: 24, fontWeight: 700 }}> { authCtx?.firstName + " " + authCtx?.lastName} </Text>
            <View style={{flexDirection:'row'}}>

                <MaterialIcons name="email" size={20} color="white" style={{ paddingTop:6 }}/> 
                <Text style={{ color: "white", paddingLeft:2, fontSize: 16, paddingTop: 4}}>{authCtx.email} </Text>
            </View>
        </View>

        <Pressable style={ styles.cardRow } onPress={() => navigation.navigate("RecentFiles")}>
            <Entypo name="folder" size={24} color="#DBC743" />
            <Text style={{marginLeft: 5, color: 'white'}}>All Recent Files</Text>
        </Pressable>

        <Pressable onPress={() => { setModalVisibility(true)
        }} style={ styles.cardRow }>
            <MaterialCommunityIcons name="logout" size={24} color="white" />
            <Text style={{marginLeft: 5, color: 'white'}}>Log out</Text>
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
    cardRow: {
        flexDirection: 'row',
        marginTop: 20,
        height: 80,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#39304A',
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