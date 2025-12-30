// screens/HomeScreen.js
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../constants/Colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// 더미 데이터
const DUMMY_CONTENT = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
    username: '@fashionista_official',
    likes: 2340,
    comments: 156,
    products: [
      {
        id: 'p1',
        position: { top: '30%', left: '20%' },
        brand: 'ZARA',
        name: '오버사이즈 블레이저',
        price: 89000,
        discountPrice: 69000,
      },
      {
        id: 'p2',
        position: { top: '60%', left: '70%' },
        brand: 'UNIQLO',
        name: '슬림핏 치노 팬츠',
        price: 49000,
        discountPrice: null,
      },
    ],
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400',
    username: '@daily_outfit',
    likes: 1890,
    comments: 98,
    products: [
      {
        id: 'p3',
        position: { top: '40%', left: '30%' },
        brand: 'H&M',
        name: '니트 카디건',
        price: 39000,
        discountPrice: 29000,
      },
    ],
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400',
    username: '@style_guru',
    likes: 3120,
    comments: 234,
    products: [
      {
        id: 'p4',
        position: { top: '35%', left: '50%' },
        brand: 'MUSINSA',
        name: '롱 트렌치코트',
        price: 129000,
        discountPrice: 99000,
      },
    ],
  },
];

export default function HomeScreen() {
  const [showTags, setShowTags] = useState({});
  const flatListRef = useRef(null);

  const toggleTags = (contentId) => {
    setShowTags(prev => ({
      ...prev,
      [contentId]: !prev[contentId],
    }));
  };

  const renderItem = ({ item }) => {
    const tagsVisible = showTags[item.id];

    return (
      <View style={styles.contentContainer}>
        <Pressable 
          onPress={() => toggleTags(item.id)}
          style={styles.imageContainer}
        >
          <Image 
            source={{ uri: item.imageUrl }} 
            style={styles.contentImage}
            resizeMode="cover"
          />
          
          {/* 상품 태그 핀 */}
          {tagsVisible && item.products.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={[
                styles.productPin,
                {
                  top: product.position.top,
                  left: product.position.left,
                }
              ]}
              onPress={() => console.log('Product clicked:', product.name)}
            >
              <View style={styles.pinDot} />
              <View style={styles.pinPulse} />
            </TouchableOpacity>
          ))}
        </Pressable>

        {/* 우측 액션 바 */}
        <View style={styles.rightActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={32} color={Colors.textPrimary} />
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={28} color={Colors.textPrimary} />
            <Text style={styles.actionText}>{item.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="paper-plane-outline" size={28} color={Colors.textPrimary} />
            <Text style={styles.actionText}>공유</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="bookmark-outline" size={28} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* 하단 정보 */}
        <View style={styles.bottomInfo}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.tapHint}>
            {tagsVisible ? '🏷️ 상품을 탭해보세요' : '👆 이미지를 탭해보세요'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={DUMMY_CONTENT}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
      />

      {/* 상단 헤더 */}
      <View style={styles.topHeader}>
        <Text style={styles.logo}>Fashion Fit</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'relative',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  contentImage: {
    width: '100%',
    height: '100%',
  },
  
  // 상품 태그 핀
  productPin: {
    position: 'absolute',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.accent,
    borderWidth: 3,
    borderColor: Colors.secondary,
  },
  pinPulse: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.accent,
    opacity: 0.3,
  },

  // 우측 액션 바
  rightActions: {
    position: 'absolute',
    right: 12,
    bottom: 100,
    alignItems: 'center',
    gap: 24,
  },
  actionButton: {
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },

  // 하단 정보
  bottomInfo: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 80,
  },
  username: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tapHint: {
    color: Colors.textSecondary,
    fontSize: 14,
  },

  // 상단 헤더
  topHeader: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logo: {
    color: Colors.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
  },
});