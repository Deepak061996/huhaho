import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
  TouchableOpacity,
  Pressable,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Rupees from "react-native-vector-icons/FontAwesome";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslate } from "../../hooks/useTranslate";
import useDetails from "../../hooks/useDetail";
import Loader from "../../components/Loader";
import { clearUser } from "../../store/slices/userSlices";
import CancelConfirmationModal from "../../components/CancelAppointModal";

const { width } = Dimensions.get("window");

const Appointment = () => {
  const navigation = useNavigation();
  const { bookingHistory, isLoading, keeploginOut, CancelAppointment } =
    useDetails();
  const dispatch = useDispatch();
  const isfocused = useIsFocused();
  const { userInfo } = useSelector(({ user }) => user);
  const userID = userInfo?.data?.id;
  const guestType = useSelector((state) => state?.user?.userTypeGuest);
  const [userData, setUserData] = useState([]);
  const [appointmentId, setAppointmentId] = useState(null);
  const [details, setDetails] = useState(null);
  console.log(userData, "askjdfkashdfjkhsdfjhsdkf");

  const [visibleModal, setVisibleModal] = useState(false);

  const headingText = useTranslate("My Booked Appointment");
  const noAppointmentText = useTranslate("No booked appointments");



  const fetchData = async () => {
    try {
      //userID 5
      const response = await bookingHistory({ user_id: userID });
      if (response) {
        setUserData(response.data);
        console.log(response, "sjdfsdfsjflksjdf");
      } else {
        setUserData([]);
      }
    } catch (error) {
      console.error("Error fetching booking history:", error);
      setUserData([]);
    //  dispatch(clearUser());
    }
  };

  useEffect(() => {
    if (userID) {
      fetchData();
      checkUserStatus();
    }
  }, [userID, isfocused]);

  const checkUserStatus = async (id) => {
    if (!userID) {
      console.log("User ID is not available. Cannot make the API call.");
      return; // Stop if user ID is undefined
    }

    console.log(userID, "payload of this data111");

    try {
      const response = await keeploginOut({ user_id: userID });
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
      <Text style={styles.heading}>{headingText}</Text>
      <Loader visible={isLoading} />
      <FlatList
        data={guestType ? [] : userData}
        keyExtractor={(item, index) =>
          item.booking_id?.toString() || index.toString()
        }
        renderItem={({ item, index }) => (
          <AppointmentCard
            item={item}
            index={index}
            setVisibleModal={setVisibleModal}
            setAppointmentId={setAppointmentId}
            setDetails={setDetails}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.noDataText}>{noAppointmentText}</Text>
        }
        showsVerticalScrollIndicator={false}
      />

      <CancelConfirmationModal
        visible={visibleModal}
        onCancel={() => setVisibleModal(false)}
        appointmentId={appointmentId}
        onSuccess={() => {
          fetchData();
        }}
        details={details}
        // setDetails={setDetails}
      />
    </View>
  );
};

const AppointmentCard = ({
  item,
  index,
  setVisibleModal,
  setAppointmentId,
  appointmentId,
  details,
  setDetails,
}) => {
  const translatedTitle = useTranslate(item.itemName);
  const atText = useTranslate("at");
  const bookedText = useTranslate("");

  

  const cardBackground = index % 2 === 1 ? "#eee" : "#ffffff";
  //item.itemName ? translatedTitle : "Not available"
  //Green Life Cafe
  return (
    <View style={[styles.card, { backgroundColor: cardBackground }]}>
      <View style={styles.cardRow}>
        <Image
          source={{ uri: item.image || "https://via.placeholder.com/100" }}
          style={styles.cardImage}
        />
        <View style={styles.cardContent}>
          <View style={styles.headerRow}>
            <FontAwesome5 name="calendar-check" size={18} color="#FF914D" />
            <Text style={styles.title}>
              { item.itemName ? translatedTitle : "Not available"}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="event" size={18} color="#FF914D" />
            <Text style={styles.infoText}>
              {item.booking_date ?? "Not available"} {atText}{" "}
              {item.booking_time}
            </Text>
          </View>

          {item?.booking_type == 'cafe' && (
          <View style={styles.infoRow}>
            <MaterialIcons name="event" size={18} color="#FF914D" />
            <Text style={styles.infoText}>
              {"Table for "+item?.sitting+ " person"}
            </Text>
          </View>
            )}

            {item?.booking_type != 'cafe' && (
          <View
            style={{
              // width: Dimensions.get('screen').width / 2.1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 10, // optional for left/right spacing
              // backgroundColor: 'red',
            }}  >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Rupees name="rupee" color="#FF914D" size={18} />
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  fontWeight: "500",
                  marginLeft: 4,
                }}
              >
                {item?.amount}
              </Text>
            </View>
            {item?.booking_status == "1" && (
              <Pressable
                style={[
                  styles.statusBadge,
                  { backgroundColor: "gray", marginRight: 8 },
                ]}
              >
                <Text style={styles.statusText}>
                  {item?.booking_status == "1" && "Booked"}
                </Text>
              </Pressable>
            )}
            <TouchableOpacity
              disabled={
                item?.booking_status === 2 || item?.booking_status === 3
              }
              style={{
                backgroundColor: "#FF914D",
                alignSelf: "flex-start",
                paddingVertical: 4,
                paddingHorizontal: 12,
                borderRadius: 20,
                marginRight: 20,
              }}
              onPress={() => {
                setVisibleModal(true),
                  setAppointmentId(item?.id),
                  setDetails(item);
                if (!appointmentId) setVisibleModal(true);
              }}
            >
              <Text style={styles.statusText}>
                {item?.booking_status === 1
                  ? "Cancel"
                  : item?.booking_status === 2
                  ? "Cancelation initiate"
                  : item?.booking_status === 3
                  ? "Cancelled"
                  : ""}
              </Text>
            </TouchableOpacity>
          </View>
             )} 
        </View>
      </View>
    </View>
  );
};

function formatTimeTo12Hour(time24) {
  const [hourStr, minuteStr] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr;
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${minute} ${ampm}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    padding: 16,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  noDataText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#999",
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    width: width - 32,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    // width: Dimensions.get('screen').width / 1.1,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 16,
    backgroundColor: "#eee",
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 10,
    color: "#333",
    flexShrink: 1,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 15,
    marginLeft: 10,
    color: "#555",
    flexShrink: 1,
  },
  statusBadge: {
    backgroundColor: "#FF914D",
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginLeft: 15,
  },
  statusText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
});

export default Appointment;
