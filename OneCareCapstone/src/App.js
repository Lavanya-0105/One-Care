
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Registration from './components/Registration';
import HomePage from './HomePage';
import AppointmentBooking from "./components/AppointmentBooking";
import SignupPage from "./components/SignupPage";
import SearchDoctor  from './components/SearchDoctor';
import ForgetPassword from './ForgetPassword';
import ResetPassword from './ResetPassword'
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }} />
          <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }}/>
          <Stack.Screen name="SignupPage" component={SignupPage} options={{ headerShown: false }}/>
          <Stack.Screen name="AppointmentBooking" component={AppointmentBooking} options={{ headerShown: false }}/>
          <Stack.Screen name="SearchDoctor" component={SearchDoctor} options={{ headerShown: false }}/>
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
