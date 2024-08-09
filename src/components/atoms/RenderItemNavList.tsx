import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { MaterialCommunityIcons, FontAwesome6 } from "@expo/vector-icons";
import { palette } from "../../theme/colors";

interface NavListProps {
  onPress: any;
  text?: string;
  component?: React.ReactNode | React.ReactElement;
  icon?: any;
  iconColor?: string;
  textStyle?: StyleProp<TextStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  centered?: boolean;
}

const RenderItemNavList = ({
  onPress,
  text,
  component,
  icon,
  textStyle,
  itemStyle,
  iconColor,
  centered = false,
}: NavListProps) => {
  return (
    <TouchableOpacity style={[styles.listItem, itemStyle]} onPress={onPress}>
      {component || (
        <>
          <View style={styles.listItemDescription}>
            {icon && (
              <View style={{ marginEnd: centered ? 0 : 10 }}>
                <MaterialCommunityIcons
                  name={icon}
                  color={iconColor || palette.secondary}
                  size={20}
                />
              </View>
            )}

            {!centered && (
              <Text style={[styles.listItemText, textStyle]}> {text}</Text>
            )}
          </View>
          {centered && (
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={[styles.listItemText, { textAlign: "center" }, textStyle]}
            >
              {text}
            </Text>
          )}
        </>
      )}
      <FontAwesome6 name="chevron-right" size={18} color={palette.secondary} />
    </TouchableOpacity>
  );
};

export default RenderItemNavList;

const styles = StyleSheet.create({
  listItem: {
    // height: 65,
    padding: 15,
    paddingHorizontal: 25,
    borderRadius: 50,
    flexDirection: "row",
    marginVertical: 6,
    marginHorizontal: 16,
    backgroundColor: palette.white,
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: palette.icons,
  },
  listItemDescription: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: 'pink',
    // width: 100
  },
  listItemText: {
    fontSize: 17,
    fontFamily: "Avanta-Medium",
    // fontWeight: "500",
    color: palette.secondary,
    width: 200,
  },
});
