
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, FlatList } from 'react-native';
import TopHeader from '../../../components/TopHeader';
import { useTranslate } from '../../../hooks/useTranslate'; // Ensure this is imported
import Icon from 'react-native-vector-icons/Feather'; // npm install react-native-vector-icons
import CalendarMonth from '../../../components/CalendarMonth';
import axios from 'axios';
import { baseURL } from '../../../config/Constent';
import Loader from '../../../components/Loader';
import SuccessPopup from '../../../components/SuccessPopup';
import { useToast } from 'react-native-toast-notifications';
import { showWarningToast } from '../../../config/Toast';
import { useSelector } from "react-redux";
import useCommon from '../../../hooks/useCommon';


const Cafe = ({ route }) => {
  const { type } = route.params ?? {};  // props se type le liya
  const today = new Date();
  const formattedToday = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
  const [selectedDate, setSelectedDate] = useState(formattedToday);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [guestCount, setGuestCount] = useState(1);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cafeData, setCafeData] = useState(null);
  const [slots, setSlots] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const toast = useToast();
  const { userInfo } = useSelector(({ user }) => user);
  const { getProducts, getProductsLoading ,getcafe,getcafeLoading} = useCommon();

  const [expandedItems, setExpandedItems] = useState({});

  const [selectedDateObj, setSelectedDateObj] = useState(null);

  const [seeMoreMap, setSeeMoreMap] = useState({});

  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);

  


  // const {getProducts} = useCommon();
  const menuCardUrl = cafeData?.menu_card ?? ''//'https://www.orimi.com/pdf-test.pdf'; // ya image url
  //const isPdf = menuCardUrl.toLowerCase().endsWith('.pdf'); // true if it's a PDF
  const handleIncrement = () => {
    if (guestCount < 10) setGuestCount(guestCount + 1);
  };

  const handleDecrement = () => {
    if (guestCount > 1) setGuestCount(guestCount - 1);
  };

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleTextLayout = (e) => {
    if (!e?.nativeEvent?.lines) return;
    setShowReadMore(e.nativeEvent.lines.length > 2);
  };



  useEffect(() => {
    console.log("Type Changed =>", type);
    console.log("Cafe =>")
    
    if (type === "cafe") {
      const fetchCafeData = async () => {
        try {
          setIsLoading(true);
          if (getcafe) {
            setIsLoading(false);
            console.log('Fetched Setting products from getProducts:', getcafe);
            if (getcafe?.success) {
        const data = getcafe.data;
        setCafeData(data.cafeData[0]);  // single cafe
        setSlots(data.slots || []);
      //  setTables(data.table || []);
        setAvailableSlots(
          (data.slots || []).map(slot => {
            const start = formatTimeTo12Hour(slot.start_time);
            const end = formatTimeTo12Hour(slot.end_time);
            return `${start} - ${end}`;
          })
        );

      } else {
        showWarningToast(toast, response?.data?.message);
      }
    }
        } catch (error) {
          console.log("error dfsdfsf",error.message)
        }finally {
          setIsLoading(false);
        }
       
      }
      fetchCafeData()
    }
    if (type == 'product') {
      try {
        setIsLoading(true);
        if (getProducts) {
          setIsLoading(false);
          console.log('Fetched Setting products from getProducts:', getProducts);
          setProducts(getProducts);
        }
      }catch(error){
        console.log("error dfsdfsf",error.message)
      }finally {
        setIsLoading(false);
      }
     
    }

  }, [type,getProducts,getcafe,isLoading]);
  //slots,products

  // API Call
  const fetchProducts = async () => {
    try {
      console.log('Cafe =>', "run");
      const response = await axios.get(baseURL + 'get_products');
      console.log('Cafe =>', response?.data?.data);
      if (response.data?.success) {
        setProducts(response.data?.data);
      } else {
        showWarningToast(toast, response?.data?.message);
      }
    } catch (error) {
      // if (!(error instanceof Error)) {
      //   error = new Error(typeof error === "string" ? error : JSON.stringify(error));
      // }
      // console.log("Caught error in Cafe:", error.stack);  // safe
      // if (error?.response?.status === 429) {
      //   showWarningToast(toast, "Too many requests, please try again after some time.");
      // } else {
      //   showWarningToast(toast, "Something went wrong, please try again.");
      // }
      console.log(error, "api error fetchProducts");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCafeData = async () => {
    try {
      console.log('Cafe =>', "run");
      const response = await axios.get(baseURL + "get_cafe_details");
      console.log("Cafe =>", response);
      if (response.data?.success) {
        const data = response.data.data;
        setCafeData(data.cafeData[0]);  // single cafe
        setSlots(data.slots || []);
      //  setTables(data.table || []);
        setAvailableSlots(
          (data.slots || []).map(slot => {
            const start = formatTimeTo12Hour(slot.start_time);
            const end = formatTimeTo12Hour(slot.end_time);
            return `${start} - ${end}`;
          })
        );

      } else {
        showWarningToast(toast, response?.data?.message);
      }
    } catch (error) {
      // if (!(error instanceof Error)) {
      //   error = new Error(typeof error === "string" ? error : JSON.stringify(error));
      // }
      // console.log("Caught error in Cafe:", error.stack);  // safe
      // if (error?.response?.status === 429) {
      //   showWarningToast(toast,"Too many requests, please try again after some time.");
      // } else {
      //   showWarningToast(toast,"Something went wrong, please try again.");
      // }
      console.log(error, "api error get_cafe_details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBooking = async () => {
    console.log("Cafe error", "okkk");
    try {
      if (!selectedSlot) {
        showWarningToast(toast, 'Please select a slot.');
        return;
      }
      setIsLoading(true);   // start loader
      const formattedBookingDate = selectedDate.split("/").reverse().join("-");

      const formData = new FormData();
      formData.append("user_id", userInfo?.data?.id,);
      formData.append("booking_date", formattedBookingDate);
      formData.append("booking_time", convertTo24HourRange(selectedSlot));
      formData.append("no_of_people", guestCount);

      console.log("Cafe booking formData", formData);

      const response = await axios.post(
        baseURL + 'cafe_table_booking',
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data?.success) {
        console.log("Cafe booking formData", response.data);
        setModalMessage('Booking successful!');
        setIsModalVisible(true);
      } else {
        //setModalMessage(response?.data?.message || "Booking failed");
       // setIsModalVisible(true);
       showWarningToast(toast, response?.data?.message || "Booking failed");

      }
    } catch (error) {
      if (!(error instanceof Error)) {
        error = new Error(typeof error === "string" ? error : JSON.stringify(error));
      }
      console.log("Caught error in Cafe:", error.stack);  // safe
      if (error?.response?.status === 429) {
        showWarningToast(toast, "Too many requests, please try again after some time.");
      } else {
        showWarningToast(toast, "Something went wrong, please try again.");
      }

    } finally {
      setIsLoading(false);    // stop loader
    }
  };
  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  function convertTo24HourRange(timeRange) {
    const [startTime, endTime] = timeRange.split(" - ");
  
    const convert = (time12) => {
      let [time, modifier] = time12.trim().split(" ");
      let [hours, minutes] = time.split(":").map(Number);
  
      if (modifier === "PM" && hours !== 12) {
        hours += 12;
      }
      if (modifier === "AM" && hours === 12) {
        hours = 0;
      }
  
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`;
    };
  
    return `${convert(startTime)}-${convert(endTime)}`;
  }
  
  function formatTimeTo12Hour(time24) {
    const [hourStr, minuteStr] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr;
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    if (hour === 0) hour = 12;
    return `${hour}:${minute} ${ampm}`;
  };
  const renderItem = ({ item }) => {
    const isExpanded = expandedItems[item.id] === true;
    const maxChars = 100;
  const shouldTruncate = item.description.length > maxChars;
const visibleText = isExpanded
  ? item.description
  : item.description.slice(0, maxChars);
const toggleText = shouldTruncate
  ? isExpanded
    ? ' Read less'
    : ' Read more'
  : '';


    return (
      <View style={styles.card}>
        {/* Thumbnail */}
        <Image source={{ uri: item.product_image }} style={styles.image} />

        {/* Product Name */}
        <Text style={styles.heading}>{item.product_name}</Text>

        {/* Description */}
        {/* <Text style={styles.paragraph} numberOfLines={4}>
      {item.description}
    </Text> */}

        {/* <View style={{ padding: 5, marginBottom: 5, flexDirection: "row" }}>
          <Text numberOfLines={isTruncated ? 2 : Number.MAX_SAFE_INTEGER}
           onTextLayout={(e) => {
            const lines = e.nativeEvent.lines;
            if (lines.length > 3 && !seeMoreMap[item.id]) {
              setSeeMoreMap(prev => ({ ...prev, [item.id]: true }));
            }
          }}
            style={{ flex: 1, color: "#555", textAlign: "justify" }}>
            {item.description}
            {
              !isTruncated && (
                <Text onPress={() => toggleExpand(item.id)} style={{ color: '#E18A5E' }}>
                  Read less
                </Text>
              )
            }
          </Text>
          {
            isTruncated && seeMoreMap[item.id] && <Text onPress={() => toggleExpand(item.id)} style={{ color: '#E18A5E', marginTop: 20 }}>
              Read more
            </Text>
          }
        </View> */}

        <View style={{ padding: 5, marginBottom: 5, flexDirection: "row" }}>
  <Text style={{ flex: 1, color: "#555", textAlign: "justify" }}>
    {visibleText}
    {shouldTruncate && (
      <Text
        onPress={() => toggleExpand(item.id)}
        style={{ color: '#E18A5E' }}
      >
        {toggleText}
      </Text>
    )}
  </Text>
</View>


        {/* Price Box */}
        <View style={[
          styles.priceContainer,
          {
            width: 150, // Keep the width consistent
            borderRadius: 12, // Rounded corners
            paddingVertical: 8, // Vertical padding for spacing
            paddingHorizontal: 16, // Horizontal padding for better spacing
            shadowColor: '#000', // Light shadow for subtle depth
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2, // Slight shadow for Android
            marginTop: 5,
          },
        ]}>
          <Text style={[
            styles.sectionDescription,
            {
              fontWeight: 'bold',
              fontSize: 18,
              color: '#333', // Darker text for better contrast
            },
          ]}>
            {'Price'} : ₹{item.product_price}
          </Text>
        </View>
      </View>
    );
  }
  console.log('Cafe', menuCardUrl)
  const maxChars = 80; // Set your limit here

const isLongText = cafeData?.description.length > maxChars;
const isExpandedText = isExpanded || !isLongText;

const visibleText = isExpandedText
  ? cafeData?.description
  : cafeData?.description.slice(0, maxChars);

const toggleText = isLongText
  ? isExpandedText
    ? ' Read less'
    : ' Read more'
  : '';

 
  if (type === "cafe") {
    return (
      <>
        <View style={{ flex: 1 }}>
          <TopHeader showBack={true} title={useTranslate("Green Life Cafe")} />
          {/* loader */}
          <Loader visible={isLoading} />
          {cafeData && (
            <ScrollView contentContainerStyle={styles.container}>

              {/* Restaurant Image */}

              {cafeData?.image ? (
                <Image
                  source={{ uri: cafeData.image }}
                  style={styles.image}
                />
              ) : (
                <Image
                  source={require('../../../assets/cafe.jpg')}
                  style={styles.image}
                />
              )}

              {/* About the Restaurant */}

              <Text style={styles.headingwithoutspace}>About the Cafe</Text>

              

              {/* <View style={{ padding: 5, marginBottom: 5, flexDirection: "row" }}>
                                <Text
                                  onTextLayout={handleTextLayout}
                                  numberOfLines={isExpanded ? undefined : 2}
                                  style={{ flex: 1, color: "#555", textAlign: "justify" }}
                                >
                                  {cafeData.description}
                                  {isExpanded && (
                                    <Text
                                      onPress={() => setIsExpanded(false)}
                                      style={{ color: '#E18A5E' }}
                                    >
                                      {' Read less'}
                                    </Text>
                                  )}
                                </Text>

                {!isExpanded && showReadMore && (
                  <Text
                    onPress={() => setIsExpanded(true)}
                    style={{ color: '#E18A5E', marginTop: 20 }}
                  >
                    Read more
                  </Text>
                )}
              </View> */}

              <View style={{ padding: 5, marginBottom: 5, flexDirection: "row" }}>
  <Text style={{ flex: 1, color: "#555", textAlign: "justify" }}>
    {visibleText}
    {isLongText && (
      <Text
        onPress={() => setIsExpanded(prev => !prev)}
        style={{ color: '#E18A5E' }}
      >
        {toggleText}
      </Text>
    )}
  </Text>
</View>




              {/* Menu Card */}
              {/* menuCardUrl.split('/').pop() */}
              <Text style={styles.headingwithoutspace}>Menu Card</Text>
              <View style={styles.menuCardContainer}>
                <View style={styles.menuCardInfo}>
                  <Icon name="file-text" size={20} color="#555" />
                  <Text style={styles.menuText}>  {menuCardUrl ?  "Menu": "No menu available"}</Text>
                </View>
                {menuCardUrl && (
                  <TouchableOpacity
                    style={styles.viewButton}
                    onPress={() => Linking.openURL(menuCardUrl)}
                  >
                    <Text style={styles.viewButtonText}>View</Text>
                  </TouchableOpacity>
                )}

              </View>


              <View style={styles.guestContainer}>
                <Text style={styles.heading}>No. of Person</Text>

                <View style={styles.counterContainer}>
                  <TouchableOpacity style={styles.counterButton} onPress={handleDecrement}>
                    <Text style={styles.counterButtonText}>-</Text>
                  </TouchableOpacity>

                  <View style={styles.counterValueBox}>
                    <Text style={styles.counterValueText}>{guestCount}</Text>
                  </View>

                  <TouchableOpacity style={styles.counterButton} onPress={handleIncrement}>
                    <Text style={styles.counterButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Table Availability */}
              <Text style={styles.headingwithoutspace}>Table Availability</Text>
              <View style={styles.bulletSection}>
                {
                  <CalendarMonth
                    getDateSelect={val => {
                      const selectedDate = new Date(val.year, val.month - 1, val.day); // JS months are 0-indexed
                      const today = new Date();
                      today.setHours(0, 0, 0, 0); // Remove time part for accurate comparison

                      // ✅ Save selected date object
                      setSelectedDateObj(selectedDate);

                      const formatted = `${val?.day
                        .toString()
                        .padStart(2, '0')}/${val?.month
                          .toString()
                          .padStart(2, '0')}/${val?.year}`;
                      setSelectedDate(formatted);
                      // manually static 3 slots
                      console.log("8888888", slots)
                      setAvailableSlots(
                        slots.map(slot => {
                          const start = formatTimeTo12Hour(slot.start_time);
                          const end = formatTimeTo12Hour(slot.end_time);
                          return `${start} - ${end}`;
                        })
                        // slots.map(slot => `${slot.start_time} - ${slot.end_time}`)
                      );
                    }}
                  />
                }
              </View>
              {/* Static slots below calendar */}
              {/* {availableSlots.length>0  && (
      <View style={styles.slotGrid}>
        {availableSlots.map((slot, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.slotButton,selectedSlot === slot && styles.selectedSlotButton]}
            onPress={() => {
              setSelectedSlot(slot)
            }}
          >
            <Text style={[styles.slotButtonText, selectedSlot === slot && styles.selectedSlotButtonText]}>{slot}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )} */}

              {availableSlots.length > 0 && (
                <View style={styles.slotGrid}>
                  {availableSlots.map((slot, index) => {
                    const now = new Date();
                    const isToday =
                      selectedDateObj &&
                      selectedDateObj.getFullYear() === now.getFullYear() &&
                      selectedDateObj.getMonth() === now.getMonth() &&
                      selectedDateObj.getDate() === now.getDate();

                    const isPastDate =
                      selectedDateObj && selectedDateObj < new Date().setHours(0, 0, 0, 0);

                    // Extract end time from slot like "10:00 AM - 12:00 PM"
                    const endTimeStr = slot.split(' - ')[1]; // "12:00 PM"
                    let [time, modifier] = endTimeStr.split(' '); // ["12:00", "PM"]
                    let [hours, minutes] = time.split(':').map(Number);

                    if (modifier === 'PM' && hours !== 12) hours += 12;
                    if (modifier === 'AM' && hours === 12) hours = 0;

                    const slotEnd = new Date(selectedDateObj);
                    slotEnd.setHours(hours, minutes, 0, 0);

                    const isPastSlot = isToday && slotEnd < now;

                    const shouldDisable = isPastDate || isPastSlot;

                    return (
                      <TouchableOpacity
                        key={index}
                        disabled={shouldDisable}
                        style={[
                          styles.slotButton,
                          selectedSlot === slot && styles.selectedSlotButton,
                          shouldDisable && { opacity: 0.5 },
                        ]}
                        onPress={() => {
                          if (!shouldDisable) setSelectedSlot(slot);
                        }}
                      >
                        <Text
                          style={[
                            styles.slotButtonText,
                            selectedSlot === slot && styles.selectedSlotButtonText,
                            shouldDisable && { color: '#999' },
                          ]}
                        >
                          {slot}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}


              {/* Book Table Button */}
              <TouchableOpacity style={styles.bookButton}
                onPress={handleBooking}   >
                <Text style={styles.signupButtonText}>Book Table</Text>
              </TouchableOpacity>

            </ScrollView>
          )}


        </View>
        <SuccessPopup
          isVisible={isModalVisible}
          onClose={handleModalClose}
          message={modalMessage}
        />
      </>
    );
  }
  else if (type === "product") {
    return (
      <View style={{ flex: 1 }}>
        <TopHeader showBack={true} title={useTranslate("Green Life Product")} />
        {/* loader */}
        <Loader visible={isLoading} />
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}

        />
      </View>
    );
  }
};
export default Cafe;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: '100%',         // ✅ This ensures it stretches full width
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    marginTop: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  headingwithoutspace: {
    fontSize: 18,
    fontWeight: '600',
  },
  paragraph: {
    fontSize: 14,
    color: '#333',
    textAlign: 'justify'
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  menuText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#555',
  },
  bulletSection: {
    marginBottom: 8,
  },
  bullet: {
    fontSize: 14,
    marginVertical: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  bookButton: {
    backgroundColor: '#E18A5E',
    padding: 10,
    height: 60,
    width: 330,
    borderRadius: 35,
    marginTop: 30,
    zIndex: -100,
    alignSelf: 'center', // ✅ This centers the button horizontally
  },
  signupButtonText: {
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
  },
  viewButtonText: {
    color: '#2196F3',
    fontWeight: '600',
    fontSize: 14,
  },
  menuCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10,
    marginTop:5
  },
  menuCardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  slotSection: {
    marginTop: 16,
  },
  slotButton: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
    borderColor: '#000',
    borderWidth: 1,
    justifyContent: "center",
    width: '48%',
  },
  slotButtonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedSlotButton: {
    backgroundColor: '#E18A5E', // gold
  },

  selectedSlotButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  personRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 8, // if you use RN 0.71+ otherwise use margin
    marginVertical: 12,
  },
  personButtonText: {
    fontWeight: '500',
    color: '#ffff',
  },
  personButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    margin: 5,
    backgroundColor: '#E18A5E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionDescription: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginVertical: 10,
    textAlign: 'left',
    fontWeight: '600',
  },
  guestContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  }
  , counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  counterButton: {
    backgroundColor: '#E18A5E', // gold color
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },

  counterButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  counterValueBox: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 8,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 6,
    minWidth: 40,
    alignItems: 'center',
  },

  counterValueText: {
    color: '#E18A5E',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuImage: {
    width: '100%',       // full width
    height: undefined,   // no fixed height
    aspectRatio: 3 / 4,    // width / height ratio
    borderRadius: 12,         // rounded corners
    marginTop: 10,            // space from above

    resizeMode: 'cover',    // contains within box
  },
  paragraphread: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },

  readMore: {
    color: '#E18A5E',
    fontWeight: '600',
  }
});