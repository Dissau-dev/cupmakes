import React, { useContext } from "react";
import { View, StyleSheet, Image, Text, Platform } from "react-native";
import { Button } from "react-native-paper";

//import { ThemeContext } from "../../context/theme/ThemeContext";

interface Props {
  type: "logo";
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

export const EmptyData = ({ type, title, subtitle, onPress }: Props) => {
  const logo = require("../../../assets/images/error.png");
  // const { theme } = useContext(ThemeContext);

  let image;
  switch (type) {
    case "logo":
      image = logo;
      break;
  }

  return (
    <View style={styles.container}>
      <Image
        source={image}
        style={{
          width: 250,
          height: 250,
          opacity: 0.95,
        }}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 50,
        }}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        {onPress && (
          <View style={{ marginTop: 35 }}>
            <Button
              mode="contained"
              onPress={onPress}
              buttonColor={"#FFC305"}
              textColor="#0D0E0E"
              labelStyle={{
                fontFamily:
                  Platform.OS === "android" ? "poppins-medium" : "sf-medium",
                marginVertical: Platform.OS === "android" ? 6 : 8,
              }}
            >
              Actualizar
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginVertical: 16,
    fontSize: 18,
    opacity: 0.9,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
    textAlign: "center",
  },
});
