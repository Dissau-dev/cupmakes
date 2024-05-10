import React from "react";
import { View, Text, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import { palette } from "../../../theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;
const heigth = Dimensions.get("window").height;

interface Props {
  onPress: any;
}

export const FooterQuestion = ({ onPress }: Props) => {
  const navigation = useNavigation();
  return (
    <View>
      <View
        style={{ flexDirection: "row", marginHorizontal: 14, marginTop: 30 }}
      >
        <MaterialCommunityIcons
          name="lightbulb-on"
          color={"#FBc115"}
          size={80}
        />
        <View>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Poppins-Medium",
              textAlign: "center",
            }}
          >
            ¿ Necesitas ayuda ?
          </Text>
          <Text
            style={{
              textAlign: "center",
              width: width * 0.7,
              fontSize: 16,
              fontFamily: "Poppins-Medium",
            }}
          >
            Crea un Ticket para que un administrador responda a su correo .
          </Text>
        </View>
      </View>
      <Button
        onPress={onPress}
        style={{
          backgroundColor: palette.primary,
          width: width * 0.9,
          alignSelf: "center",
          marginTop: 14,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#fff",
            //width: width * 0.7,
            fontSize: 16,
            fontFamily: "Poppins-Medium",
          }}
        >
          Crear Ticket
        </Text>
      </Button>
    </View>
  );
};
