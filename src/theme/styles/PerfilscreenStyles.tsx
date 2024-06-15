
import { StyleSheet } from "react-native";
import Layout from "../../utils/Layout";
import { palette } from "../colors";

const width = Layout.window.width;
const height = Layout.window.width

export const stylesPerfil = StyleSheet.create({
    avatarContainer: {
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      marginBottom: 20,
      padding: 10,
    },
    avatarBtn: {
   
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      marginBottom: 20,
      padding: 10,
      backgroundColor: "#33b5d3",
      borderRadius: 100,
    },
    avatar: {
      height: width * 0.24,
      width: width * 0.24,
      marginLeft: -width * 0.02,
      backgroundColor: "#023E88",
      borderRadius: 100,
    
      alignSelf: "center",
      borderWidth: 2,
  
      borderColor:'white'
    },  avatarImage: {
      height: width * 0.24,
      width: width * 0.24,
      marginLeft: -width * 0.02,
      backgroundColor: "#023E88",
      borderRadius: 100,
    
      alignSelf: "center",
      borderColor:'white'
    },
    username: {
      marginTop: 10,
      textAlign: "center",
      fontSize: 16,
      fontWeight: "500",
      fontFamily: "Poppins-Medium",
    },
    subTitle: {
      textAlign: "center",
      fontSize: 15,
      fontFamily:'Poppins-Light'
    },
    botonSPerfil:{
      width: width,
      height:60,
      justifyContent:'center',
  
     alignItems:'flex-start',
  
    },
    textBotonPerfil:{
     color:'#000',
     fontSize:18,
     fontFamily:'Poppins-Light',
     marginLeft:30,
     
     
    }
  });
  export  const stylesSetProfile = StyleSheet.create({
    btnLogIn: {
        marginTop: 25,
        marginBottom:20,
        height: height * 0.13,
        borderRadius:100,
        alignItems:'center',
        justifyContent:'center'
      },
      textLogIn: {
      
         fontSize: 16,
        
         fontFamily:'Poppins-Medium',
         width : width * 0.42,
         textAlignVertical:'center',
         marginVertical:height * 0.021
       },

    anotherAvatar:{
        height: 100,
        backgroundColor: "#023E88",
        borderRadius: 100,
        width: 100,
        alignSelf: "center",
        borderWidth:2,
        borderColor:'#c1c1c1'
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
  settingText:{
    fontSize:16,
    fontFamily:'Poppins-Light'
  },
  ProfileText:{
    fontSize:18,
    fontFamily:'Poppins-Medium',
    marginTop:8
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    width: width *0.9,
    borderRadius:10,
    
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
  },
  blueView: {
    width: '100%',
    height: 50,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    backgroundColor: palette.primary,
    
  },
  newInput :{
    width: width * 0.7,
    height: 45,
    backgroundColor: palette.white,
    borderColor: palette.white,
    // borderRadius: 100,
    // paddingLeft: 20,
    
    marginVertical: 5,
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    borderRadius: 100,
    justifyContent: "center",
    backgroundColor: "#FFFFFF99",
  }
  });
  
  
  