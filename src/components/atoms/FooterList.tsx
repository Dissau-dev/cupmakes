import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { View, StyleSheet, Text } from "react-native";

import { palette } from "../../theme/colors";

export const FooterList = ({ isLoading = false }: { isLoading: boolean }) => {
  if (isLoading) {
    return (
      <ActivityIndicator
        style={styles.loadingIndicator}
        color={palette.primary}
        size={"small"}
        animating={isLoading}
      />
    );
  } else {
    return <View style={{ height: 50 }} />;
  }
};

//moti
const styles = StyleSheet.create({
  loadingIndicator: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    height: 50,
  },
});
