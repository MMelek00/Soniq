import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import GalleryScreen from '../screens/gallery';

const Stack = createNativeStackNavigator();

export default function GalleryStack() {
  return (
    <Stack.Navigator initialRouteName={'Gallery'}>
      <Stack.Screen
        name={'Gallery'}
        options={() => ({
          headerTitle: 'Gallery',
        })}
        component={GalleryScreen as React.ComponentType}
      />
    </Stack.Navigator>
  );
}
