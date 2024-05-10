import { StyleSheet } from "react-native";
import { palette } from "../../colors";
import Layout from "../../../utils/Layout";

const height = Layout.window.height;
const width = Layout.window.width

export const stylesHome = StyleSheet.create({
    acountOrCards:{
      marginHorizontal:5,
      borderRadius:6,
      justifyContent:'center',
      textAlignVertical:'center',
      width: width * 0.25,
      borderColor: palette.primary,
      borderWidth:1,
      
    },
    container: {
      flex: 1,
      flexDirection: "row",
      marginTop:20,
      justifyContent: "space-between",
      marginLeft:20
    },
    btnNotif: {
    //  backgroundColor: "#023E88",
      padding: 10,
      borderRadius: 100,
      width: 40,
      alignItems: "center",
      justifyContent: "center",
      height: 40,
  
    },
    btnPerfil: {
      padding: 2,
      borderRadius: 100,
      width: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#33B5D3",
      height: 50,
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 16.0,
      elevation: 24,
      shadowOffset: { width: 12, height: 12 },
    },
    perfil: {
      width: 50,
      height: 50,
      borderRadius: 100,
    },
    nombreContaine: {
      flexDirection: "column",
      position: "absolute",
      left: 65,
    },
    bienvenido: {
      color: "#c1cccc",
      fontWeight: "bold",
    },
    userName: {
      fontSize: 16,
      fontWeight: "bold",
      fontFamily:'Poppins-Bold'
    },
    misTarjetas: {
      fontSize: 18,
      
      marginHorizontal: 20,
      top: 30,
      marginBottom: 50,
      fontFamily:'Poppins-Medium'
    },
  // navBar 
    containerStyle: {
      alignSelf: "center",
      width: width ,
      overflow: "hidden",
      height: width *0.5,
      marginBottom: 30,
    },
    sliderContainerStyle: {
      backgroundColor: '#03045E',
      borderRadius: width,
      width: width * 2,
      height: width *2,
      // marginLeft: -(width / 2),
      position: "absolute",
      bottom: 0,
      overflow: "hidden",
      alignSelf: "center",
      justifyContent: "flex-end",
      // alignItems: "center",
    },
    logo: {
      width: width * 0.28,
      height: width * 0.28,
      // marginTop: 350,
       marginLeft: 235,
      alignSelf: "center",
      // backgroundColor: "pink",
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      
      height:90,
      width: width * 0.30,
     
     justifyContent:'center', 
     alignItems:'center',
      shadowColor: '#000',
      marginTop:'5%',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  
  });
  