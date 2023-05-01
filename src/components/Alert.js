import Toast from "react-native-toast-message";

export default Alert = (type, heading, text) => {
  Toast.show({
    type: type,
    position: "bottom",
    text1: heading,
    text2: text,
  })}