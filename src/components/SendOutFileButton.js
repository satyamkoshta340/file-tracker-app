import { StyleSheet, View } from 'react-native'
import React, { useState, useEffect, useContext } from 'react';
import { Modal, Portal, Button, Text, ActivityIndicator } from 'react-native-paper';
import { REACT_APP_URL } from "@env";
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import AuthContext from '../store/authContext';

const SendOutFileButton = ({ setSnackbarVisibility, setSnackbarText }) => {
    const authCtx = useContext(AuthContext);
    const [modelVisibility, setModelVisibility] = useState(false);
    const [file, setFile] = useState(null);
    const [recipient, setRecipient] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [myFiles, setMyFiles] = useState(null);
    const [allUsers, setAllUsers] = useState(null);

    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];
    const fetchMyFiles = async () => {
        setIsLoading(true)
        try{
            const resp = await axios.get(`${REACT_APP_URL}/api/user/getAllFiles`, {
                method: 'GET',
                headers:{
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${authCtx.token}`
                }
              });
                const response = resp.data;

                if( response.status === "success" ){
                    console.log(response.data)
                    setMyFiles(response.data)
                }
        }catch(err){
            console.log(err)
            setSnackbarVisibility(true)
            setSnackbarText("Error in Fetching Files")
        }
        setIsLoading(false)
    }
    const fetchAllUsers = async () => {
        setIsLoading(true)
        try{
            const resp = await axios.get(`${REACT_APP_URL}/api/user/getAllUsers`, {
                method: 'GET',
                headers:{
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${authCtx.token}`
                }
              });
                const response = resp.data;

                if( response.status === "success" ){
                    // console.log(response.data)
                    setAllUsers(response.data)
                }
        }catch(err){
            console.log(err)
            setSnackbarVisibility(true)
            setSnackbarText("Error in Fetching Users List")
        }
        setIsLoading(false)
    }

    // useEffect( () =>{
    //     fetchAllUsers();
    //     fetchMyFiles();
    // }, []);

    return (
        <View style={{ paddingTop: 20 }}>
            <Button contentStyle={styles.card}
                onPress={async() => {
                    setModelVisibility(true);
                    await fetchAllUsers();
                    await fetchMyFiles();
                }}
                textColor='black'
            >
                <Text style={styles.cardText}> Send File Out </Text>
            </Button>
            <View>
                <Portal>
                    <Modal visible={modelVisibility} onDismiss={() => { setModelVisibility(false) }} contentContainerStyle={styles.modal}>
                        <Text variant='titleLarge' >Sending File Out</Text>
                        <View style={styles.container}>
                            <Dropdown
                                data={myFiles? myFiles : []}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select File"
                                searchPlaceholder="Search"
                                style={styles.dropdown}
                                value={file}
                                onChange={item => setFile(item.value)}
                            />
                            <Dropdown
                                data={allUsers ? allUsers : []}
                                search
                                maxHeight={300}
                                labelField="email"
                                valueField="_id"
                                placeholder="Select Recipient User"
                                searchPlaceholder="Search"
                                style={styles.dropdown}
                                value={recipient}
                                onChange={item => setRecipient(item.value)}
                            />
                            <Button mode="contained" style={{}}>Send File</Button>
                        </View>
                    </Modal>
                </Portal>
            </View>
        </View>
    )
}

export default SendOutFileButton

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        height: 90,
    },
    cardText: {
        fontSize: 16,
        fontWeight: 700
    },
    container: {
        marginTop: 20,
        flex: 1,
        zIndex: 10
    },
    dropdown: {
        borderWidth: 1,
        paddingLeft: 5,
        marginBottom: 20,
        height: 50,
        borderColor: "#4f378b",
        borderRadius: 10
    },
    modal: {
        // flex:0.5,
        height: 400,
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 10
    },
})