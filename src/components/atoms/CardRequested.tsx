import { Fontisto, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
  Modal,
} from "react-native";
import { Button } from "react-native-paper";
import { palette } from "../../theme/colors";

interface Props {
  cardImage?: any;
  onPress?: any;
  holderName?: string;
  createdAt: string;
  status: string;
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const CardRequested: React.FC<Props> = ({
  holderName,
  cardImage,
  onPress,
  createdAt,
  status,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.cardContainer}>
      <Pressable
        onPress={onPress === true ? () => setModalVisible(true) : onPress}
      >
        <View style={styles.card}>
          {
            <Image
              source={{ uri: `https://apidevpay.tecopos.com${cardImage}` }}
              style={styles.cardImagePrinted}
            />
          }
          <View style={styles.cardDetails}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ marginLeft: "55%", marginBottom: "34%" }}>
                {status === "REQUESTED" ? (
                  <View
                    style={{
                      alignItems: "flex-end",
                      marginVertical: height * 0.07,
                    }}
                  >
                    <Ionicons
                      name="lock-closed-outline"
                      color={"#414141"}
                      size={28}
                    />
                  </View>
                ) : status === "DENIED" ? (
                  <View
                    style={{
                      alignItems: "flex-end",
                      marginVertical: height * 0.07,
                    }}
                  >
                    <Ionicons
                      name="lock-closed-outline"
                      color={"#414141"}
                      size={28}
                    />
                  </View>
                ) : null}

                <Text
                  style={
                    status === "REQUESTED"
                      ? {
                          color: palette.datesFilter,
                          fontFamily: "Poppins-Medium",
                          fontSize: 13,
                          textAlign: "right",
                        }
                      : {
                          color: palette.white,
                          fontFamily: "Poppins-Medium",
                          fontSize: 13,
                          textAlign: "right",
                        }
                  }
                >
                  card Holder
                </Text>
                <Text
                  style={
                    status === "REQUESTED"
                      ? {
                          color: palette.datesFilter,
                          fontFamily: "Poppins-Medium",
                          fontSize: 13,
                          textAlign: "right",
                        }
                      : {
                          color: palette.white,
                          fontFamily: "Poppins-Medium",
                          fontSize: 13,
                          textAlign: "right",
                        }
                  }
                >
                  {holderName}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>

      {status === "REQUESTED" || "ACCEPTED" || "PRINTED" ? (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.blueView}>
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    marginTop: 6,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      justifyContent: "center",
                      textAlign: "center",
                      margin: 6,
                      marginLeft: 14,
                      fontSize: 20,
                      fontFamily: "Poppins-Medium",
                    }}
                  >
                    Estado de la tarjeta
                  </Text>
                  <Button
                    rippleColor={palette.primary}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text>
                      <Fontisto name="close" size={20} color={"#fff"} />
                    </Text>
                  </Button>
                </View>
              </View>
              <View
                style={{
                  marginVertical: 10,
                  paddingVertical: 12,
                  paddingHorizontal: 8,
                }}
              >
                <View>
                  <Text
                    style={{
                      fontFamily: "Poppins-Medium",
                      fontSize: 15,
                    }}
                  >
                    Nombre del titular:
                    <Text style={{ fontFamily: "Poppins-Light" }}>
                      {"   "}
                      {holderName}
                    </Text>
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: "Poppins-Medium",
                      fontSize: 15,
                    }}
                  >
                    Fecha de Solicitud:
                    <Text style={{ fontFamily: "Poppins-Light" }}>
                      {"   "}
                      {createdAt}
                    </Text>
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: "Poppins-Medium",
                      fontSize: 15,
                    }}
                  >
                    Estado:
                    <Text
                      style={{ fontFamily: "Poppins-Medium", color: "#0e62a5" }}
                    >
                      {"   "}
                      {status === "ACCEPTED"
                        ? "Aceptada"
                        : status === "REQUESTED"
                        ? "Solicitada"
                        : status === "DENIED"
                        ? "Denegada"
                        : "Impresa"}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
  cardContainer: {
    marginHorizontal: 10,
    width: width * 0.84,
    height: height * 0.24,
    alignItems: "center",
    marginVertical: 10,
    flex: 1,
  },
  card: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#313131",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    flexDirection: "row",
    overflow: "hidden",
  },
  cardImage: {
    width: width * 0.84,
    height: height * 0.24,
    resizeMode: "cover",
    position: "absolute",
    opacity: 0.06,
  },
  cardImagePrinted: {
    width: width * 0.84,
    height: height * 0.24,
    resizeMode: "cover",
    position: "absolute",
  },
  cardDetails: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  cardAmount: {
    fontSize: 30,
    fontFamily: "Poppins-Bold",
    marginBottom: 10,
    color: "white",
  },
  expirationDate: {
    fontSize: 14,
    color: palette.darkGray,
    marginLeft: "30%",
  },
  expirationStatus: {
    fontSize: 14,
    color: palette.white,
    marginLeft: "30%",
  },
});

export default CardRequested;
