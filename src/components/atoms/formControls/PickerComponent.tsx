import React, { useState } from "react";
import {
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { TextInput, IconButton, List, Searchbar } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";

import { Ionicons } from "@expo/vector-icons";
import states from "../../../utils/Data";

const PickerComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredEstados, setFilteredEstados] = useState(states);
  const [searchQuery, setSearchQuery] = useState("");

  const { control, setValue } = useForm();

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filteredData = states.filter((state) =>
        state.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEstados(filteredData);
    } else {
      setFilteredEstados(states);
    }
  };

  const onStatePress = (state) => {
    setValue("estado", state.nombre);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="estado"
        render={({ field: { value, onChange } }) => (
          <TextInput
            label="Estado"
            value={value}
            onChangeText={onChange}
            right={
              <TextInput.Icon
                icon={() => (
                  <Ionicons name="chevron-down" size={22} color="#c1c1c1" />
                )}
                onPress={() => setModalVisible(true)}
              />
            }
          />
        )}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Searchbar
            placeholder="Buscar estado"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchbar}
          />
          <FlatList
            data={filteredEstados}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <List.Item title={item.name} onPress={() => onStatePress(item)} />
            )}
          />
          <IconButton
            icon="close"
            size={30}
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  modalContent: {
    flex: 1,
    paddingTop: 20,
  },
  searchbar: {
    marginHorizontal: 16,
    marginBottom: 10,
  },
  closeButton: {
    alignSelf: "center",
    marginTop: 20,
  },
});

export default PickerComponent;
