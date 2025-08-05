// import React, {useState} from 'react';
// import {
//   createDrawerNavigator,
//   DrawerItemList,
//   DrawerItem,
// } from '@react-navigation/drawer';
// import Icon from 'react-native-vector-icons/Ionicons';

// import {
//   View,
//   StyleSheet,
//   Image,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';
// import {DrawerActions, useNavigation} from '@react-navigation/native';
// import Downsquare from 'react-native-vector-icons/AntDesign';
// import Upsquare from 'react-native-vector-icons/AntDesign';
// import BottomComps from './BottomComps'; // Tab navigator
// import {useSelector} from 'react-redux';
// import {imageBase} from '../config/Constent';

// import Close from 'react-native-vector-icons/AntDesign';
// import {Positions} from 'react-native-calendars/src/expandableCalendar';

// const Drawer = createDrawerNavigator();

// function CustomDrawerContent(props) {
//   const {navigation} = props;
//   const guestType = useSelector(state => state?.user?.userTypeGuest);
//   const {userInfo} = useSelector(({user}) => user);

//   console.log(userInfo?.data?.name, 'hello user&&');
//   const [expandedItems, setExpandedItems] = useState({
//     Events: false,
//     Franchise: false,
//     Offerings: false,
//   });

//   const toggleDropdown = label => {
//     setExpandedItems(prevState => ({
//       ...prevState,
//       [label]: !prevState[label],
//     }));
//   };

//   const drawerItems = [
//     // {
//     //   label: 'Home',
//     //   onPress: () => {
//     //     // props.navigation.closeDrawer();
//     //     navigation.navigate('DashboardTabs', {screen: 'DashboardStack'});
//     //   },
//     // },
//     // {label: 'About us', onPress: () => navigation.navigate('AboutUs')},
//     // { label: "About us", onPress: () => navigation.navigate("AboutUs") },
//     {label: 'Who need us?', onPress: () => navigation.navigate('WhoNeedUs')},
//     {label: 'Your Benefits', onPress: () => navigation.navigate('Benefit')},
//     {
//       label: 'Offerings',
//       isDropdown: true,
//       subItems: [
//         {
//           label: 'Techniques',
//           onPress: () => navigation.navigate('AllProgram'),
//         },
//         {label: 'Services', onPress: () => navigation.navigate('Service')},
//         {label: 'Games', onPress: () => navigation.navigate('GamesPage')},
//       ],
//     },

//     {
//       label: 'Payment History',
//       onPress: () => navigation.navigate('PaymentHistory'),
//     },
//     {label: 'Panelist', onPress: () => navigation.navigate('Panelist')},
//     {label: 'Events', onPress: () => navigation.navigate('UpcomingEvents')},
//     {
//       label: 'Career with us',
//       onPress: () => navigation.navigate('CareerWithUs'),
//     },

//     // {
//     //   label: 'Book an Appointment',
//     //   onPress: () =>
//     //     navigation.navigate('DashboardTabs', {screen: 'Appointment'}),
//     // },
//     {label: 'Gallery', onPress: () => navigation.navigate('Gallery')},
//     {
//       label: 'Testimonial',
//       onPress: () => {
//         navigation.navigate('TestimonialView');
//       },
//     },

//     {label: 'Contact us', onPress: () => navigation.navigate('Contact')},

//     // {
//     //   label: 'Privacy Policy',

//     //   onPress: () => navigation.navigate('PrivacyPolicy'),
//     // },
//     // {
//     //   label: 'Terms & Conditions',
//     //   onPress: () => navigation.navigate('TermsCond'),
//     // },

//     // {
//     //   label: 'Terms & Conditions',
//     //   onPress: () => navigation.navigate('TermsCond'),
//     // },
//   ];

//   return (
//     <View style={styles.drawerContainer}>
//       <TouchableOpacity
//         style={{position: 'absolute', right: 10, top: 10, zIndex: 10}}
//         onPress={() => navigation.closeDrawer()}>
//         <Close name="closecircleo" size={24} />
//       </TouchableOpacity>

//       <ScrollView contentContainerStyle={{flexGrow: 1}}>
//         <View style={styles.headerContainer}>
//           <Image
//             source={require('../assets/logoImg.png')}
//             style={styles.logo}
//           />

//           <View style={styles.profileContainer}>
//             <View style={styles.imageBorder}>
//               <Image
//                 source={{
//                   uri: userInfo?.data?.profile_img
//                     ? userInfo.data.profile_img
//                     : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKKOdmJz8Z2pDtYgFgR2u9spABvNNPKYYtGw&s',
//                 }}
//                 style={styles.profileImage}
//               />
//             </View>

//             <Text style={styles.profileName}>{userInfo?.data?.name}</Text>
//           </View>
//         </View>

//         <DrawerItemList {...props} />

//         <View style={styles.bottomDrawerSection}>
//           {drawerItems.map((item, index) => {
//             if (guestType && item.label === 'Payment History') {
//               return null;
//             }
//             return (
//               <View key={index}>
//                 <TouchableOpacity
//                   onPress={() =>
//                     item.isDropdown
//                       ? toggleDropdown(item.label)
//                       : item.onPress()
//                   }
//                   style={styles.drawerItemContainer}>
//                   <Text style={styles.drawerLabel}>{item.label}</Text>
//                   {item.isDropdown &&
//                     (expandedItems[item.label] ? (
//                       <View
//                         style={{
//                           backgroundColor: '#FF914D',
//                           width: 22,
//                           height: 22,
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                           borderRadius: 4,
//                         }}>
//                         <Upsquare name="up" size={18} />
//                       </View>
//                     ) : (
//                       <View
//                         style={{
//                           backgroundColor: '#FF914D',
//                           width: 22,
//                           height: 22,
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                           borderRadius: 4,
//                         }}>
//                         <Downsquare name="down" size={18} />
//                       </View>
//                     ))}
//                 </TouchableOpacity>
//                 {item.isDropdown &&
//                   expandedItems[item.label] &&
//                   item.subItems.map((subItem, subIndex) => (
//                     <TouchableOpacity
//                       key={subIndex}
//                       onPress={subItem.onPress}
//                       style={styles.subItem}>
//                       <Text style={styles.drawerLabel}>{subItem.label}</Text>
//                     </TouchableOpacity>
//                   ))}
//                 <View style={styles.separator} />
//               </View>
//             );
//           })}
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const DrawerComps = () => {
//   const {userInfo} = useSelector(({user}) => user);

//   const navigation = useNavigation();
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         headerShown: true,
//         drawerActiveTintColor: '#ED8A00',
//         drawerInactiveTintColor: '#9D0C0C',
//         drawerLabelStyle: {fontSize: 16},
//         drawerStyle: {backgroundColor: '#edf5ef', width: '70%'},
//       }}
//       drawerContent={props => <CustomDrawerContent {...props} />}>
//       <Drawer.Screen
//         name="DashboardTabs"
//         component={BottomComps}
//         options={{
//           headerTitle: () => (
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 width: Dimensions.get('screen').width / 1.3, // adjust width to your layout
//               }}>
//               <Image
//                 source={require('../assets/logo1.jpg')}
//                 style={{
//                   resizeMode: 'contain',
//                   width: 100,
//                   height: 60,
//                 }}
//               />
//               <View>
//                 <TouchableOpacity
//                   onPress={() => navigation.navigate('Notification')}>
//                   <Icon
//                     name="notifications-outline"
//                     size={22}
//                     color="#FF914D"
//                     style={{marginLeft: 50}}
//                   />
//                 </TouchableOpacity>
//                 <Text style={{fontSize: 16, marginLeft: 10}}>
//                   Hello{' '}
//                   <Text style={{fontWeight: 'bold', fontSize: 18}}>
//                     {userInfo?.data?.name}!
//                   </Text>
//                 </Text>
//               </View>
//             </View>
//           ),
//           drawerItemStyle: {display: 'none'},
//         }}
//       />
//     </Drawer.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   drawerContainer: {
//     flex: 1,
//     backgroundColor: '#edf5ef',
//   },
//   headerContainer: {height: 200, paddingTop: 30, paddingHorizontal: 20},
//   logo: {width: 100, height: 100, resizeMode: 'contain'},
//   profileContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   profileImage: {
//     width: 66,
//     height: 66,
//     // resizeMode: "contain",
//     borderRadius: 10,
//   },
//   imageBorder: {
//     width: 66, // slightly bigger than image
//     height: 66,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: '#E18A5E', // or any color you like
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 10, // spacing between image and name
//   },

//   profileName: {fontWeight: 'bold', fontSize: 22, marginLeft: 10},
//   bottomDrawerSection: {marginTop: 20},
//   drawerItemContainer: {
//     paddingVertical: 2,
//     paddingLeft: 15,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     margin: 10,
//     // marginTop: 10,
//   },
//   separator: {height: 1, backgroundColor: '#ccc', marginHorizontal: 15},
//   drawerLabel: {fontSize: 16},
//   subItem: {paddingLeft: 30, paddingVertical: 5},
// });

// export default DrawerComps;
// ///

// //

// // //
// code commented 30-04
// import React, {useState} from 'react';
// import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {
//   View,
//   StyleSheet,
//   Image,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';
// import {DrawerActions, useNavigation} from '@react-navigation/native';
// import Downsquare from 'react-native-vector-icons/AntDesign';
// import Upsquare from 'react-native-vector-icons/AntDesign';
// import Close from 'react-native-vector-icons/AntDesign';

// import BottomComps from './BottomComps'; // Tab navigator
// import {useSelector} from 'react-redux';
// import {useTranslate} from '../hooks/useTranslate'; // ✅ Hook for translation

// const Drawer = createDrawerNavigator();
// function CustomDrawerContent(props) {
//   const {navigation} = props;
//   const guestType = useSelector(state => state?.user?.userTypeGuest);
//   const {userInfo} = useSelector(({user}) => user);

//   const [expandedItems, setExpandedItems] = useState({
//     Events: false,
//     Franchise: false,
//     Offerings: false,
//     ServicesSubList: false,
//     GamesSubList: false,
//   });

//   const toggleDropdown = label => {
//     setExpandedItems(prevState => ({
//       ...prevState,
//       [label]: !prevState[label],
//     }));
//   };

//   const serviceList = [
//     {name: 'Rajan', id: 1},
//     {name: 'Sajan', id: 2},
//     {name: 'John', id: 3},
//     {name: 'Sonu', id: 4},
//   ];

//   const gameList = [
//     {name: 'Chess', id: 1},
//     {name: 'Sudoku', id: 2},
//     {name: 'Memory Match', id: 3},
//   ];

//   const drawerItems = [
//     {label: 'About us', onPress: () => navigation.navigate('AboutUs')},
//     {label: 'Who need us?', onPress: () => navigation.navigate('WhoNeedUs')},
//     {label: 'Your Benefits', onPress: () => navigation.navigate('Benefit')},
//     {
//       label: 'Offerings',
//       isDropdown: true,
//       subItems: [
//         {
//           label: 'Techniques',
//           onPress: () => navigation.navigate('AllProgram'),
//         },
//         {
//           label: 'Services',
//           onPress: () => toggleDropdown('ServicesSubList'),
//         },
//         {
//           label: 'Games',
//           onPress: () => toggleDropdown('GamesSubList'),
//         },
//       ],
//     },
//     {
//       label: 'Payment History',
//       onPress: () => navigation.navigate('PaymentHistory'),
//     },
//     {label: 'Panelist', onPress: () => navigation.navigate('Panelist')},
//     {label: 'Events', onPress: () => navigation.navigate('UpcomingEvents')},
//     {
//       label: 'Career with us',
//       onPress: () => navigation.navigate('CareerWithUs'),
//     },
//     {label: 'Gallery', onPress: () => navigation.navigate('Gallery')},
//     {
//       label: 'Testimonial',
//       onPress: () => navigation.navigate('TestimonialView'),
//     },
//     {label: 'Contact us', onPress: () => navigation.navigate('Contact')},
//   ];

//   return (
//     <View style={styles.drawerContainer}>
//       <TouchableOpacity
//         style={{position: 'absolute', right: 10, top: 10, zIndex: 10}}
//         onPress={() => navigation.closeDrawer()}>
//         <Close name="closecircleo" size={24} />
//       </TouchableOpacity>

//       <ScrollView contentContainerStyle={{flexGrow: 1}}>
//         <View style={styles.headerContainer}>
//           <Image source={require('../assets/img2.png')} style={styles.logo} />

//           <View style={styles.profileContainer}>
//             <View style={styles.imageBorder}>
//               <Image
//                 source={{
//                   uri: userInfo?.data?.profile_img
//                     ? userInfo.data.profile_img
//                     : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKKOdmJz8Z2pDtYgFgR2u9spABvNNPKYYtGw&s',
//                 }}
//                 style={styles.profileImage}
//               />
//             </View>

//             <Text style={styles.profileName}>
//               {useTranslate(userInfo?.data?.name)}
//             </Text>
//           </View>
//         </View>

//         <DrawerItemList {...props} />

//         <View style={styles.bottomDrawerSection}>
//           {drawerItems.map((item, index) => {
//             const translatedLabel = useTranslate(item.label);

//             if (guestType && item.label === 'Payment History') {
//               return null;
//             }

//             return (
//               <View key={index}>
//                 <TouchableOpacity
//                   onPress={() =>
//                     item.isDropdown
//                       ? toggleDropdown(item.label)
//                       : item.onPress()
//                   }
//                   style={styles.drawerItemContainer}>
//                   <Text style={styles.drawerLabel}>{translatedLabel}</Text>
//                   {item.isDropdown && (
//                     <View style={styles.iconBox}>
//                       {expandedItems[item.label] ? (
//                         <Upsquare name="up" size={18} />
//                       ) : (
//                         <Downsquare name="down" size={18} />
//                       )}
//                     </View>
//                   )}
//                 </TouchableOpacity>

//                 {item.isDropdown &&
//                   expandedItems[item.label] &&
//                   item.subItems.map((subItem, subIndex) => {
//                     return (
//                       <View key={subIndex}>
//                         <TouchableOpacity
//                           onPress={subItem.onPress}
//                           style={[styles.subItemRow]}>
//                           <Text style={styles.drawerLabel}>
//                             {subItem.label}
//                           </Text>
//                           {(subItem.label === 'Services' ||
//                             subItem.label === 'Games') && (
//                             <View style={styles.iconBox}>
//                               {expandedItems[
//                                 subItem.label === 'Services'
//                                   ? 'ServicesSubList'
//                                   : 'GamesSubList'
//                               ] ? (
//                                 <Upsquare name="up" size={14} />
//                               ) : (
//                                 <Downsquare name="down" size={14} />
//                               )}
//                             </View>
//                           )}
//                         </TouchableOpacity>

//                         {subItem.label === 'Services' &&
//                           expandedItems['ServicesSubList'] &&
//                           serviceList.map((srv, idx) => (
//                             <TouchableOpacity
//                               key={idx}
//                               onPress={() =>
//                                 navigation.navigate('ServiceDetail', {
//                                   id: srv.id,
//                                 })
//                               }
//                               style={styles.nestedSubItem}>
//                               <Text style={styles.drawerLabel}>{srv.name}</Text>
//                             </TouchableOpacity>
//                           ))}

//                         {subItem.label === 'Games' &&
//                           expandedItems['GamesSubList'] &&
//                           gameList.map((game, idx) => (
//                             <TouchableOpacity
//                               key={idx}
//                               onPress={() =>
//                                 navigation.navigate('GameDetail', {
//                                   id: game.id,
//                                 })
//                               }
//                               style={styles.nestedSubItem}>
//                               <Text style={styles.drawerLabel}>
//                                 {game.name}
//                               </Text>
//                             </TouchableOpacity>
//                           ))}
//                       </View>
//                     );
//                   })}

//                 <View style={styles.separator} />
//               </View>
//             );
//           })}
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const DrawerComps = () => {
//   const {userInfo} = useSelector(({user}) => user);
//   const navigation = useNavigation();

//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         headerShown: true,
//         drawerActiveTintColor: '#ED8A00',
//         drawerInactiveTintColor: '#9D0C0C',
//         drawerLabelStyle: {fontSize: 16},
//         drawerStyle: {backgroundColor: '#edf5ef', width: '70%'},
//       }}
//       drawerContent={props => <CustomDrawerContent {...props} />}>
//       <Drawer.Screen
//         name="DashboardTabs"
//         component={BottomComps}
//         options={{
//           headerTitle: () => (
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 width: Dimensions.get('screen').width / 1.3,
//               }}>
//               <Image
//                 source={require('../assets/logo1.jpg')}
//                 style={{
//                   resizeMode: 'contain',
//                   width: 100,
//                   height: 60,
//                 }}
//               />
//               <View>
//                 <TouchableOpacity
//                   onPress={() => navigation.navigate('Notification')}>
//                   <Icon
//                     name="notifications-outline"
//                     size={22}
//                     color="#FF914D"
//                     style={{marginLeft: 50}}
//                   />
//                 </TouchableOpacity>
//                 <Text style={{fontSize: 16, marginLeft: 10}}>
//                   {useTranslate('Hello')}{' '}
//                   <Text style={{fontWeight: 'bold', fontSize: 18}}>
//                     {useTranslate(userInfo?.data?.name)}!
//                   </Text>
//                 </Text>
//               </View>
//             </View>
//           ),
//           drawerItemStyle: {display: 'none'},
//         }}
//       />
//     </Drawer.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   drawerContainer: {
//     flex: 1,
//     backgroundColor: '#edf5ef',
//   },
//   headerContainer: {height: 200, paddingTop: 30, paddingHorizontal: 20},
//   logo: {width: 100, height: 100, resizeMode: 'contain'},
//   profileContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   profileImage: {
//     width: 66,
//     height: 66,
//     borderRadius: 10,
//   },
//   imageBorder: {
//     width: 66,
//     height: 66,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: '#E18A5E',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 10,
//   },
//   profileName: {fontWeight: 'bold', fontSize: 22, marginLeft: 10},
//   bottomDrawerSection: {marginTop: 20},
//   drawerItemContainer: {
//     paddingVertical: 2,
//     paddingLeft: 15,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     margin: 10,
//   },
//   separator: {height: 1, backgroundColor: '#ccc', marginHorizontal: 15},
//   drawerLabel: {fontSize: 16},
//   subItem: {paddingLeft: 30, paddingVertical: 5},
//   nestedSubItem: {
//     paddingLeft: 50,
//     paddingVertical: 4,
//   },
//   subItemRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingLeft: 30,
//     paddingRight: 15,
//     paddingVertical: 5,
//   },
//   iconBox: {
//     backgroundColor: '#FF914D',
//     width: 22,
//     height: 22,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 4,
//   },
// });

// export default DrawerComps;

//

// // ... (imports remain unchanged)
// import React, {useEffect, useState} from 'react';
// import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {
//   View,
//   StyleSheet,
//   Image,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
//   Linking,
//   SafeAreaView,
//   StatusBar,
// } from 'react-native';
// import {DrawerActions, useNavigation} from '@react-navigation/native';
// import Downsquare from 'react-native-vector-icons/AntDesign';
// import Upsquare from 'react-native-vector-icons/AntDesign';
// import Close from 'react-native-vector-icons/AntDesign';

// import BottomComps from './BottomComps';
// import {useSelector} from 'react-redux';
// import {useTranslate} from '../hooks/useTranslate';
// import useCommon from '../hooks/useCommon';
// import TopHeader from '../components/TopHeader';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';

// const Drawer = createDrawerNavigator();

// function CustomDrawerContent(props) {
//   const {navigation} = props;
//   const guestType = useSelector(state => state?.user?.userTypeGuest);
//   const {userInfo} = useSelector(({user}) => user);
//   const {getGamesList, serviceCategoryData} = useCommon();

//   console.log(getGamesList, serviceCategoryData, 'data comesss');
//   const insets = useSafeAreaInsets();

//   const [expandedItems, setExpandedItems] = useState({
//     Offerings: false,
//     ServicesSubList: false,
//     GamesSubList: false,
//     Career: false,
//     Franchise: false,
//   });

//   const toggleDropdown = key => {
//     setExpandedItems(prev => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };
//   const {serviceList, gameList} = useSelector(({user}) => user);

//   // const [serviceList, setServiceList] = useState([]);
//   // const [gameList, setGameList] = useState([]);
//   // console.log(serviceList, gameList, 'SERVICELIST**** GAMELIST*****');

//   const USERNAME = useTranslate(userInfo?.data?.name);

//   // useEffect(() => {
//   //   if (serviceCategoryData || getGamesList) {
//   //     setServiceList(serviceCategoryData?.data);
//   //     setGameList(getGamesList?.data);
//   //   }
//   // }, [serviceCategoryData]);

//   const drawerItems = [
//     {label: 'About us', onPress: () => navigation.navigate('AboutUs')},
//     {label: 'Who needs us?', onPress: () => navigation.navigate('WhoNeedUs')},
//     {label: 'Your Benefits', onPress: () => navigation.navigate('Benefit')},

//     {
//       label: 'Offerings',
//       isDropdown: true,
//       toggleKey: 'Offerings',
//       subItems: [
//         {label: 'Techniques', onPress: () => navigation.navigate('AllProgram')},
//         {
//           label: 'Services',
//           onPress: () => toggleDropdown('ServicesSubList'),
//         },
//         {
//           label: 'Games',
//           onPress: () => toggleDropdown('GamesSubList'),
//         },
//         {
//           label: 'Start Ups/Budding Entrepreneur',
//           onPress: () =>
//             Linking.openURL(
//               'https://docs.google.com/forms/d/e/1FAIpQLSdPpIXwPu_yjY8efPC_x3dXSqioCRXxFhjNrSTAd0crA84sWA/viewform',
//             ),
//         },
//         {
//           label: 'Others',
//           onPress: () =>
//             navigation.navigate('ServiceCopy', {
//               service: {service_name: 'Others'},
//             }),
//         },
//       ],
//     },

//     {label: 'Panelist', onPress: () => navigation.navigate('Panelist')},
//     {label: 'Events', onPress: () => navigation.navigate('UpcomingEvents')},

//     {
//       label: 'Career with us',
//       isDropdown: true,
//       toggleKey: 'Career',
//       subItems: [
//         {
//           label: 'Volunteer',
//           onPress: () =>
//             Linking.openURL(
//               'https://docs.google.com/forms/d/e/1FAIpQLSeFwZwZ5iDdICpXLHuyyftzRORV69Nq8C9Ek4i7PUhe9J4zyA/viewform',
//             ),
//         },
//         {
//           label: 'Internship',
//           onPress: () =>
//             Linking.openURL(
//               'https://docs.google.com/forms/d/e/1FAIpQLScvMZXqK1wKtyGkra2eKyDIfdTUZ20bx946YCCf77GO6ZHbXA/viewform',
//             ),
//         },
//         {
//           label: 'Fellowship',
//           onPress: () =>
//             Linking.openURL(
//               'https://docs.google.com/forms/d/e/1FAIpQLScvMZXqK1wKtyGkra2eKyDIfdTUZ20bx946YCCf77GO6ZHbXA/viewform',
//             ),
//         },
//         {
//           label: 'Join Us',
//           onPress: () => Linking.openURL('https://forms.gle/kvqB25eqKCEqmCyf6'),
//         },
//       ],
//     },

//     {
//       label: 'Franchise',
//       isDropdown: true,
//       toggleKey: 'Franchise',
//       subItems: [
//         {
//           label: 'HuHaHo',
//           onPress: () =>
//             Linking.openURL(
//               'https://docs.google.com/forms/d/e/1FAIpQLSdvhLkmAjWeReLO8drDFFOqeqZd1MGk_aEpWTJ_mfoJixR4-w/viewform',
//             ),
//         },
//         {
//           label: 'Green Life Cafe & Product',
//           onPress: () =>
//             Linking.openURL(
//               'https://docs.google.com/forms/d/e/1FAIpQLSdvhLkmAjWeReLO8drDFFOqeqZd1MGk_aEpWTJ_mfoJixR4-w/viewform',
//             ),
//         },
//       ],
//     },

//     {label: 'Gallery', onPress: () => navigation.navigate('Gallery')},
//     {
//       label: 'Testimonial',
//       onPress: () => navigation.navigate('TestimonialView'),
//     },
//     {label: 'Contact us', onPress: () => navigation.navigate('Contact')},
//   ];

//   return (
//     <ScrollView contentContainerStyle={{flexGrow: 1, paddingTop: insets.top}}>
//       <TouchableOpacity
//         style={{
//           position: 'absolute',
//           right: 10,
//           top: insets.top + 10,
//           zIndex: 10,
//         }}
//         onPress={() => navigation.closeDrawer()}>
//         <Close name="closecircleo" size={24} />
//       </TouchableOpacity>

//       <View style={styles.headerContainer}>
//         <Image source={require('../assets/img2.png')} style={styles.logo} />
//         <View style={styles.profileContainer}>
//           <View style={styles.imageBorder}>
//             <Image
//               source={{
//                 uri:
//                   userInfo?.data?.profile_img ||
//                   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKKOdmJz8Z2pDtYgFgR2u9spABvNNPKYYtGw&s',
//               }}
//               style={styles.profileImage}
//             />
//           </View>
//           <Text style={styles.profileName}>
//             {!guestType ? USERNAME : 'Guest'}
//           </Text>
//         </View>
//       </View>

//       <DrawerItemList {...props} />

//       <View style={styles.bottomDrawerSection}>
//         {drawerItems.map((item, index) => {
//           const translatedLabel = useTranslate(item.label);
//           if (guestType && item.label === 'Payment History') return null;

//           return (
//             <View key={index}>
//               <TouchableOpacity
//                 onPress={() =>
//                   item.isDropdown
//                     ? toggleDropdown(item.toggleKey || item.label)
//                     : item.onPress()
//                 }
//                 style={styles.drawerItemContainer}>
//                 <Text style={styles.drawerLabel}>{translatedLabel}</Text>
//                 {item.isDropdown && (
//                   <View style={styles.iconBox}>
//                     {expandedItems[item.toggleKey || item.label] ? (
//                       <Upsquare name="up" size={18} />
//                     ) : (
//                       <Downsquare name="down" size={18} />
//                     )}
//                   </View>
//                 )}
//               </TouchableOpacity>

//               {item.isDropdown &&
//                 expandedItems[item.toggleKey || item.label] &&
//                 item.subItems.map((subItem, subIndex) => (
//                   <View key={subIndex}>
//                     <TouchableOpacity
//                       onPress={subItem.onPress}
//                       style={styles.subItemRow}>
//                       <Text style={styles.drawerLabel}>{subItem.label}</Text>
//                       {(subItem.label === 'Services' ||
//                         subItem.label === 'Games') && (
//                         <View style={styles.iconBox}>
//                           {expandedItems[
//                             subItem.label === 'Services'
//                               ? 'ServicesSubList'
//                               : 'GamesSubList'
//                           ] ? (
//                             <Upsquare name="up" size={14} />
//                           ) : (
//                             <Downsquare name="down" size={14} />
//                           )}
//                         </View>
//                       )}
//                     </TouchableOpacity>

//                     {subItem.label === 'Services' &&
//                       expandedItems['ServicesSubList'] && (
//                         <ScrollView
//                           style={styles.nestedScroll}
//                           nestedScrollEnabled>
//                           {serviceList
//                             .filter(srv => srv.service_name !== 'Other')
//                             .map((srv, idx) => (
//                               <View key={idx}>
//                                 <TouchableOpacity
//                                   onPress={() =>
//                                     navigation.navigate('ServiceCopy', {
//                                       service: srv,
//                                     })
//                                   }
//                                   style={{paddingVertical: 4, marginLeft: 30}}>
//                                   <Text style={styles.drawerLabel}>
//                                     {srv.service_name === 'Cultural_Coridor'
//                                       ? 'Cultural Corridor'
//                                       : srv.service_name}
//                                   </Text>
//                                 </TouchableOpacity>
//                                 <View style={styles.separator} />
//                               </View>
//                             ))}
//                         </ScrollView>
//                       )}

//                     {subItem.label === 'Games' &&
//                       expandedItems['GamesSubList'] &&
//                       gameList.map((game, idx) => (
//                         <View key={idx}>
//                           <TouchableOpacity
//                             onPress={() =>
//                               navigation.navigate('GamesPage', {id: game.id})
//                             }
//                             style={styles.nestedSubItem}>
//                             <Text style={styles.drawerLabel}>{game.name}</Text>
//                           </TouchableOpacity>
//                           <View style={styles.separator} />
//                         </View>
//                       ))}

//                     <View style={styles.separator} />
//                   </View>
//                 ))}
//               <View style={styles.separator} />
//             </View>
//           );
//         })}
//       </View>
//     </ScrollView>
//   );
// }

// const DrawerComps = () => {
//   const {userInfo} = useSelector(({user}) => user);
//   const navigation = useNavigation();
//   const guestType = useSelector(state => state?.user?.userTypeGuest);

//   const userName = useTranslate(userInfo?.data?.name) + '!';
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         headerShown: true,
//         drawerActiveTintColor: '#ED8A00',
//         drawerInactiveTintColor: '#9D0C0C',
//         drawerLabelStyle: {fontSize: 16},
//         drawerStyle: {backgroundColor: '#edf5ef', width: '70%'},
//       }}
//       drawerContent={props => <CustomDrawerContent {...props} />}>
//       <Drawer.Screen
//         name="DashboardTabs"
//         component={BottomComps}
//         options={{
//           headerTitle: () => (
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 width: Dimensions.get('screen').width / 1.3,
//               }}>
//               <Image
//                 source={require('../assets/logo1.jpg')}
//                 style={{
//                   resizeMode: 'contain',
//                   width: 100,
//                   height: 60,
//                 }}
//               />
//               <View>
//                 <TouchableOpacity
//                   onPress={() => navigation.navigate('Notification')}>
//                   <Icon
//                     name="notifications-outline"
//                     size={22}
//                     color="#E18A5E"
//                     style={{marginLeft: 90}}
//                   />
//                 </TouchableOpacity>
//                 <Text style={{fontSize: 16, marginLeft: 10}}>
//                   {useTranslate('Hello')}{' '}
//                   <Text style={{fontWeight: 'bold', fontSize: 18}}>
//                     {guestType ? 'Guest !' : userName}
//                   </Text>
//                 </Text>
//               </View>
//             </View>
//           ),
//           drawerItemStyle: {display: 'none'},
//         }}
//       />
//     </Drawer.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   drawerContainer: {
//     flex: 1,
//     backgroundColor: '#edf5ef',
//   },
//   headerContainer: {height: 200, paddingTop: 30, paddingHorizontal: 20},
//   logo: {width: 100, height: 100, resizeMode: 'contain', marginTop: -40},
//   profileContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: -5,
//   },
//   profileImage: {
//     width: 66,
//     height: 66,
//     borderRadius: 10,
//   },
//   imageBorder: {
//     width: 66,
//     height: 66,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: '#E18A5E',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 10,
//   },
//   profileName: {fontWeight: 'bold', fontSize: 22, marginLeft: 10},
//   bottomDrawerSection: {marginTop: -32},
//   drawerItemContainer: {
//     paddingVertical: 2,
//     paddingLeft: 15,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     margin: 10,
//   },
//   separator: {height: 1, backgroundColor: '#ccc', marginHorizontal: 15},
//   drawerLabel: {fontSize: 16},
//   subItem: {paddingLeft: 30, paddingVertical: 5},
//   nestedSubItem: {
//     paddingLeft: 60,
//     paddingVertical: 4,
//   },
//   subItemRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingLeft: 40,
//     paddingRight: 15,
//     paddingVertical: 5,
//   },
//   iconBox: {
//     backgroundColor: '#E18A5E',
//     width: 22,
//     height: 22,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 4,
//   },
//   nestedScroll: {
//     maxHeight: 150,
//     marginLeft: 30,
//   },
// });

// export default DrawerComps;
//

//

// // ... (imports remain unchanged)
// import React, {useEffect, useState} from 'react';
// import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {
//   View,
//   StyleSheet,
//   Image,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
//   Linking,
//   SafeAreaView,
//   StatusBar,
//   Pressable,
// } from 'react-native';
// import {DrawerActions, useNavigation} from '@react-navigation/native';
// import Downsquare from 'react-native-vector-icons/AntDesign';
// import Upsquare from 'react-native-vector-icons/AntDesign';
// import Close from 'react-native-vector-icons/AntDesign';

// import BottomComps from './BottomComps';
// import {useSelector} from 'react-redux';
// import {useTranslate} from '../hooks/useTranslate';
// import useCommon from '../hooks/useCommon';
// import TopHeader from '../components/TopHeader';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import Loader from '../components/Loader';

// const Drawer = createDrawerNavigator();

// function CustomDrawerContent(props) {
//   const {navigation} = props;
//   const guestType = useSelector(state => state?.user?.userTypeGuest);
//   const {userInfo} = useSelector(({user}) => user);
//   const {serviceList, gameList} = useSelector(({user}) => user);

//   const insets = useSafeAreaInsets();
//   const [label1Expanded, setLabel1Expanded] = useState(false);
//   const [label2Expanded, setLabel2Expanded] = useState(false);

//   const [expandedItems, setExpandedItems] = useState({
//     Offerings: false,
//     ServicesSubList: false,
//     GamesSubList: false,
//     // Career: false,
//     // Franchise: false,
//   });

//   const toggleDropdown = key => {
//     setExpandedItems(prev => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };
//   const USERNAME = useTranslate(userInfo?.data?.name);
//   const drawerItems = [
//     {label: 'About us', onPress: () => navigation.navigate('AboutUs')},
//     {label: 'Who needs us?', onPress: () => navigation.navigate('WhoNeedUs')},
//     {label: 'Your Benefits', onPress: () => navigation.navigate('Benefit')},

//     {
//       label: 'Offerings',
//       isDropdown: true,
//       toggleKey: 'Offerings',
//       subItems: [
//         {
//           label: 'Techniques',
//           onPress: () => navigation.navigate('AllProgram'),
//         },
//         {
//           label: 'Services',
//           onPress: () => toggleDropdown('ServicesSubList'),
//         },
//         {
//           label: 'Games',
//           onPress: () => toggleDropdown('GamesSubList'),
//         },
//         {
//           label: 'Start Ups/Budding Entrepreneur',
//           onPress: () => {
//             Linking.openURL(
//               'https://docs.google.com/forms/d/e/1FAIpQLSdPpIXwPu_yjY8efPC_x3dXSqioCRXxFhjNrSTAd0crA84sWA/viewform',
//             ),
//               navigation.closeDrawer();
//           },
//         },
//         {
//           label: 'Others',
//           onPress: () =>
//             navigation.navigate('ServiceCopy', {
//               service: {service_name: 'Others'},
//             }),
//         },
//       ],
//     },

//     {label: 'Panelist', onPress: () => navigation.navigate('Panelist')},
//     {label: 'Events', onPress: () => navigation.navigate('UpcomingEvents')},
//   ];

//   return (
//     <ScrollView contentContainerStyle={{flexGrow: 1, paddingTop: insets.top}}>
//       <TouchableOpacity
//         style={{
//           position: 'absolute',
//           right: 10,
//           top: insets.top + 10,
//           zIndex: 10,
//         }}
//         onPress={() => navigation.closeDrawer()}>
//         <Close name="closecircleo" size={24} />
//       </TouchableOpacity>

//       <View style={styles.headerContainer}>
//         <Image source={require('../assets/img2.png')} style={styles.logo} />
//         <View style={styles.profileContainer}>
//           <View style={styles.imageBorder}>
//             <Image
//               source={{
//                 uri:
//                   userInfo?.data?.profile_img ||
//                   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKKOdmJz8Z2pDtYgFgR2u9spABvNNPKYYtGw&s',
//               }}
//               style={styles.profileImage}
//             />
//           </View>
//           <Text style={styles.profileName}>
//             {!guestType ? USERNAME : 'Guest'}
//           </Text>
//         </View>
//       </View>

//       <DrawerItemList {...props} />

//       <View style={styles.bottomDrawerSection}>
//         {drawerItems?.map((item, index) => {
//           const translatedLabel = useTranslate(item.label);
//           if (guestType && item.label === 'Payment History') return null;

//           return (
//             <View key={index}>
//               <Pressable
//                 onPress={() =>
//                   item.isDropdown
//                     ? toggleDropdown(item.toggleKey || item.label)
//                     : item.onPress()
//                 }
//                 style={styles.drawerItemContainer}>
//                 <Text style={styles.drawerLabel}>{translatedLabel}</Text>
//                 {item.isDropdown && (
//                   <View style={styles.iconBox}>
//                     {expandedItems[item?.toggleKey || item?.label] ? (
//                       <Upsquare name="up" size={18} />
//                     ) : (
//                       <Downsquare name="down" size={18} />
//                     )}
//                   </View>
//                 )}
//               </Pressable>

//               {item.isDropdown &&
//                 expandedItems[item.toggleKey || item.label] &&
//                 item.subItems?.map((subItem, subIndex) => (
//                   <View key={subIndex}>
//                     <Pressable
//                       onPress={subItem.onPress}
//                       style={styles.subItemRow}>
//                       <Text style={styles.drawerLabel}>{subItem?.label}</Text>
//                       {(subItem.label === 'Services' ||
//                         subItem.label === 'Games') && (
//                         <View style={styles.iconBox}>
//                           {expandedItems[
//                             subItem.label === 'Services'
//                               ? 'ServicesSubList'
//                               : 'GamesSubList'
//                           ] ? (
//                             <Upsquare name="up" size={14} />
//                           ) : (
//                             <Downsquare name="down" size={14} />
//                           )}
//                         </View>
//                       )}
//                     </Pressable>

//                     {subItem.label === 'Services' &&
//                       expandedItems['ServicesSubList'] && (
//                         <ScrollView
//                           style={styles.nestedScroll}
//                           nestedScrollEnabled>
//                           {serviceList
//                             .filter(srv => srv?.service_name !== 'Other')
//                             .map((srv, idx) => (
//                               <View key={idx}>
//                                 <Pressable
//                                   onPress={() =>
//                                     navigation.navigate('ServiceCopy', {
//                                       service: srv,
//                                       hideStatus:
//                                         srv.service_name === 'Consultation'
//                                           ? true
//                                           : false,
//                                     })
//                                   }
//                                   style={{paddingVertical: 4, marginLeft: 30}}>
//                                   <Text style={styles.drawerLabel}>
//                                     {srv?.service_name === 'Cultural_Coridor'
//                                       ? 'Cultural Corridor'
//                                       : srv?.service_name}
//                                   </Text>
//                                 </Pressable>
//                                 <View style={styles.separator} />
//                               </View>
//                             ))}
//                         </ScrollView>
//                       )}

//                     {subItem?.label === 'Games' &&
//                       expandedItems['GamesSubList'] &&
//                       gameList?.map((game, idx) => (
//                         <View key={idx}>
//                           <Pressable
//                             onPress={() =>
//                               navigation.navigate('GamesPage', {id: game?.id})
//                             }
//                             style={styles.nestedSubItem}>
//                             <Text style={styles.drawerLabel}>{game?.name}</Text>
//                           </Pressable>
//                           <View style={styles.separator} />
//                         </View>
//                       ))}

//                     <View style={styles.separator} />
//                   </View>
//                 ))}
//               <View style={styles.separator} />
//             </View>
//           );
//         })}

//         <View>
//           <Pressable
//             onPress={() => setLabel1Expanded(prev => !prev)}
//             style={styles.drawerItemContainer}>
//             <Text style={styles.drawerLabel}>Career with us</Text>
//             <View style={styles.iconBox}>
//               {label1Expanded ? (
//                 <Upsquare name="up" size={18} />
//               ) : (
//                 <Downsquare name="down" size={18} />
//               )}
//             </View>
//           </Pressable>

//           {label1Expanded && (
//             <View style={{paddingLeft: 20}}>
//               <Pressable
//                 onPress={() => {
//                   Linking.openURL(
//                     'https://docs.google.com/forms/d/e/1FAIpQLSeFwZwZ5iDdICpXLHuyyftzRORV69Nq8C9Ek4i7PUhe9J4zyA/viewform',
//                   ),
//                     navigation.closeDrawer();
//                 }}
//                 style={styles.subItemRow}>
//                 <Text style={styles.drawerLabel}>Volunteer</Text>
//               </Pressable>
//               <View style={styles.separator} />

//               <Pressable
//                 onPress={() => {
//                   Linking.openURL(
//                     'https://docs.google.com/forms/d/e/1FAIpQLScvMZXqK1wKtyGkra2eKyDIfdTUZ20bx946YCCf77GO6ZHbXA/viewform',
//                   );
//                   navigation.closeDrawer();
//                 }}
//                 style={styles.subItemRow}>
//                 <Text style={styles.drawerLabel}>Internship</Text>
//               </Pressable>
//               <View style={styles.separator} />

//               <Pressable
//                 onPress={() => {
//                   Linking.openURL(
//                     'https://docs.google.com/forms/d/e/1FAIpQLScvMZXqK1wKtyGkra2eKyDIfdTUZ20bx946YCCf77GO6ZHbXA/viewform',
//                   );
//                   navigation.closeDrawer();
//                 }}
//                 style={styles.subItemRow}>
//                 <Text style={styles.drawerLabel}>Fellowship</Text>
//               </Pressable>
//               <View style={styles.separator} />

//               <Pressable
//                 onPress={() => {
//                   Linking.openURL('https://forms.gle/kvqB25eqKCEqmCyf6');
//                   navigation.closeDrawer();
//                 }}
//                 style={styles.subItemRow}>
//                 <Text style={styles.drawerLabel}>Join Us</Text>
//               </Pressable>
//               <View style={styles.separator} />
//             </View>
//           )}

//           {/* Separator below the full Label1 block */}
//           <View style={styles.separator} />
//         </View>

//         <View>
//           <Pressable
//             onPress={() => setLabel2Expanded(prev => !prev)}
//             style={styles.drawerItemContainer}>
//             <Text style={styles.drawerLabel}>Franchise</Text>
//             <View style={styles.iconBox}>
//               {label2Expanded ? (
//                 <Upsquare name="up" size={18} />
//               ) : (
//                 <Downsquare name="down" size={18} />
//               )}
//             </View>
//           </Pressable>

//           {label2Expanded && (
//             <View style={{paddingLeft: 20}}>
//               <Pressable
//                 onPress={() => {
//                   Linking.openURL(
//                     'https://docs.google.com/forms/d/e/1FAIpQLSdvhLkmAjWeReLO8drDFFOqeqZd1MGk_aEpWTJ_mfoJixR4-w/viewform',
//                   ),
//                     navigation.closeDrawer();
//                 }}
//                 style={styles.subItemRow}>
//                 <Text style={styles.drawerLabel}>HuHaHo</Text>
//               </Pressable>
//               <View style={styles.separator} />

//               <Pressable
//                 onPress={() => {
//                   Linking.openURL(
//                     'https://docs.google.com/forms/d/e/1FAIpQLSdvhLkmAjWeReLO8drDFFOqeqZd1MGk_aEpWTJ_mfoJixR4-w/viewform',
//                   ),
//                     navigation.closeDrawer();
//                 }}
//                 style={styles.subItemRow}>
//                 <Text style={styles.drawerLabel}>
//                   Green Life Cafe & Product
//                 </Text>
//               </Pressable>
//               {/* <View style={styles.separator} /> */}

//               <View style={styles.separator} />
//             </View>
//           )}

//           {/* Separator below the entire Label2 block */}
//           <View style={styles.separator} />
//         </View>

//         <View>
//           <Pressable
//             onPress={() => navigation.navigate('Gallery')}
//             style={styles.drawerItemContainer}>
//             <Text style={styles.drawerLabel}>Gallery</Text>
//           </Pressable>
//           <View style={styles.separator} />

//           <Pressable
//             onPress={() => navigation.navigate('TestimonialView')}
//             style={styles.drawerItemContainer}>
//             <Text style={styles.drawerLabel}>Testimonial</Text>
//           </Pressable>
//           <View style={styles.separator} />

//           <Pressable
//             onPress={() => navigation.navigate('Contact')}
//             style={styles.drawerItemContainer}>
//             <Text style={styles.drawerLabel}>Contact Us</Text>
//           </Pressable>
//           <View style={styles.separator} />
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// const DrawerComps = () => {
//   const {userInfo} = useSelector(({user}) => user);
//   const navigation = useNavigation();
//   const guestType = useSelector(state => state?.user?.userTypeGuest);

//   const userName = useTranslate(userInfo?.data?.name) + '!';
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         headerShown: true,
//         drawerActiveTintColor: '#ED8A00',
//         drawerInactiveTintColor: '#9D0C0C',
//         drawerLabelStyle: {fontSize: 16},
//         drawerStyle: {backgroundColor: '#edf5ef', width: '70%'},
//       }}
//       drawerContent={props => <CustomDrawerContent {...props} />}>
//       <Drawer.Screen
//         name="DashboardTabs"
//         component={BottomComps}
//         options={{
//           headerTitle: () => (
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 width: Dimensions.get('screen').width / 1.3,
//               }}>
//               <Image
//                 source={require('../assets/logo1.jpg')}
//                 style={{
//                   resizeMode: 'contain',
//                   width: 100,
//                   height: 60,
//                 }}
//               />
//               <View>
//                 <Pressable onPress={() => navigation.navigate('Notification')}>
//                   <Icon
//                     name="notifications-outline"
//                     size={22}
//                     color="#E18A5E"
//                     style={{marginLeft: 90}}
//                   />
//                 </Pressable>
//                 <Text style={{fontSize: 16, marginLeft: 10}}>
//                   {useTranslate('Hello')}{' '}
//                   <Text style={{fontWeight: 'bold', fontSize: 18}}>
//                     {guestType ? 'Guest !' : userName}
//                   </Text>
//                 </Text>
//               </View>
//             </View>
//           ),
//           drawerItemStyle: {display: 'none'},
//         }}
//       />
//     </Drawer.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   drawerContainer: {
//     flex: 1,
//     backgroundColor: '#edf5ef',
//   },
//   headerContainer: {height: 200, paddingTop: 30, paddingHorizontal: 20},
//   logo: {width: 100, height: 100, resizeMode: 'contain', marginTop: -40},
//   profileContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: -5,
//   },
//   profileImage: {
//     width: 66,
//     height: 66,
//     borderRadius: 10,
//   },
//   imageBorder: {
//     width: 66,
//     height: 66,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: '#E18A5E',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 10,
//   },
//   profileName: {fontWeight: 'bold', fontSize: 22, marginLeft: 10},
//   bottomDrawerSection: {marginTop: -32},
//   drawerItemContainer: {
//     paddingVertical: 2,
//     paddingLeft: 15,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     margin: 10,
//   },
//   separator: {height: 1, backgroundColor: '#ccc', marginHorizontal: 15},
//   drawerLabel: {fontSize: 16},
//   subItem: {paddingLeft: 30, paddingVertical: 5},
//   nestedSubItem: {
//     paddingLeft: 60,
//     paddingVertical: 4,
//   },
//   subItemRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingLeft: 40,
//     paddingRight: 15,
//     paddingVertical: 5,
//   },
//   iconBox: {
//     backgroundColor: '#E18A5E',
//     width: 22,
//     height: 22,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 4,
//   },
//   nestedScroll: {
//     maxHeight: 150,
//     marginLeft: 30,
//   },
// });

// export default DrawerComps;
//

//

//
//

import React, {useState, memo, useMemo, useCallback,useEffect } from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  Linking,
  Pressable,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Downsquare from 'react-native-vector-icons/AntDesign';
import Upsquare from 'react-native-vector-icons/AntDesign';
import Close from 'react-native-vector-icons/AntDesign';

import BottomComps from './BottomComps';
import {useSelector,useDispatch } from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { baseURL } from '../config/Constent';
import axios from 'axios';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = memo(function CustomDrawerContent(props) {
  const {navigation,cafedynamicData} = props;
  const {
    userTypeGuest: guestType,
    userInfo,
    serviceList,
    gameList,
    greenList,
  } = useSelector(({user}) => user);
  const insets = useSafeAreaInsets();

  

  // State for the main "Offerings" dropdown and its nested sub-lists
  const [expandedItems, setExpandedItems] = useState({
    Offerings: false,
    ServicesSubList: false, // Ensure this is false initially
    GamesSubList: false, // Ensure this is false initially
    GreenSubList: false, // Ensure this is false initially
  });

  // Individual state for "Career with us"
  const [isCareerExpanded, setIsCareerExpanded] = useState(false);

  // Individual state for "Franchise"
  const [isFranchiseExpanded, setIsFranchiseExpanded] = useState(false);

  const [isGreenExpanded, setIsGreenExpanded] = useState(false);



  // Callback to toggle the expansion state of a dropdown within expandedItems
  const toggleDropdown = useCallback(key => {
    console.log(`Toggling dropdown for key: ${key}`);
    setExpandedItems(prev => {
      const newState = {
        ...prev,
        [key]: !prev[key],
      };
      console.log('New expandedItems state:', newState);
      return newState;
    });
  }, []);

  const USERNAME = userInfo?.data?.name;

  // Consolidated and memoized all drawer menu items (excluding Gallery, Testimonial, Contact Us)
  const allDrawerItems = useMemo(
    () => [
      {label: 'About us', onPress: () => navigation.navigate('AboutUs')},
      {label: 'Who needs us?', onPress: () => navigation.navigate('WhoNeedUs')},
      {label: 'Benefits', onPress: () => navigation.navigate('Benefit')},//Your 
      {
        label: 'Offerings',
        isDropdown: true,
        toggleKey: 'Offerings', // Key for expandedItems state
        subItems: [
          {
            label: 'Techniques',
            onPress: () => navigation.navigate('AllProgram'),
          },
          {
            label: 'Services',
            onPress: () => toggleDropdown('ServicesSubList'),
            isNestedDropdown: true,
            toggleKey: 'ServicesSubList', // Ensure nested dropdowns also have a toggleKey
            // dynamicData: serviceList.filter(
            //   srv => srv?.service_name !== 'Other',
            // ),
            dynamicData: (() => {
              const filtered = serviceList.filter(srv => srv?.service_name !== 'Other');
          
              // Find indexes
              const idxCultural = filtered.findIndex(srv => srv.service_name === 'Cultural_Coridor');
              const idxActivity = filtered.findIndex(srv => srv.service_name === 'Activity Arena');
          
              // Swap if both exist
              if (idxCultural > -1 && idxActivity > -1) {
                const temp = filtered[idxCultural];
                filtered[idxCultural] = filtered[idxActivity];
                filtered[idxActivity] = temp;
              }
          
              return filtered;
            })(),
            renderDynamicItem: ({item: srv}) => (
              <Pressable
                onPress={() =>
                  navigation.navigate('ServiceCopy', {
                    service: srv,
                    hideStatus:
                      srv.service_name === 'Consultation' ? true : false,
                  })
                }
                style={styles.deepNestedItem}>
                <Text style={styles.drawerLabel}>
                  {srv?.service_name === 'Cultural_Coridor'
                    ? 'Cultural Corridor'
                    : srv?.service_name}
                </Text>
              </Pressable>
            ),
          },
        //  shrawan Kumar
          {
            label: 'Green Life',
            onPress: () => toggleDropdown('GreenSubList'),
            isNestedDropdown: true,
            toggleKey: 'GreenSubList', // Ensure nested dropdowns also have a toggleKey
            dynamicData: [
              {
                name: 'Green Life Cafe',
              },
              {
            
              name: 'Green Life Product'
              },
            ],
            renderDynamicItem: ({item}) => (
              <Pressable
                onPress={() => {
                    navigation.closeDrawer();
                    if (item.name === 'Green Life Cafe') {
            
                      navigation.navigate('Cafe', { type: 'cafe' });
                    }
                    if (item.name === 'Green Life Product') {
                      navigation.navigate('Cafe', { type: 'product' });
                      //navigation.navigate('GreenProduct'); // Change route name as per your app
                    }
                  }}
                   style={styles.deepNestedItem}>
                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {item.name === 'Green Life Cafe' && (
                    <Image
                    // source={require('../assets/cafe.jpg')}
                    source={{ uri: cafedynamicData[0]?.image }} // cafe ke liye
                    style={{ width: 20, height: 20, marginRight: 8 ,borderRadius:3}}
                  />
                  )}
                  {item.name === 'Green Life Product' && (
                    <Image
                   // source={require('../assets/cafe.jpg')}
                   source={{ uri: cafedynamicData[1]?.image }} // cafe ke liye
                    style={{ width: 20, height: 20, marginRight: 8 ,borderRadius:3}}
                  />
                  )}
                <Text style={styles.drawerLabel}>{item?.name}</Text>
       </View>
                   {/* <Text style={styles.drawerLabel}>{item?.name}</Text> */}
               </Pressable>
            ),
          }  ,
          {
            label: 'Games',
            onPress: () => toggleDropdown('GamesSubList'),
            isNestedDropdown: true,
            toggleKey: 'GamesSubList', // Ensure nested dropdowns also have a toggleKey
            dynamicData: gameList,
            renderDynamicItem: ({item: game}) => (
              <Pressable
                onPress={() => {
                  navigation.navigate('GamesPage', {gameid: game?.id})
                }}
                style={styles.deepNestedItem}>
                <Text style={styles.drawerLabel}>{game?.name}</Text>
              </Pressable>
            ),
          },
          {
            //https://docs.google.com/forms/d/e/1FAIpQLSdPpIXwPu_yjY8efPC_x3dXSqioCRXxFhjNrSTAd0crA84sWA/viewform
            label: 'Start Ups/Budding Entrepreneur',
            onPress: () => {
              Linking.openURL(
                'https://forms.gle/QXCwzwEME1ewN2rs9',
              );
              navigation.closeDrawer();
            },
          },
          {
            // Others
            label: 'Activity Arena',
            onPress: () =>
              navigation.navigate('ServiceCopy', {
                service: {service_name: 'Activity Arena'},
              }),
          },
        ],
      },
      {label: 'Panelist', onPress: () => navigation.navigate('Panelist')},
      {label: 'Events', onPress: () => navigation.navigate('UpcomingEvents')},
      // Gallery, Testimonial, Contact Us are removed from here
    ],
    [navigation, toggleDropdown, serviceList, gameList],
  );

  // Memoized items for "Career with us"
  const careerWithUsItems = useMemo(
    () => [
      {
        label: 'Volunteer',
        onPress: () => {
          //https://docs.google.com/forms/d/e/1FAIpQLSeFwZwZ5iDdICpXLHuyyftzRORV69Nq8C9Ek4i7PUhe9J4zyA/viewform
          Linking.openURL(
            'https://forms.gle/6pGCj13Zx4KZY4LY8',
          );
          navigation.closeDrawer();
        },
      },
      {
        label: 'Internship',
        onPress: () => {
          //https://docs.google.com/forms/d/e/1FAIpQLScvMZXqK1wKtyGkra2eKyDIfdTUZ20bx946YCCf77GO6ZHbXA/viewform
          Linking.openURL(
            'https://forms.gle/rrCmLqaRQoSKCv8B8',
          );
          navigation.closeDrawer();
        },
      },
      // {
      //   label: 'Fellowship',
      //   onPress: () => {
      //     Linking.openURL(
      //       'https://docs.google.com/forms/d/e/1FAIpQLScvMZXqK1wKtyGkra2eKyDIfdTUZ20bx946YCCf77GO6ZHbXA/viewform',
      //     );
      //     navigation.closeDrawer();
      //   },
      // },
      {
        label: 'Join Us',
        onPress: () => {
          //https://forms.gle/kvqB25eqKCEqmCyf6
          Linking.openURL('https://forms.gle/9ZHTe7SmFg5s93N87');
          navigation.closeDrawer();
        },
      },
    ],
    [navigation],
  );

  // Memoized items for "Franchise"
  const franchiseItems = useMemo(
    () => [
      {
        label: 'HuHaHo',
        onPress: () => {
          //https://docs.google.com/forms/d/e/1FAIpQLSdvhLkmAjWeReLO8drDFFOqeqZd1MGk_aEpWTJ_mfoJixR4-w/viewform
          Linking.openURL(
            'https://forms.gle/4Shhbzk374oHsGC77',
          );
          navigation.closeDrawer();
        },
      },
      {
        label: 'Green Life Cafe & Product',
        onPress: () => {
          //https://docs.google.com/forms/d/e/1FAIpQLSdvhLkmAjWeReLO8drDFFOqeqZd1MGk_aEpWTJ_mfoJixR4-w/viewform
          Linking.openURL(
            'https://forms.gle/4Shhbzk374oHsGC77',
          );
          navigation.closeDrawer();
        },
      },
    ],
    [navigation],
  );

  //
   // Memoized items for "Green"
   const GreenItems = useMemo(
    () => [
      {
        id: '1',
        name: 'Green Life Café',
        onPress: () => {
          navigation.closeDrawer();
          navigation.navigate('ServiceDetails', { id: 'green-cafe' });
        },
      },
      {
        id: '2',
        name: 'Green Life Product',
        onPress: () => {
          navigation.closeDrawer();
          navigation.navigate('ServiceDetails', { id: 'green-product' });
        },
      },
    ],
    [navigation]
  );


  // Separate array for the items to be placed at the footer
  const footerDrawerItems = useMemo(
    () => [
      {label: 'Gallery', onPress: () => navigation.navigate('Gallery')},
      {
        label: 'Testimonials',
        onPress: () => navigation.navigate('TestimonialView'),
      },
      {label: 'Contact Us', onPress: () => navigation.navigate('Contact')},
    ],
    [navigation],
  );

  const renderDrawerItem = useCallback(
    ({item: drawerItem}) => {
      if (guestType && drawerItem.label === 'Payment History') return null;

      return (
        <View>
          <Pressable
            onPress={() =>
              drawerItem.isDropdown
                ? toggleDropdown(drawerItem.toggleKey)
                : drawerItem.onPress()
            }
            style={styles.drawerItemContainer}>
            <Text style={styles.drawerLabel}>{drawerItem.label}</Text>
            {drawerItem.isDropdown && (
              <View style={styles.iconBox}>
                {expandedItems[drawerItem.toggleKey] ? (
                  <Upsquare name="up" size={18} />
                ) : (
                  <Downsquare name="down" size={18} />
                )}
              </View>
            )}
          </Pressable>

          {drawerItem.isDropdown && expandedItems[drawerItem.toggleKey] && (
            <>
              {drawerItem.subItems.map((subItem, subIndex) => (
                <View
                  key={`${drawerItem.toggleKey}-${subItem.label}-${subIndex}`}>
                  <Pressable
                    onPress={() => {
                      subItem.isNestedDropdown
                        ? toggleDropdown(subItem.toggleKey)
                        : subItem.onPress();
                    }}
                    style={styles.subItemRow}>
                    <Text style={styles.drawerLabel}>{subItem.label}</Text>
                    {subItem.isNestedDropdown && (
                      <View style={styles.iconBox}>
                        {expandedItems[subItem.toggleKey] ? (
                          <Upsquare name="up" size={14} />
                        ) : (
                          <Downsquare name="down" size={14} />
                        )}
                      </View>
                    )}
                  </Pressable>

                  {subItem.isNestedDropdown &&
                    expandedItems[subItem.toggleKey] && (
                      <View style={styles.deepNestedContainer}>
                        {subItem.dynamicData.map((dataItem, dataIndex) => (
                          <View key={`${subItem.toggleKey}-data-${dataIndex}`}>
                            {subItem.renderDynamicItem({item: dataItem})}
                            <View style={styles.separator} />
                          </View>
                        ))}
                      </View>
                    )}
                  <View style={styles.separator} />
                </View>
              ))}
            </>
          )}
          <View style={styles.separator} />
        </View>
      );
    },
    [
      expandedItems,
      navigation,
      toggleDropdown,
      guestType,
      serviceList,
      gameList,
    ],
  );

  return (
    <View style={{flex: 1, paddingTop: insets.top}}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 10,
          top: insets.top + 10,
          zIndex: 10,
        }}
        onPress={() => navigation.closeDrawer()}>
        <Close name="closecircleo" size={24} />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Image source={require('../assets/img2.png')} style={styles.logo} />
        <View style={styles.profileContainer}>
          <View style={styles.imageBorder}>
            <Image
              source={{
                uri:
                  userInfo?.data?.profile_img ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKKOdmJz8Z2pDtYgFgR2u9spABvNNPKYYtGw&s',
              }}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.profileName}>
            {!guestType ? USERNAME : 'Guest'}
          </Text>
        </View>
      </View>

      <View style={styles.bottomDrawerSection}>
        <FlatList
          data={allDrawerItems}
          keyExtractor={(item, index) => `${item.label}-${index}`}
          renderItem={renderDrawerItem}
          ListFooterComponent={() => (
            <>
              {/* Career with us Section */}
              <View>
                <Pressable
                  onPress={() => setIsCareerExpanded(prev => !prev)}
                  style={styles.drawerItemContainer}>
                  <Text style={styles.drawerLabel}>Career with us</Text>
                  <View style={styles.iconBox}>
                    {isCareerExpanded ? (
                      <Upsquare name="up" size={18} />
                    ) : (
                      <Downsquare name="down" size={18} />
                    )}
                  </View>
                </Pressable>

                {isCareerExpanded && (
                  <>
                    {careerWithUsItems.map((item, index) => (
                      <View key={`career-${index}`}>
                        <Pressable
                          onPress={item.onPress}
                          style={styles.subItemRow}>
                          <Text style={styles.drawerLabel}>{item.label}</Text>
                        </Pressable>
                        <View style={styles.separator} />
                      </View>
                    ))}
                  </>
                )}
                <View style={styles.separator} />
              </View>

              {/* Franchise Section */}
              <View>
                <Pressable
                  onPress={() => setIsFranchiseExpanded(prev => !prev)}
                  style={styles.drawerItemContainer}>
                  <Text style={styles.drawerLabel}>Franchise</Text>
                  <View style={styles.iconBox}>
                    {isFranchiseExpanded ? (
                      <Upsquare name="up" size={18} />
                    ) : (
                      <Downsquare name="down" size={18} />
                    )}
                  </View>
                </Pressable>

                {isFranchiseExpanded && (
                  <>
                    {franchiseItems.map((item, index) => (
                      <View key={`franchise-${index}`}>
                        <Pressable
                          onPress={item.onPress}
                          style={styles.subItemRow}>
                          <Text style={styles.drawerLabel}>{item.label}</Text>
                        </Pressable>
                        <View style={styles.separator} />
                      </View>
                    ))}
                  </>
                )}
                <View style={styles.separator} />
              </View>

              {/* Gallery, Testimonial, Contact Us section */}
              {footerDrawerItems.map((item, index) => (
                <View key={`footer-item-${index}`}>
                  <Pressable
                    onPress={item.onPress}
                    style={styles.drawerItemContainer}>
                    <Text style={styles.drawerLabel}>{item.label}</Text>
                  </Pressable>
                  <View style={styles.separator} />
                </View>
              ))}
            </>
          )}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={21}
        />
      </View>
    </View>
  );
});

const DrawerComps = () => {
  const {userInfo} = useSelector(({user}) => user);
  const navigation = useNavigation();
  const guestType = useSelector(state => state?.user?.userTypeGuest);

  const userName = userInfo?.data?.name + '!';

  const [cafedynamicData, setDynamicData] = useState([]);

  useEffect(() => {
    fetchproductCafeDetail();
  }, []);

  const fetchproductCafeDetail = async () => {
    try {
      const response = await axios.get(baseURL+'product_cafe_detail');
      console.log('fetchproductCafeDetail', response);
      if (response?.data?.success) {
        console.log('fetchproductCafeDetail', response?.data?.data);
        setDynamicData(response?.data?.data);
      }
    } catch (e) {
      console.error('Error fetching drawer data:', e);
    }
  };
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: '#ED8A00',
        drawerInactiveTintColor: '#9D0C0C',
        drawerLabelStyle: {fontSize: 16},
        drawerStyle: {backgroundColor: '#edf5ef', width: '70%'},
      }}
      drawerContent={props => <CustomDrawerContent {...props} cafedynamicData={cafedynamicData} />}>
      <Drawer.Screen
        name="DashboardTabs"
        component={BottomComps}
        options={{
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: Dimensions.get('screen').width / 1.3,
              }}>
              <Image
                source={require('../assets/logo1.png')}
                style={{
                  resizeMode: 'contain',
                  width: 100,
                  height: 45,
                  marginBottom:30,
                }}
              />
              <View  style={{
              
                  marginBottom:30,
                }}>
                <Pressable onPress={() => navigation.navigate('Notification')}>
                  <Icon
                    name="notifications-outline"
                    size={22}
                    color="#E18A5E"
                    style={{marginLeft: 90}}
                  />
                </Pressable>
                <Text style={{fontSize: 16, marginLeft: 10}}>
                  {'Hello'}{' '}
                  <Text style={{fontWeight: 'bold', fontSize: 18}}>
                    {guestType ? 'Guest !' : userName}
                  </Text>
                </Text>
              </View>
            </View>
          ),
          drawerItemStyle: {display: 'none'},
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: {height: 200, paddingTop: 30, paddingHorizontal: 20},
  logo: {width: 100, height: 100, resizeMode: 'contain', marginTop: -40},
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -5,
  },
  profileImage: {
    width: 66,
    height: 66,
    borderRadius: 10,
  },
  imageBorder: {
    width: 66,
    height: 66,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E18A5E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  profileName: {fontWeight: 'bold', fontSize: 22, marginLeft: 10},
  bottomDrawerSection: {marginTop: -32, flex: 1},
  drawerItemContainer: {
    paddingVertical: 2,
    paddingLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  separator: {height: 1, backgroundColor: '#ccc', marginHorizontal: 15},
  drawerLabel: {fontSize: 16},
  subItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 40,
    paddingRight: 15,
    paddingVertical: 5,
  },
  deepNestedItem: {
    paddingLeft: 60,
    paddingVertical: 4,
  },
  iconBox: {
    backgroundColor: '#E18A5E',
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  deepNestedContainer: {
    // This view replaces the nested FlatList for dynamic items
  },
});

export default DrawerComps;
