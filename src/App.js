
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import PatientHome from './components/PatientHome';
import AppointmentBooking from "./components/AppointmentBooking";
import SignupPage from "./components/SignupPage";
import SearchDoctor  from './components/SearchDoctor';
import MedicationReminder from './components/MedicationReminder';
import SymptomsTracker from './components/SymptomsTracker';
import LabTestBooking from './components/LabTestBooking';
import ForgotPassword  from './components/ForgotPassword';
import DoctorHome from './components/DoctorHome';
import DoctorLogin from './components/DoctorLogin';
import HealthResources from './components/HealthResources';
import MeditationSession from './components/MeditationSession';
const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="PatientHome" component={PatientHome} options={{ headerShown: false }}/>
          <Stack.Screen name="SignupPage" component={SignupPage} options={{ headerShown: false }}/>
          <Stack.Screen name="AppointmentBooking" component={AppointmentBooking} options={{ headerShown: false }}/>
          <Stack.Screen name="SearchDoctor" component={SearchDoctor} options={{ headerShown: false }}/>
          <Stack.Screen name="MedicationReminder" component={MedicationReminder} options={{ headerShown: false }}/>
          <Stack.Screen name="LabTestBooking" component={LabTestBooking} options={{ headerShown: false }}/>
          <Stack.Screen name="HealthResources" component={HealthResources} options={{ headerShown: false }}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }}/>
          <Stack.Screen name="DoctorHome" component={DoctorHome} options={{ headerShown: false }}/>
          <Stack.Screen name="DoctorLogin" component={DoctorLogin} options={{ headerShown: false }}/>
          <Stack.Screen name="SymptomsTracker" component={SymptomsTracker} options={{ headerShown: false }}/>
          <Stack.Screen name="MeditationSession" component={MeditationSession} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
