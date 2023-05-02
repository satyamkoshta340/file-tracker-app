import { StyleSheet, View, Image, FlatList } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios';
import AuthContext from '../store/authContext';
import {REACT_APP_URL} from "@env";
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


const File = ({route, navigation}) => {
    const { fileId } = route.params;
    const [ history, setHistory ] = useState([]);
    const [ file, setFile ] = useState({});
    const [ qr, setQr ] = useState("");
    const authCtx = useContext(AuthContext);
    const [ isLoading, setIsLoading] = useState(false)
    const html = `
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        </head>
        <body style="text-align: center;">
            <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
            ${file.fileName}
            </h1>
            <img
            src= "data:image/jpeg;base64,${qr}"
            style="width: 90vw;" />
        </body>
        </html>
        `;

    const getFileData = async ()=>{
        setIsLoading(true)
        const resp = await axios(`${REACT_APP_URL}/api/file/history/${fileId}`, {
            method: 'GET',
            headers:{
                'content-type': 'application/json',
                'Authorization': `Bearer ${authCtx.token}`
            }
        });
        const response = resp.data;
        if(response.data.history){
            // console.log(response.data);
            setHistory(response.data.history.reverse());
            setFile(response.data.file);
            setQr(response.data.qr);
        }
        setIsLoading(false)
    }
    useEffect(()=>{
        getFileData();
    }, [])

    const print = async () => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        await Print.printAsync({
          html,
        });
      };

      const printAndShareFile = async () => {
        const { uri } = await Print.printToFileAsync({ html });
        console.log('File has been saved to:', uri);
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
      };

    if( isLoading ){
        return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size='large' color='#2277ee'/>
            </View>
    }
    return (
        <View style={styles.container}>
            <Text variant='headlineMedium' style={{paddingBottom: 20, alignSelf: 'center'}}>{file.fileName}</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                <Image source={{uri: `data:image/jpeg;base64,${qr}`}} style={{ width: 150, height: 150, marginBottom: 20}}/>
                <View style={{alignSelf:'flex-end', paddingLeft: 20, paddingBottom: 20}}>
                    <Text variant='titleSmall' style={{textDecorationLine: 'underline'}}>Description</Text>
                    <Text>{file.description}</Text>
                </View>
            </View>
            <View style={{justifyContent: "space-between", flexDirection: "row", marginBottom: 10}}>
                <Button mode='contained' onPress={()=> print()} style={{width: "45%"}}> Print QR <FontAwesome name="print" size={18} color="white" /></Button>
                <Button mode='contained' onPress={()=> printAndShareFile()} style={{width: "45%"}}> Share QR <Entypo name="share" size={18} color="white" /></Button>
            </View>
            <FlatList
                data={history}
                keyExtractor={(item, index) => index}
                renderItem= { ({item, index}) => {
                    return(
                        <View style={{ marginBottom:6, borderWidth: 1 , backgroundColor: index%2 ? "#A0AAB2" : "#C7CEDB", borderColor: "grey"}}>
                            <Text style={{borderBottomWidth: 1, paddingLeft: 5, paddingRight: 5, paddingBottom: 2, borderColor: "grey", color: 'black'}}>{item.userId.firstName + " " + item.userId.lastName}</Text>
                            { item.info && <Text style={{borderBottomWidth: 1, paddingLeft: 5, paddingRight: 5, borderColor: "grey",  color: 'black'}}>{item.info}</Text> }
                            <Text style={{ paddingLeft: 5, paddingRight: 5, borderColor: "grey", color: 'black'}}>{item.reachedAt}</Text>
                        </View>
                )} }
            />

        </View>
    )
}

export default File

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor: '#dee4f7'
    },
})