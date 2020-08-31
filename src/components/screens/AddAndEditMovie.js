import React, { Component } from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MyText from "../common/MyText";
import TextInputWithLabel from "../common/TextInputWithLabel";
import MyButton from "../common/MyButton";
import Header from "../common/Header";
import {
  editMovie,
  createMovie,
  getPersons,
  getAllMovies
} from "../../actions/Actions";
import { showToast, getTagsId } from "../utils/Utilities";

const pageHeight = Dimensions.get("screen").height;
const pageWidth = Dimensions.get("screen").width;

class AddEditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: {
        id: "",
        title: "",
        date_of_release: "",
        rating: "",
        country: "",
        tags: [],
        tagsId: [],
        director: "",
        language: "",
        cast: []
      }
    };
    this.onConfirmAddPress = this.onConfirmAddPress.bind(this);
    this.onConfirmEditPress = this.onConfirmEditPress.bind(this);
    this.getPersonsId = this.getPersonsId.bind(this);
  }

  componentDidMount() {
    const { selected, mode } = this.props.navigation.state.params;
    if (mode == "edit") {
      this.setState({
        selectedItem: {
          id: selected.id,
          title: selected.title,
          date_of_release: selected.date_of_release,
          director: selected.director,
          tags: selected.tags
        }
      });
    }
  }

  onConfirmEditPress() {
    const { editMovie, token, getAllMovies } = this.props;
    const {
      selectedItem: {
        id,
        title,
        date_of_release,
        country,
        language,
        director,
        tags,
        cast
      }
    } = this.state;
    let castIdList = [];
    cast.map(item => {
      castIdList.push(this.getPersonsId(item.trim()));
    });
    let tagsIdList = getTagsId(tags);
    editMovie({
      token,
      id,
      title,
      date_of_release,
      tags: tagsIdList,
      country,
      language,
      director: this.getPersonsId(director.trim()),
      cast: castIdList
    })
      .then(() => {
        getAllMovies({ token });
        this.props.navigation.navigate("Home");
        showToast("Movie is successfully edited.");
      })
      .catch(() => {
        showToast("Editing movie failed.");
      });
  }

  onConfirmAddPress() {
    const { createMovie, token, getAllMovies } = this.props;
    const {
      selectedItem: {
        title,
        date_of_release,
        country,
        language,
        director,
        cast,
        tags
      }
    } = this.state;
    let castIdList = [];
    cast.map(item => {
      castIdList.push(this.getPersonsId(item.trim()));
    });
    let tagsIdList = getTagsId(tags);
    createMovie({
      token,
      title,
      date_of_release,
      tags: tagsIdList,
      country,
      language,
      director: this.getPersonsId(director.trim()),
      cast: castIdList
    })
      .then(() => {
        getAllMovies({ token });
        this.props.navigation.navigate("Home");
        showToast("Movie is successfully created.");
      })
      .catch(() => {
        showToast("Creating movie failed.");
      });
  }

  getPersonsId(name) {
    const { personList } = this.props;
    const item = personList.filter(person => person.full_name == name);
    return item[0].id;
  }

  render() {
    const { mode, selected } = this.props.navigation.state.params;
    return (
      <View style={Styles.editModalContentContainerStyle}>
        <Header
          headerText={mode == "edit" ? "Edit Movie" : "Add Movie"}
          leftIcon={
            <Icon
              name="arrow-back"
              size={28}
              onPress={() => this.props.navigation.goBack()}
            />
          }
        />
        <KeyboardAwareScrollView
          scrollEnabled={true}
          enableOnAndroid={true} 
          style={{
            width: "100%",
            height: "90%"
          }}
          contentContainerStyle={{
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <MyText fontSize={18} isBold={true}>
            {mode == "edit"
              ? "Edit fields as you want:"
              : "Choose the fields of your new movie:"}
          </MyText>
          <TextInputWithLabel
            onInputChange={title =>
              this.setState({
                selectedItem: { ...this.state.selectedItem, title }
              })
            }
            value={mode == "edit" ? selected.title : ""}
            label={"Title:"}
            placeholder={"Title"}
          />
          <TextInputWithLabel
            onInputChange={date_of_release =>
              this.setState({
                selectedItem: { ...this.state.selectedItem, date_of_release }
              })
            }
            value={mode == "edit" ? selected.date_of_release : ""}
            label={"Release Date:"}
            placeholder={"Release Date"}
          />
          <TextInputWithLabel
            label={"Country:"}
            placeholder={"Country"}
            onInputChange={country =>
              this.setState({
                selectedItem: { ...this.state.selectedItem, country }
              })
            }
          />
          <TextInputWithLabel
            onInputChange={tags => {
              this.setState({
                selectedItem: {
                  ...this.state.selectedItem,
                  tags: tags.split(",")
                }
              });
            }}
            value={mode == "edit" ? selected.tags.toString() : ""}
            label={"Tags: "}
            placeholder={"Tags"}
          />
          <TextInputWithLabel
            onInputChange={director =>
              this.setState({
                selectedItem: { ...this.state.selectedItem, director }
              })
            }
            value={mode == "edit" ? selected.director : ""}
            label={"Director:"}
            placeholder={"Director"}
          />
          <TextInputWithLabel
            onInputChange={language =>
              this.setState({
                selectedItem: { ...this.state.selectedItem, language }
              })
            }
            label={"Language:"}
            placeholder={"Language"}
          />
          <TextInputWithLabel
            onInputChange={cast =>
              this.setState({
                selectedItem: {
                  ...this.state.selectedItem,
                  cast: cast.split(",")
                }
              })
            }
            label={"Cast:"}
            placeholder={"Cast"}
          />
          {this.props.allMovieLoading ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: pageWidth * 0.25,
                height: pageHeight * 0.08,
                backgroundColor: "#D1BC8A",
                borderRadius: 30,
                marginHorizontal: 10
              }}
            >
              <ActivityIndicator size="small" color="#000" />
            </View>
          ) : (
            <MyButton
              title="Confirm"
              color={"#D1BC8A"}
              width={pageWidth * 0.25}
              height={pageHeight * 0.08}
              borderRadius={30}
              onClick={
                mode == "edit"
                  ? this.onConfirmEditPress
                  : this.onConfirmAddPress
              }
            />
          )}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ auth, movies, persons }) => {
  const { token } = auth;
  const { allMovieLoading, allMovies, movieError } = movies;
  const { personList, personLoading } = persons;
  return {
    allMovies,
    token,
    allMovieLoading,
    movieError,
    personList,
    personLoading
  };
};

export default connect(
  mapStateToProps,
  { getAllMovies, editMovie, createMovie, getPersons }
)(AddEditMovie);

const Styles = StyleSheet.create({
  editModalContentContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: pageWidth,
    height: pageHeight * 0.87,
    backgroundColor: "#DAD7D1"
  }
});
