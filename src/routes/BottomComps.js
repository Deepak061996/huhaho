// import React from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Icon from 'react-native-vector-icons/FontAwesome';

// import Dashboard from '../views/pages/Dashboard';
// import Connection from '../views/pages/Connection';
// import Profile from '../views/pages/Profile';
// import Appointment from '../views/pages/Appointment';
// import Offerings from '../views/pages/Offerings';
// import Icon5 from 'react-native-vector-icons/FontAwesome5';

// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// // Stack navigator for Dashboard-related screens
// const DashboardStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       <Stack.Screen name="DashboardHome" component={Dashboard} />
//       <Stack.Screen name="Offerings" component={Offerings} />
//     </Stack.Navigator>
//   );
// };

// const BottomComps = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({route}) => ({
//         tabBarHideOnKeyboard: true,
//         tabBarShowLabel: true,
//         tabBarIcon: ({focused}) => {
//           let iconName;
//           let isFontAwesome5 = false; // Flag to check if we need FontAwesome5

//           switch (route.name) {
//             case 'DashboardStack':
//               iconName = 'home';
//               break;
//             case 'Appointment':
//               iconName = 'calendar-check';
//               isFontAwesome5 = true; // Use FontAwesome5 for this icon
//               break;
//             case 'Connection':
//               iconName = 'qrcode';
//               break;
//             case 'Profile':
//               iconName = 'user-circle-o';
//               break;
//             default:
//               iconName = 'circle'; // Fallback icon
//           }

//           return isFontAwesome5 ? (
//             <Icon5
//               name={iconName}
//               size={26}
//               color={focused ? '#FF914D' : '#FF914D'}
//             />
//           ) : (
//             <Icon
//               name={iconName}
//               size={26}
//               color={focused ? '#FF914D' : '#FF914D'}
//             />
//           );
//         },
//         tabBarActiveTintColor: '#FF914D',
//         tabBarInactiveTintColor: '#FF914D',
//         tabBarStyle: {
//           backgroundColor: '#FFF',
//           borderTopWidth: 1,
//           elevation: 10,
//           shadowColor: '#000',
//           shadowOffset: {width: 0, height: 4},
//           shadowOpacity: 0.3,
//           shadowRadius: 4,
//         },
//         headerShown: false,
//       })}>
//       <Tab.Screen
//         name="DashboardStack"
//         component={DashboardStack}
//         options={{tabBarLabel: 'Home'}}
//       />
//       <Tab.Screen
//         name="Appointment"
//         component={Appointment}
//         options={{headerShown: false}} // 🔹 Hide Default Header
//       />
//       <Tab.Screen
//         name="Connection"
//         component={Connection}
//         options={{tabBarLabel: 'Our socials'}}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{tabBarLabel: 'Settings'}}
//       />
//     </Tab.Navigator>
//   );
// };

// export default BottomComps;
//

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

import Dashboard from '../views/pages/Dashboard';
import Connection from '../views/pages/Connection';
import Profile from '../views/pages/Profile';
import Appointment from '../views/pages/Appointment';
// import Offerings from '../views/pages/Offerings';
import {useTranslate} from '../hooks/useTranslate';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const DashboardStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="DashboardHome" component={Dashboard} />
    {/* <Stack.Screen name="Offerings" component={Offerings} /> */}
  </Stack.Navigator>
);

const BottomComps = () => {
  const homeLabel = useTranslate('Home');
  const appointmentLabel = useTranslate('My Appointments');
  const socialsLabel = useTranslate('Our Socials');
  const settingsLabel = useTranslate('Settings');

  const screenOptions = ({route}) => ({
    tabBarHideOnKeyboard: true,
    tabBarShowLabel: true,
    tabBarIcon: ({focused}) => {
      let iconName;
      let useFontAwesome5 = false;

      switch (route.name) {
        case 'DashboardStack':
          iconName = 'home';
          break;
        case 'Appointment':
          iconName = 'calendar-check';
          useFontAwesome5 = true;
          break;
        case 'Connection':
          iconName = 'qrcode';
          break;
        case 'Profile':
          iconName = 'user-circle-o';
          break;
        default:
          iconName = 'circle';
      }

      const IconComponent = useFontAwesome5 ? Icon5 : Icon;
      return (
        <IconComponent
          name={iconName}
          size={26}
          color={focused ? '#FF914D' : '#E18A5E'}
        />
      );
    },
    tabBarActiveTintColor: '#FF914D',
    tabBarInactiveTintColor: '#FF914D',
    tabBarStyle: {
      backgroundColor: '#FFF',
      borderTopWidth: 1,
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    headerShown: false,
  });

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="DashboardStack"
        component={DashboardStack}
        options={{
          tabBarLabel: homeLabel,

          tabBarLabelStyle: {
            fontSize: 8,
          },
          tabBarItemStyle: {
            width: 110, // Adjust to fit the label
          },
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={Appointment}
        // options={{tabBarLabel: appointmentLabel}}

        options={{
          tabBarLabel: appointmentLabel,
          tabBarLabelStyle: {
            fontSize: 8,
          },
          tabBarItemStyle: {
            width: 110, // Adjust to fit the label
          },
        }}
      />
      <Tab.Screen
        name="Connection"
        component={Connection}
        options={{
          tabBarLabel: socialsLabel,

          tabBarLabelStyle: {
            fontSize: 8,
          },
          tabBarItemStyle: {
            width: 110, // Adjust to fit the label
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: settingsLabel,

          tabBarLabelStyle: {
            fontSize: 8,
          },
          tabBarItemStyle: {
            width: 110, // Adjust to fit the label
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomComps;
