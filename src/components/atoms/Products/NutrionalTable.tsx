import { StyleSheet, Text, View } from "react-native";
import React from "react";

const NutrionalTable = () => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginVertical: 10,
      }}
    >
      <View style={{ borderWidth: 0.85, padding: 20, borderRadius: 10 }}>
        <Text style={styles.title}>Nutrition Facts</Text>
        <View style={styles.line} />
        <Text style={styles.servingSize}>Serving Size 1 cupcake (57g)</Text>
        <View style={styles.lineThick} />
        <View style={styles.row}>
          <Text style={styles.largeText}>Calories </Text>
          <Text style={styles.largeText}>210 </Text>
        </View>
        <View style={styles.lineThick} />
        <View style={styles.nutrientContainer}>
          <View style={styles.row}>
            <Text style={styles.boldText}>Total Fat</Text>
            <Text style={styles.boldText}>12g</Text>
          </View>
          <Text style={styles.indentText}>Saturated Fat 7g</Text>
          <Text style={styles.indentText}>Trans Fat 0g</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.nutrientContainer}>
          <View style={styles.row}>
            <Text style={styles.boldText}>Cholesterol</Text>
            <Text style={styles.boldText}>30mg</Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.nutrientContainer}>
          <View style={styles.row}>
            <Text style={styles.boldText}>Sodium</Text>
            <Text style={styles.boldText}>170mg</Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.nutrientContainer}>
          <View style={styles.row}>
            <Text style={styles.boldText}>Total Carbohydrate</Text>
            <Text style={styles.boldText}>28g</Text>
          </View>
          <Text style={styles.indentText}>Dietary Fiber 1g</Text>
          <Text style={styles.indentText}>Sugars 18g</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.nutrientContainer}>
          <View style={styles.row}>
            <Text style={styles.boldText}>Protein</Text>
            <Text style={styles.boldText}>2g</Text>
          </View>
        </View>
        <View style={styles.lineThick} />
        <Text style={styles.footnote}>
          *Percent Daily Values are based on a 2,000 calorie diet.
        </Text>
        <View style={styles.line} />
        <Text style={styles.subTitle}>Ingredients:</Text>
        <Text style={styles.ingredientText}>
          Sugar, Wheat Flour, Butter, Eggs, Vanilla Extract, Baking Powder, Salt
        </Text>
        <View style={styles.line} />
        <Text style={styles.subTitle}>Contains:</Text>
        <Text style={styles.ingredientText}>Wheat, Eggs, Milk,Soy</Text>
      </View>
    </View>
  );
};

export default NutrionalTable;

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    // fontWeight: "700",
    fontFamily: "Avanta-Medium",
    textAlign: "center",
    marginBottom: 10,
    color: "#000",
  },
  subTitle: {
    fontSize: 18,

    textAlign: "center",
    marginVertical: 5,
    fontFamily: "Montserrat-Bold",
  },
  servingSize: {
    fontSize: 16,
    fontFamily: "Montserrat-Light",
    textAlign: "center",
    marginVertical: 5,
  },
  line: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  lineThick: {
    borderBottomColor: "#000",
    borderBottomWidth: 2,
    marginVertical: 10,
  },
  section: {
    marginVertical: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boldText: {
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
  },

  largeText: {
    fontSize: 26,
    fontFamily: "Montserrat-Bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  nutrientContainer: {
    marginVertical: 5,
    alignItems: "center",
  },
  indentText: {
    fontSize: 14,

    marginLeft: 15,
    fontFamily: "Montserrat-Light",
    marginTop: 4,
  },
  footnote: {
    fontSize: 12,
    textAlign: "center",
    marginVertical: 10,
    fontFamily: "Montserrat-Light",
  },
  ingredientText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 2,
    fontFamily: "Montserrat-Light",
  },
});