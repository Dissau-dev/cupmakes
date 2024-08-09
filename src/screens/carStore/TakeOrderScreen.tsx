import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { palette } from "../../theme/colors";
import { SegmentedButtons, TextInput, Button } from "react-native-paper";
import { heightScrenn, widthScreen } from "../../theme/styles/global";

import { TakeDelivery } from "../../components/orders/TakeDelivery";
import { TakePickUp } from "../../components/orders/TakePickUp";
import { BarLoading } from "../../components/atoms/Products/cart/BarLoading";
import { StackScreenProps } from "@react-navigation/stack";
import { CarParamList } from "../../routes/types";

interface Props extends StackScreenProps<CarParamList, "TakeOrderScreen"> {}

export const TakeOrderScreen = ({ route }: Props) => {
  const { isSelected, Address } = route.params;
  const [value, setValue] = useState<"DELIVERY" | "PICKUP">(
    Address ? Address.type : "DELIVERY"
  );

  return (
    <View>
      <FocusAwareStatusBar
        barStyle={"default"}
        backgroundColor={palette.primary}
        translucent={false}
      />
      <ScrollView
        style={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <BarLoading level={2} />
        {!isSelected && (
          <SegmentedButtons
            value={value}
            style={{
              marginTop: heightScrenn * 0.03,
              width: widthScreen * 0.9,
              alignSelf: "center",
            }}
            //@ts-ignore
            onValueChange={setValue}
            buttons={[
              {
                value: "DELIVERY",
                label: "Delivery",
                checkedColor: palette.white,
                style: {
                  backgroundColor:
                    value === "DELIVERY" ? palette.primary : palette.white,
                },
                labelStyle: { fontFamily: "Avanta-Medium" },
                showSelectedCheck: true,
              },
              {
                value: "PICKUP",
                label: "Pick up",
                checkedColor: palette.white,
                style: {
                  backgroundColor:
                    value === "PICKUP" ? palette.primary : palette.white,
                },
                labelStyle: { fontFamily: "Avanta-Medium" },
                showSelectedCheck: true,
              },
            ]}
          />
        )}

        {value === "DELIVERY" ? (
          <TakeDelivery Address={Address} isSelected={isSelected} />
        ) : (
          <TakePickUp Address={Address} isSelected={isSelected} />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "#fff",
  },
});
