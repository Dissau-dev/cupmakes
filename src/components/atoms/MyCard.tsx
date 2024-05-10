import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable, Dimensions } from "react-native";
import { stylesRegister } from "../../screens/Auth/LoginScreen";
//import Layout from './Layout';
import { StackScreenProps } from "@react-navigation/stack";
//import { mask } from "react-native-mask-text";

import { Image } from "expo-image";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

type CardProps = {
  address: string;
  onPress?: () => void;
  hash?: string;
  vence?: string;
  issueEntity?: string;
  logo?: any;
  amount: string | number;
};

export const MyCard = ({
  address,
  onPress,
  amount,
  hash,
  vence,
  issueEntity,
  logo,
}: CardProps) => {
  const [loadingImage, setloadingImage] = useState(false);
  const [tempUri, settempUri] = useState<string | undefined>(hash);
  //const maskedCardNumber = mask(address, "9999 9999 9999")

  return (
    <View style={stylesCard.card}>
      <View style={stylesCard.container}>
        <Pressable
          style={{
            borderRadius: 15,
            marginBottom: "6%",
          }}
          onPress={onPress}
        >
          <View style={stylesCard.logos}>
            <View></View>
            <View
              style={{
                borderColor: "#c1c1c1",
                borderWidth: 1.5,
                borderRadius: 100,
                marginTop: "8%",
              }}
            >
              <Image
                source={{ uri: `https://apidevpay.tecopos.com${logo}` }}
                style={stylesCard.imagenLogo}
                placeholder={hash}
              />
            </View>
          </View>

          <View>
            <Text style={stylesCard.detallesText}>
              {" "}
              Nro:{"  "}
              {address}
            </Text>
          </View>

          <View style={stylesCard.detallesContainer}>
            <View style={stylesCard.fechaContainer}>
              <Text style={stylesCard.nombreEmpresa}>Saldo disponible </Text>
              <Text style={stylesCard.nombreEmpresa}> {amount || 0} ptos</Text>
            </View>
            <View>
              <Text style={stylesCard.nombreEmpresa}>Cuenta</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export const stylesCard = StyleSheet.create({
  card: {
    width: width * 0.84,
    marginBottom: 10,
    height: height * 0.24,
    alignItems: "center",
    marginHorizontal: width * 0.03,

    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    overflow: "hidden",
  },
  container: {
    width: "100%",

    marginTop: "3%",
  },

  imagenLogo: {
    borderRadius: 100,
    width: width * 0.096,
    height: height * 0.048,
  },
  logos: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "6%",
    top: "-6%",
  },
  textTarjeta: {
    fontSize: 16,
    fontWeight: "bold",
  },
  montoContainer: {
    alignItems: "flex-start",
    marginLeft: "8%",
    top: "5%",
  },
  textMonto: {
    fontWeight: "900",
    fontSize: 30,
  },
  detallesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",

    top: "4%",
    marginHorizontal: "4%",
  },
  fechaContainer: {
    marginLeft: "4%",
  },
  detallesText: {
    color: "#414141",
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    marginLeft: "5%",
  },
  nombreEmpresa: {
    color: "#414141",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
});
