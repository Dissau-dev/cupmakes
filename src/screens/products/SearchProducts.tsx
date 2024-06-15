import React from "react";
import { View, Text } from "react-native";
import { ProductsParamList } from "../../routes/types";
import { StackScreenProps } from "@react-navigation/stack";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { palette } from "../../theme/colors";

interface ProtectedScreenProps
  extends StackScreenProps<ProductsParamList, "SearchProducts"> {}

export const SearchProducts = () => {
  return (
    <View style={{ flex: 1 }}>
      <FocusAwareStatusBar
        barStyle={"default"}
        backgroundColor={palette.primary}
        translucent={false}
      />
    </View>
  );
};
