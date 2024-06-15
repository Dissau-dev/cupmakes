import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Dialog, IconButton } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";

import { AntDesign, Octicons } from "@expo/vector-icons";
import { palette } from "../../../../theme/colors";
import { useNavigation } from "@react-navigation/native";

interface FiltersHeaderProps {
  setVisible: (visible: boolean) => void;
}

const FiltersHeader: React.FC<FiltersHeaderProps> = ({ setVisible }) => {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <TouchableOpacity
        style={{ justifyContent: "center" }}
        onPress={() => setVisible(true)}
      >
        <Text style={{ marginLeft: 10 }}>
          <Dialog.Title style={{ fontFamily: "Avanta-Medium", fontSize: 28 }}>
            Filter options:
          </Dialog.Title>
        </Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 10,
        }}
      >
        <IconButton
          icon={() => <AntDesign name="search1" size={24} color="black" />}
          iconColor={palette.darkGray}
          size={20}
          onPress={() =>
            //@ts-ignore
            navigation.navigate("SearchProducts", { titleScreen: "Search" })
          }
        />
        <IconButton
          icon={() => <AntDesign name="filter" size={24} color="black" />}
          iconColor={palette.darkGray}
          size={20}
          onPress={() => setVisible(true)}
        />
        <IconButton
          icon={() => <Octicons name="trash" size={24} color="black" />}
          iconColor={palette.darkGray}
          size={20}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default FiltersHeader;
