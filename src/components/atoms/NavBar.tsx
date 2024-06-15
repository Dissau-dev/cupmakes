import React, { useState } from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { useAppSelector } from "../../store/hooks";
import { selectCurrentUser } from "../../store/slices/sessionSlice";

import SvgNotif from "../../../assets/notification.svg";
import Layout from "../../utils/Layout";
import { palette, skeletonsColors } from "../../theme/colors";
import { useNavigation } from "@react-navigation/native";

const width = Layout.window.width;
const height = Layout.window.height;
type NavBarProps = {
  onProfile?: () => void;
  onNotifications?: () => void;
};

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const NavBar = ({ onProfile, onNotifications }: NavBarProps) => {
  const [onloading, setonloading] = useState(false);
  const navigation = useNavigation();
  const user = useAppSelector(selectCurrentUser);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          marginLeft: width * 0.056,
          marginTop: height * 0.015,
        }}
      >
        <View>
          <Pressable
            onPress={() => {
              //@ts-ignore
              navigation.navigate("HomeNavigator", {
                screen: "NotificationScreen",
              });
            }}
            style={stylesNav.btnNotif}
          >
            <SvgNotif width={30} height={30} fill={palette.white} />
          </Pressable>
        </View>

        <Pressable style={stylesNav.btnPerfil} onPress={onProfile}>
          {!user?.image?.src ? (
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 24,
                color: "#fff",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              {user?.firstName?.charAt(0).toUpperCase()}
            </Text>
          ) : (
            <Image
              source={{ uri: user.image.src }}
              placeholder={blurhash}
              style={{ width: 38, height: 38, borderRadius: 100 }}
            />
          )}
        </Pressable>

        <View style={stylesNav.nombreContaine}>
          {/*   <Text style={styles.bienvenido}>¡Bienvenido!</Text>

          <Text style={styles.userName}>
            {" "}
            {user?.displayName || user?.username}{" "}
          </Text>*/}
        </View>
        <View></View>
      </View>
    </>
  );
};

export const stylesNav = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
  },
  btnNotif: {
    backgroundColor: "#03045E",
    padding: 10,
    borderRadius: 100,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  btnPerfil: {
    padding: 2,
    borderRadius: 100,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#023E88",
    height: 40,
    borderColor: "white",
    borderWidth: 1,

    marginLeft: 10,
    //  shadowColor: "#000",
    //  shadowOpacity: 0.25,
    //  shadowRadius: 16.0,
    //  elevation: 24,
    //  shadowOffset: { width: 12, height: 12 },
  },
  perfil: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  nombreContaine: {
    flexDirection: "column",
    position: "absolute",
    left: 55,
    marginTop: 2,
  },
  bienvenido: {
    color: "#c1cccc",
    fontWeight: "500",
    //fontFamily:'Poppins-Medium'
  },
  userName: {
    fontSize: 16,
    // fontWeight: "bold",
    fontFamily: "Poppins-Medium",
  },
});
