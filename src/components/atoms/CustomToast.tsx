// App.jsx
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
  BaseToastProps,
} from "react-native-toast-message";

/*
  1. Create the config
*/
const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#80DDC8",
        borderRadius: 50,
        borderLeftWidth: 10,
        height: "auto",
      }}
      contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
      text2Style={{
        fontSize: 13,
      }}
      text2NumberOfLines={3}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "#F47676",
        borderRadius: 50,
        borderLeftWidth: 10,
        height: "auto",
      }}
      contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
      text2Style={{
        fontSize: 13,
      }}
      text2NumberOfLines={3}
    />
  ),

  info: (props: BaseToastProps) => (
    <InfoToast
      {...props}
      style={{
        borderLeftColor: "#FFDA63",
        borderRadius: 50,
        borderLeftWidth: 10,
        height: "auto",
      }}
      contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
      text2Style={{
        fontSize: 13,
      }}
      text2NumberOfLines={3}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  //   tomatoToast: ({ text1, props }) => (
  //     <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
  //       <Text>{text1}</Text>
  //       <Text>{props.uuid}</Text>
  //     </View>
  //   )
};

/*
  2. Pass the config as prop to the Toast component instance
*/
export default () => <Toast config={toastConfig} />;
