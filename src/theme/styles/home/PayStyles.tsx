import { StyleSheet } from "react-native";
import { palette } from "../../colors";
import Layout from "../../../utils/Layout";

const height = Layout.window.height;
const width = Layout.window.width

export const stylesPayConfirm = StyleSheet.create({
    btnLogIn: {
  
      borderRadius:30,
      marginTop:'4%'
  
    },
   
    inputNumber:{
      width: 280,
       height:34,
      backgroundColor: palette.white,
      borderBottomWidth:1,
      borderWidth:0,
      borderColor: palette.icons,
      // borderRadius: 100,
      // paddingLeft: 20,
     textAlign:'center',
    
    },
    fondo:{
      flex:1,
      backgroundColor:'black',
      paddingHorizontal:20
    },
    resultado:{
      color:'white',
      fontSize:60,
      marginBottom:10,
      textAlign:'right'
    },
    CalculadorContainer:{
      
      justifyContent:'center',
      position:'relative',
    
     // marginHorizontal: width * 0.06,
      marginTop:height * 0.026,
      alignItems:'center',
      
    },
    smallResult:{
      color:'rgba(255,255,255,0.5)',
      fontSize:30,
      textAlign:'right',
      
    },
    boton:{
      height:70,
      width:70,
      borderRadius: 100,
      justifyContent: 'center',
      marginHorizontal:5,
      backgroundColor:'#2b2b2b',
    },
    botonText:{
      textAlign:'center',
      color:'white',
      padding:10,
      fontSize:30,
      fontWeight:'bold'
    },
    fila:{
      flexDirection:'row',
      justifyContent:'space-between',
      
      paddingHorizontal:width * 0.04
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
  
  })
  
export const stylesFormPayScreen = StyleSheet.create({
    viewContainer: {
      marginRight: 40,
      marginLeft: 40,
      marginTop: 20,
      // flex: 1,
      // backgroundColor: "#20a17c",
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      width: width * 0.8,
     marginHorizontal: 'auto',
      shadowColor: '#000',
      marginTop:'4%',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    textLogIn: {
      // marginTop: 15,
      fontWeight: "bold",
      fontSize: 22,
      alignSelf: "center",
      fontFamily:'Poppins-Medium'
    },
  
 
    input: {
      width: width * 0.7,
      height: 35,
      backgroundColor: palette.white,
      borderColor: palette.icons,
      // borderRadius: 100,
      // paddingLeft: 20,
      paddingVertical: 5,
      marginVertical: 5,
    },
    newInput :{
      width: width * 0.7,
      height: 35,
      backgroundColor: palette.white,
      borderColor: palette.white,
      // borderRadius: 100,
      // paddingLeft: 20,
      paddingVertical: 5,
      marginVertical: 5,
    },
  
  
    btnLogIn: {
      marginTop: "10%",
      width: 280,
      
      height: 45,
      alignItems:'center',
      justifyContent:'center'
    },
})


export const stylesPaymentPassword = StyleSheet.create({
    btnLogIn: {
  
      borderRadius:30,
      marginTop:'4%'
  
    },
   
    inputNumber:{
      width: 280,
       height:34,
      backgroundColor: palette.white,
      borderBottomWidth:1,
      borderWidth:0,
      borderColor: palette.icons,
      // borderRadius: 100,
      // paddingLeft: 20,
     textAlign:'center',
    
    },
    fondo:{
      flex:1,
      backgroundColor:'black',
      paddingHorizontal:20
    },
    resultado:{
      color:'white',
      fontSize:60,
      marginBottom:10,
      textAlign:'right'
    },
    CalculadorContainer:{
      
      justifyContent:'center',
      position:'relative',
    
     // marginHorizontal: width * 0.06,
      marginTop:height * 0.026,
      alignItems:'center',
      
    },
    smallResult:{
      color:'rgba(255,255,255,0.5)',
      fontSize:30,
      textAlign:'right',
      
    },
    boton:{
      height:70,
      width:70,
      borderRadius: 100,
      justifyContent: 'center',
      marginHorizontal:5,
      backgroundColor:'#2b2b2b',
    },
    botonText:{
      textAlign:'center',
      color:'white',
      padding:10,
      fontSize:30,
      fontWeight:'bold'
    },
    fila:{
      flexDirection:'row',
      justifyContent:'space-between',
      
      paddingHorizontal:width * 0.04
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
  
  })
  