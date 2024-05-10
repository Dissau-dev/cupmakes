import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { current } from "@reduxjs/toolkit";
import React from "react";
import {
  View,
  Text,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  closeTokens,
  selectCurrentUser,
} from "../../../store/slices/sessionSlice";

const width = Dimensions.get("window").width;
const heigth = Dimensions.get("window").height;

interface Prop {
  isHome?: boolean;
  isProfile?: boolean;
}
export const HomeBaner = ({ isHome, isProfile }: Prop) => {
  const Dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <View
      style={{
        width: width,
        height: isHome
          ? heigth * 0.3
          : isProfile
          ? heigth * 0.14
          : heigth * 0.12,
        //borderBottomRightRadius: 60,
        //  borderBottomLeftRadius: 60,
        //"#5797f1" #186bdf
        backgroundColor: "#1635a4",
        position: isHome ? "absolute" : "relative",
        elevation: 5, // Elevación para Android
        shadowColor: "#600bde", // Color de la sombra
        shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
        shadowOpacity: 0.25, // Opacidad de la sombra
        shadowRadius: 3.84, // Radio de la sombra
        // Espaciado interno
        //  borderRadius: 10, // Bordes redondeados
      }}
    >
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          marginTop: isProfile ? heigth * 0.03 : heigth * 0.047,
        }}
      >
        {isProfile ? (
          <>
            <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 100,
                  borderColor: "#fff",
                  borderWidth: 2,
                }}
              >
                <Text
                  style={{
                    fontSize: 38,
                    fontFamily: "Poppins-Medium",
                    color: "#fff",
                    textAlign: "center",
                    alignSelf: "center",
                  }}
                >
                  {currentUser?.name?.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={{ flexDirection: "column", marginLeft: 10 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                    color: "#fff",
                  }}
                >
                  {currentUser?.name}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                    color: "#fff",
                  }}
                >
                  {currentUser?.email}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{ marginHorizontal: 20, marginTop: 20 }}
              onPress={() => Dispatch(closeTokens)}
            >
              <FontAwesome name="sign-out" size={30} color="#fff" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={{ marginHorizontal: 20 }}>
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "Poppins-Medium",
                  fontSize: 22,
                }}
              >
                Dissau-Support
              </Text>
            </View>
            <View style={{ marginHorizontal: 30 }}>
              <Ionicons name="notifications" color={"#fff"} size={24} />
            </View>
          </>
        )}
      </View>
    </View>
  );
};
