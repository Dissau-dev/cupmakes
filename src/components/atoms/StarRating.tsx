import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { palette } from "../../theme/colors";
interface Prop {
  rating: number;
}
const StarRating = ({ rating }: Prop) => {
  const filledStars = Math.floor(rating);
  const halfStarVisible = rating - filledStars >= 0.5;

  const renderStars = () => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < filledStars) {
        stars.push(
          <Ionicons key={i} name="star" size={22} color={palette.accountCard} />
        );
      } else if (i === filledStars && halfStarVisible) {
        stars.push(
          <Ionicons key={i} name="star-half" size={22} color="gold" />
        );
      } else {
        stars.push(<Ionicons key={i} name="star" size={22} color="#c1c1c1" />);
      }
    }
    return stars;
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {renderStars()}
      <Text
        style={{ marginLeft: 10, fontFamily: "Avanta-Medium", fontSize: 20 }}
      >
        {rating}
      </Text>
    </View>
  );
};

export default StarRating;
