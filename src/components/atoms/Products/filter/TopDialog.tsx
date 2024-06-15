import React, { useState } from "react";
import { View, Button, Text, Pressable, TouchableOpacity } from "react-native";
import {
  Dialog,
  Portal,
  Button as PaperButton,
  Divider,
} from "react-native-paper";
import { styles } from "../../../../../App";
import { heightScrenn } from "../../../../theme/styles/global";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  visible: any;
  onDismiss: any;
}

export const TopDialog = ({ visible, onDismiss }: Props) => {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          alignSelf: "center",
        }}
      >
        <Dialog.Title style={{ fontFamily: "Avanta-Medium", fontSize: 28 }}>
          Filter By :
        </Dialog.Title>
        <Divider />
        <Dialog.Content>
          <TouchableOpacity
            style={{
              height: heightScrenn * 0.05,
              justifyContent: "space-between",
              flexDirection: "row",
              marginVertical: 4,
              marginTop: 20,
            }}
          >
            <Text style={{ fontFamily: "Avanta-Medium", fontSize: 22 }}>
              Category
            </Text>
            <Ionicons name="chevron-forward" size={24} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: heightScrenn * 0.05,
              justifyContent: "space-between",
              flexDirection: "row",
              marginVertical: 4,
            }}
          >
            <Text style={{ fontFamily: "Avanta-Medium", fontSize: 22 }}>
              Price
            </Text>
            <Ionicons name="chevron-forward" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: heightScrenn * 0.05,
              justifyContent: "space-between",
              flexDirection: "row",
              marginVertical: 4,
            }}
          >
            <Text style={{ fontFamily: "Avanta-Medium", fontSize: 22 }}>
              Rating
            </Text>
            <Ionicons name="chevron-forward" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: heightScrenn * 0.05,
              justifyContent: "space-between",
              flexDirection: "row",
              marginVertical: 4,
            }}
          >
            <Text style={{ fontFamily: "Avanta-Medium", fontSize: 22 }}>
              Ordenar
            </Text>
            <Ionicons name="chevron-forward" size={24} />
          </TouchableOpacity>
        </Dialog.Content>
        <Dialog.Actions>
          <PaperButton onPress={onDismiss}>Cerrar</PaperButton>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
