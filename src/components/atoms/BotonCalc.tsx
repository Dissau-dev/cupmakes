import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './theme/appTheme'
import { palette } from '../../theme/colors'
import { Ionicons } from '@expo/vector-icons'
import Layout from '../../utils/Layout'

interface Props {
  textBtn?:any,
  color?:string,
  ancho?:boolean,
  action?:any
}

export const BotonCalc = ({textBtn, color='#fff',ancho = false , action}:Props) => {
    
  return (
    <TouchableOpacity onPress={()=> action(textBtn)}>
     {
      (textBtn === "backspace"  ) ?
      <View style= {{
        ...styles.boton,
         backgroundColor:color ,
         
         
         marginVertical:10,
         marginHorizontal:10
         }}>
         <Text style={{...styles.botonText, color: palette.primary  }}
         ><Ionicons name='backspace' size={30}/></Text>
      </View>
      :
      
      (textBtn === "." ) ?
      <View style= {{
        ...styles.boton,
         backgroundColor:color ,
  
      
         marginVertical:10,
         marginHorizontal:10
         }}>
         <Text style={{...styles.botonText, color: palette.primary  }}
         ><Ionicons name='finger-print-sharp' size={40}/> </Text>
      </View>
       : 
      
    
      <View style= {{
        ...styles.boton,
         backgroundColor:color ,
         borderColor:palette.primary,
         borderWidth:1,
       
         marginVertical:Layout.window.height * 0.009,
         marginHorizontal:10
         }}>
         <Text style={{...styles.botonText, color: palette.primary  }}
         >{  textBtn }</Text>
      </View> 
     } 
  
    </TouchableOpacity>
  )
}
