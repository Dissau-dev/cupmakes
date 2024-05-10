import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { palette } from "../../theme/colors";
import { heightScrenn, widthScreen } from "../../theme/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { DeliveryCard } from "../../components/atoms/support/DeliveryCard";

const dataDelivery = [
  {
    id: 1,
    title: "SHIPPING NATIONWIDE",
    descrip:
      "Bakévo is now shipping our three best-selling cakes anywhere in the Continental United States!",
    librery: "FontAw5",
    icon: "parachute-box",
  },
  {
    id: 2,
    title: "LOCAL DELIVERY",
    descrip:
      "We deliver locally to homes and businesses near our stores in California and Texas.",
    librery: "MaterialC",
    icon: "truck-delivery-outline",
  },
  {
    id: 3,
    title: "BEST QUALITY",
    descrip:
      "Our classic treats are made daily in our 25 bakeries, using only the freshest & finest ingredients",
    librery: "MaterialC",
    icon: "store-marker-outline",
  },
];

export const HomeScreen = () => {
  return (
    <View>
      <FocusAwareStatusBar
        barStyle={"dark-content"}
        backgroundColor={palette.white}
        translucent={false}
      />
      <ScrollView
        style={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
          }}
        >
          <View></View>

          <Image
            source={require("../../../assets/images/cupmakes.png")}
            style={{
              width: widthScreen * 0.46,
              height: heightScrenn * 0.07,
              alignSelf: "center",
            }}
          />

          <Pressable style={{ marginTop: 16 }}>
            <Ionicons name="person-outline" color={palette.primary} size={30} />
          </Pressable>
        </View>
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,
            color: palette.secondary,
            fontSize: 24,
            fontFamily: "Poppins-Medium",
          }}
        >
          Only Natural Ingredients
        </Text>
        {
          <FlatList
            data={dataDelivery}
            renderItem={({ item }) => (
              <DeliveryCard
                description={item.descrip}
                title={item.title}
                icon={item.icon}
                librery={item.librery}
              />
            )}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          />
        }

        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontSize: 20,
              color: palette.primary,
              textAlign: "center",
              fontFamily: "Poppins-Light",
            }}
          >
            Especial
          </Text>
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",

              color: "#7EBBC0",
              fontFamily: "Poppins-Medium",
            }}
          >
            Mejores Ofertas
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "#fff",
  },
  deliveryCard: {
    backgroundColor: "#fff",
    borderRadius: 10,

    height: 90,
    width: widthScreen * 0.3,

    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
