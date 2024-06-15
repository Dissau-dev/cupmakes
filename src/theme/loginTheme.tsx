import { StyleSheet } from "react-native";
import { palette } from "./colors";

export const loginStyles = StyleSheet.create({
  inputField: {
    color: "black",
    fontSize: 20,
    paddingHorizontal: 10,
    margin: 10,
    backgroundColor: "#fffefec7",
    width: "80%",
    borderRadius: 100,
  },
  btnConatiner: {
    alignItems: "center",
    marginTop: 20,
  },
  btn: {
    width: 230,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 7,
    borderRadius: 100,
    backgroundColor: "#023E88",
  },
  btnText: {
    color: "white",
    fontSize: 16,
  },
  btnRegisterText: {
    color: palette.primary,
    fontSize: 20,
    fontFamily: "Avanta-Medium",
    marginHorizontal: 10,
    marginVertical: 15,
  },
  newUserContainer: {
    alignItems: "center",
    marginTop: 30,
    flexDirection: "row",
  },
});
