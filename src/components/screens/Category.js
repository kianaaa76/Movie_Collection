import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Animated,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Header from "../common/Header";
import MyText from "../common/MyText";
import MyModal from "../common/MyModal";
import CategoryListItem from "../utils/CategoryListItem";
import {
  getCategories,
  createCategory,
  getCategoryMovies
} from "../../actions/Actions";
import MyTextInput from "../common/MyTextInput";
import MyButton from "../common/MyButton";
import { showToast } from "../utils/Utilities";

const pageHeight = Dimensions.get("screen").height;
const pageWidth = Dimensions.get("screen").width;

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      newCategory: "",
      refreshList: false,
      categoryMoviesList: []
    };
    this.modalAnimatedValue = new Animated.Value(0);
    this.renderModal = this.renderModal.bind(this);
    this.onPlusPress = this.onPlusPress.bind(this);
    this.onCreateCategoryPress = this.onCreateCategoryPress.bind(this);
    this.renderCategoriesListItem = this.renderCategoriesListItem.bind(this);
    this.onCategoryPress = this.onCategoryPress.bind(this);
  }
  componentDidMount() {
    const { token } = this.props;
    this.props.getCategories({ token });
  }

  renderEmptyList() {
    return (
      <View style={Styles.listEmptyContainerStyle}>
        <MyText fontSize={20} isBold={true} color="#000">
          There is no item to show.
        </MyText>
      </View>
    );
  }

  renderCategoriesListItem(name) {
    return (
      <CategoryListItem
        name={name}
        onPress={() => this.onCategoryPress(name)}
      />
    );
  }

  onCategoryPress(categoryName) {
    const { getCategoryMovies, token, movieError, movieCategoryLoading } = this.props;
    getCategoryMovies({ token, categoryName })
      .then(() => {
        this.setState({ categoryMoviesList: this.props.categoryMoviesList });
        this.props.navigation.navigate("CategoryMovies", {
          Movies: this.state.categoryMoviesList,
          CategoryName: categoryName,
        });
      })
      .catch(() => showToast(movieError));
  }

  onPlusPress() {
    this.setState({ showModal: true }, () => {
      Animated.timing(this.modalAnimatedValue, {
        toValue: 0.8,
        duration: 1000
      }).start();
    });
  }

  onCreateCategoryPress() {
    const { token, createCategory, getCategories } = this.props;
    const { newCategory } = this.state;
    this.setState({ showModal: false });
    this.modalAnimatedValue.setValue(0);
    createCategory({ token, name: newCategory }).then(()=>{
        getCategories({token});
        showToast("New category is successfully created.");
    }).catch(()=>{
        showToast("Creating category failed.");
    });
  }

  renderModal() {
    const { showModal } = this.state;
    return (
      <MyModal
        showModal={showModal}
        onCloseModal={() => {
          this.setState({ showModal: false });
          this.modalAnimatedValue.setValue(0);
        }}
        modalAnimatedValue={this.modalAnimatedValue}
      >
        <View style={Styles.modalContentContainerStyle}>
          <MyText fontSize={15} isBold={true}>
            Choose your new category name:
          </MyText>
          <MyTextInput
            placeholder="category name"
            width={pageWidth * 0.7}
            height={pageHeight * 0.08}
            borderRadius={20}
            onInputChange={name => this.setState({ newCategory: name })}
          />
          <View style={{flexDirection:"row"}}>
          <MyButton
            title="Cancel"
            color={"gray"}
            width={pageWidth * 0.3}
            height={pageHeight * 0.08}
            borderRadius={30}
            onClick={()=>{
                this.setState({showModal: false});
                this.modalAnimatedValue.setValue(0);
            }}
          />
          <MyButton
            title="Create"
            color={"#D1BC8A"}
            width={pageWidth * 0.3}
            height={pageHeight * 0.08}
            borderRadius={30}
            onClick={this.onCreateCategoryPress}
          />
          </View>
        </View>
      </MyModal>
    );
  }

  render() {
    const {
      loading,
      categoriesList,
      getCategories,
      token,
      movieCategoryLoading
    } = this.props;
    const { showModal, refreshList } = this.state;
    return (
      <View style={Styles.containerStyle}>
        <Header
          headerText="Categories"
          rightIcon={
            <Icon
              name="plus-circle"
              size={28}
              color={"#000"}
              onPress={this.onPlusPress}
            />
          }
        />
        {loading ? (
          <View style={Styles.listEmptyContainerStyle}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <FlatList
              onRefresh={() => {
                this.setState({ refreshList: true });
                getCategories({ token });
                this.setState({ refreshList: false });
              }}
              refreshing={refreshList}
              data={categoriesList}
              keyExtractor={item => item.id.toString()}
              renderItem={item => this.renderCategoriesListItem(item.item.name)}
              ListEmptyComponent={this.renderEmptyList}
            />
          </View>
        )}
        {showModal && this.renderModal()}
        {this.props.movieCategoryLoading && (
          <View style={Styles.generalLoadingContainerStyle}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ categories, auth, movies }) => {
  const { loading, categoriesList, error } = categories;
  const { token } = auth;
  const { movieCategoryLoading, categoryMoviesList, movieError } = movies;
  return {
    loading,
    categoriesList,
    error,
    token,
    movieCategoryLoading,
    categoryMoviesList,
    movieError
  };
};

export default connect(
  mapStateToProps,
  { getCategories, createCategory, getCategoryMovies }
)(Category);

const Styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: "#DAD7D1",
    justifyContent: "center",
    alignItems: "center"
  },
  listEmptyContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  plusButtonStyle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    position: "absolute",
    left: -15,
    bottom: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCA21B"
  },
  modalContentContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: pageWidth * 0.8,
    height: pageHeight * 0.3,
    backgroundColor: "#DAD7D1",
    borderRadius: 20
  },
  generalLoadingContainerStyle: {
    position: "absolute",
    width: pageWidth,
    height: pageHeight,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5
  }
});
