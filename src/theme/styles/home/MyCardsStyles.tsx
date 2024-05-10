
import { Dimensions, StyleSheet } from "react-native"
import { palette } from "../../colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const stylesMycard = StyleSheet.create({
    productsView:{
      flexDirection:'row'
      ,justifyContent:'center',
      alignItems:'center',
      marginHorizontal:20,
      borderRadius:100,
      backgroundColor:'#f6f6f6',
      width: width* 0.9,
      marginVertical:10
    },
    buttonDesactive:{
   backgroundColor:'transparent',
   width: width * 0.45
    },
    buttonActive:{
      backgroundColor:palette.primary,
      width: width * 0.45
    },
    textActive:{
      color:'white'
    },
    textDesactive:{
      color:palette.darkGray
    },
    acountOrCards:{
      marginHorizontal:5,
      borderRadius:6,
      justifyContent:'center',
      textAlignVertical:'center',
      width: width * 0.25,
      borderColor: palette.primary,
      borderWidth:1,
    },
    acountOrCardRequest:{
      marginHorizontal:5,
      borderRadius:6,
      justifyContent:'center',
      textAlignVertical:'center',
      width: width * 0.32,
      borderColor: palette.primary,
      borderWidth:1,
    },
  })