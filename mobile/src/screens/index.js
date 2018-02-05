import { Navigation } from "react-native-navigation";

import WithProvider from "../components/WithProvider";
import FeedsScreen from "./FeedsScreen";
import ExploreScreen from "./Explore";
import LoginScreen from "./LoginScreen";

export const registerScreens = () => {
  Navigation.registerComponent("instagramclone.FeedsScreen", () =>
    WithProvider(FeedsScreen)
  );
  Navigation.registerComponent("instagramclone.ExploreScreen", () =>
    WithProvider(ExploreScreen)
  );
  Navigation.registerComponent("instagramclone.LoginScreen", () =>
    WithProvider(LoginScreen)
  );
};
