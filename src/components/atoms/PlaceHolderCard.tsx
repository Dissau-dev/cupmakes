import { NavigationProp } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { Button } from "react-native-paper";

//import Card from '../../../assets/Credit card.svg'
import { Fontisto } from "@expo/vector-icons";

import Lottie from "lottie-react-native";
import Card from "../../../assets/lotties/Animation - Card.json";
import { palette } from "../../theme/colors";

type PlaceHolderProps = {
  onRequest?: () => void;
  Home: boolean;
  title: string;
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const PlaceHolderCard = ({
  onRequest,
  Home,
  title,
}: PlaceHolderProps) => {
  return (
    <View>
      <View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins-Medium",
              marginHorizontal: width * 0.1,
              marginTop: 22,
            }}
          >
            No hay {title}
          </Text>
          <Lottie
            source={Card}
            autoPlay
            loop
            style={
              Home ? { width: 150, height: 150 } : { width: 160, height: 160 }
            }
          />
        </View>
      </View>
      {/*   <View style={{ alignItems:'center'  }}>
        <Button
          mode="contained"
          buttonColor={palette.primary}
          rippleColor={palette.datesFilter}
          icon="plus" textColor="white"
          style={{  
            width: width *0.55,
             height: 60,
             borderRadius:100,
             alignItems:'center',
             justifyContent:'center',
             
         }}
          onPress={onRequest}
        >
          <Text style={{ color: "white", fontFamily:'Poppins-Medium', fontSize:19,
           justifyContent:'center',textAlign:'center',marginBottom:2 }}>Solicitar </Text>
        </Button>
   
      </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    fontFamily: "Poppins-Medium",
  },
});
