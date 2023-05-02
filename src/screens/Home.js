import { StyleSheet, View, Image, Pressable } from 'react-native'
import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react'
import { Text, Snackbar, Modal, List, Surface, Button } from 'react-native-paper';
import NewFileButton from '../components/NewFileButton';
import TakeInFileButton from '../components/TakeInFileButton';
import SendOutFileButton from '../components/SendOutFileButton';
import AuthContext from '../store/authContext';
import {REACT_APP_URL} from "@env";
import { useIsFocused } from '@react-navigation/native';

const Home = ({navigation}) => {
  const authCtx = useContext(AuthContext)
  const [snackbarText, setSnackbarText] = useState("")
  const [snackbarVisibility, setSnackbarVisibility] = useState(false);
  const [recentFiles, setRecentFiles] = useState( null )
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();
  const getRecentFiles = async() => {
    setIsLoading(true)
    try{
      const resp = await axios.get(`${REACT_APP_URL}/api/user/recent-files`, {
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
  }, [isFocused, authCtx.token])

  return (
    <View style={styles.wraper}>
      <View style={styles.row}>
        <View style={{width:"45%"}}>
          <NewFileButton setSnackbarText={setSnackbarText} setSnackbarVisibility={setSnackbarVisibility} navigation={navigation}/>
        </View>
        
        <View style={{width:"45%", alignItems: "flex-end"}}>
        <Pressable style={({ pressed }) => [
        {
          transform: [{
            scale: pressed ? 1.07 : 1
          }],
          backgroundColor: '#2277ee'
        },
        styles.card, styles.rowCard]}
        onPress={() => navigation.navigate("ExistingFiles")}
        >
            <Image source={require('../../assets/existing_files.png')} style={{ width: 100, height: 100}}/>
            <Text style={styles.cardText}> Existing Files </Text>
        </Pressable>
        </View>
        
      </View>
        <TakeInFileButton setSnackbarText={setSnackbarText} setSnackbarVisibility={setSnackbarVisibility} navigation={navigation}/>
        <SendOutFileButton setSnackbarText={setSnackbarText} setSnackbarVisibility={setSnackbarVisibility} navigation={navigation}/>

        {
          recentFiles?.length ? <View>
              <View style={{flexDirection:'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between'}}>
                <Text variant='titleSmall'>Recent Files</Text>
              </View>
              <List.Section style={styles.fileContainer}>
                {
                  recentFiles.map( (item, key) => <Surface style={styles.file} onTouchEnd={() => navigation.navigate("File", { fileId: item._id})} key={key}><Text style={{textAlign:'center'}}> {item.fileName} </Text></Surface>)
                }
                { recentFiles.length%3 ? <View style={{ flexGrow: 0.75}}></View> : '' }
                
              </List.Section>
            </View> : ''
        }

        <View style={{alignItems:"center", flex: 1}}>
          <Snackbar
            visible={snackbarVisibility}
            onDismiss={() => setSnackbarVisibility(false)}
            action={{
                label: 'Close'
            }}>
            {snackbarText}
          </Snackbar>
        </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    wraper:{
        flex: 1,
        padding: 20,
        backgroundColor: '#E6D8F3'
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    card:{
        backgroundColor: 'white',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardText:{
        fontSize: 16,
        fontWeight: 700,
        color: 'black'
    },
    rowCard: {
      width: "100%",
      // width: 160,
      // height: 200,
      aspectRatio: 0.8,
      borderRadius: 20,
    },
    columnCard:{
        // width: 100,
        height: 100,
        marginTop: 20,
        borderRadius: 20,
    },
    file: {
      width: '30%',
      height: 80,
      marginBottom: 10,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5
    },
    fileContainer: {
      marginTop: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    }
})