import { StyleSheet, Text, View, Image } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DefaultScreen from './DefaultScreen';
import AuthContext from '../store/authContext';
import AvatarButton from '../components/AvatarButton';
import Home from './Home';
import Account from './Account';
import File from './File';
import RecentFiles from './RecentFiles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExistingFiles from './ExistingFiles';
import { Provider as PaperProvider, MD3LightTheme as DefaultTheme, } from 'react-native-paper';
import { useNetInfo } from "@react-native-community/netinfo";

const Stack = createNativeStackNavigator();
const myTheme = {
  ...DefaultTheme,
  colors: {
    primary: "#2A2F4F",
    onPrimary: "#fff",
    primaryContainer: "#FFE9A0", //"rgb(0,255,170)"
    onPrimaryContainer: "rgb(56, 0, 56)",
    secondary: "#917FB3",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(247, 218, 239)",
    onSecondaryContainer: "rgb(39, 22, 36)",
    tertiary: "#E5BEEC",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(255, 219, 209)",
    onTertiaryContainer: "rgb(50, 18, 8)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(30, 26, 29)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(30, 26, 29)",
    surfaceVariant: "rgb(238, 222, 231)",
    onSurfaceVariant: "rgb(78, 68, 75)",
    outline: "rgb(128, 116, 124)",
    outlineVariant: "rgb(209, 194, 203)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(52, 47, 50)",
    inverseOnSurface: "rgb(248, 238, 242)",
    inversePrimary: "rgb(255, 170, 243)",
    elevation: {
      level0: "transparent",
      level1: "rgb(250, 241, 250)",
      level2: "rgb(247, 234, 247)",
      level3: "rgb(244, 228, 244)",
      level4: "rgb(243, 226, 243)",
      level5: "rgb(241, 222, 241)",
    },
    surfaceDisabled: "rgba(30, 26, 29, 0.12)",
    onSurfaceDisabled: "rgba(30, 26, 29, 0.38)",
    backdrop: "rgba(55, 46, 52, 0.4)",
  },
};
const MainStack = () => {
    const [ token, setToken ] = useState( null )
    const authCtx = useContext(AuthContext);
    const netinfo = useNetInfo();

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

  if (!netinfo.isConnected) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{ width: 200, height: 200 }}
          source={require("../../assets/noInternet.jpg")}
        />
      </View>
    );
  }

  return (
    <PaperProvider theme={myTheme}>
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
            <Stack.Screen name="RecentFiles" component={RecentFiles}/>
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