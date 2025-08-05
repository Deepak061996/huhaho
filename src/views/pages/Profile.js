import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
  Platform,
  PermissionsAndroid,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import CustomModal from "../../components/CustomModal";
import Constent, { KEYS, imageBase } from "../../config/Constent";
import LanguageSelector from "../../components/LanguageSelector";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";

import { clearUser } from "../../store/slices/userSlices";
import { useDispatch, useSelector } from "react-redux";
import useDetails from "../../hooks/useDetail";
import Loader from "../../components/Loader";
import { useTranslate } from "../../hooks/useTranslate"; // <--- Import hook
// import {Switch} from 'react-native-paper';
import SwitchToggle from "react-native-switch-toggle";
import Geolocation from "react-native-geolocation-service";
import { showSuccessToast } from "../../config/Toast";
import { useToast } from "react-native-toast-notifications";

const Profile = () => {
  const toast = useToast();
  const isfocused = useIsFocused();
  const { userInfo } = useSelector(({ user }) => user);
  const guestType = useSelector((state) => state?.user?.userTypeGuest);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  //
  const [location, setLocation] = useState(null);
  console.log(guestType, "************************");
  //
  const {
    getDetails,
    isLoading,
    delateAccount,
    notifications,
    getNotificationToggle,
    keeploginOut,
  } = useDetails();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDeleteAccount, setDeleteAccount] = useState(false);
  const [details, setDetails] = useState({});
  console.log(details, "detailsss");

  // Translations
  const tMyProfile = useTranslate("My Profile");
  const tAboutUs = useTranslate("About Us");
  const tPrivacyPolicy = useTranslate("Privacy Policy");
  const tTremsCondtion = useTranslate("Terms & Conditions");
  const tDeleteAccount = useTranslate("Delete Account");
  const tLogout = useTranslate("Logout");
  const tLogoutConfirm = useTranslate("Are you sure you want to logout?");
  const tDeleteConfirm = useTranslate(
    "Are you sure you want to delete account?"
  );
  const tGuestUser = useTranslate("Guest user");
  const [switchOn, setSwitchOn] = useState(false);

  const handleLogout = () => {
    setModalVisible(false);
    dispatch(clearUser());
  };

  const handlDelete = () => {
    setDeleteAccount(false);
    handleDeleteAccount();
  };

  const fetchUserDetails = async () => {
    try {
      const response = await getDetails({
        user_id: userInfo?.data?.id,
      });
      if (response) {
        setDetails(response?.data);
        dispatch.setUserInfo(response?.data)

        console.log(response, "shdkfjhasdfsgjdfdsf");
      }
    } catch (error) {
      // dispatch(clearUser());
      console.log(error, "log error data");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userInfo?.data?.id, navigation, isfocused]);

  // for get lat long

  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      return result === RESULTS.GRANTED;
    }
  };

  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleToggle = async () => {
    const newStatus = !switchOn;
    setSwitchOn(newStatus); // Update UI first
    await toggleNotification(newStatus); // Then hit the API
  };

  const toggleNotification = async (status) => {
    try {
      const response = await notifications({
        user_id: userInfo?.data?.id,
        notification_status: status ? "1" : "0",
      });

      if (response) {
        console.log(response, "respone of this");
        if (status) {
          showSuccessToast(toast, "Notification enabled");
        } else {
          showSuccessToast(toast, "Notification disabled");
        }
      } else {
        console.log("Failed to update notification status");
      }
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await delateAccount({ user_id: userInfo?.data?.id });
      if (response) {
        dispatch(clearUser());
      }
    } catch (error) {
      console.log("Error deleting account:", error);
    }
  };

  useEffect(() => {
    fetchNotification();
    checkUserStatus();
  }, []);

  const fetchNotification = async () => {
    try {
      const response = await getNotificationToggle({
        user_id: userInfo?.data?.id,
      });

      if (response) {
        // setSwitchOn(response.data.notification_status === '1'); // or === true depending on backend
        console.log("Notification status fetched:", response?.status);
        setSwitchOn(response?.status);
      } else {
        console.log("Failed to fetch notification status");
      }
    } catch (error) {
      console.error("Error fetching notification status:", error);
    }
  };

  //

  const checkUserStatus = async () => {
    if (!userInfo?.data?.id) {
      console.log("User ID is not available. Cannot make the API call.");
      return; // Stop if user ID is undefined
    }

    console.log(userInfo?.data?.id, "payload of this datasdsdf");

    try {
      const response = await keeploginOut({ user_id: userInfo?.data?.id });
      console.log(response, "response of exist user");

      if (response.data.force_logout === true) {
        // Show alert pop-up with a 3-second timer
        Alert.alert(
          "Account Suspended",
          "Your account has been Suspended by the admin.",
          [
            {
              text: "OK",
              onPress: () => {
                // console.log('User acknowledged account deletion');
                setTimeout(async () => {
                  // navigation.navigate('Login');
                  dispatch(clearUser());
                  console.log("User logged out after account suspended.");
                }, 3000); // 3-second timer before logout
              },
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error("Error checking user status:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Loader visible={isLoading} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {[
          { label: tMyProfile, screen: "UserProfile" },

          { label: tPrivacyPolicy, screen: "PrivacyPolicy" },
          { label: tTremsCondtion, screen: "TermsCond" },
        ]
          .filter((item) => !(guestType && item.label === tMyProfile))
          .map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => details && navigation.navigate(item.screen)}
            >
              <Text style={styles.menuText}>{item.label}</Text>
              <AntDesign name="right" size={20} color="gray" />
            </TouchableOpacity>
          ))}
        {guestType == false && (
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setDeleteAccount(true)}
          >
            <Text style={styles.menuText}>{tDeleteAccount}</Text>
            <AntDesign name="right" size={20} color="gray" />
          </TouchableOpacity>
        )}
        <LanguageSelector />
        {!guestType && (
          <View style={[styles.menuItem, { marginTop: -10 }]}>
            <Text style={{ fontSize: 16, color: "black" }}>Notifications</Text>
            <SwitchToggle
              switchOn={switchOn}
              onPress={handleToggle}
              circleColorOff="#f4f3f4"
              circleColorOn="#fff"
              backgroundColorOn="#E18A5E"
              backgroundColorOff="#ccc"
              containerStyle={{
                width: 60,
                height: 30,
                borderRadius: 25,
                padding: 5,
              }}
              circleStyle={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: "white",
              }}
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.menuText}>{tLogout}</Text>
          <AntDesign name="right" size={20} color="gray" />
        </TouchableOpacity>

        <CustomModal
          visible={isModalVisible}
          title={tLogoutConfirm}
          onConfirm={handleLogout}
          onCancel={() => setModalVisible(false)}
        />

        <CustomModal
          visible={isDeleteAccount}
          title={tDeleteConfirm}
          onConfirm={handlDelete}
          onCancel={() => setDeleteAccount(false)}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 10,
  },
  menuText: {
    fontSize: 16,
  },
});

export default Profile;
