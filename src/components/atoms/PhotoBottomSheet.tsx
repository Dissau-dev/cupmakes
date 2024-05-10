import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { forwardRef, useMemo, useCallback } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { IconButton } from "react-native-paper";
import { palette } from "../../theme/colors";
import { globals } from "../../theme/styles/global";

interface Props extends Omit<BottomSheetProps, "children" | "snapPoints"> {
  onPressCamera: any;
  onPressGallery: any;
  onDismiss: any;
}

export default forwardRef<BottomSheetModal, Props>(function PhotoBottomSheet(
  { onPressCamera, onPressGallery, onDismiss, ...rest },
  ref
) {
  const snapPoints = useMemo(() => ["30%"], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),
    []
  );
  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      {...rest}
      backdropComponent={renderBackdrop}
      style={[globals.shadow, { borderRadius: 100 }]}
      index={0}
      enablePanDownToClose
      enableDismissOnClose
    >
      <BottomSheetView style={{ backgroundColor: "white" }}>
        <View style={styles.top}>
          <Text style={styles.text}>Seleccione una opción</Text>
          <IconButton
            icon={"close"}
            iconColor={palette.circularProgressBar}
            onPress={onDismiss}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableHighlight
            style={styles.button}
            underlayColor={"#EFEFEF"}
            onPress={onPressGallery}
          >
            <View style={styles.buttonContent}>
              <IconButton
                icon="image"
                iconColor={palette.white}
                size={25}
                containerColor={palette.primary}
                //   onPress={handleChoosePhoto}
                // disabled={true}
              />
              <Text style={styles.buttonText}>Galería</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            underlayColor={"#EFEFEF"}
            onPress={onPressCamera}
          >
            <View style={styles.buttonContent}>
              <IconButton
                icon="camera"
                iconColor={palette.white}
                size={25}
                containerColor={palette.primary}
                //   onPress={handleChoosePhoto}
                // disabled={true}
              />
              <Text style={styles.buttonText}>Cámara</Text>
            </View>
          </TouchableHighlight>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    width: 100,
    height: 100,
    borderColor: palette.icons,
    borderRadius: 5,
    alignContent: "center",
    // backgroundColor: "white",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    alignContent: "space-between",
  },
  buttonText: {
    color: palette.darkGray,
    // marginTop: 10,
  },
  text: {
    fontSize: 18,
    color: palette.circularProgressBar,
    marginLeft: 10,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});
