import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  Image,
} from "react-native";
import TopHeader from "../../../components/TopHeader";

const Contact = () => {
  return (
    <>
      <TopHeader showBack={true} title={"Contact Us"} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>We're Here to Help</Text>
        <Text style={styles.boldText}>
          Reach out to the HuHaHo team — we're just a message away.
        </Text>

        {/* Contact Information */}
        <View style={styles.contactInfoContainer}>
          <Text style={styles.contactName}>Phone Number:</Text>
          <Text style={styles.contactDetails}>93112 25400</Text>
        </View>

        <View style={styles.contactInfoContainer}>
          <Text style={styles.contactName}>Email Address:</Text>

          <Text
            style={[styles.link, { marginTop: 0, fontSize: 18 }]}
            onPress={() => Linking.openURL("mailto:admin@huhaho.com")}
          >
            admin@huhaho.com
          </Text>
        </View>

        <View style={{}}>
          <Text style={styles.contactName}>Office Address:</Text>
          <Text style={styles.contactDetails}>
            🇮🇳 Plot No. 29, Shivaji Marg, Moti Nagar, New Delhi-110015.
          </Text>
          <Text style={styles.contactDetails}>
            🇦🇺 Unit 1/191 Scoresby Road, Boronia, Victoria 3155, Australia
          </Text>
        </View>

        <Text style={[styles.connectText, { marginTop: 50 }]}>
          {"Connect with us"}
        </Text>

        <View style={styles.iconRow}>
          <TouchableOpacity
            onPress={() => Linking.openURL(socialLinks.instagram)}
          >
            <Image
              source={require("../../../assets/logoInsta2.png")}
              style={{ width: 40, height: 40, marginHorizontal: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL(socialLinks.facebook)}
          >
            <Image
              source={require("../../../assets/fb.png")}
              style={{
                width: 30,
                height: 30,
                marginHorizontal: 10,
                marginTop: 5,
              }}
            />
            {/* <FontAwesome name="facebook" size={20} color="#3b5998" /> */}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL(socialLinks.linkedin)}
          >
            <Image
              source={require("../../../assets/ll.png")}
              style={{
                width: 30,
                height: 30,
                marginHorizontal: 10,
                marginTop: 5,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL(socialLinks.youtube)}
          >
            <Image
              source={require("../../../assets/logo-ut.png")}
              style={{
                width: 40,
                height: 40,
                marginHorizontal: 10,
              }}
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.connectText, { marginTop: 40 }]}>Our Website</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://www.huhaho.com")}
        >
          <Text
            style={[
              styles.connectText,
              { color: "blue", textDecorationLine: "underline" },
            ]}
          >
            www.huhaho.com
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  sectionTitle: {
    fontSize: 26,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  boldText: {
    fontSize: 20,
    color: "#555",
    fontWeight: "500",
    marginBottom: 20,
    textAlign: "center",
  },
  contactInfoContainer: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
  },
  contactName: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
  contactDetails: {
    fontSize: 18,
    color: "#555",
    marginVertical: 3,
    marginLeft: 10,
  },
  link: {
    color: "#007bff",
    textDecorationLine: "underline",
    marginLeft: 10,
  },
  image: {
    width: 220,
    height: 220,
    resizeMode: "contain",
    // marginBottom: 20,
    marginTop: -20,
  },
  textContainer: {
    alignItems: "center",
    marginTop: -10,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
    textAlign: "center",
  },
  connectSection: {
    alignItems: "center",
    marginTop: 40,
  },
  connectText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#333",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
    marginTop: 10,
  },
});

export default Contact;
