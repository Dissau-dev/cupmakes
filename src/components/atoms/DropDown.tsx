import React, {useEffect, useState} from "react";
import {FlatList, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {Ionicons} from "@expo/vector-icons";

import {ActivityIndicator, RadioButton} from "react-native-paper";
import {globals} from "../../theme/styles/global";
import Layout from "../../utils/Layout";
import {lightTheme} from "../../theme/colors";

export interface PickerItem {
    label: string;
    value: string;
}

interface Props {
    label: string;
    data: any;
    value: any;
    onChangeValue: Function;

    icon?: any;
    isLoading?: boolean;
    isSearchable?: boolean;
    size?: "large" | "small";
    error?: any;
    refChild?: any;
    titleInModal?: string;

    actionAtSelected?: Function;
    disabled?: boolean;
}

export const Dropdown = ({
                             icon,
                             label,
                             data,
                             value,
                             onChangeValue,
                             isLoading,
                             isSearchable = true,
                             error,
                             refChild,
                             actionAtSelected,
                             disabled,
                             titleInModal,
                         }: Props) => {
    const theme = lightTheme;

    //Modal
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    //Search bar
    const [textValue, setTextValue] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const onTextChange = (text: string) => {
        setIsSearching(true);
        setTextValue(text);
        setDataStore(
            data.filter((item: any) =>
                item.label.toLowerCase().includes(text.toLowerCase())
            )
        );
    };

    //Content
    const [dataStore, setDataStore] = useState([]);
    useEffect(() => {
        setDataStore(data);
    }, [data]);

    const onCheckedValue = (itemValue: string) => {
        onChangeValue(itemValue);
        hideModal();
    };

    const renderItem = ({item}: { item: PickerItem }) => (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                paddingEnd: 25,
            }}
        >
            <RadioButton
                value={item.value}
                color={"#ccc"}
                status={value === item.value ? "checked" : "unchecked"}
                onPress={() => {
                    onCheckedValue(item.value);
                    actionAtSelected && actionAtSelected();
                }}
            />
            <TouchableOpacity
                onPress={() => {
                    onCheckedValue(item.value);
                    actionAtSelected && actionAtSelected();
                }}
            >
                <Text
                    style={[
                        value === item.value
                            ? styles.h6Medium
                            : styles.h6Light,
                    ]}
                >
                    {item.label}
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View
            style={{
                flexDirection: "row",
                width: "100%",
            }}
        >
            <View style={{width: "100%", alignItems: "center"}}>
                {/* Visual component */}
                <TouchableOpacity
                    activeOpacity={disabled ? 1 : 0.6}
                    onPress={disabled ? () => {
                    } : showModal}
                    style={{width: "100%", alignItems: "center"}}
                >
                    <View
                        style={[
                            visible
                                ? {borderColor: theme.colors.primary}
                                : {borderColor: "#ccc"},
                            {
                                width: "100%",
                                marginVertical: 8,
                                borderWidth: 1,
                                borderRadius: 50,
                            },
                        ]}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginHorizontal: 16,
                                marginVertical: 6.9,
                            }}
                        >
                            {icon && (
                                <Ionicons
                                    name={icon}
                                    size={23}
                                    style={[
                                        {
                                            marginEnd: 5,
                                        },
                                        disabled && {opacity: 0.4},
                                    ]}
                                />
                            )}
                            <TextInput
                                placeholder={label}
                                style={{
                                    flex: 1,
                                    marginStart: 8,
                                    fontSize: 16,
                                    // fontFamily:
                                    //     Platform.OS === "android"
                                    //         ? "poppins-300"
                                    //         : "sf-300",
                                    textAlignVertical: "center",
                                    color: "black",
                                }}
                                value={
                                    (value &&
                                        data?.find(
                                            (item: any) => item.value === value
                                        )?.label) ?? label
                                }
                                onFocus={showModal}
                                onBlur={hideModal}
                                editable={false}
                                ref={refChild}
                            />
                            {error && (
                                <Ionicons
                                    name="alert-circle-outline"
                                    size={23}
                                    color={"red"}
                                />
                            )}
                            <Ionicons
                                name="chevron-down-outline"
                                size={23}
                                style={[disabled && {opacity: 0.4}]}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                {!!error && (
                    <Text
                        style={[
                            {
                                color: "red",
                                marginStart: 5,
                                alignSelf: "flex-start",
                            },
                        ]}
                    >
                        {error}
                    </Text>
                )}

                {/* TODO: Pending to do */}
                {isLoading && <ActivityIndicator color={theme.colors.primary}/>}

                {/* Modal component */}
                <Modal
                    visible={visible}
                    onDismiss={hideModal}
                    onRequestClose={hideModal}
                    transparent={true}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(0, 0, 0, 0.65)",
                        }}
                    >
                        <View
                            style={{
                                padding: 20,
                                paddingHorizontal: 30,
                                borderRadius: 10,
                                backgroundColor: "white",
                                height: Layout.window.height * 0.6,
                                width: Layout.window.width * 0.8,
                            }}
                        >
                            {/* Search bar */}
                            {isSearchable && (
                                <View
                                    style={[
                                        styles.textBackground,
                                        {marginHorizontal: -15},
                                    ]}
                                >
                                    <TextInput
                                        placeholder="Buscar..."
                                        style={{
                                            ...styles.textInput,
                                            top: Platform.OS === "ios" ? 0 : 2,
                                        }}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        value={textValue}
                                        onChangeText={onTextChange}
                                    />
                                    <Ionicons
                                        name="search-outline"
                                        color="grey"
                                        size={24}
                                    />
                                </View>
                            )}

                            {/* Content */}
                            {isSearching && dataStore.length === 0 ? (
                                <View
                                    style={{
                                        alignItems: "center",
                                    }}
                                >
                                    <View
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginHorizontal: 50,
                                        }}
                                    >
                                        <Text style={styles.title}>
                                            No hay resultados que mostrar
                                        </Text>
                                    </View>
                                </View>
                            ) : (
                                <View style={{flex: 1}}>
                                    <Text
                                        style={[
                                            styles.h6Medium,
                                            {marginVertical: 10},
                                        ]}
                                    >
                                        {titleInModal
                                            ? titleInModal
                                            : `Seleccione una opción`}
                                    </Text>
                                    <FlatList
                                        data={dataStore}
                                        renderItem={renderItem}
                                        keyExtractor={item => item.value}
                                    />
                                </View>
                            )}
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(0,0,0,0.1)",
        marginStart: 45,
        marginVertical: Platform.OS === "ios" ? 15 : 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 55,
        marginTop: 1,
    },
    h6Medium: {
        fontSize: Platform.OS === "ios" ? 16 : 14,
        fontFamily: Platform.OS === "android" ? "poppins-medium" : "sf-medium",
    },
    h6Light: {
        fontSize: Platform.OS === "ios" ? 16 : 14,
        fontFamily: Platform.OS === "android" ? "poppins-300" : "sf-300",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    address: {
        fontSize: 18,
        width: "100%",
        paddingEnd: 10,
    },
    textBackground: {
        backgroundColor: "#F3F1F3",
        borderRadius: 50,
        height: 40,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

        marginBottom: 16,
        marginTop: 8,
    },
    textInput: {
        flex: 1,
        fontSize: 18,
    },
    title: {
        marginVertical: 16,
        fontSize: 16,
        opacity: 0.9,
        fontWeight: "bold",
        textAlign: "center",
    },
});
