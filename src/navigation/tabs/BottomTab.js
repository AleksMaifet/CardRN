import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Screens} from 'src/navigation/screens';
import {PacksScreen, ProfileScreen} from 'src/components/Screens';
import IconProfile from 'react-native-vector-icons/AntDesign';
import IconPack from 'react-native-vector-icons/MaterialCommunityIcons';
import {GeneralStyles} from 'src/assets/generalStyles';

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}>
      <Tab.Screen
        name={Screens.PACKS_SCREEN}
        component={PacksScreen}
        options={{
          tabBarIcon: ({color, size}) => {
            return <IconPack size={size} name="cards-outline" color={color} />;
          },
          tabBarActiveTintColor: GeneralStyles.text_color,
        }}
      />
      <Tab.Screen
        name={Screens.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => {
            return <IconProfile size={size} name="user" color={color} />;
          },
          tabBarActiveTintColor: GeneralStyles.text_color,
        }}
      />
    </Tab.Navigator>
  );
};
