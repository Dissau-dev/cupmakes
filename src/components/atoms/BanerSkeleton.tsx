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
import { palette, skeletonsColors } from "../../theme/colors";
import { NavBar } from "../../components/atoms/NavBar";
import { Skeleton } from "moti/skeleton";


const width = Layout.window.width;
const height  = Layout.window.height;
interface Props {
    onProfile:() => void;
    onNotification?:()=> void;
}

export const BanerSkeleton = ({onProfile, onNotification}:Props) => {

 

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
     
        <View style={styles.containerStyle}>
          <View style={styles.sliderContainerStyle}>
        
            <View style={{justifyContent:'space-between', flexDirection:'row',}}>
            <View style={{width: width * 0.2}}/>    
            <View style={{flexDirection:'row'}}>   
           
            
            <View style={styles.container}>
       
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
    width: width * 0.82,
    overflow: "hidden",
    height: width / 2,
  
    marginBottom: 30
  
  },
  sliderContainerStyle: {
    
    backgroundColor: '#dbdada57',
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
