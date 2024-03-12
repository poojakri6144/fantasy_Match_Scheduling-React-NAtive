// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import {Provider} from 'react-redux';
// import configureStore from './src/redux/configureStore';
// import HomeScreen from './src/screens/HomeScreen';
// import MatchDetailScreen from './src/screens/MatchDetailScreen';

// const Stack = createStackNavigator();
// const store = configureStore();

// const App = () => {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Home">
//           <Stack.Screen
//             name="Home"
//             component={HomeScreen}
//             options={{title: 'Home'}}
//           />
//           <Stack.Screen
//             name="MatchDetail"
//             component={MatchDetailScreen}
//             options={{title: 'Match Detail'}}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </Provider>
//   );
// };

// export default App;

// index.js
import React from 'react';
import {Provider} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
// import store from "./src/redux/Store";
import configureStore from './src/redux/configureStore';
import MatchFormScreen from './src/screens/MatchFormScreen';
import ScheduleScreen from './src/screens/NewScheduleScreen';
import HomeScreen from './src/screens/HomeScreen';
import Splash from './src/screens/SplashScreen';

const Stack = createStackNavigator();
const store = configureStore();
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Play TFG"
          screenOptions={{headerShown: true}}>
                      <Stack.Screen name="Play TFG" component={Splash} />

          <Stack.Screen name="Scheduled Matches" component={HomeScreen} />
          <Stack.Screen name="Create Match" component={MatchFormScreen} />
          <Stack.Screen name="Edit Match" component={MatchFormScreen} />
          <Stack.Screen name="Schedule Match" component={ScheduleScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
