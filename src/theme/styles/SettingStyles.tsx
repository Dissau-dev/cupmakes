import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { palette } from "../colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const stylesSettings = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    width: width * 0.9,
    borderRadius: 10,

    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
  },
  blueView: {
    width: "100%",
    height: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: palette.primary,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
    marginVertical: 6,
    fontFamily: "Poppins-Medium",
  },
  input: {
    width: "100%",
    height: 28,
    backgroundColor: palette.white,
    borderColor: palette.icons,
    borderRadius: 100,
    borderWidth: 2,
    paddingLeft: 20,
    paddingVertical: 5,
    marginVertical: 7,
  },
  inputAmount: {
    width: width * 0.77,
    height: 42,
    backgroundColor: palette.white,
    borderColor: palette.icons,
    paddingLeft: 20,
  },
  btnLogIn: {
    height: height * 0.13,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  textLogIn: {
    marginBottom: 2,
    fontSize: 18,
    alignSelf: "center",
    justifyContent: "center",
    fontFamily: "Poppins-Medium",
    height: height * 0.11,
    textAlignVertical: "center",
    width: width * 0.62,
  },
});
