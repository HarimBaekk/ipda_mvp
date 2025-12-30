// screens/fitting/MainFittingRoom.js
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { useMemo, useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../../constants/Colors';
import AvatarViewer from './AvatarViewer';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// 더미 의류 데이터
const CLOTHING_CATEGORIES = [
  { id: 'closet', name: '내 옷장', icon: 'bookmark' },
  { id: 'top', name: '상의', icon: 'shirt' },
  { id: 'bottom', name: '하의', icon: 'bag' },
  { id: 'dress', name: '원피스', icon: 'woman' },
  { id: 'outer', name: '아우터', icon: 'shield' },
  { id: 'shoes', name: '신발', icon: 'footsteps' },
  { id: 'accessory', name: '액세서리', icon: 'watch' },
];

const DUMMY_CLOTHES = {
  closet: [
    { id: 'c1', name: '블랙 티셔츠', brand: 'ZARA', imageUrl: 'https://source.unsplash.com/random/300x300?shirt&sig=1', price: 29000 },
    { id: 'c2', name: '데님 팬츠', brand: 'UNIQLO', imageUrl: 'https://source.unsplash.com/random/300x300?jeans&sig=2', price: 49000 },
  ],
  top: Array.from({ length: 10 }, (_, i) => ({
    id: `top-${i}`,
    name: `상의 ${i + 1}`,
    brand: ['ZARA', 'H&M', 'UNIQLO'][i % 3],
    imageUrl: `https://source.unsplash.com/random/300x300?shirt&sig=${i + 10}`,
    price: 29000 + (i * 5000),
  })),
  bottom: Array.from({ length: 10 }, (_, i) => ({
    id: `bottom-${i}`,
    name: `하의 ${i + 1}`,
    brand: ['ZARA', 'H&M', 'UNIQLO'][i % 3],
    imageUrl: `https://source.unsplash.com/random/300x300?pants&sig=${i + 20}`,
    price: 39000 + (i * 5000),
  })),
  dress: Array.from({ length: 10 }, (_, i) => ({
    id: `dress-${i}`,
    name: `원피스 ${i + 1}`,
    brand: ['ZARA', 'H&M', 'UNIQLO'][i % 3],
    imageUrl: `https://source.unsplash.com/random/300x300?dress&sig=${i + 30}`,
    price: 59000 + (i * 5000),
  })),
  outer: Array.from({ length: 10 }, (_, i) => ({
    id: `outer-${i}`,
    name: `아우터 ${i + 1}`,
    brand: ['ZARA', 'H&M', 'UNIQLO'][i % 3],
    imageUrl: `https://source.unsplash.com/random/300x300?jacket&sig=${i + 40}`,
    price: 89000 + (i * 10000),
  })),
  shoes: Array.from({ length: 10 }, (_, i) => ({
    id: `shoes-${i}`,
    name: `신발 ${i + 1}`,
    brand: ['NIKE', 'ADIDAS', 'CONVERSE'][i % 3],
    imageUrl: `https://source.unsplash.com/random/300x300?shoes&sig=${i + 50}`,
    price: 79000 + (i * 10000),
  })),
  accessory: Array.from({ length: 10 }, (_, i) => ({
    id: `accessory-${i}`,
    name: `액세서리 ${i + 1}`,
    brand: ['ACC', 'BRAND'][i % 2],
    imageUrl: `https://source.unsplash.com/random/300x300?accessory&sig=${i + 60}`,
    price: 19000 + (i * 5000),
  })),
};

export default function MainFittingRoom({ photos, onBack }) {
  const [selectedCategory, setSelectedCategory] = useState('top');
  const [wornItems, setWornItems] = useState({
    top: null,
    bottom: null,
    dress: null,
    outer: null,
    shoes: null,
    accessory: null,
  });
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['20%', '70%'], []);

  // 옷 선택/착용
  const handleSelectClothing = (item, category) => {
    if (category === 'closet') return; // 옷장은 선택만
    
    setWornItems(prev => ({
      ...prev,
      [category]: prev[category]?.id === item.id ? null : item,
    }));
  };

  // 의류 카드 렌더링
  const renderClothingItem = ({ item }) => {
    const isWorn = wornItems[selectedCategory]?.id === item.id;

    return (
      <TouchableOpacity
        style={[styles.clothingCard, isWorn && styles.clothingCardSelected]}
        onPress={() => handleSelectClothing(item, selectedCategory)}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.clothingImage} />
        
        {/* 선택 표시 */}
        {isWorn && (
          <>
            <View style={styles.selectedBorder} />
            <View style={styles.checkIcon}>
              <Ionicons name="checkmark-circle" size={24} color={Colors.accent} />
            </View>
          </>
        )}

        <View style={styles.clothingInfo}>
          <Text style={styles.clothingBrand} numberOfLines={1}>
            {item.brand}
          </Text>
          <Text style={styles.clothingName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.clothingPrice}>
            {item.price.toLocaleString()}원
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI 피팅룸</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* 3D 아바타 뷰어 */}
      <AvatarViewer wornItems={wornItems} photos={photos} />

      {/* 하단 바텀시트 */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
      >
        <View style={styles.bottomSheetContent}>
          {/* 카테고리 탭 (고정) */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {CLOTHING_CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryTab,
                  selectedCategory === category.id && styles.categoryTabActive,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Ionicons
                  name={category.icon}
                  size={20}
                  color={
                    selectedCategory === category.id
                      ? Colors.textPrimary
                      : Colors.textSecondary
                  }
                />
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category.id && styles.categoryTextActive,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* 의류 그리드 */}
          <FlatList
            data={DUMMY_CLOTHES[selectedCategory] || []}
            renderItem={renderClothingItem}
            keyExtractor={(item) => item.id}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.clothingGrid}
            columnWrapperStyle={styles.clothingRow}
          />
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // 헤더
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: Colors.background,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  shareButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 바텀시트
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 16,
  },

  // 카테고리 탭
  categoryScroll: {
    paddingVertical: 16,
    gap: 8,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
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

  // 의류 그리드
  clothingGrid: {
    paddingBottom: 20,
  },
  clothingRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  clothingCard: {
    width: (SCREEN_WIDTH - 48) / 3,
    backgroundColor: Colors.backgroundCard,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  clothingCardSelected: {
    borderWidth: 0, // 테두리는 selectedBorder로 처리
  },
  selectedBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 3,
    borderColor: Colors.accent,
    borderRadius: 8,
    zIndex: 2,
  },
  checkIcon: {
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 3,
    backgroundColor: Colors.background,
    borderRadius: 12,
  },
  clothingImage: {
    width: '100%',
    height: (SCREEN_WIDTH - 48) / 3,
    backgroundColor: Colors.backgroundLight,
  },
  clothingInfo: {
    padding: 8,
  },
  clothingBrand: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  clothingName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  clothingPrice: {
    fontSize: 11,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
});