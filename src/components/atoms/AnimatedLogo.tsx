import { Dimensions, StyleSheet, Animated, Easing } from "react-native";
import React from "react";
import { View, MotiImage } from "moti";
import { palette } from "../../theme/colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const imageSize = width * 0.3;
const logoSize = width * 0.2;
const logoPiecesSize = logoSize / 2.5;

export default function AnimatedLogo() {
  return (
    <View style={styles.logoContainer}>
      <MotiImage
        source={require("../../../assets/logo-w - copia.png")}
        from={{
          rotate: "0deg",
        }}
        animate={{
          rotate: "360deg",
        }}
        transition={{
          loop: true,
          repeatReverse: false,
          type: "timing",
          duration: 3000,
        }}
        // animate={{
        //   // translateX: 6,
        //   rotate: ["0deg", "90deg", "180deg", "270deg", "0deg"],
        // }}
        style={[styles.logo]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   flexDirection: "row",
  //   backgroundColor: palette.primary,
  // },
  logoContainer: {
    position: "relative",
    height: logoSize,
    width: logoSize,
    // backgroundColor: "hotpink",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  logo: {
    height: imageSize,
    width: imageSize,
    marginLeft: -15,
  },
  logoPiece: { height: logoPiecesSize, width: logoPiecesSize },
  square: {
    backgroundColor: palette.secondary,
  },
  circle: {
    backgroundColor: palette.primary,
    borderRadius: 100,
  },
  animatedOpacity: {
    backgroundColor: "#ffffff",
    zIndex: 3000,
    height: 50,
    width: 50,
    opacity: 0.4,
    position: "absolute",
  },
});

// export const AnimatedLogo = React.memo(() => {
//   const fadeInValue = new Animated.Value(0);
//   const spinValue = new Animated.Value(0);

//   Animated.sequence([
//     Animated.delay(1000),
//     Animated.timing(fadeInValue, {
//       toValue: 1,
//       duration: 1500,
//       easing: Easing.linear,
//       useNativeDriver: true,
//     }),
//   ]).start();

//   Animated.loop(
//     Animated.timing(spinValue, {
//       toValue: 360,
//       duration: 300000,
//       easing: Easing.linear,
//       useNativeDriver: true,
//     })
//   ).start();

//   return (
//     <Animated.View
//       style={{
//         opacity: fadeInValue,
//         transform: [{ rotate: spinValue }],
//       }}
//     >
//       <Image
//         source={require("../../../assets/logo-w-copia.png")}
//         transition={{ delay: 100, type: "timing", loop: true }}
//         animate={{
//           translateX: 6,
//           rotate: ["180deg", "360deg"],
//         }}
//         style={[styles.logo]}
//       />
//     </Animated.View>
//   );
// });
