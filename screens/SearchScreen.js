// screens/SearchScreen.js
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_SIZE = (SCREEN_WIDTH - 2) / 3; // 3열 그리드

// 더미 상품 데이터
const DUMMY_PRODUCTS = Array.from({ length: 30 }, (_, i) => ({
  id: `product-${i}`,
  imageUrl: `https://source.unsplash.com/random/400x400?fashion&sig=${i}`,
  brand: ['ZARA', 'H&M', 'UNIQLO', 'MUSINSA'][i % 4],
  name: `패션 아이템 ${i + 1}`,
  price: 29000 + (i * 10000),
  discountRate: i % 3 === 0 ? 20 : null,
}));

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '상의', '하의', '아우터', '원피스', '신발', '가방', '액세서리'];

  const renderProduct = ({ item }) => {
    const hasDiscount = item.discountRate !== null;
    
    return (
      <TouchableOpacity 
        style={styles.gridItem}
        onPress={() => console.log('Product clicked:', item.name)}
      >
        <Image 
          source={{ uri: item.imageUrl }} 
          style={styles.productImage}
        />
        
        {hasDiscount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discountRate}%</Text>
          </View>
        )}

        <View style={styles.productInfo}>
          <Text style={styles.brandText} numberOfLines={1}>
            {item.brand}
          </Text>
          <Text style={styles.priceText}>
            {item.price.toLocaleString()}원
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* 검색바 */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="상품, 브랜드 검색"
            placeholderTextColor={Colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* 카테고리 탭 */}
      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryTab,
                selectedCategory === item && styles.categoryTabActive,
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item && styles.categoryTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* 상품 그리드 */}
      <FlatList
        data={DUMMY_PRODUCTS}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  // 검색바
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: 16,
  },
  filterButton: {
    padding: 4,
  },

  // 카테고리
  categoryContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingVertical: 8,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 16,
  },
  categoryTabActive: {
    backgroundColor: Colors.accent,
  },
  categoryText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: Colors.textPrimary,
  },

  // 그리드
  gridContainer: {
    paddingTop: 1,
  },
  gridItem: {
    width: ITEM_SIZE,
    marginRight: 1,
    marginBottom: 1,
  },
  productImage: {
    width: '100%',
    height: ITEM_SIZE,
    backgroundColor: Colors.backgroundLight,
  },
  
  // 할인 배지
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: Colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: 'bold',
  },

  // 상품 정보
  productInfo: {
    padding: 8,
    backgroundColor: Colors.backgroundLight,
  },
  brandText: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginBottom: 2,
  },
  priceText: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: 'bold',
  },
});