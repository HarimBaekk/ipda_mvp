// screens/HomeScreen.js
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef, useState } from 'react';
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
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [checkedProducts, setCheckedProducts] = useState(new Set());
  const flatListRef = useRef(null);
  const bottomSheetRef = useRef(null);
  
  // 바텀시트 스냅 포인트 (더 낮게 설정)
  const snapPoints = useMemo(() => ['20%', '45%'], []);

  const toggleTags = (contentId) => {
    setShowTags(prev => ({
      ...prev,
      [contentId]: !prev[contentId],
    }));
  };

  // 상품 클릭 시 바텀시트 열기
  const handleProductPress = useCallback((products) => {
    console.log('Products to show:', products);
    setSelectedProducts(products);
    setCheckedProducts(new Set()); // 초기화
    bottomSheetRef.current?.expand();
  }, []);

  // 체크박스 토글
  const toggleProductCheck = useCallback((productId) => {
    setCheckedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  }, []);

  // 바텀시트 닫기
  const handleCloseBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

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
              onPress={() => handleProductPress(item.products)}
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
    <GestureHandlerRootView style={styles.container}>
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
        <Text style={styles.logo}>콘텐츠를 입다(IPDA)</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* 바텀시트 */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
      >
        <View style={styles.bottomSheetContent}>
          <Text style={styles.sheetTitle}>
            상품 {selectedProducts.length}개
          </Text>
          
          {/* 가로 스크롤 상품 카드 */}
          <BottomSheetFlatList
            horizontal
            data={selectedProducts}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsScroll}
            renderItem={({ item: product }) => (
              <TouchableOpacity 
                style={styles.productCard}
                onPress={() => toggleProductCheck(product.id)}
                activeOpacity={0.7}
              >
                {/* 상품 이미지 */}
                <View style={styles.imageWrapper}>
                  <Image 
                    source={{ uri: `https://source.unsplash.com/random/200x200?${product.name}` }}
                    style={styles.productImage}
                  />
                  
                  {/* 체크박스 */}
                  <TouchableOpacity 
                    style={styles.checkbox}
                    onPress={() => toggleProductCheck(product.id)}
                  >
                    {checkedProducts.has(product.id) ? (
                      <Ionicons name="checkmark-circle" size={20} color={Colors.accent} />
                    ) : (
                      <Ionicons name="ellipse-outline" size={20} color={Colors.textSecondary} />
                    )}
                  </TouchableOpacity>
                </View>

                {/* 상품 정보 */}
                <View style={styles.productInfo}>
                  <Text style={styles.productBrand} numberOfLines={1}>
                    {product.brand}
                  </Text>
                  <Text style={styles.productName} numberOfLines={1}>
                    {product.name}
                  </Text>
                  
                  <View style={styles.priceRow}>
                    {product.discountPrice ? (
                      <>
                        <Text style={styles.discountPrice}>
                          {product.discountPrice.toLocaleString()}원
                        </Text>
                        <View style={styles.discountBadge}>
                          <Text style={styles.discountRate}>
                            {Math.round((1 - product.discountPrice / product.price) * 100)}%
                          </Text>
                        </View>
                      </>
                    ) : (
                      <Text style={styles.normalPrice}>
                        {product.price.toLocaleString()}원
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />

          {/* AI 피팅룸 버튼 */}
          <TouchableOpacity 
            style={styles.fittingButton}
            disabled={checkedProducts.size === 0}
          >
            <Ionicons name="sparkles" size={20} color={Colors.textPrimary} />
            <Text style={styles.fittingButtonText}>
              {checkedProducts.size > 0 
                ? `선택한 ${checkedProducts.size}개 입어보기` 
                : 'AI 피팅룸에서 입어보기'}
            </Text>
            <Ionicons name="arrow-forward" size={16} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
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
    bottom: 130,
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
    bottom: 120,
    left: 16,
    right: 80,
    marginBottom: 10,
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

  // 바텀시트
  bottomSheetBackground: {
    backgroundColor: Colors.backgroundLight,
  },
  bottomSheetIndicator: {
    backgroundColor: Colors.border,
    width: 40,
  },
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 16,
  },

  // 가로 스크롤
  productsScroll: {
    paddingBottom: 12,
    gap: 10,
  },

  // 상품 카드 (가로 슬라이딩)
  productCard: {
    width: 120,
    backgroundColor: Colors.backgroundCard,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 3,
  },
  imageWrapper: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 120,
    backgroundColor: Colors.background,
  },
  
  // 체크박스
  checkbox: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    padding: 2,
  },

  productInfo: {
    padding: 8,
  },
  productBrand: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  productName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 6,
    lineHeight: 14,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  discountPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.accent,
  },
  normalPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  discountBadge: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  discountRate: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },

  // AI 피팅룸 버튼
  fittingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent,
    padding: 12,
    borderRadius: 10,
    marginTop: 16,
    marginBottom: 20,
    gap: 8,
  },
  fittingButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  bottomPadding: {
    height: 40,
  },
});