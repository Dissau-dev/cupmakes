import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { HomeParamList } from "../../routes/types";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { palette } from "../../theme/colors";
import { heightScrenn, widthScreen } from "../../theme/styles/global";
import { Image } from "expo-image";
import NutrionalTable from "../../components/atoms/Products/NutrionalTable";

interface Props extends StackScreenProps<HomeParamList, "NutritionalScreen"> {}
export const NutritionalScreen = ({ route, navigation }: Props) => {
  const { item } = route.params;
  const hash = "LEHV6nWB2yk8pyo0adR*.7kCMdnj";

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
        scrollEventThrottle={16} // Para que el scroll capture movimientos más frecuentemente.
      >
        <Image
          placeholder={hash}
          source={{ uri: item.images[0].src }}
          style={styles.imageRight}
        />
        <View style={{ marginTop: heightScrenn * 0.06 }} />
        <NutrionalTable data={item.nutrition_facts} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "#fff",
  },
  imageRight: {
    width: widthScreen,
    height: heightScrenn * 0.5,
    right: widthScreen * 0.12,
    transform: [{ rotate: "30deg" }],
    alignSelf: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    // fontWeight: "700",
    fontFamily: "Avanta-Medium",
    textAlign: "center",
    marginBottom: 10,
    color: "#000",
  },
  subTitle: {
    fontSize: 18,

    textAlign: "center",
    marginVertical: 5,
    fontFamily: "Montserrat-Bold",
  },
  servingSize: {
    fontSize: 16,
    fontFamily: "Montserrat-Light",
    textAlign: "center",
    marginVertical: 5,
  },
  line: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  lineThick: {
    borderBottomColor: "#000",
    borderBottomWidth: 2,
    marginVertical: 10,
  },
  section: {
    marginVertical: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boldText: {
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
  },

  largeText: {
    fontSize: 26,
    fontFamily: "Montserrat-Bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  nutrientContainer: {
    marginVertical: 5,
    alignItems: "center",
  },
  indentText: {
    fontSize: 14,

    marginLeft: 15,
    fontFamily: "Montserrat-Light",
    marginTop: 4,
  },
  footnote: {
    fontSize: 12,
    textAlign: "center",
    marginVertical: 10,
    fontFamily: "Montserrat-Light",
  },
  ingredientText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 2,
    fontFamily: "Montserrat-Light",
  },
});
