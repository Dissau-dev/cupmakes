import { StyleSheet } from 'react-native';




export const styles = StyleSheet.create({
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
    flex:1,
    justifyContent:'flex-end'
  },
  smallResult:{
    color:'rgba(255,255,255,0.5)',
    fontSize:30,
    textAlign:'right',
    
  },
  boton:{
    height:60,
    width:60,
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
    justifyContent:'center',
    marginBottom:10,
    paddingHorizontal:18
  }
});