// navigation/AppNavigator.js
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Colors from '../constants/Colors';

// 화면 임포트 (나중에 만들 예정)
import FittingScreen from '../screens/FittingScreen';
import HomeScreen from '../screens/HomeScreen';
import MyPageScreen from '../screens/MyPageScreen';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Fitting') {
              iconName = focused ? 'shirt' : 'shirt-outline';
            } else if (route.name === 'MyPage') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.accent,
          tabBarInactiveTintColor: Colors.textSecondary,
          tabBarStyle: {
            backgroundColor: Colors.background,
            borderTopColor: Colors.border,
            height: 60,
            paddingBottom: 8,
          },
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTintColor: Colors.textPrimary,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ 
            title: '홈',
            headerShown: false,
          }}
        />
        <Tab.Screen 
          name="Search" 
          component={SearchScreen}
          options={{ title: '검색' }}
        />
        <Tab.Screen 
          name="Fitting" 
          component={FittingScreen}
          options={{ 
            title: 'AI 피팅룸',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons 
                name={focused ? 'sparkles' : 'sparkles-outline'} 
                size={size + 4} 
                color={focused ? Colors.accent : color}
              />
            ),
          }}
        />
        <Tab.Screen 
          name="MyPage" 
          component={MyPageScreen}
          options={{ title: '마이페이지' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}