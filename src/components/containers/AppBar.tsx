import React, { useState } from "react";
import { Appbar, Avatar, Provider } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { globals } from "../../theme/styles/global";

import AvatarComponent from "../atoms/AvatarComponent";
import { Dimensions, View } from "react-native";
import { palette } from "../../theme/colors";

type AppBarProps = {
  back: {} | undefined;
  search?: boolean;
  title: string;
  navigation: any;
  route?: any;
};
export default function AppBar(props: AppBarProps) {
  const { back, search, title, navigation, route } = props;

  const leftAction = () => {
    back && navigation.goBack();
  };

  return (
    // <Provider>
    <Appbar.Header style={{ backgroundColor: palette.primary }}>
      {back && (
        <Appbar.Action
          animated={false}
          icon={() => (
            <FontAwesome5 name={"arrow-left"} size={20} color="#fff" />
          )}
          onPress={leftAction}
        />
      )}
      <Appbar.Content
        title={title}
        titleStyle={[globals.headerTitle]}
        // style={{ width: (3 * Layout.window.width) / 5 }}
        style={{
          alignItems: "center",

          width: (3 * Dimensions.get("window").width) / 5,
          // backgroundColor: "pink",
        }}
        mode="center-aligned"
      />
      {search && (
        <Appbar.Action
          animated={false}
          icon={() => <FontAwesome5 name="search" size={20} color={"black"} />}
          onPress={() =>
            navigation.navigate("SearchProductsScreen", {
              idStore: route?.params?.id || -1,
            })
          }
        />
      )}
      <Appbar.Action
        animated={false}
        // onPress={openModal}
        icon={() => <View />}
      />
    </Appbar.Header>
    // </Provider>
  );
}
