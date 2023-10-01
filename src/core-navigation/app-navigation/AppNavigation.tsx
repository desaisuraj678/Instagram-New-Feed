import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../feature-home/screens/HomeScreen';

const Stack = createStackNavigator();

function AppNavigatorStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={() => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}

export default AppNavigatorStack;
