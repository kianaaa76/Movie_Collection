import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import MyText from "../common/MyText";
import MyTextInput from "../common/MyTextInput";
import MyButton from "../common/MyButton";
import { loginUser } from "../../actions/Actions";
import { showToast } from "../utils/Utilities";
import logo from "../../../assets/images/logo.png";

const pageWidth = Dimensions.get("screen").width;
const pageHeight = Dimensions.get("screen").height;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.onLoginPress = this.onLoginPress.bind(this);
    this.renderSpinnerOrButton = this.renderSpinnerOrButton.bind(this);
  }

  componentDidMount() {
    const { token } = this.props;
    if (!!token) {
      this.props.navigation.navigate("SignedIn");
    }
  }

  onLoginPress() {
    const { username, password } = this.state;
    this.props
      .loginUser({ username, password })
      .then(() => {
        this.props.navigation.navigate("SignedIn");
        showToast("You loged in successfully!");
      })
      .catch(() => showToast(this.props.error));
  }

  renderSpinnerOrButton() {
    const { loading } = this.props;
    return !!loading ? (
      <View style={Styles.indicatorContainerStyle}>
        <ActivityIndicator size="small" color="#000" />
      </View>
    ) : (
      <MyButton
        title="Login"
        width={pageWidth * 0.8}
        height={pageHeight * 0.08}
        borderRadius={30}
        color="#D2AD55"
        textFontSize={15}
        onClick={this.onLoginPress}
      />
    );
  }

  render() {
    return (
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => Keyboard.dismiss()}
      >
        <View style={Styles.containerStyle}>
          <KeyboardAvoidingView behavior="padding">
            <View style={Styles.contentContainerStyle}>
              <Image
                source={logo}
                style={Styles.logoStyle}
              />
              <MyText fontSize={20} isBold={true}>
                Movie Collector
              </MyText>
              <View style={Styles.inputsContainerStyle}>
                <MyTextInput
                  placeholder={"Username"}
                  width={pageWidth * 0.8}
                  height={pageHeight * 0.08}
                  borderRadius={30}
                  placeholderTextColor={"#D1BC8A"}
                  onInputChange={username => this.setState({ username })}
                  isSecure={false}
                />
                <MyTextInput
                  placeholder={"Password"}
                  width={pageWidth * 0.8}
                  height={pageHeight * 0.08}
                  borderRadius={30}
                  placeholderTextColor={"#D1BC8A"}
                  onInputChange={password => this.setState({ password })}
                  isSecure={true}
                />
                {this.renderSpinnerOrButton()}
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { loading, token, error } = auth;
  return { loading, token, error };
};

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);

const Styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: "#D1BC8A",
    alignItems: "center",
    justifyContent: "space-around"
  },
  contentContainerStyle: {
    width: pageWidth,
    height: pageHeight * 0.7,
    justifyContent: "space-between",
    alignItems: "center"
  },
  logoStyle: {
    width: pageWidth * 0.7,
    height: pageHeight * 0.35,
    backgroundColor: "transparent"
  },
  inputsContainerStyle: {
    width: pageWidth * 0.8,
    height: pageHeight * 0.28,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  indicatorContainerStyle: {
    width: pageWidth * 0.8,
    height: pageHeight * 0.08,
    backgroundColor: "#D2AD55",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center"
  }
});
