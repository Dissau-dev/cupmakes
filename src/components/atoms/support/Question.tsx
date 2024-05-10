import { Entypo, Fontisto, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { Button } from "react-native-paper";
import { palette } from "../../../theme/colors";

const width = Dimensions.get("window").width;
const heigth = Dimensions.get("window").height;

interface Props {
  title: string;
  description: string;
}

export const Question = ({ title, description }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const hideModal = () => {
    setModalVisible(false);
  };
  return (
    <>
      <Pressable onPress={() => setModalVisible(true)}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            marginHorizontal: 16,
            justifyContent: "space-evenly",
            borderBottomWidth: 2,
            borderColor: "#c1c1c1",
            paddingVertical: 10,
          }}
        >
          <MaterialIcons
            name="question-answer"
            size={30}
            color="#4366e8"
            style={{}}
          />
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Poppin-Medium",
              fontSize: 18,
              color: "#495da1",
              marginHorizontal: 6,
            }}
          >
            ¿ {title} ?
          </Text>
        </View>
      </Pressable>
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
                  Respuesta
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
              <Text
                style={{
                  marginVertical: 10,
                  textAlign: "center",
                  fontFamily: "Poppins-Medium",
                  fontSize: 15,
                }}
              >
                ¿{title}?
              </Text>
              <Text
                style={{
                  marginVertical: 10,
                  fontFamily: "Poppins-Medium",
                  fontSize: 15,
                }}
              >
                {description} .
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
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
