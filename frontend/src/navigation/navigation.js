import React from 'react';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { isUserAuthenticatedSelector } from '../selectors/auth.js';
import { Fab, IconButton } from 'native-base';
import { Box } from 'native-base';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';

// Screens
import HomeScreen from '../screens/HomeScreen.js';
import UniversityReportScreen from '../screens/UniversityReportScreen.js';
import StudentScreen from '../screens/StudentScreen.js';
import ProfileScreen from '../screens/ProfileScreen.js';
import ChatScreen from '../screens/ChatScreen.js';

// Icons
import LandingScreen from '../screens/unauth/LandingScreen.js';
import SignInScreen from '../screens/unauth/SignInScreen.js';
import SignUpScreen from '../screens/unauth/SignUpScreen.js';
import NewChatScreen from '../screens/NewChatScreen.js';
import HomeCountryScreen from '../screens/isFirstTime/HomeCountryScreen.js';
import AvgGradeScreen from '../screens/isFirstTime/AvgGradeScreen.js';
import BudgetScreen from '../screens/isFirstTime/BudgetScreen.js';
import CreateUniversityReportScreen from '../screens/isFirstTime/CreateUniversityRportScreen.js';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProductAddStack = createStackNavigator();
const IsFirstTimeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName='HomeIndex'>
      <HomeStack.Screen
        name='HomeIndex'
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name='Chat'
        component={ChatScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS

        }}
      />
    </HomeStack.Navigator>
  );
}

// function ProductAddStackScreen() {
//   return (
//     <ProductAddStack.Navigator initialRouteName='AddProductImage'>
//       <ProductAddStack.Screen
//         name='AddProductImage'
//         component={AddProductImage}
//         options={{
//           headerShown: false,
//           ...TransitionPresets.ModalSlideFromBottomIOS,
//         }}
//       ></ProductAddStack.Screen>
//       <ProductAddStack.Screen
//         name='AddProduct'
//         component={AddProduct}
//         options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
//       ></ProductAddStack.Screen>
//       <ProductAddStack.Screen
//         name='Camera'
//         component={Camera}
//         options={{
//           headerShown: false,
//           ...TransitionPresets.ModalSlideFromBottomIOS,
//         }}
//       ></ProductAddStack.Screen>
//     </ProductAddStack.Navigator>
//   );
// }
// function ProfileTopNav({ detailsData }) {
//   return (
//     <TopTab.Navigator
//       screenOptions={{
//         tabBarPressColor: 'transparent',
//         tabBarLabelStyle: {
//           fontSize: 12,
//           textTransform: 'capitalize',
//           fontWeight: 600,
//         },
//         tabBarIndicatorStyle: {
//           backgroundColor: '#F28B40',
//           height: 5,
//           borderRadius: 30,
//           width: '10%',
//           marginLeft: '9%',
//         },
//       }}
//     >
//       <TopTab.Screen
//         name='ProfileReviews'
//         component={ProfileReviews}
//         options={{ tabBarLabel: 'Reviews' }}
//       />
//       <TopTab.Screen
//         name='ProfileDetails'
//         children={() => <ProfileDetails data={detailsData} />}
//         options={{ tabBarLabel: 'Info' }}
//       />
//       <TopTab.Screen
//         name='Location'
//         component={UserLocation}
//         options={{ tabBarLabel: 'Map' }}
//       />
//     </TopTab.Navigator>
//   );
// }

function BottomNav({ navigation }) {
  return (
    <>
      <BottomTab.Navigator
        screenOptions={{
          tabBarStyle: { position: 'absolute' },
          title: '',
          tabBarActiveTintColor: '#3399ff',
        }}
        screenOptions={{
          showLabel: false,
        }}
      >
        <BottomTab.Screen
          name='Home'
          component={HomeStackScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              return <Feather name='home' size={26} color={color} />;
            },
          }}
        />
        <BottomTab.Screen
          name='Report'
          component={UniversityReportScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              return <Ionicons name='school-outline' size={28} color={color} />;
            },
          }}
        />
        <BottomTab.Screen
          name='Conversation'
          component={NewChatScreen}
          options={{
            headerShown: false,
            tabBarStyle: { display: 'none' },
            ...TransitionPresets.ModalSlideFromBottomIOS,
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Box
                  mt='-10'
                  shadow='6'
                  p='3'
                  borderRadius='full'
                  style={{ backgroundColor: '#3399ff' }}
                >
                  <Ionicons
                    name='add-outline'
                    size={28}
                    color='white'
                    style={{
                      fontWeight: 600,
                    }}
                  />
                </Box>
              );
            },
          }}
        />
        <BottomTab.Screen
          name='Students'
          component={StudentScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Ionicons
                  name='people-outline'
                  size={30}
                  color={color}
                />
              );
            },
          }}
        />
        <BottomTab.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Ionicons
                  name='person-circle-outline'
                  size={34}
                  color={color}
                />
              );
            },
          }}
        />
      </BottomTab.Navigator>
    </>
  );
}

const RootStack = createStackNavigator();

function RootNavigator() {
  return (
    <RootStack.Navigator initialRouteName='Landing'>
      <RootStack.Screen
        name='Landing'
        component={LandingScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name='SignIn'
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name='SignUp'
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
}

function IsFirstTimeNavigator() {
  return (
    <IsFirstTimeStack.Navigator initialRouteName="Country">
      <IsFirstTimeStack.Screen
        name='Country'
        component={HomeCountryScreen}
        options={{
          headerShown: false,
        }}
      />
      <IsFirstTimeStack.Screen
        name='Budget'
        component={BudgetScreen}
        options={{
          headerShown: false,
        }}
      />
      <IsFirstTimeStack.Screen
        name='Grade'
        component={AvgGradeScreen}
        options={{
          headerShown: false,
        }}
      />
      <IsFirstTimeStack.Screen
        name='CreateReport'
        component={CreateUniversityReportScreen}
        options={{
          headerShown: false,
        }}
      />
    </IsFirstTimeStack.Navigator>
  )
}

const MainNavigation = () => {
  //   const authenticated = useSelector(isUserAuthenticatedSelector);
  const authenticated = true;
  const isFirstTime = false;
  //const authenticated = false;
  return (
    <NavigationContainer>
      {!authenticated ? (
        <RootNavigator />
      ) : isFirstTime 
        ? (<IsFirstTimeNavigator />)
        : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name='HomeBase'
            //options={{ headerShown: false }}
            component={BottomNav}
            options={{
              headerShown: false
            }}
          />
          {/* <Stack.Screen
            name='SplashScreen'
            options={{ headerShown: false }}
            component={SplashScreen}
          />
          <Stack.Screen
            name='Product'
            component={Product}
            options={{
              headerShown: false,
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
          /> */}
          {/* add your another screen here using -> Stack.Screen */}
        </Stack.Navigator>
      )
      }
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    setToken: (email, token, expiration) => {
      dispatch(actionCreators.setToken(email, token, expiration));
    },
  };
};

export { MainNavigation };