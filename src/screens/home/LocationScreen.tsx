import React from "react";
import { HomeParamList } from "../../routes/types";
import { StackScreenProps } from "@react-navigation/stack";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Baner } from "../../components/atoms/Baner";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import { palette } from "../../theme/colors";
import { AntDesign, Entypo, Fontisto } from "@expo/vector-icons";
import { heightScrenn, widthScreen } from "../../theme/styles/global";
import { Button } from "react-native-paper";

interface Props extends StackScreenProps<HomeParamList, "LocationScreen"> {}
export const LocationScreen = () => {
  const openMap = () => {
    const url =
      "https://www.google.com/maps/place/Nox+Cookie+Bar+-+Downtown+Campbell/@37.2869301,-121.9425607,17z/data=!3m1!4b1!4m6!3m5!1s0x808e3561bbf1905d:0x6d41ccb297c4c1fd!8m2!3d37.2869301!4d-121.9425607!16s%2Fg%2F11spvnqzc8?entry=ttu&g_ep=EgoyMDI0MDgyMS4wIKXMDSoASAFQAw%3D%3D";
    Linking.openURL(url);
  };

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
        <View style={styles.container}>
          <View style={styles.row}>
            <AntDesign name="phone" size={24} color="#545353" />
            <Text style={styles.text}>+1 669-273-9216</Text>
          </View>
          <View style={styles.row}>
            <Fontisto name="email" size={24} color="#545353" />
            <Text style={styles.text}>info@cupmakes.com</Text>
          </View>
          <View style={styles.row}>
            <Entypo name="location" size={24} color="#545353" />
            <Text style={styles.text}>
              422 E Campbell Ave, Campbell, CA 95008
            </Text>
          </View>

          <Image
            source={{
              uri: "https://maps.googleapis.com/maps/api/staticmap?center=37.2869301,-121.9425607&zoom=17&size=300x360&markers=color:red%7C%7C37.2869301,-121.9425607&key=AIzaSyBN1FTGbjsKDx_l-uLAvHGsofnd3FbXeOY",
            }}
            style={{ width: widthScreen * 0.8, height: heightScrenn * 0.48 }}
          />

          <Button style={styles.Btn} onPress={openMap}>
            <Text style={styles.textBtn}>Go google maps</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "#fff",
  },
  map: {
    width: 300,
    height: 340,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  text: {
    fontFamily: "Montserrat-Bold",
    marginHorizontal: 12,
    textAlign: "left",
    fontSize: 16,
  },
  Btn: {
    backgroundColor: "#000",
    marginTop: 10,
    width: widthScreen * 0.5,
    height: heightScrenn * 0.06,
    justifyContent: "center",
  },
  textBtn: {
    color: palette.white,
    fontFamily: "Montserrat-Bold",
    fontSize: 18,
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
    margin: 20,
  },
});
