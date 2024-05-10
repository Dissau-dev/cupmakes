import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Image, Dimensions, Pressable } from "react-native";
import { Button } from "react-native-paper";

//import Card from '../../../assets/Credit card.svg'
import { Fontisto } from "@expo/vector-icons";

import Lottie from "lottie-react-native";

import { palette } from "../../theme/colors";

import SvgBank from '../../../assets/Credit card.svg'



const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const PlaceHolderBeneficiary = () => {
  return (
    <View>
      <View>
        
        <View style={{  justifyContent: 'center', alignItems: 'center' }}>
       <Text style={{fontFamily:'Poppins-Medium',textAlign:'center',fontSize:16}}>No se encontraron beneficiarios</Text>
        <SvgBank width={200} height={200} /> 
    </View>
      </View>
 
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
    marginTop:20,
    fontFamily:'Poppins-Medium'
  },

  
});
