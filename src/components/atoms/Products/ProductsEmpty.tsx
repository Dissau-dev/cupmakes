import React from "react";
import ProductsSkeleton from "../skeletons/ProductsSkeleton";
import { heightScrenn, widthScreen } from "../../../theme/styles/global";
import Lottie from "lottie-react-native";
import { Text } from "react-native";
import { palette } from "../../../theme/colors";
import cartAnimation from "../../../../assets/looties/bagAnimation.json";

interface Props {
  status: "loading" | "failed" | "idle" | "succeeded";
  isLoading: any;
}
export const ProductsEmpty = ({ status, isLoading }: Props) => {
  if (status === "loading" || isLoading) {
    return <ProductsSkeleton />;
  } else {
    return (
      <>
        <Text
          style={{
            marginTop: 50,
            fontFamily: "Avanta-Medium",
            color: palette.secondary,
            fontSize: 40,
            textAlign: "center",
          }}
        >
          No results found
        </Text>
        <Lottie
          source={cartAnimation}
          autoPlay
          loop
          style={{
            width: widthScreen * 1,
            height: heightScrenn * 0.5,
            alignSelf: "center",
          }}
        />
      </>
    );
  }
};
