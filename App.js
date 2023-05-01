import { StatusBar } from 'expo-status-bar';
import { AuthContextProvider } from "./src/store/authContext";
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/screens/MainStack';
import Toast from "react-native-toast-message";


// import * as WebBrowser from "expo-web-browser";
// WebBrowser.maybeCompleteAuthSession();


export default function App() {

  return (
    <NavigationContainer>
      <AuthContextProvider>
        <MainStack/>
        <Toast />
        <StatusBar style="auto" backgroundColor='white'/>
      </AuthContextProvider>
    </NavigationContainer>
  );
}

