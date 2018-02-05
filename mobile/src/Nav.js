import { Navigation } from "react-native-navigation";

import { registerScreens } from "./screens";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";

import { iconsLoaded, iconsMap } from "./utils/themes";
import appInitialized from "./utils/appInitialized";
registerScreens();

export const startLogin = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: "instagramclone.LoginScreen",
      navigatorStyle: {
        navBarHidden: true
      }
    }
  });
};

export const startMainApp = () => {
  console.log("==============");
  console.log("START Main app");
  console.log("==============");
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: "Home",
        screen: "instagramclone.FeedsScreen",
        title: "Instagram",
        icon: iconsMap.home
      },
      {
        label: "Explore",
        screen: "instagramclone.ExploreScreen",
        title: "Explore",
        icon: iconsMap["ios-search"]
      }
    ]
  });
};

export const init = () => {
  appInitialized();
};

// export default class Nav {
//   constructor() {
//     iconsLoaded.then(() => this._initApp());
//   }
//   _initApp() {
//     Navigation.startTabBasedApp({
//       tabs: [
//         {
//           label: "Home",
//           screen: "instagramclone.FeedsScreen",
//           title: "Instagram",
//           icon: iconsMap.home
//         },
//         {
//           label: "Explore",
//           screen: "instagramclone.ExploreScreen",
//           title: "Explore",
//           icon: iconsMap["ios-search"]
//         }
//       ]
//     });
//   }
// }
