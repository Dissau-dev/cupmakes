// import { useState } from "react";
// import { Alert } from "react-native";
// import crashlytics from "@react-native-firebase/crashlytics";

// import {
//   useEditUserMutation,
//   useFullLoginMutation,
//   useLogoutMutation,
// } from "../../store/api/authApi";
// import { setSessionTokens } from "../../store/slices/systemSlice";
// import { useAppDispatch } from "../../store/hooks";

// interface Props {
//   startLoading: boolean;
// }

// export const useAuthentication = ({ startLoading }: Props) => {
//   const [error, setError] = useState<string | boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(startLoading);
//   const [isFetching, setIsFetching] = useState<boolean>(startLoading);
//   const [fullLogin, { isLoading: isLoggingIn }] = useFullLoginMutation();
//   const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
//   const [updateUser] = useEditUserMutation();
//   const dispatch = useAppDispatch();

//   const clear = () => {
//     setError(false);
//     setIsLoading(false);
//     setIsFetching(false);
//   };

//   const showError = (message: string) => {
//     setError(message);
//     Alert.alert("¡Algo no ha salido bien!", message, [
//       {
//         text: "Aceptar",
//         onPress: () => {},
//       },
//     ]);
//   };

//   //Security
//   const logIn = async (
//     username: string,
//     password: string,
//     onSuccess?: Function
//   ) => {
//     setError(false);
//     setIsLoading(true);
//     try {
//       const body = {
//         username,
//         password,
//       };
//       await fullLogin(body)
//         .unwrap()
//         .then((res) => {
//           onSuccess && onSuccess();
//         })
//         .catch((error) => {
//           // console.log('error -> login -> ', error)
//           if (error.data) {
//             const message = error.data.message;
//             showError(message);
//             setIsLoading(false);
//           } else {
//             throw new Error();
//           }
//         });
//     } catch (error: any) {
//       crashlytics().log("Something failed while logging in the user");
//       crashlytics().recordError(error);
//       showError(
//         `Upps... Ha ocurrido un error mientras se procesaban las credenciales. Por favor, vuelva intentarlo y si el error persiste contáctenos.`
//       );
//       setIsLoading(false);
//     }
//   };

//   const logOut = async (onSuccess?: Function) => {
//     setError(false);
//     setIsLoading(true);
//     setIsFetching(true);
//     try {
//       await logout()
//         .unwrap()
//         .then((res) => {
//           dispatch(setSessionTokens(null));
//           onSuccess && onSuccess();
//         })
//         .catch((error) => {
//           if (error.data) {
//             const message = error.data.message;
//             showError(message);
//             setIsLoading(false);
//             setIsFetching(false);
//           } else {
//             throw new Error();
//           }
//         });
//     } catch (error: any) {
//       crashlytics().log("Something failed while logging out the user");
//       crashlytics().recordError(error);
//       showError(
//         `Upps... Ha ocurrido un error mientras se procesaban las credenciales. Por favor, vuelva intentarlo y si el error persiste contáctenos.`
//       );
//       setIsLoading(false);
//     }
//   };

//   const editUser = async (body: Object, onSuccess?: Function) => {
//     setError(false);
//     setIsLoading(true);

//     try {
//       await updateUser(body)
//         .unwrap()
//         .then((res) => {
//           onSuccess && onSuccess();
//         })
//         .catch((error) => {
//           if (error.data) {
//             const message = error.data.message;
//             showError(message);
//           } else {
//             throw new Error();
//           }
//         });
//     } catch (error: any) {
//       crashlytics().log("Something failed while updating user profile");
//       crashlytics().recordError(error);
//       showError(
//         `Upps... Ha ocurrido un error mientras se editaba el usuario. Por favor, vuelva intentarlo y si el error persiste contáctenos.`
//       );
//       setIsLoading(false);
//     }
//   };

//   return {
//     error,
//     isLoading,
//     isFetching,
//     clear,
//     isLoggingIn,
//     isLoggingOut,

//     //Security
//     logIn,
//     logOut,

//     editUser,
//   };
// };
