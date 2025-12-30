import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import Colors from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopColor: Colors.border,
          height: 90,
          paddingBottom: 28,
          paddingTop: 3,
        },
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTintColor: Colors.textPrimary,
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '600',
          marginTop: 4, 
        },
        tabBarIconStyle: {
        marginTop: 4,          // 아이콘 위 간격 추가
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: '검색',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'search' : 'search-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="fitting"
        options={{
          title: 'AI 피팅룸',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'sparkles' : 'sparkles-outline'} size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="codi"
        options={{
          title: '코디 요청',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'shirt' : 'shirt-outline'} size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          title: '마이페이지',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}