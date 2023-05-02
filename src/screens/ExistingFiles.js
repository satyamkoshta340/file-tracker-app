import { StyleSheet, View, ScrollView, Vibration } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'
import { REACT_APP_URL } from "@env"
import { ActivityIndicator, Modal, Text, List, Card, Button } from "react-native-paper";
import { FontAwesome } from '@expo/vector-icons';

const ExistingFiles = ({navigation}) => {
    const authCtx = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [files, setFiles] = useState(null);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [file, setFile] = useState(null);

    const getFiles = async ()=>{
        setIsLoading(true)
        var config = {
            method: "get",
            url: `${REACT_APP_URL}/api/file`,
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            },
        }
        axios(config)
            .then( async (resp) => {
                // console.log(resp.data.data);
                setFiles(resp.data.data.files)
                setIsLoading(false)
                // console.log("files", files)
            })
    }
    const deleteFile = async (fileId) => {
        setIsDeleting(true);
        try{
            const resp = await axios.delete( `${REACT_APP_URL}/api/file/history/${fileId}`, {
                headers: {
                Authorization: `Bearer ${authCtx.token}`,
            },});
            const response = await resp.data;
            if( response.status === "success" ){
                console.log(response);
                setModalVisibility(false);
                getFiles();
            }
            else{
                console.log("error in deleting file")
            }
        }
        catch(err){
            console.log(err);
        }
        setIsDeleting(false);
    }

    useEffect(()=>{
        getFiles();
    }, [])

    if( isLoading ){
        return (
            <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                <ActivityIndicator size="large" color='#2277ee'/>
            </View>
        )
    }
  return (
    <View style={styles.container}>
    <ScrollView>
        <List.Section style={styles.fileContainer}>
            {
                files?.map( (item, key) => <Card type='elevated' style={styles.file} onPress={() => navigation.navigate("File", { fileId: item.fileId})} key={key} onLongPress={()=>{
                    setFile(item)
                    Vibration.vibrate(50);
                    setModalVisibility(true)}}>
                        <Text variant="titleMedium" ellipsizeMode='tail' style={{color: '#2C0703'}}> <FontAwesome name="file" size={16} color="#2C0703" /> {item?.fileName}</Text>
                        <Text ellipsizeMode='tail' numberOfLines={2} style={{color: '#2C0703'}}>{item.description}</Text>
                    </Card>)
            }
            { files?.length%3 ? <View style={{ flexGrow: 0.75}}></View> : '' }
            {
                files?.length === 0 || files === null ? <View style={{justifyContent:'center', alignContent:'center'}}><Text variant='titleMedium'>No Existing File</Text></View> : ''
            }
        </List.Section>
    </ScrollView>
    <Modal visible={modalVisibility} onDismiss={()=> setModalVisibility(false)} contentContainerStyle={styles.modal}>
            <Text variant='titleMedium'>Are you sure, wanna delete '{file?.fileName}'?</Text>
            <Text>Deleting the file will delete all it's data!</Text>
            {
                !isDeleting &&
                <View style={{flexDirection:'row', justifyContent: 'space-evenly', marginTop: 10}}>
                    <Button mode='elevated' buttonColor='#DD5755' textColor='black' onPress={() => deleteFile(file.fileId)}>Yes</Button>
                    <Button mode='elevated' onPress={()=> setModalVisibility(false)} buttonColor='#97D784' textColor='black'>No</Button>
                </View>
            }
            {
                isDeleting && 
                <ActivityIndicator size={'small'} style={{paddingTop: 10}} color='#937B63'/>
            }
            
        </Modal>
    </View>
  )
}

export default ExistingFiles

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 20,
        marginBottom: 20,
    },
    file: {
        width: '100%',
        height: 70,
        marginBottom: 10,
        borderRadius: 10,
        padding: 5,
        paddingLeft: 10,
        marginTop: 2,
        backgroundColor: '#D9BFD7'
    },
    fileContainer: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        overflow: 'scroll'
    },
    modal:{
        height: 150,
        backgroundColor: '#F5CDCC',
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 10
    }
})