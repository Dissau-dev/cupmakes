import React, { useState } from 'react'
import { View,Text , StyleSheet} from 'react-native'
import TextInputController from './formControls/TextInputController'
import { palette } from '../../theme/colors'
import { TextInput } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import { useForm } from 'react-hook-form'
import Toast from 'react-native-toast-message'


const [showPassword, setShowPassword] = useState(false);
  

export const FormSettingsPins = () => {
    
   
  /*
    const onSetAmount = () => {
      reset({
        amount: "",
        password: "",
      });
      console.log("se guardo con exito");
      Toast.show({
        type: "success",
        text1: "success",
        text2: "Mensaje de Éxito",
        position: "top",
        topOffset: 9,
      });
    };*/
    const {
      handleSubmit,
      control,
      setFocus,
      reset,
      formState: { isSubmitting, isValid, isDirty },
    } = useForm({
      defaultValues: {
        amount: "",
        password: "",
      },
    });


  return (
    <>
    <View>
    <Text style={{ fontSize: 16, fontWeight: "500", marginLeft: 10 }}>
      Importe mínimo
    </Text>
    <TextInputController
      controller={{
        name: "amount",
        rules: {
          required: {
            value: true,
            message: "campo obligatorio",
          },
        },
        control: control as any,
      }}
      style={styles.input}
      placeholder="300 "
      dense
      textColor={palette.secondary}
      autoCapitalize={"none"}
      keyboardType="numeric"
      returnKeyType="next"
    //  right={<Image source={require("../../../assets/logo.png")} />}
    />
    <Text style={{ fontSize: 16, fontWeight: "500", marginLeft: 10 }}>
      Pin de Seguridad
    </Text>
    <TextInputController
      controller={{
        name: "password",
        control: control as any,
        rules: {
          required: { value: true, message: "Contraseña requerida" },
        },
      }}
      style={styles.input}
      placeholder="****"
      dense
      secureTextEntry={showPassword ? false : true}
      returnKeyType="done"
      right={
        <TextInput.Icon
          icon={() => (
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color={palette.icons}
            />
          )}
          color={(isTextInputFocused) => "#c1c1c1"}
          onPress={() => setShowPassword(!showPassword)}
        />
      }
    />
  </View>
  <View
    style={{ alignItems: "center", position: "relative", marginTop: 50 }}
  >



  {/*  <Button
      style={[styles.btnLogIn]}
      mode="contained"
      buttonColor={palette.primary}
      rippleColor={palette.datesFilter}
      onPress={handleSubmit(onSubmit)}
      textColor={palette.white}
      loading={isSubmitting}
      disabled={(isDirty && !isValid) || isSubmitting}
      labelStyle={{
        fontSize: 15,
        fontWeight: "700",
      }}
    >
      Aceptar
    </Button>*/}
  </View>
  </>
  )
}

const styles = StyleSheet.create({
    text: {
      fontSize:16,
      textAlign:'center',
      marginHorizontal: 20,
      marginVertical:6,
      fontFamily:'Poppins-Medium'
    },
    input: {
      width: "100%",
      height: 28,
      backgroundColor: palette.white,
      borderColor: palette.icons,
      borderRadius: 100,
      borderWidth: 2,
      paddingLeft: 20,
      paddingVertical: 5,
      marginVertical: 7,
    },
    btnLogIn: {
      marginTop: 20,
      width: 240,
    },
  });
  