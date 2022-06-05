import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Screens} from 'src/navigation/screens';
import {PacksScreen, ProfileScreen} from 'src/components/Screens';
import IconPack from 'react-native-vector-icons/MaterialCommunityIcons';
import {ImageComponent} from 'src/components/ImageComponent';
import {useSelector} from 'react-redux';
import {selectGetAvatar} from 'src/store/selectors';
import {COLORS} from 'src/assets/generalStyles';

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
  const getUserAvatar = useSelector(selectGetAvatar);

  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}>
      <Tab.Screen
        name={Screens.PACKS_SCREEN}
        component={PacksScreen}
        options={{
          tabBarIcon: ({color, size}) => {
            return <IconPack size={size} name="cards-outline" color={color} />;
          },
          tabBarActiveTintColor: COLORS.black,
        }}
      />
      <Tab.Screen
        name={Screens.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <ImageComponent
                width={size}
                height={size}
                avatar={getUserAvatar}
                borderColor={color}
              />
            );
          },
          tabBarActiveTintColor: COLORS.black,
        }}
      />
    </Tab.Navigator>
  );
};
