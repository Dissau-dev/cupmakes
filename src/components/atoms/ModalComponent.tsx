import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { heightScrenn, widthScreen } from "../../theme/styles/global";
import { palette } from "../../theme/colors";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { Button, Divider } from "react-native-paper";
import { ModalCartContent } from "./Products/cart/ModalCartContent";
import { ModalProductContent } from "./Products/cart/ModalProductContent";

interface Props {
  visible: boolean;
  onClose: any;
  titleModal: string;
  style?: any;
  item: any;
  isCart: boolean;
  count?: any;
  setQuantity?: any;
  increment?: any;
  decrement?: any;
}

export const ModalComponent = ({
  visible,
  onClose,
  titleModal,
  item,
  isCart,
  count,
  setQuantity,
  increment,
  decrement,
}: Props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.blueView}>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 6,
                marginBottom: 10,
              }}
            >
              <View />
              <Text
                style={{
                  //  color: "white",
                  justifyContent: "center",
                  textAlign: "center",
                  margin: 6,
                  marginLeft: 14,
                  fontSize: 26,

                  fontFamily: "Avanta-Medium",
                }}
              >
                {titleModal}
              </Text>
              <Button
                rippleColor={palette.white}
                onPress={onClose}
                style={{ right: 6 }}
              >
                <Text>
                  <Ionicons name="close" size={26} color={"#000000"} />
                </Text>
              </Button>
            </View>
            <Divider style={{ marginVertical: 2 }} />
          </View>

          <View style={{ marginHorizontal: 6 }}>
            {isCart ? (
              <ModalCartContent item={item} />
            ) : (
              <ModalProductContent
                item={item}
                count={count}
                setQuantity={setQuantity}
                increment={increment}
                decrement={decrement}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Avanta-Medium",
    fontSize: 20,
  },
  textTicket: {
    fontFamily: "Avanta-Medium",
    fontSize: 18,
    marginTop: heightScrenn * 0.02,
    marginLeft: widthScreen * 0.06,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    marginTop: heightScrenn * 0.36,
    backgroundColor: "white",
    width: widthScreen,
    borderRadius: 10,
    elevation: 5,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  modalText: {
    marginBottom: 20,
  },
  blueView: {
    width: "100%",
    height: heightScrenn * 0.08,
  },
});
