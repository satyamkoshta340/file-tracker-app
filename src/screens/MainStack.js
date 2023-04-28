import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DefaultScreen from './DefaultScreen';
import AuthContext from '../store/authContext';
import AvatarButton from '../components/AvatarButton';
import Home from './Home';
import Account from './Account';
import File from './File';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExistingFiles from './ExistingFiles';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

const MainStack = () => {
    const [ token, setToken ] = useState( null )
    const authCtx = useContext(AuthContext);

    const sync = async () =>{
        try {
        await AsyncStorage.getItem("token").then((data) => {
            setToken(data)
        });

          await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch {
        (e) => console.warn(e);
        }
    }

  useEffect( ()=>{
    sync();
  }, [authCtx.token])

  return (
    <PaperProvider>
    <View style={styles.container}>
        { !token ? <DefaultScreen/> :
        // <Home />
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} 
              options={({ navigation }) => ({
                headerTitle: "Lets Track",
                headerRight: () => (
                  <AvatarButton navigation={navigation}/>
                ),
              })}
            />
            <Stack.Screen name="Account" component={Account}/>
            <Stack.Screen name="ExistingFiles" component={ExistingFiles} />
            <Stack.Screen name="File" component={File}/>
          </Stack.Navigator>
        }
    </View>
    </PaperProvider>
  )
}

export default MainStack

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
})