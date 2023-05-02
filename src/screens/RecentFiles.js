import { StyleSheet, View, ScrollView } from 'react-native'
import React, {useContext, useState, useEffect} from 'react'
import { REACT_APP_URL } from "@env"
import axios from 'axios'
import { ActivityIndicator, Text, List, Card } from "react-native-paper";
import { FontAwesome } from '@expo/vector-icons';
import AuthContext from '../store/authContext';

const RecentFiles = ({navigation}) => {
    const authCtx = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false);
    const [recentFiles, setRecentFiles] = useState(null);
    const getRecentFiles = async() => {
        setIsLoading(true)
        try{
          const resp = await axios.get(`${REACT_APP_URL}/api/user/getAllRecentFiles`, {
            headers:{
                'content-type': 'application/json',
                'Authorization': `Bearer ${authCtx.token}`
            }})
          const response = resp.data;
          if( response.status === "success" ){
            // console.log(response.data)
            setRecentFiles(response.data.recentFiles)
          }
          else{
            console.log(response)
          }
        }
        catch(err){
          console.log(err);
        }
        
        setIsLoading(false)
      }
      useEffect( () => {
        getRecentFiles();
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
                        recentFiles?.map( (item, key) => <Card type='elevated' style={styles.file} onPress={() => navigation.navigate("File", { fileId: item._id})} key={key}>
                                <Text variant="titleMedium" ellipsizeMode='tail' style={{color:"#00072D"}}> <FontAwesome name="file" size={16} color="#00072D" /> {item?.fileName}</Text>
                                <Text ellipsizeMode='tail' numberOfLines={2} style={{color:"#00072D"}}>{item.description}</Text>
                            </Card>)
                    }
                    {
                        recentFiles?.length === 0 || recentFiles === null ? <View style={{justifyContent:'center', alignContent:'center'}}><Text variant='titleMedium'>No Recent File</Text></View> : ''
                    }
                </List.Section>
            </ScrollView>
        </View>
    )
}

export default RecentFiles

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 20,
        marginBottom: 20,
    },
    fileContainer: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        overflow: 'scroll'
    },
    file: {
        width: '100%',
        height: 70,
        marginBottom: 10,
        borderRadius: 10,
        padding: 5,
        paddingLeft: 10,
        marginTop: 2,
        backgroundColor: '#A1B7F7'
    },
})