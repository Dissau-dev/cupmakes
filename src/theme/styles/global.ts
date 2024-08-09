import { Dimensions, StyleSheet } from "react-native";
import { palette } from "../colors";

export const widthScreen = Dimensions.get("window").width;
export const heightScrenn = Dimensions.get("window").height;

export const globals = StyleSheet.create({
  margin: {
    marginHorizontal: 16,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily:'Avanta-Medium',
    color: "#fff",
    // textTransform: "capitalize",
  },
  container: {
    flex: 1,
    // marginTop: 5,
    // paddingTop: 5,
    // paddingBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#969696",
    textAlign: "center",
    paddingHorizontal: 10,
  },
  fab: {
    position: "absolute",
    zIndex: 1000,
    margin: 16,
    right: 0,
    bottom: 0,

    borderRadius: 100,
  },
  search: {
    marginVertical:10,
    // flex: 1
    backgroundColor: palette.white,
    borderColor: palette.icons,
    borderRadius:10,
    alignItems: "center",
    // alignSelf: "center",
    justifyContent: "center",
    height: 42,
    padding: 0,
    marginBottom: 22,
    borderWidth: 1,
  },
  searchInput: {
    
    fontSize: 15,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    textDecorationLine: "none",
  },
  actionButtons: {
    // width: "100%",
    flex: 1,
    flexShrink: 1,
    // backgroundColor: "lightblue",
    // marginVertical: 10,
    marginBottom: 5,
    // paddingHorizontal: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonLabel: { fontSize: 15, fontWeight: "600" },
  filterBar: {
    backgroundColor: palette.datesFilter,
    width: "100%", //"90%"
    height: 35,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-evenly",
    borderRadius: 50,
    marginHorizontal: 10,
    alignSelf: "center",
    flexWrap: "wrap",
    alignContent: "center",
  },
});
