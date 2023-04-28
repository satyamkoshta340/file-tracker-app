// import { StyleSheet } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { AuthContextProvider } from "./src/store/authContext";
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/screens/MainStack';
// import { useEffect, useState } from "react";
// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";


// WebBrowser.maybeCompleteAuthSession();


export default function App() {
  // const [token, setToken] = useState("");
  // const [userInfo, setUserInfo] = useState(null);

  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   expoClientId:"",
  //   androidClientId: "",
  // });

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     setToken(response.authentication.accessToken);
  //     getUserInfo();
  //   }
  // }, [response, token]);

  // const getUserInfo = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://www.googleapis.com/userinfo/v2/me",
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     const user = await response.json();
  //     setUserInfo(user);
  //   } catch (error) {
  //     // Add your own error handler here
  //   }
  // };

  return (
    <NavigationContainer>
      <AuthContextProvider>
        <MainStack/>
        <StatusBar style="auto" />
      </AuthContextProvider>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
// });
