import { StyleSheet, View, Pressable, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import AuthContext from '../store/authContext';
import { Modal, Portal, Text, Button, TextInput } from 'react-native-paper';
import axios from "axios"
import {REACT_APP_URL} from  "@env"

const NewFileButton = ({navigation, setSnackbarVisibility, setSnackbarText}) => {
    const authCtx = useContext(AuthContext);
    const [visibleNewFileModel, setVisibleNewFileModel] = useState(false);
    const [fileName, setFileName] = useState(null);
    const [description, setDescription] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const showNewFileModal = () => setVisibleNewFileModel(true);
    const hideNewFileModal = () => setVisibleNewFileModel(false);
    const createNewFile = async () =>{
      if( !fileName || ! description){
        setSnackbarText("Fill the details correctly")
        setSnackbarVisibility(true)
        return
      }
      setIsLoading(true)
      const body = { fileName: fileName, description: description}
      try{
        const resp =  await axios.post( `${REACT_APP_URL}/api/file`, body, {
            method: 'POST',
            headers:{
              'content-type': 'application/json',
              'Authorization': `Bearer ${authCtx.token}`
            }
        })
        const response= resp.data;
  
        if( response.status === "success"){
            setFileName(null);
            setDescription(null);
            setSnackbarText("Fill created Successfully!")
            setSnackbarVisibility(true)
            hideNewFileModal();
            navigation.navigate("File", {fileId: response.data.file.fileId})
        }
      }
      catch(err){
        console.log(err)
      }
      
      setIsLoading(false)
    }
  return (
    <View>
        <Pressable style={({ pressed }) => [
        {
          transform: [{
            scale: pressed ? 1.07 : 1
          }],
          backgroundColor: '#2277ee'
        },
        styles.card]}
        onPress={()=>showNewFileModal()}
        >
            <Image source={require('../../assets/add_files.png')} style={{ width: 100, height: 100}}/>
            <Text style={styles.cardText}> New File</Text>
        </Pressable>


        <Portal>
        <Modal visible={visibleNewFileModel} onDismiss={hideNewFileModal} contentContainerStyle={styles.modal}>
          <Text variant='titleLarge' style={{paddingBottom: 30}}>Create New File</Text>
          <TextInput
            label="File Name"
            mode="outlined"
            style={{marginBottom: 20}}
            onChangeText={ text => setFileName(text)}
            value={fileName}
          />
          <TextInput
            label="Description"
            style={{marginBottom: 20, height: 80}}
            multiline={true}
            onChangeText={ text => setDescription(text)}
            value={description}
          />
          <Button
            mode="contained-tonal"
            style={{marginBottom: 20}}
            onPress={() => createNewFile()}
            loading={isLoading}
            disabled={isLoading}
          >
            Create
          </Button>
        </Modal>
        </Portal>

    </View>
  )
}

export default NewFileButton

const styles = StyleSheet.create({
    card:{
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        // width: 160,
        // height: 200,
        aspectRatio: 0.8,
    },
    cardText:{
        fontSize: 16,
        fontWeight: 700
    },
    modal:{
        // flex:0.5,
        height: 400,
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 10
      }
})