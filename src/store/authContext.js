import axios from "axios";
import { REACT_APP_URL, REACT_APP_EXPO_CLIENT_ID, REACT_APP_ANDROID_CLIENT_ID, REACY_APP_REDIRECT_URI } from "@env";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import Alert from "../components/Alert";

WebBrowser.maybeCompleteAuthSession();
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  firstName: "",
  lastName: "",
  email: "",
  profile: "",
  logout: () => { },
  googleAuth: () => { },
  isLoading: false,
});


export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const userIsLoggedIn = !!token;
  const getData = async () => {
    await AsyncStorage.getItem("token").then((data) => {
      setToken(data);
    });
    await AsyncStorage.getItem("firstName").then((data) => {
      setFirstName(data);
    });
    await AsyncStorage.getItem("lastName").then((data) => {
      setLastName(data);
    });
    await AsyncStorage.getItem("email").then((data) => {
      setEmail(data);
    });
    await AsyncStorage.getItem("profile").then((data) => {
      setProfile(data);
    });
  };
  getData();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: REACT_APP_EXPO_CLIENT_ID,
    androidClientId: REACT_APP_ANDROID_CLIENT_ID,
  });
  const googleLoginHandler = async () => {
    await promptAsync()
      .then(async (response) => {
        setIsLoading(true);
        Alert("success", response?.type, "response")
        if (response?.type === "success") {
          console.log(response.authentication.accessToken);
          console.log(`${REACT_APP_URL}/auth/google`)
          await axios
            .post(`${REACT_APP_URL}/auth/google`, { googleToken: response.authentication.accessToken })
            .then(async (res) => {
              console.log("-----------------------------------")
              // console.log(res.data)
              Alert("success", "Login Success", "You logged in successfully!")
              setToken(res?.data?.token)
              await AsyncStorage.setItem("token", res?.data?.token);
              await AsyncStorage.setItem("firstName", res?.data?.user?.firstName);
              await AsyncStorage.setItem("lastName", res?.data?.user?.lastName);
              await AsyncStorage.setItem("email", res?.data?.user?.email);
              await AsyncStorage.setItem("profile", res?.data?.user?.picture);
            })
            .catch((err) => {
              Alert("error", "Login Failure", `${err.response.data?.message}`)
              console.error("error: ", err.response.data?.message);
            });
        }
        else if (response?.type === "dismiss") {
          Alert("error", "Dismissed");
        }
        else {
          Alert("error", "Error in Login!")
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("final error", err.response.data?.message);
        Alert("error", "Error in Login!")
      });

  };

  const logoutHandler = () => {
    setToken(null);
    AsyncStorage.clear();
  };

  const contextValue = {
    token: token,
    setToken: setToken,
    firstName: firstName,
    lastName: lastName,
    email: email,
    profile: profile,
    isLoggedIn: userIsLoggedIn,
    logout: logoutHandler,
    googleAuth: googleLoginHandler,
    isLoading: isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;