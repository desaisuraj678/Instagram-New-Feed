import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../feature-login/screens/LoginScreen';

const Stack = createStackNavigator();

function LoginNavigatorStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default LoginNavigatorStack