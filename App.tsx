import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Tabs } from './src/navigator/Tabs';



const App = () => {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  )

}

export default App
