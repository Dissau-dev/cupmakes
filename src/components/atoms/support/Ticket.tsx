import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";

import moment from "moment";
import { Entypo, Fontisto, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { palette } from "../../../theme/colors";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;
const heigth = Dimensions.get("window").height;

interface Props {
  status: "UNCOMPLETED" | "COMPLETED" | string;
  title: string;
  category: string;
  onView: any;
  onEdit: any;
}

const Ticket = ({ status, title, category, onView, onEdit }: Props) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const hideModal = () => {
    setModalVisible(false);
  };
  const onEditTicket = () => {
    setModalVisible(false);
    onEdit();
  };
  const onViewTicket = () => {
    setModalVisible(false);
    onView();
  };
  return (
    <View
      style={{
        // width: width * 0.44,
        width: width * 0.9,
        height: heigth * 0.27,
        //   alignItems: "center",
        marginVertical: 10,
        marginHorizontal: 14,
        alignContent: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 10,
        flexDirection: "row",
      }}
    >
      <View
        style={{
          // backgroundColor: "#03bb98",
          backgroundColor:
            status === "COMPLETED" ? palette.green : palette.gold,
          height: heigth * 0.27,
          width: width * 0.18,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      ></View>

      <View style={{ backgroundColor: "#fff" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {Array(9)
            .fill(null)
            .map((_, i) => (
              <View
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor:
                    status === "COMPLETED" ? palette.green : palette.gold,
                  marginVertical: 6,
                }}
              />
            ))}
        </View>
      </View>
      <View>
        <Pressable onPress={() => setModalVisible(true)}>
          <Ionicons
            name="menu-sharp"
            size={24}
            style={{
              marginLeft: width * 0.57,
              marginTop: 10,
            }}
            color={status === "COMPLETED" ? palette.green : palette.gold}
          />
        </Pressable>
        <View style={{ width: width * 0.61, marginHorizontal: "10%" }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.title}>{category}</Text>
          {status === "COMPLETED" ? (
            <Text style={styles.textTicket}>
              <MaterialIcons name="done-all" color={palette.green} size={20} />{" "}
              Ticket respondido
            </Text>
          ) : (
            <Text style={styles.textTicket}>
              <MaterialIcons name="done" color={palette.icons} size={20} />{" "}
              Ticket en espera
            </Text>
          )}
        </View>
      </View>
      <Modal //MOdal para eliminar
        animationType="slide"
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
                  Opciones
                </Text>
                <Button rippleColor={palette.primary} onPress={hideModal}>
                  <Text>
                    <Fontisto name="close" size={20} color={"#fff"} />
                  </Text>
                </Button>
              </View>
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 12,
              }}
            >
              {/* <Text
                style={{
                  marginVertical: 10,
                  fontFamily: "Poppins-Medium",
                  fontSize: 15,
                }}
              >
                ¿ Usted desea desactivar su tarjeta ? Esta acción puede ser
                permanente .
              </Text>*/}
              <View style={{ marginVertical: 10 }}>
                <TouchableOpacity
                  onPress={onViewTicket}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: width * 0.8,
                    borderColor: "#c1c1c1",
                    borderBottomWidth: 2,
                    marginTop: 10,
                    padding: 6,
                  }}
                >
                  <Ionicons
                    name="information-circle-outline"
                    size={24}
                    color={palette.primary}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "Poppins-Light",
                    }}
                  >
                    Ver detalles
                  </Text>

                  <Entypo name="chevron-right" size={20} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onEditTicket}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: width * 0.8,
                    borderColor: "#c1c1c1",
                    borderBottomWidth: 2,
                    marginTop: 16,
                    padding: 6,
                  }}
                >
                  <Ionicons
                    name="pencil-outline"
                    size={24}
                    color={palette.primary}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "Poppins-Light",
                    }}
                  >
                    Editar Ticket
                  </Text>

                  <Entypo name="chevron-right" size={20} />
                </TouchableOpacity>
                {/*  <Pressable
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: width * 0.8,
                    borderColor: "#c1c1c1",
                    borderBottomWidth: 2,
                    marginTop: 16,
                    padding: 6,
                  }}
                >
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color={palette.red}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "Poppins-Light",
                      //  color: "#c1c1c1",
                    }}
                  >
                    Eliminar Ticket
                  </Text>

                  <Entypo name="chevron-right" size={20} />
                </Pressable> */}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Poppins-Medium",
    fontSize: 20,
  },
  textTicket: {
    fontFamily: "Poppins-Medium",
    fontSize: 18,
    marginTop: heigth * 0.02,
    marginLeft: width * 0.06,
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
});

export default Ticket;
