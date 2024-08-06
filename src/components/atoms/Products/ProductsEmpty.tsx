import React from "react";
import ProductsSkeleton from "../skeletons/ProductsSkeleton";
import { heightScrenn, widthScreen } from "../../../theme/styles/global";
import Logo from "../../../../assets/placeholders/empty_search.svg";
import { Text } from "react-native";
import { palette } from "../../../theme/colors";

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
            marginTop: heightScrenn * 0.14,
            fontFamily: "Avanta-Medium",
            color: palette.secondary,
            fontSize: 40,
            textAlign: "center",
          }}
        >
          No results found
        </Text>
        <Logo
          width={widthScreen * 0.8}
          height={heightScrenn * 0.4}
          style={{ alignSelf: "center" }}
        />
      </>
    );
  }
};
