import React from "react";
import { View, ActivityIndicator, Modal, StatusBar } from "react-native";

import { LoadingPage } from "./LoadingPage";

interface Props {}

export const Loading = ({}: Props) => {
  return (
    <Modal transparent={true} visible={true} animationType="fade">
      <LoadingPage title="" />
    </Modal>
  );
};
