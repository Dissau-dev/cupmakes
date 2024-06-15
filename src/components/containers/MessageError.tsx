import React from "react"
import { View } from "react-native"
import { Text } from "react-native-paper"

interface Message {
    message: string
}

export const MessageError = ({message}: Message) => 
    (<View style ={{alignSelf:"flex-start"}}>
        <Text style={{color: "red", }}>{message} </Text>
    </View>)
