import React from 'react'
import { Pressable ,Text, StyleSheet, View, Image} from 'react-native'
import { useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/slices/sessionSlice';


import SvgNotif from '../../../assets/notification.svg'


type NavBarProps = {

    onProfile: () => void,
    onNotifications : () => void,
  }

export const NavBarSkeleton = ({onProfile, onNotifications}:NavBarProps) => {
   
  const user = useAppSelector(selectCurrentUser)
 
 
  return (
    <>
    <View style={{flexDirection:'row',justifyContent:'space-between', marginLeft:20, marginTop:10}}>

        <View>
          <Pressable onPress={onNotifications} style={styles.btnNotif}>
         
               <SvgNotif width={30} height={30} fill={'#ffffff'}/> 
          </Pressable>
        </View>
          
             <Pressable style={styles.btnPerfil} onPress={onProfile}>
          
          {!user?.avatar ? (
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 24,
                color: "#fff",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              {user?.username.charAt(0).toUpperCase()}
            </Text>
          ) : (
            user.avatar 
          )}
        </Pressable>

        <View style={styles.nombreContaine}>
      { /*   <Text style={styles.bienvenido}>¡Bienvenido!</Text>

          <Text style={styles.userName}>
            {" "}
            {user?.displayName || user?.username}{" "}
          </Text>*/}
        </View>
        <View>
        

   
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      margin: 10,
      justifyContent: "space-between",
    },
    btnNotif: {
      backgroundColor: "#03045E",
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
      width: 40,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#023E88",
      height: 40,
      borderColor:'white',
      borderWidth:2,
      marginLeft:10
    //  shadowColor: "#000",
    //  shadowOpacity: 0.25,
    //  shadowRadius: 16.0,
    //  elevation: 24,
    //  shadowOffset: { width: 12, height: 12 },
    },
    perfil: {
      width: 50,
      height: 50,
      borderRadius: 100,
    },
    nombreContaine: {
      flexDirection: "column",
      position: "absolute",
      left: 55,
     marginTop:2
    },
    bienvenido: {
      color: "#c1cccc",
      fontWeight: "500",
      //fontFamily:'Poppins-Medium'
    },
    userName: {
      fontSize: 16,
     // fontWeight: "bold",
      fontFamily:'Poppins-Medium'
    },

  });
  