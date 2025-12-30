// screens/CodiRequestScreen.js
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../constants/Colors';

export default function CodiRequestScreen() {
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [description, setDescription] = useState('');

  const occasions = [
    { id: 'daily', label: '데일리', icon: 'sunny' },
    { id: 'work', label: '출근', icon: 'briefcase' },
    { id: 'date', label: '데이트', icon: 'heart' },
    { id: 'party', label: '파티', icon: 'wine' },
    { id: 'travel', label: '여행', icon: 'airplane' },
    { id: 'formal', label: '포멀', icon: 'business' },
  ];

  const stylePreferences = [
    { id: 'casual', label: '캐주얼', emoji: '👕' },
    { id: 'street', label: '스트릿', emoji: '🧢' },
    { id: 'minimal', label: '미니멀', emoji: '🤍' },
    { id: 'feminine', label: '페미닌', emoji: '👗' },
    { id: 'chic', label: '시크', emoji: '🖤' },
    { id: 'sporty', label: '스포티', emoji: '👟' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>코디 요청하기</Text>
        <Text style={styles.headerSubtitle}>
          전문 인플루언서가 당신만의 코디를 추천해드려요
        </Text>
      </View>

      {/* 포인트 안내 */}
      <View style={styles.pointBanner}>
        <Ionicons name="wallet" size={24} color={Colors.accent} />
        <View style={styles.pointText}>
          <Text style={styles.pointTitle}>보유 포인트: 2,340P</Text>
          <Text style={styles.pointSubtitle}>코디 요청 1회 = 300P</Text>
        </View>
      </View>

      {/* 착용 상황 선택 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>어떤 상황인가요?</Text>
        <View style={styles.occasionGrid}>
          {occasions.map((occasion) => (
            <TouchableOpacity
              key={occasion.id}
              style={[
                styles.occasionCard,
                selectedOccasion === occasion.id && styles.occasionCardActive,
              ]}
              onPress={() => setSelectedOccasion(occasion.id)}
            >
              <Ionicons
                name={occasion.icon}
                size={32}
                color={selectedOccasion === occasion.id ? Colors.accent : Colors.textSecondary}
              />
              <Text
                style={[
                  styles.occasionLabel,
                  selectedOccasion === occasion.id && styles.occasionLabelActive,
                ]}
              >
                {occasion.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 선호 스타일 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>선호하는 스타일</Text>
        <View style={styles.styleGrid}>
          {stylePreferences.map((style) => (
            <TouchableOpacity key={style.id} style={styles.styleChip}>
              <Text style={styles.styleEmoji}>{style.emoji}</Text>
              <Text style={styles.styleLabel}>{style.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 상세 설명 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>어떤 코디를 원하시나요?</Text>
        <TextInput
          style={styles.textArea}
          placeholder="예) 20대 후반 직장인입니다. 깔끔하면서도 트렌디한 출근룩을 추천해주세요. 특히 슬랙스 코디가 궁금해요!"
          placeholderTextColor={Colors.textSecondary}
          multiline
          numberOfLines={6}
          value={description}
          onChangeText={setDescription}
          textAlignVertical="top"
        />
      </View>

      {/* 참고 이미지 업로드 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>참고 이미지 (선택)</Text>
        <TouchableOpacity style={styles.uploadBox}>
          <Ionicons name="cloud-upload-outline" size={48} color={Colors.textSecondary} />
          <Text style={styles.uploadText}>선호하는 스타일 이미지 업로드</Text>
          <Text style={styles.uploadSubtext}>최대 5장</Text>
        </TouchableOpacity>
      </View>

      {/* 예산 범위 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>예산 범위</Text>
        <View style={styles.budgetOptions}>
          {['10만원 이하', '10-30만원', '30-50만원', '50만원 이상'].map((budget) => (
            <TouchableOpacity key={budget} style={styles.budgetChip}>
              <Text style={styles.budgetText}>{budget}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 최근 요청 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>최근 코디 요청</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>전체보기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recentCard}>
          <View style={styles.recentHeader}>
            <Image
              source={{ uri: 'https://via.placeholder.com/40' }}
              style={styles.influencerAvatar}
            />
            <View style={styles.recentInfo}>
              <Text style={styles.recentInfluencer}>@fashion_guru</Text>
              <Text style={styles.recentDate}>2일 전 · 답변 완료</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>완료</Text>
            </View>
          </View>
          <Text style={styles.recentTitle}>20대 데일리 캐주얼룩 추천</Text>
          <View style={styles.recentImages}>
            <Image
              source={{ uri: 'https://source.unsplash.com/random/100x100?fashion&sig=1' }}
              style={styles.recentImage}
            />
            <Image
              source={{ uri: 'https://source.unsplash.com/random/100x100?fashion&sig=2' }}
              style={styles.recentImage}
            />
            <Image
              source={{ uri: 'https://source.unsplash.com/random/100x100?fashion&sig=3' }}
              style={styles.recentImage}
            />
          </View>
        </View>
      </View>

      {/* 제출 버튼 */}
      <View style={styles.bottomSection}>
        <View style={styles.priceInfo}>
          <Text style={styles.priceLabel}>소모 포인트</Text>
          <Text style={styles.priceValue}>300P</Text>
        </View>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>코디 요청하기</Text>
          <Ionicons name="arrow-forward" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // 헤더
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },

  // 포인트 배너
  pointBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
    margin: 20,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  pointText: {
    flex: 1,
  },
  pointTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  pointSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
  },

  // 섹션
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.accent,
  },

  // 착용 상황
  occasionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  occasionCard: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  occasionCardActive: {
    backgroundColor: Colors.backgroundCard,
    borderColor: Colors.accent,
  },
  occasionLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  occasionLabelActive: {
    color: Colors.accent,
  },

  // 스타일 선호
  styleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  styleChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 6,
  },
  styleEmoji: {
    fontSize: 16,
  },
  styleLabel: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '600',
  },

  // 텍스트 영역
  textArea: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
    color: Colors.textPrimary,
    fontSize: 15,
    minHeight: 120,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  // 업로드
  uploadBox: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    padding: 40,
    alignItems: 'center',
    gap: 8,
  },
  uploadText: {
    fontSize: 15,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  uploadSubtext: {
    fontSize: 13,
    color: Colors.textSecondary,
  },

  // 예산
  budgetOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  budgetChip: {
    backgroundColor: Colors.backgroundLight,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  budgetText: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '600',
  },

  // 최근 요청
  recentCard: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
  },
  recentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  influencerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundCard,
  },
  recentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  recentInfluencer: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  recentDate: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  statusBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  recentTitle: {
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  recentImages: {
    flexDirection: 'row',
    gap: 8,
  },
  recentImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: Colors.backgroundCard,
  },

  // 하단
  bottomSection: {
    paddingHorizontal: 20,
  },
  priceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  priceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.accent,
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: Colors.accent,
    padding: 18,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },

  bottomPadding: {
    height: 40,
  },
});