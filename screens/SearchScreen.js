// screens/SearchScreen.js
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_ITEM_SIZE = (SCREEN_WIDTH - 4) / 3;

const Tab = createMaterialTopTabNavigator();

// 더미 데이터
const DUMMY_REELS = Array.from({ length: 30 }, (_, i) => ({
  id: `reel-${i}`,
  imageUrl: `https://source.unsplash.com/random/400x600?fashion&sig=${i}`,
  views: Math.floor(Math.random() * 1000000),
}));

const TRENDING_KEYWORDS = [
  { rank: 1, keyword: '니트', change: 'up' },
  { rank: 2, keyword: '패딩', change: 'same' },
  { rank: 3, keyword: '후드티', change: 'up' },
  { rank: 4, keyword: '코트', change: 'down' },
  { rank: 5, keyword: '경량패딩', change: 'up' },
  { rank: 6, keyword: '무스탕', change: 'same' },
  { rank: 7, keyword: '비니', change: 'up' },
  { rank: 8, keyword: '맨투맨', change: 'same' },
  { rank: 9, keyword: '무신사 스탠다드', change: 'up' },
  { rank: 10, keyword: '목도리', change: 'up' },
];

const RISING_KEYWORDS = [
  { rank: 1, keyword: '트레이닝 셋업', change: 'new' },
  { rank: 2, keyword: '팬츠', change: 'new' },
  { rank: 3, keyword: '트레이닝 팬츠', change: 'new' },
  { rank: 4, keyword: '보드복', change: 'new' },
  { rank: 5, keyword: '터틀넥', change: 'new' },
  { rank: 6, keyword: '넥워머', change: 'new' },
  { rank: 7, keyword: '분크', change: 'new' },
  { rank: 8, keyword: '마멀킴 가방', change: 'new' },
  { rank: 9, keyword: '반집업', change: 'new' },
  { rank: 10, keyword: '젤시부츠', change: 'new' },
];

const PRODUCT_CATEGORIES = ['전체', '상의', '하의', '아우터', '원피스', '신발', '가방', '액세서리'];

const DUMMY_PRODUCTS = Array.from({ length: 10 }, (_, i) => ({
  id: `product-${i}`,
  imageUrl: `https://source.unsplash.com/random/300x300?product&sig=${i}`,
  brand: ['ZARA', 'H&M', 'UNIQLO', 'MUSINSA'][i % 4],
  name: `인기상품 ${i + 1}`,
  price: 29000 + (i * 10000),
  discountRate: i % 3 === 0 ? 20 : null,
}));

// 릴스 탭
function ReelsTab() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.reelItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.reelImage} />
      <View style={styles.reelOverlay}>
        <Ionicons name="play" size={20} color="#fff" />
        <Text style={styles.reelViews}>
          {item.views > 10000 ? `${(item.views / 10000).toFixed(1)}만` : item.views}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.tabContainer}>
      <FlatList
        data={DUMMY_REELS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.reelsGrid}
      />
    </View>
  );
}

// 상품 탭
function ProductsTab() {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const KeywordItem = ({ item }) => (
    <View style={styles.keywordItem}>
      <Text style={styles.keywordRank}>{item.rank}</Text>
      <Text style={styles.keywordText} numberOfLines={1}>
        {item.keyword}
      </Text>
      {item.change === 'up' && <Ionicons name="arrow-up" size={12} color={Colors.accent} />}
      {item.change === 'new' && (
        <View style={styles.newBadge}>
          <Text style={styles.newText}>N</Text>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.tabContainer} showsVerticalScrollIndicator={false}>
      {/* 검색바 */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="검색어를 입력하세요"
            placeholderTextColor={Colors.textSecondary}
          />
        </View>
      </View>

      {/* 인기 검색어 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>인기 검색어</Text>
          <Text style={styles.sectionSubtitle}>12.30 17:00, 기준</Text>
        </View>
        <View style={styles.keywordGrid}>
          {TRENDING_KEYWORDS.map((item) => (
            <KeywordItem key={`trending-${item.rank}`} item={item} />
          ))}
        </View>
      </View>

      {/* 급상승 검색어 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>급상승 검색어</Text>
          <Text style={styles.sectionSubtitle}>12.30 17:00, 기준</Text>
        </View>
        <View style={styles.keywordGrid}>
          {RISING_KEYWORDS.map((item) => (
            <KeywordItem key={`rising-${item.rank}`} item={item} />
          ))}
        </View>
      </View>

      {/* 카테고리 탭 */}
      <View style={styles.categoryContainer}>
        <Text style={styles.sectionTitle}>인기 상품</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {PRODUCT_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryTab,
                selectedCategory === category && styles.categoryTabActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 인기 상품 가로 스크롤 */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productsScroll}
      >
        {DUMMY_PRODUCTS.map((product) => (
          <TouchableOpacity key={product.id} style={styles.productCard}>
            <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
            {product.discountRate && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{product.discountRate}%</Text>
              </View>
            )}
            <View style={styles.productInfo}>
              <Text style={styles.productBrand} numberOfLines={1}>
                {product.brand}
              </Text>
              <Text style={styles.productName} numberOfLines={1}>
                {product.name}
              </Text>
              <Text style={styles.productPrice}>
                {product.price.toLocaleString()}원
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

// 메인 SearchScreen
export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: Colors.textPrimary,
          tabBarInactiveTintColor: Colors.textSecondary,
          tabBarIndicatorStyle: {
            backgroundColor: Colors.textPrimary,
            height: 2,
          },
          tabBarStyle: {
            backgroundColor: Colors.background,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: Colors.border,
          },
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: 'bold',
            textTransform: 'none',
          },
        }}
      >
        <Tab.Screen name="Reels" component={ReelsTab} options={{ title: '릴스' }} />
        <Tab.Screen name="Products" component={ProductsTab} options={{ title: '상품' }} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // 릴스 그리드
  reelsGrid: {
    paddingTop: 1,
  },
  reelItem: {
    width: GRID_ITEM_SIZE,
    height: GRID_ITEM_SIZE * 1.5,
    marginRight: 1,
    marginBottom: 1,
    position: 'relative',
  },
  reelImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.backgroundLight,
  },
  reelOverlay: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reelViews: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // 검색바
  searchContainer: {
    padding: 16,
    paddingTop: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: 15,
  },

  // 섹션
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },

  // 키워드 그리드
  keywordGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  keywordItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  keywordRank: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    width: 20,
  },
  keywordText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  newBadge: {
    backgroundColor: Colors.accent,
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },

  // 카테고리
  categoryContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryScroll: {
    paddingVertical: 12,
    gap: 8,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: Colors.backgroundLight,
    marginRight: 8,
  },
  categoryTabActive: {
    backgroundColor: Colors.accent,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  categoryTextActive: {
    color: Colors.textPrimary,
  },

  // 상품 가로 스크롤
  productsScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  productCard: {
    width: 140,
    marginRight: 12,
  },
  productImage: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    backgroundColor: Colors.backgroundLight,
    marginBottom: 8,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: Colors.accent,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  discountText: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  productInfo: {
    gap: 4,
  },
  productBrand: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },

  bottomPadding: {
    height: 40,
  },
});