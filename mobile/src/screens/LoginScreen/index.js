import React, { Component } from "react";
import { Navigation } from "react-native-navigation";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import axios from "axios";
import { iOSColors } from "react-native-typography";
import { fonts } from "../../utils/themes";
import LinearGradient from "react-native-linear-gradient";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import Entypo from "react-native-vector-icons/Entypo";

import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { authToken } from "../../utils/constants";
import { startMainApp, init } from "../../Nav";
const COLORS_GRADIENTS = ["#74398D", "#56499e"];
const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple"
  },
  inputContainer: {
    width: "95%",
    backgroundColor: "rgba(255,255,255, 0.2)",
    borderRadius: 5,
    height: 400,
    // justifyContent: "center",
    // alignItems: "center",
    paddingTop: 40
  },
  headerTextContainer: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    color: iOSColors.white,
    fontSize: 50,
    fontFamily: fonts.lobster
  },
  inputWrapper: {
    height: 45,
    //   backgroundColor: "#e4e4e4",
    marginVertical: 10,
    justifyContent: "center",
    marginHorizontal: 16,
    borderRadius: 5,
    // borderColor: "#e4e4e4",
    borderWidth: 1,
    paddingLeft: 10
  },
  input: {
    flex: 1,
    color: "#DDD"
  },
  loginButtonWrapper: {
    height: 45,
    backgroundColor: "steelblue",
    marginVertical: 10,
    justifyContent: "center",
    marginHorizontal: 16,
    borderRadius: 5,
    // borderColor: "#e4e4e4",
    borderWidth: 1,
    paddingLeft: 10,
    alignItems: "center"
  },
  loginText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ddd"
  },
  signup: {
    justifyContent: "center",
    marginTop: 20,
    flexDirection: "row"
  },
  signupText: {
    color: "#bbb"
  },
  orWrapper: {
    // backgroundColor: "red",
    width: "100%",
    height: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  lines: {
    height: 1,
    width: "40%",
    backgroundColor: "#bbb"
  },
  orText: {
    // color: "#bbb",
    paddingHorizontal: 8
  },
  loginWithFacebook: {
    // backgroundColor: "red",
    // flex: 1,
    width: "100%",
    marginTop: 20,
    margin: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

class LoginScreen extends Component {
  state = {
    loading: false
  };
  _onLoginFbPress = async () => {
    // this.setState({ loading: true });
    try {
      const res = await LoginManager.logInWithReadPermissions([
        "public_profile",
        "email"
      ]);
      // console.log(res);
      if (res.grantedPermissions && !res.isCancelled) {
        const data = await AccessToken.getCurrentAccessToken();
        const token = data.accessToken;
        console.log(token);
        if (token) {
          const serverRes = await this.props.signin({
            variables: {
              token: token
            }
          });
          const resToken = serverRes.data.signin.token;
          try {
            await AsyncStorage.setItem(authToken, resToken);
            // this.setState({ loading: false });

            this._changeScreen();
          } catch (error) {
            throw error;
          }
        }
      }
    } catch (e) {
      throw e;
    }
  };
  _changeScreen = () => {
    startMainApp();
  };
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.root}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        colors={COLORS_GRADIENTS}
        style={styles.root}
      >
        <StatusBar barStyle="light-content" />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}> Instagram</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput style={styles.input} placeholder="Email" />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
            />
          </View>
          <TouchableOpacity
            style={styles.loginButtonWrapper}
            onPress={this._changeScreen}
          >
            <Text style={styles.loginText}> Login </Text>
          </TouchableOpacity>
          <View style={styles.signup}>
            <Text style={styles.signupText}>Don't have Account? </Text>
            <TouchableOpacity>
              <Text style={{ color: "white" }}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.orWrapper}>
            <View style={styles.lines} />
            <View style={styles.orText}>
              <Text style={{ color: "#aaa" }}>OR</Text>
            </View>
            <View style={styles.lines} />
          </View>
          <TouchableOpacity
            style={styles.loginWithFacebook}
            onPress={this._onLoginFbPress}
          >
            {/* <View> */}
            <Entypo name="facebook" size={30} color="#318def" />

            <Text style={{ color: "#ccc", paddingLeft: 10 }}>
              Continue with facebook
            </Text>
            {/* </View> */}
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const signin = gql`
  mutation signin($token: String!) {
    signin(token: $token) {
      token
    }
  }
`;

export default graphql(signin, { name: "signin" })(LoginScreen);
