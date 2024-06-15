import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { palette } from "../../theme/colors";
import Layout from "../../utils/Layout";

export interface FilterBarButtonProps {
  label?: string;
  isSelected: boolean;
  onPress: () => void;
}

export function FilterBarButtons(props: FilterBarButtonProps) {
  const { label, isSelected, onPress } = props;

  return (
    <TouchableOpacity  style={[isSelected ? styles.selected : styles.NotSelected]}  onPress={onPress}>
      
        <Text style={[styles.text, isSelected ? styles.selectedItem : {}]}>
          {label}
        </Text>
      
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { minHeight: 42, minWidth:'20%', borderRadius:100 },
  selected: {
    backgroundColor: palette.primary,
    width: Layout.window.width * 0.3,
    height:40,
    borderRadius: 50,
    
     justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
    marginBottom:4
  },
  NotSelected: {

    width: Layout.window.width * 0.3,
    borderRadius: 50,
    paddingHorizontal: 10,
     justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
  },
  selectedItem: {
    color: palette.white,
    fontFamily:'Poppins-Medium',
    marginTop:2
  },
  text: {
    fontSize: 14,
    color: palette.darkGray,
    fontFamily:'Poppins-Medium',
    // width: "auto",
    flexShrink: 1,
    
  },
});
