import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

import { TextInput, Button } from "react-native-paper";
import Toast from "react-native-toast-message";

import { useForm } from "react-hook-form";
;

import { StatusBar } from "expo-status-bar";
import Layout from "../../utils/Layout";
import { useLoginMutation } from "../../store/api/authApi";
import FocusAwareStatusBar from "../../components/atoms/FocusAwareStatusBar";
import TextInputController from "../../components/atoms/formControls/TextInputController";
import { palette } from "../../theme/colors";
import { NavBar } from "../../components/atoms/NavBar";


const width = Layout.window.width;
const height  = Layout.window.height;
interface Props {
    onProfile:() => void;
    onNotification?:()=> void;
}

export const Baner = ({onProfile, onNotification}:Props) => {

 

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
     
        <View style={styles.containerStyle}>
          <View style={styles.sliderContainerStyle}>
            <View style={{justifyContent:'space-between', flexDirection:'row',}}>
            <View style={{width: width * 0.32}}/>    
            <View style={{flexDirection:'row'}}>   
            <Image
              source={require("../../../assets/logo-w-copia.png")}
              resizeMode="contain"
              resizeMethod="resize"
              style={styles.logo}
            />
            <Text style={{fontSize:30, color:'#fff', marginTop:24, fontFamily:'Poppins-Medium'}}>Tecopay</Text>
            <View style={styles.container}>
        <NavBar
          onProfile={onProfile}
          
        //  onNotifications={onProfile}
        />
      </View>
            </View>
            <View style={{width: width * 0.4}}/>
            </View>
            <View style={{height: height * 0.07}}></View> 
          </View>
        </View>

    
      
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({

  containerStyle: {
    alignSelf: "center",
    width: width,
    overflow: "hidden",
    height: width / 2,
  
    marginBottom: 30
  
  },
  sliderContainerStyle: {
    backgroundColor: palette.primary,
    borderRadius: width,
    width: width * 2,
    height: width * 2,
    // marginLeft: -(width / 2),
    position: "absolute",
    bottom: 0,
    overflow: "hidden",
   
    justifyContent: "flex-end",
     alignItems: "center",
     alignSelf:'center'
  },
  logo: {
    
    width: width * 0.28,
    height: width * 0.28,
    // marginTop: 350,
    // marginLeft: 235,
    alignSelf: "center",
    // backgroundColor: "pink",
  },

  container: {
  
    flexDirection: "row",
    marginTop:20,
    justifyContent: "space-between",
    marginLeft:20
  },
});
