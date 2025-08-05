import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { setLanguage } from "../store/slices/langaugeSlice";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useTranslate } from "../hooks/useTranslate";
const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setModalVisible(false);
    const selectedlang = language;

    if (selectedlang == "Hindi") {
      dispatch(setLanguage("hi"));
    } else {
      dispatch(setLanguage("en"));
    }
    // You can pass `language` to a parent component or store if needed
  };

  return (
    <View style={styles.container}>
      {/* Language Selection Button */}
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginLeft: -10, fontSize: 16 }}>
            {useTranslate("Select Langauge")}
          </Text>
          <Text style={styles.languageText}>
            {useTranslate(selectedLanguage)}
          </Text>
        </View>

        <AntDesign
          name="right"
          size={20}
          color="gray"
          style={{ marginRight: -10 }}
        />
      </TouchableOpacity>
      <View
        style={{ height: 1, backgroundColor: "#ccc", marginVertical: 10 }}
      />

      {/* Modal for Language Options */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Language</Text>
          <TouchableOpacity
            style={styles.modalItem}
            onPress={() => handleLanguageSelect("English")}
          >
            <Text style={styles.modalText}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalItem}
            onPress={() => handleLanguageSelect("Hindi")}
          >
            <Text style={styles.modalText}>Hindi</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
export default LanguageSelector;
const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    marginVertical: 10,
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 5,
    // backgroundColor: '#f0f0f0',
  },
  languageText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
  },
});
