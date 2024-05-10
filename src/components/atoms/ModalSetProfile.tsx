import React, { useCallback, useState } from "react";
import { Modal, View, Text, Platform, Pressable } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { palette } from "../../theme/colors";
import Layout from "../../utils/Layout";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import Toast from "react-native-toast-message";
import { useUploadImageMutation } from "../../store/api/mediaApi";
import { selectCurrentUser } from "../../store/slices/sessionSlice";
import { useAppSelector } from "../../store/hooks";
import { BarCodeScanner } from "expo-barcode-scanner";
import { stylesSetProfile } from "../../theme/styles/PerfilscreenStyles";
import { Image } from "expo-image";

const width = Layout.window.width;
const height = Layout.window.width;

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const ModalSetProfile = () => {
  const user = useAppSelector(selectCurrentUser);

  const [uploadImage, { isLoading }] = useUploadImageMutation();

  const [hasPermission, setHasPermission] = useState<null | boolean>(null);

  const [modalVisible, setModalVisible] = useState(false);

  const [tempUri, settempUri] = useState<string | any>(null);

  const getImage = useCallback(async ({ assets }: ImagePickerResponse) => {
    if (assets) {
      const file = assets[0];
      if (file) {
        const acceptedType = ["png", "jpg", "jpeg"].includes(
          file.type?.split("/")[1] || ""
        );
        const onSize = (file.fileSize || 0) <= 200000;
        if (!acceptedType) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "La extensión del archivo no está permitida",
            position: "top",
            topOffset: 9,
          });
        } else if (!onSize) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "El tamaño máximo permitido es 200Kb",
            position: "top",
            topOffset: 9,
          });
        } else {
          const fileData = {
            name: file?.fileName || "",
            type: file?.type || "",
            uri:
              Platform.OS === "ios" && file.uri
                ? file.uri?.replace("file://", "")
                : file.uri,
          };
          const data = new FormData();
          data.append("file", fileData as any);
          await uploadImage(data)
            .unwrap()
            .then(() => {
              settempUri(file.uri);
              setModalVisible(false);
              Toast.show({
                type: "success",
                text1: "Éxito",
                text2: "Foto actualizada correctamente",
              });
            })
            .catch((respo: any) => {
              setModalVisible(false);
              Toast.show({
                type: "error",
                text1: "Error",
                text2: `${respo.data}`,
              });
            });
        }
      }
    }
  }, []);

  const takePhoto = () => {
    launchCamera(
      { mediaType: "photo", maxWidth: 1000, maxHeight: 1000, quality: 0.7 },
      getImage
    );
  };
  const choosePhoto = () => {
    launchImageLibrary(
      { mediaType: "photo", maxWidth: 1000, maxHeight: 1000, quality: 0.7 },
      getImage
    );
  };

  const handelPhotograph = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");

    takePhoto();
  };

  return (
    <>
      <View style={{}}>
        <Pressable
          style={stylesSetProfile.anotherAvatar}
          onPress={() => setModalVisible(true)}
        >
          <View>
            {user?.image ? (
              <Image
                source={{ uri: user?.image?.src }}
                style={{ width: 96, height: 96, borderRadius: 100 }}
                placeholder={blurhash}
              />
            ) : (
              <Text
                style={{
                  fontSize: 62,
                  color: "#fff",
                  textAlign: "center",
                  justifyContent: "center",
                  fontFamily: "Poppins-Medium",
                }}
              >
                {user?.firstName?.charAt(0).toUpperCase()}
              </Text>
            )}

            <View style={{ marginLeft: width * 0.18, bottom: height * 0.1 }}>
              <IconButton
                icon="camera"
                containerColor={palette.primary}
                iconColor={palette.white}
                size={16}
                onPress={() => setModalVisible(true)}
              />
            </View>
          </View>
        </Pressable>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={stylesSetProfile.centeredView}>
          <View style={stylesSetProfile.modalView}>
            <View style={stylesSetProfile.blueView}>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginTop: 6,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    justifyContent: "center",
                    textAlign: "center",
                    margin: 6,
                    marginLeft: 14,
                    fontSize: 20,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  Actualizar foto de perfil
                </Text>
                <Button
                  rippleColor={palette.primary}
                  onPress={() => setModalVisible(false)}
                >
                  <Text>
                    <Fontisto name="close" size={20} color={"#fff"} />
                  </Text>
                </Button>
              </View>
            </View>
            {isLoading ? (
              <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
                <Button
                  onPress={takePhoto}
                  labelStyle={{ color: "#fff" }}
                  loading
                  disabled
                  rippleColor={palette.icons}
                  style={{
                    backgroundColor: palette.primary,
                    width: width * 0.4,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins-Medium",
                      fontSize: 15,
                    }}
                  >
                    Enviando...
                  </Text>
                </Button>
              </View>
            ) : (
              <View
                style={{
                  marginVertical: 10,
                  paddingVertical: 12,
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <View style={{ marginHorizontal: 10 }}>
                  <Button
                    onPress={handelPhotograph}
                    labelStyle={{ color: "#fff" }}
                    rippleColor={palette.icons}
                    style={{
                      backgroundColor: palette.primary,
                      width: width * 0.3,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins-Medium",
                        fontSize: 15,
                      }}
                    >
                      <Ionicons name="camera" size={16} /> Foto
                    </Text>
                  </Button>
                </View>
                <View style={{ marginHorizontal: 10 }}>
                  <Button
                    onPress={choosePhoto}
                    labelStyle={{ color: "#fff" }}
                    rippleColor={palette.icons}
                    style={{
                      backgroundColor: palette.primary,
                      width: width * 0.3,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins-Medium",
                        fontSize: 15,
                      }}
                    >
                      <Ionicons name="albums-outline" size={16} /> Galería
                    </Text>
                  </Button>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};
