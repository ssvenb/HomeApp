const HOSTNAME = 'SVENSHP';
export const SERVER_URL = `http:/${HOSTNAME}:5000/`;

import { ShoppingListScreen } from './src/screens/ShoppingListScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TodoListScreen } from './src/screens/TodoListScreen';
import { NavigationBar } from './src/components/NavigationBar';
import { CalendarScreen } from './src/screens/CalendarScreen';
import { useState } from 'react';
import { Text, RefreshControl, ScrollView } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  const [connected, setConnected] = useState(true);

  const ShoppingListWrapper = () => {
    return <ShoppingListScreen setConnected={setConnected} />;
  };
  const TodoListWrapper = () => {
    return <TodoListScreen setConnected={setConnected} />;
  };

  return connected ? (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator tabBar={NavigationBar}>
          <Tab.Screen
            name="shopping-cart"
            component={ShoppingListWrapper}
            options={{ title: 'Einkaufsliste' }}
          />
          <Tab.Screen
            name="todo"
            component={TodoListWrapper}
            options={{ title: 'Todo Liste' }}
          />
          <Tab.Screen
            name="calendar"
            component={CalendarScreen}
            options={{ title: 'Kalender' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={connected}
          onRefresh={() => setConnected(true)}
        />
      }
    >
      <Text style={{ textAlign: 'center' }}>
        Es konnte keine Verbindung aufgebaut werden
      </Text>
    </ScrollView>
  );
}
