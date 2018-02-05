import { AsyncStorage } from "react-native";
import { iconsLoaded } from "../utils/themes/icon";
import { startLogin, startMainApp } from "../Nav";

export default async function appInitialized() {
  try {
    await iconsLoaded();
    const token = await AsyncStorage.getItem("instagramcloneToken");
    // const token = await AsyncStorage.removeItem("instagramcloneToken");
    console.log("TOKEN from app initalized: ", (token));
    if (token) {
      startMainApp();
    } else {
      startLogin();
    }
  } catch (e) {
    console.log(e);
  }
}
