import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Animated,
  Keyboard,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import Header from "../common/Header";
import Icon from "react-native-vector-icons/MaterialIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import MyTextInput from "../common/MyTextInput";
import MyModal from "../common/MyModal";
import MyText from "../common/MyText";
import MyButton from "../common/MyButton";
import HomeListItem from "../utils/HomeListItem";
import {
  getAllMovies,
  deleteMovie,
  getPersons,
  search,
  logoutUser
} from "../../actions/Actions";
import { showToast } from "../utils/Utilities";

const pageWidth = Dimensions.get("screen").width;
const pageHeight = Dimensions.get("screen").height;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      refreshList: false,
      showDeleteModal: false,
      showLogoutModal:false,
      searchValue: "",
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
    this.modalAnimatedValue = new Animated.Value(0);
    this.renderItem = this.renderItem.bind(this);
    this.onDeletePress = this.onDeletePress.bind(this);
    this.renderDeleteModal = this.renderDeleteModal.bind(this);
    this.onEditPress = this.onEditPress.bind(this);
    this.onAddPress = this.onAddPress.bind(this);
    this.onConfirmDeletePress = this.onConfirmDeletePress.bind(this);
    this.onSearchPress = this.onSearchPress.bind(this);
    this.onLogoutPress = this.onLogoutPress.bind(this);
    this.renderLogoutModal = this.renderLogoutModal.bind(this);
    this.onConfirmLogoutPress = this.onConfirmLogoutPress.bind(this);
  }

  componentDidMount() {
    const { getAllMovies, token, getPersons } = this.props;
    getAllMovies({ token })
      .then(() => {
        this.setState({ isSearching: false });
      })
      .catch(() => showToast("Getting movie list failed."));
    getPersons({ token });
  }

  renderItem(item) {
    return (
      <HomeListItem
        item={item}
        onDelete={() => {
          this.onDeletePress(item);
        }}
        onEdit={() => this.onEditPress(item)}
      />
    );
  }

  onSearchPress() {
    const { searchValue } = this.state;
    const { token, search } = this.props;
    Keyboard.dismiss();
    search({ token, value: searchValue }).then(() =>
      this.setState({ isSearching: true })
    );
  }

  onDeletePress(item) {
    this.setState(
      {
        showDeleteModal: true,
        selectedItem: {
          id: item.item.id,
          title: item.item.title,
          date_of_release: item.item.date_of_release,
          tags: item.item.tags,
          director: item.item.director,
          rating: item.item.rating
        }
      },
      () => {
        Animated.timing(this.modalAnimatedValue, {
          toValue: 0.8,
          duration: 1000
        }).start();
      }
    );
  }

  getPersonsId(name) {
    const { personList } = this.props;
    const item = personList.filter(person => person.full_name == name);
    return item[0].id;
  }

  onConfirmDeletePress() {
    const { getAllMovies, deleteMovie, token } = this.props;
    const {
      selectedItem: { id }
    } = this.state;
    this.setState({ showDeleteModal: false });
    this.modalAnimatedValue.setValue(0);
    deleteMovie({ token, id })
      .then(() => {
        showToast("Movie successfully deleted.");
      })
      .catch(() => {
        showToast("Delete movie failed.");
      });

    getAllMovies({ token });
  }

  renderDeleteModal() {
    const { showDeleteModal } = this.state;
    return (
      <MyModal
        showModal={showDeleteModal}
        onCloseModal={() => {
          this.setState({ showDeleteModal: false });
          this.modalAnimatedValue.setValue(0);
        }}
        modalAnimatedValue={this.modalAnimatedValue}
      >
        <View style={Styles.deleteModalContentContainerStyle}>
          <View
            style={{
              width: "80%",
              height: "70%",
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            <MyText fontSize={16} isBold={true}>
              Do you want to delete this movie?
            </MyText>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: "85%"
              }}
            >
              <MyButton
                title="No"
                color={"gray"}
                width={pageWidth * 0.25}
                height={pageHeight * 0.08}
                borderRadius={30}
                onClick={() => {
                  this.setState({ showDeleteModal: false });
                  this.modalAnimatedValue.setValue(0);
                }}
              />
              <MyButton
                title="Yes"
                color={"#D1BC8A"}
                width={pageWidth * 0.25}
                height={pageHeight * 0.08}
                borderRadius={30}
                onClick={this.onConfirmDeletePress}
              />
            </View>
          </View>
        </View>
      </MyModal>
    );
  }

  onEditPress(item) {
    this.setState(
      {
        selectedItem: {
          id: item.item.id,
          title: item.item.title,
          date_of_release: item.item.date_of_release,
          tags: item.item.tags,
          director: item.item.director.split(":")[1].trim(),
          rating: item.item.rating,
          country: "",
          language: "",
          cast: []
        }
      },
      () => {
        this.props.navigation.navigate("AddEditMovie", {
          mode: "edit",
          selected: this.state.selectedItem
        });
      }
    );
  }

  onAddPress() {
    this.setState(
      {
        selectedItem: {
          id: "",
          title: "",
          date_of_release: "",
          rating: "",
          country: "",
          tags: [],
          director: "",
          language: "",
          cast: []
        }
      },
      () => {
        this.props.navigation.navigate("AddEditMovie", {
          mode: "add",
          selected: this.state.selectedItem
        });
      }
    );
  }

  renderEmptyList() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <MyText isBold={true} fontSize={20}>
          There is no item to show.
        </MyText>
      </View>
    );
  }

  onLogoutPress() {
    this.setState(
      {
        showLogoutModal: true,
      },
      () => {
        Animated.timing(this.modalAnimatedValue, {
          toValue: 0.8,
          duration: 1000
        }).start();
      }
    );
  }

  onConfirmLogoutPress(){
    this.props.logoutUser();
    this.props.navigation.navigate("SignedOut");
  }

  renderLogoutModal(){
    const { showLogoutModal } = this.state;
    return(
      <MyModal
        showModal={showLogoutModal}
        onCloseModal={() => {
          this.setState({ showLogoutModal: false });
          this.modalAnimatedValue.setValue(0);
        }}
        modalAnimatedValue={this.modalAnimatedValue}
      >
        <View style={Styles.deleteModalContentContainerStyle}>
          <View
            style={{
              width: "80%",
              height: "70%",
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            <MyText fontSize={16} isBold={true}>
              Do you want to exit?
            </MyText>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: "85%"
              }}
            >
              <MyButton
                title="No"
                color={"gray"}
                width={pageWidth * 0.25}
                height={pageHeight * 0.08}
                borderRadius={30}
                onClick={() => {
                  this.setState({ showLogoutModal: false });
                  this.modalAnimatedValue.setValue(0);
                }}
              />
              <MyButton
                title="Yes"
                color={"#D1BC8A"}
                width={pageWidth * 0.25}
                height={pageHeight * 0.08}
                borderRadius={30}
                onClick={this.onConfirmLogoutPress}
              />
            </View>
          </View>
        </View>
      </MyModal>
    )
  }

  render() {
    const {
      allMovieLoading,
      token,
      getAllMovies,
      allMovies,
      personLoading,
      searchMovieLoading,
      searchMovieList
    } = this.props;
    const { refreshList, showDeleteModal, isSearching, showLogoutModal } = this.state;
    return (
      <View style={Styles.containerStyle}>
        <Header
          headerText="Home"
          rightIcon={
            <FeatherIcon
              name="plus-circle"
              size={28}
              color={"#000"}
              onPress={this.onAddPress}
            />
          }
          leftIcon={
            <FeatherIcon
              name="log-out"
              size={26}
              color={"#000"}
              onPress={this.onLogoutPress}
            />
          }
        />
        <View style={Styles.searchContainerStyle}>
          <MyTextInput
            placeholder={"Search for title o director here..."}
            width={pageWidth * 0.77}
            height={pageHeight * 0.08}
            borderRadius={30}
            placeholderTextColor={"#D1BC8A"}
            onInputChange={searchValue => this.setState({ searchValue })}
            value={isSearching ? this.state.searchValue : ""}
          />
          <View style={Styles.searchIconContainerStyle}>
            <Icon
              name="search"
              size={25}
              color={"#000"}
              onPress={this.onSearchPress}
            />
          </View>
        </View>
        {allMovieLoading || personLoading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : (
          <FlatList
            data={isSearching ? searchMovieList : allMovies}
            refreshing={refreshList}
            onRefresh={() => {
              this.setState({ isSearching: false });
              getAllMovies({ token });
            }}
            keyExtractor={item => item.id.toString()}
            renderItem={item => this.renderItem(item)}
            ListEmptyComponent={this.renderEmptyList}
          />
        )}
        {showDeleteModal && this.renderDeleteModal()}
        {showLogoutModal && this.renderLogoutModal()}
        {searchMovieLoading && (
          <View
            style={{
              position: "absolute",
              backgroundColor: "#000",
              opacity: 0.5,
              height: pageHeight,
              width: pageWidth,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ActivityIndicator size="large" color="#000" />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ auth, movies, persons }) => {
  const { token } = auth;
  const {
    allMovieLoading,
    allMovies,
    movieError,
    searchMovieLoading,
    searchMovieList
  } = movies;
  const { personList, personLoading } = persons;
  return {
    allMovies,
    token,
    allMovieLoading,
    movieError,
    personList,
    personLoading,
    searchMovieLoading,
    searchMovieList
  };
};

export default connect(
  mapStateToProps,
  { getAllMovies, deleteMovie, getPersons, search, logoutUser }
)(Home);

const Styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: "#DAD7D1",
    justifyContent: "center",
    alignItems: "center"
  },
  searchContainerStyle: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
    justifyContent: "space-around"
  },
  searchIconContainerStyle: {
    width: pageHeight * 0.08,
    height: pageHeight * 0.08,
    borderRadius: pageHeight * 0.04,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  deleteModalContentContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: pageWidth * 0.8,
    height: pageHeight * 0.3,
    backgroundColor: "#DAD7D1",
    borderRadius: 20
  },
  editModalContentContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: pageWidth * 0.85,
    height: pageHeight * 0.85,
    backgroundColor: "#DAD7D1",
    borderRadius: 20
  }
});
